const express = require("express");
const router = express.Router();
const { handlePaystackWebhook } = require("../Controllers/webhookController");

// Raw body is required here for Paystack's HMAC signature verification —
// this route must be mounted before the global express.json() parser in app.js.
router.post("/paystack", express.raw({ type: "application/json" }), handlePaystackWebhook);

module.exports = router;
