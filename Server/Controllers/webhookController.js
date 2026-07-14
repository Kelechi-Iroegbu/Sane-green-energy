const crypto = require("crypto");
const Order = require("../Models/Order");
const { markOrderPaid, markOrderFailed } = require("../services/orderService");

// POST /api/webhooks/paystack
const handlePaystackWebhook = async (req, res) => {
  const signature = req.headers["x-paystack-signature"];
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(req.body)
    .digest("hex");

  if (!signature || hash !== signature) {
    return res.sendStatus(401);
  }

  let event;
  try {
    event = JSON.parse(req.body.toString("utf8"));
  } catch {
    return res.sendStatus(400);
  }

  try {
    if (event.event === "charge.success") {
      const order = await Order.findOne({ paymentReference: event.data.reference });
      if (order && !order.isPaid) {
        await markOrderPaid(order, event.data);
      }
    } else if (event.event === "charge.failed") {
      const order = await Order.findOne({ paymentReference: event.data.reference });
      if (order && !order.isPaid) {
        await markOrderFailed(order);
      }
    }
  } catch (err) {
    console.error("Paystack webhook processing error:", err.message);
  }

  res.sendStatus(200);
};

module.exports = { handlePaystackWebhook };
