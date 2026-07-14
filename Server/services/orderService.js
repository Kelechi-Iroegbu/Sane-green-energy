const Product = require("../Models/Product");

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
}

async function markOrderFailed(order) {
  order.paymentStatus = "failed";
  await order.save();
}

module.exports = { markOrderPaid, markOrderFailed };
