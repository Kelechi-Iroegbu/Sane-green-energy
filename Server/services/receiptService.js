const PDFDocument = require("pdfkit");

const NGN = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

function generateReceiptPDF(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const brand = "#1f6d3a";
    const muted = "#6b7280";
    const border = "#e5e7eb";
    const left = 50;
    const right = 545;

    doc.fillColor(brand).font("Helvetica-Bold").fontSize(22).text("SaneGreenEnergy", left, 50);
    doc.fillColor(muted).font("Helvetica").fontSize(9).text("Nigeria's Solar Marketplace", left, 76);

    doc.fillColor("#000000").font("Helvetica-Bold").fontSize(16).text("Payment Receipt", left, 110);

    doc.font("Helvetica").fontSize(10).fillColor("#000000");
    doc.text(`Order Number: ${order._id}`, left, 138);
    doc.text(
      `Order Date: ${new Date(order.createdAt).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
      left,
      153
    );
    doc.text(`Payment Reference: ${order.paymentReference || "—"}`, left, 168);

    doc.font("Helvetica-Bold").fontSize(10).text("Billed To", left, 198);
    doc.font("Helvetica");
    doc.text(order.user?.name || "Customer", left, 213);
    doc.text(order.user?.email || "", left, 227);

    doc.font("Helvetica-Bold").fontSize(10).text("Shipping Address", 320, 198);
    doc.font("Helvetica");
    const addr = order.shippingAddress || {};
    doc.text(addr.address || "", 320, 213, { width: 225 });
    doc.text(`${addr.city || ""}, ${addr.postalCode || ""}`, 320, 227, { width: 225 });
    doc.text(addr.country || "", 320, 241, { width: 225 });

    let y = 270;
    doc.moveTo(left, y).lineTo(right, y).strokeColor(border).stroke();
    y += 10;

    const col = { name: left, qty: 330, unit: 390, total: 470 };
    doc.font("Helvetica-Bold").fontSize(10);
    doc.text("Item", col.name, y);
    doc.text("Qty", col.qty, y);
    doc.text("Unit Price", col.unit, y);
    doc.text("Line Total", col.total, y);
    y += 16;
    doc.moveTo(left, y).lineTo(right, y).strokeColor(border).stroke();
    y += 8;

    doc.font("Helvetica").fontSize(10);
    for (const item of order.items) {
      const rowHeight = 20;
      doc.text(item.name, col.name, y, { width: 270 });
      doc.text(String(item.qty), col.qty, y);
      doc.text(NGN(item.price), col.unit, y);
      doc.text(NGN(item.price * item.qty), col.total, y);
      y += rowHeight;
    }

    doc.moveTo(left, y).lineTo(right, y).strokeColor(border).stroke();
    y += 14;

    const totalsLabelX = 390;
    doc.font("Helvetica").fontSize(10);
    doc.text("Subtotal", totalsLabelX, y);
    doc.text(NGN(order.itemsPrice), col.total, y);
    y += 16;

    doc.text("Shipping", totalsLabelX, y);
    doc.text(order.shippingPrice > 0 ? NGN(order.shippingPrice) : "Free", col.total, y);
    y += 16;

    doc.font("Helvetica-Bold").fontSize(11);
    doc.text("Total", totalsLabelX, y);
    doc.text(NGN(order.totalPrice), col.total, y);
    y += 40;

    doc
      .font("Helvetica-Oblique")
      .fontSize(10)
      .fillColor(muted)
      .text(
        "Thank you for choosing SaneGreenEnergy. We're glad to be part of your switch to clean energy.",
        left,
        y,
        { width: right - left, align: "center" }
      );

    doc.end();
  });
}

module.exports = { generateReceiptPDF };
