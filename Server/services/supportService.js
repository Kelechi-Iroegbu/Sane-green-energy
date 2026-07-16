const anthropic = require("../config/anthropic");
const SupportTicket = require("../Models/SupportTicket");

const MODEL = "claude-opus-4-8";
const INTAKE_MARKER = "[INTAKE_COMPLETE]";

const SYSTEM_PROMPT = `You are the customer care intake assistant for SaneGreenEnergy, a Nigerian solar marketplace. Your job is to have a warm, brief, efficient conversation to prepare a customer's request for a human representative — you do not resolve issues yourself.

Guidelines:
- Be warm, brief, and efficient. Keep every reply short — one to three sentences. This is a chat widget, not an essay.
- Start by asking what the customer needs help with.
- Based on the issue type they describe, ask relevant follow-up questions:
  - Order: ask for the order number.
  - Installer or service issue: ask which installer, and what went wrong.
  - Product question: ask which product and what they want to know.
  - Billing: ask for the invoice or payment reference if they have one.
  - Other: ask them to briefly describe what they need.
- You must collect exactly four pieces of information before finishing:
  1. The customer's name.
  2. Their preferred contact method (a phone number or email).
  3. The issue category (Order, Installer/Service, Product Question, Billing, or Other).
  4. A short description of the problem.
- Ask for one or two things at a time — do not interrogate the customer with a long list of questions at once.
- Once you have all four pieces of information, respond with:
  1. A warm, human-readable sentence or two confirming what you've collected and letting them know a representative will follow up shortly.
  2. Then, on its own new line, the exact text: ${INTAKE_MARKER}
  3. Immediately after that marker, on their own lines, output exactly these four fields and nothing else:
NAME: <customer name>
CONTACT: <phone or email>
CATEGORY: <Order | Installer/Service | Product Question | Billing | Other>
DESCRIPTION: <one or two sentence summary of the issue>

Do not output the marker or these fields until you actually have all four pieces of information. Do not ask the customer to repeat information they already gave you.`;

function parseIntakeResult(rawText) {
  const markerIndex = rawText.indexOf(INTAKE_MARKER);
  if (markerIndex === -1) {
    return { reply: rawText.trim(), intakeComplete: false, ticketData: null };
  }

  const reply = rawText.slice(0, markerIndex).trim();
  const fieldsBlock = rawText.slice(markerIndex + INTAKE_MARKER.length);

  const extract = (label) => {
    const match = fieldsBlock.match(new RegExp(`${label}:\\s*(.+)`, "i"));
    return match ? match[1].trim() : "";
  };

  const ticketData = {
    name: extract("NAME") || "Not provided",
    contact: extract("CONTACT") || "Not provided",
    category: extract("CATEGORY") || "Other",
    description: extract("DESCRIPTION") || "Not provided",
  };

  return { reply, intakeComplete: true, ticketData };
}

async function getSupportReply(conversation) {
  const messages = conversation.map((m) => ({ role: m.role, content: m.content }));

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  const rawText = textBlock ? textBlock.text : "";

  const { reply, intakeComplete, ticketData } = parseIntakeResult(rawText);

  if (intakeComplete && ticketData) {
    await SupportTicket.create(ticketData);
  }

  return { reply, intakeComplete };
}

module.exports = { getSupportReply };
