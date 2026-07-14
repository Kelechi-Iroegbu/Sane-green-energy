const asyncHandler = require("express-async-handler");
const Order = require("../Models/Order");
const { initializeTransaction, verifyTransaction } = require("../config/paystack");
const { markOrderPaid, markOrderFailed } = require("../services/orderService");

// POST /api/orders   body: { items, shippingAddress, paymentMethod }
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const orderItems = items.map((i) => ({
    product: i.id,
    name: i.name,
    image: i.img,
    price: i.price,
    qty: i.qty,
  }));

  const itemsPrice = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingPrice = itemsPrice > 100000 ? 0 : 5000;
  const totalPrice = itemsPrice + shippingPrice;

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  });

  const reference = `SGE-${order._id}-${Date.now()}`;

  let authorizationUrl;
  try {
    const data = await initializeTransaction({
      email: req.user.email,
      amount: Math.round(totalPrice * 100),
      currency: process.env.PAYSTACK_CURRENCY || "NGN",
      reference,
      callback_url: `${process.env.CLIENT_URL}/checkout/callback`,
      metadata: { orderId: order._id.toString(), userId: req.user._id.toString() },
    });
    authorizationUrl = data.authorization_url;
  } catch (err) {
    // Payment couldn't be initiated — roll back the order so the user can retry.
    await Order.deleteOne({ _id: order._id });
    res.status(502);
    throw new Error(`Could not start payment: ${err.message}`);
  }

  order.paymentReference = reference;
  await order.save();

  res.status(201).json({ order, authorizationUrl });
});

// GET /api/orders/verify/:reference
const verifyPayment = asyncHandler(async (req, res) => {
  const { reference } = req.params;
  const order = await Order.findOne({ paymentReference: reference });
  if (!order) {
    res.status(404);
    throw new Error("Order not found for this payment reference");
  }
  if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized");
  }

  if (order.isPaid) {
    return res.json(order);
  }

  const data = await verifyTransaction(reference);
  if (data.status === "success" && data.amount === Math.round(order.totalPrice * 100)) {
    await markOrderPaid(order, data);
  } else {
    await markOrderFailed(order);
  }

  res.json(order);
});

// GET /api/orders/mine
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized");
  }
  res.json(order);
});

module.exports = { createOrder, getMyOrders, getOrderById, verifyPayment };
