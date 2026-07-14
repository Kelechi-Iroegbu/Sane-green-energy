const BASE_URL = "https://api.paystack.co";

async function paystackRequest(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Paystack request failed");
  }
  return data.data;
}

const initializeTransaction = (payload) =>
  paystackRequest("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify(payload),
  });

const verifyTransaction = (reference) =>
  paystackRequest(`/transaction/verify/${encodeURIComponent(reference)}`);

module.exports = { initializeTransaction, verifyTransaction };
