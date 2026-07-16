const asyncHandler = require("express-async-handler");
const { getSupportReply } = require("../services/supportService");

// POST /api/support
const sendSupportMessage = asyncHandler(async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400);
    throw new Error("messages must be a non-empty array");
  }

  const invalid = messages.some(
    (m) => !m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string"
  );
  if (invalid) {
    res.status(400);
    throw new Error("Each message must have role 'user' or 'assistant' and a string content");
  }

  const { reply, intakeComplete } = await getSupportReply(messages);
  res.json({ reply, intakeComplete });
});

module.exports = { sendSupportMessage };
