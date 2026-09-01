const { Resend } = require("resend");

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NGN = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

async function sendReceiptEmail({ order, pdfBuffer }) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping receipt email.");
    return;
  }
  if (!order.user?.email) {
    console.warn(`Order ${order._id} has no populated user email — skipping receipt email.`);
    return;
  }

  const itemRows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:6px 0;">${item.name} × ${item.qty}</td>
          <td style="padding:6px 0;text-align:right;">${NGN(item.price * item.qty)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1f2933;">
      <h2 style="color:#1f6d3a;margin-bottom:0;">SaneGreenEnergy</h2>
      <p style="color:#6b7280;margin-top:4px;">Nigeria's Solar Marketplace</p>
      <p>Hi ${order.user.name || "there"},</p>
      <p>Thanks for your order! Here's your receipt for order <strong>${order._id}</strong>.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${itemRows}
      </table>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;border-top:1px solid #e5e7eb;padding-top:8px;">
        <tr><td style="padding-top:8px;">Subtotal</td><td style="padding-top:8px;text-align:right;">${NGN(order.itemsPrice)}</td></tr>
        <tr><td>Shipping</td><td style="text-align:right;">Free</td></tr>
        <tr><td><strong>Total</strong></td><td style="text-align:right;"><strong>${NGN(order.totalPrice)}</strong></td></tr>
      </table>
      <p style="margin-top:20px;font-size:13px;color:#6b7280;">Payment reference: ${order.paymentReference || "—"}</p>
      <p>Your full itemized receipt is attached as a PDF.</p>
      <p style="margin-top:24px;color:#6b7280;font-size:13px;">
        Thank you for choosing SaneGreenEnergy — we're glad to be part of your switch to clean energy.
      </p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM_ADDRESS || "SaneGreenEnergy <onboarding@resend.dev>",
    to: order.user.email,
    subject: `Your SaneGreenEnergy receipt — Order ${order._id}`,
    html,
    attachments: [
      {
        filename: `receipt-${order._id}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
}

async function sendPasswordResetEmail({ to, name, resetUrl }) {
  if (!resend) {
    console.warn(
      `RESEND_API_KEY not set — password reset link for ${to} (dev only): ${resetUrl}`
    );
    return;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1f2933;">
      <h2 style="color:#1f6d3a;margin-bottom:0;">SaneGreenEnergy</h2>
      <p style="color:#6b7280;margin-top:4px;">Nigeria's Solar Marketplace</p>
      <p>Hi ${name || "there"},</p>
      <p>We received a request to reset your SaneGreenEnergy password. Click the button below to choose a new one. This link expires in 30 minutes.</p>
      <p style="margin:24px 0;">
        <a href="${resetUrl}" style="display:inline-block;background:#1f6d3a;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:9999px;font-size:14px;">
          Reset password
        </a>
      </p>
      <p style="font-size:13px;color:#6b7280;">If the button doesn't work, paste this link into your browser:<br />${resetUrl}</p>
      <p style="margin-top:24px;color:#6b7280;font-size:13px;">
        If you didn't request this, you can safely ignore this email — your password won't change.
      </p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM_ADDRESS || "SaneGreenEnergy <onboarding@resend.dev>",
    to,
    subject: "Reset your SaneGreenEnergy password",
    html,
  });
}

module.exports = { sendReceiptEmail, sendPasswordResetEmail };
