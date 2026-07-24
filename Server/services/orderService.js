const Product = require("../Models/Product");
const { generateReceiptPDF } = require("./receiptService");
const { sendReceiptEmail } = require("./emailService");

async function markOrderPaid(order, paystackData) {
  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentStatus = "paid";
  order.paymentResult = {
    reference: paystackData.reference,
    status: paystackData.status,
    channel: paystackData.channel,
    currency: paystackData.currency,
    paidAt: paystackData.paid_at ? new Date(paystackData.paid_at) : new Date(),
  };
  await order.save();

  await Promise.all(
    order.items.map((item) =>
      Product.updateOne({ _id: item.product }, { $inc: { countInStock: -item.qty } })
    )
  );

  // Receipt email is best-effort — a failure here must never undo the payment
  // confirmation above (the webhook path especially: Paystack retries on non-2xx).
  try {
    await order.populate("user", "name email");
    const pdfBuffer = await generateReceiptPDF(order);
    await sendReceiptEmail({ order, pdfBuffer });
  } catch (err) {
    console.error(`Receipt email failed for order ${order._id}:`, err.message);
  }
}

async function markOrderFailed(order) {
  order.paymentStatus = "failed";
  await order.save();
}

module.exports = { markOrderPaid, markOrderFailed };
