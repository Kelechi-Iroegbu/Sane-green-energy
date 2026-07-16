import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Send, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/SocialIcons";

// Placeholders — swap in the real support line and WhatsApp business number.
const SUPPORT_PHONE = "+2348000000000";
const SUPPORT_PHONE_DISPLAY = "+234 800 000 0000";
const WHATSAPP_NUMBER = "2348000000000";
const WHATSAPP_FALLBACK_MESSAGE = "Hi, I have a question about SaneGreenEnergy";

const API_URL = import.meta.env.VITE_API_URL || "/api";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING = "Hi! What can we help you with today?";

function toApiMessages(msgs: ChatMessage[]) {
  const firstUserIdx = msgs.findIndex((m) => m.role === "user");
  if (firstUserIdx === -1) return [];
  return msgs.slice(firstUserIdx).map(({ role, content }) => ({ role, content }));
}

export function CustomerCareWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [intakeComplete, setIntakeComplete] = useState(false);
  const [summary, setSummary] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  function resetChat() {
    setMessages([{ role: "assistant", content: GREETING }]);
    setInput("");
    setSending(false);
    setIntakeComplete(false);
    setSummary("");
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || sending || intakeComplete) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const res = await fetch(`${API_URL}/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toApiMessages(nextMessages) }),
      });
      if (!res.ok) throw new Error("Support request failed");
      const data: { reply: string; intakeComplete: boolean } = await res.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (data.intakeComplete) {
        setIntakeComplete(true);
        setSummary(data.reply);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong on our end. Please try Call Us or WhatsApp above." },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Customer care"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-[calc(100%+16px)] right-0 flex w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          >
            <div className="relative border-b border-border p-5 pb-4">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="pr-6 font-display text-lg font-semibold">Need Help?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Reach our customer care team directly.</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`tel:${SUPPORT_PHONE}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                >
                  <Phone className="h-3.5 w-3.5" /> Call Us
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_FALLBACK_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" /> Chat on WhatsApp instead
                </a>
              </div>
            </div>

            <div ref={scrollRef} className="flex h-80 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground"
                      : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2.5 text-sm text-foreground"
                  }
                >
                  {m.content}
                </div>
              ))}
              {sending && (
                <div className="mr-auto flex items-center gap-1 rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              )}
            </div>

            {intakeComplete ? (
              <div className="flex flex-wrap gap-2 border-t border-border p-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" /> Send to WhatsApp
                </a>
                <button
                  type="button"
                  onClick={resetChat}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 border-t border-border p-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  disabled={sending}
                  className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm focus:border-foreground focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={sending || !input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close customer care menu" : "Open customer care menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
