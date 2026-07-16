const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "in_progress", "resolved"], default: "new" },
    priority: { type: String, enum: ["normal", "high"], default: "normal" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportTicket", supportTicketSchema);
