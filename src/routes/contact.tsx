import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SaneGreenEnergy" },
      { name: "description", content: "Get a custom solar proposal in under 48 hours. Talk to our energy engineers." },
      { property: "og:title", content: "Contact SaneGreenEnergy" },
      { property: "og:description", content: "Get a custom solar proposal in under 48 hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-8 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Let's talk power.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Tell us about your site. We'll respond within 24 hours with a no-obligation proposal.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid lg:grid-cols-3 gap-12">
        <div className="space-y-8">
          {[
            { icon: Mail, label: "Email", value: "hello@sanegreenenergy.com" },
            { icon: Phone, label: "Phone", value: "+234 801 234 5678" },
            { icon: MapPin, label: "HQ", value: "Victoria Island, Lagos, Nigeria" },
          ].map((c) => (
            <div key={c.label} className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-display text-lg">{c.value}</div>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Response time</div>
            <div className="font-display text-3xl font-bold">{"<"} 24 hrs</div>
            <p className="mt-2 text-sm text-muted-foreground">Real engineers, real fast.</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="lg:col-span-2 rounded-3xl border border-border bg-card p-8 md:p-12 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Company" name="company" />
            <Field label="Project size" name="size" placeholder="e.g. 5 kW" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Tell us about your project
            </label>
            <textarea
              required
              rows={5}
              className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:border-foreground focus:outline-none transition-all resize-none"
              placeholder="Site location, energy goals, timeline..."
            />
          </div>
          <button
            type="submit"
            disabled={sent}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {sent ? "Message sent ✓" : (<>Send message <Send className="h-4 w-4" /></>)}
          </button>
          {sent && (
            <p className="text-xs text-muted-foreground">
              Message received. We'll be in touch within 24h.
            </p>
          )}
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:border-foreground focus:outline-none transition-all"
      />
    </div>
  );
}
