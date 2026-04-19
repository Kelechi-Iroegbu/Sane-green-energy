import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SeeingGreen Energy" },
      { name: "description", content: "Get a custom solar proposal in under 48 hours. Talk to our energy engineers." },
      { property: "og:title", content: "Contact SeeingGreen Energy" },
      { property: "og:description", content: "Get a custom solar proposal in under 48 hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// Contact</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter">
              Let's <span className="text-primary text-glow">talk power</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Tell us about your site. We'll respond within 24 hours with a no-obligation proposal.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-3 gap-12">
        <div className="space-y-8">
          {[
            { icon: Mail, label: "Email", value: "hello@seeinggreen.energy" },
            { icon: Phone, label: "Phone", value: "+1 (415) 555-0142" },
            { icon: MapPin, label: "HQ", value: "350 Mission St, San Francisco, CA" },
          ].map((c) => (
            <div key={c.label} className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-display text-lg">{c.value}</div>
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-glow p-6 bg-card/50">
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">// Response time</div>
            <div className="font-display text-3xl font-bold">{"<"} 24 hrs</div>
            <p className="mt-2 text-sm text-muted-foreground">Real engineers, real fast.</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="lg:col-span-2 rounded-xl border border-border/50 bg-card p-8 md:p-12 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Company" name="company" />
            <Field label="Project size" name="size" placeholder="e.g. 50 kW" />
          </div>
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Tell us about your project
            </label>
            <textarea
              required
              rows={5}
              className="w-full rounded-md bg-background border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:shadow-glow-sm transition-all resize-none"
              placeholder="Site location, energy goals, timeline..."
            />
          </div>
          <button
            type="submit"
            disabled={sent}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3 font-mono text-sm uppercase tracking-widest text-primary-foreground shadow-glow-sm hover:shadow-glow transition-all disabled:opacity-60"
          >
            {sent ? "Message sent ✓" : (<>Send message <Send className="h-4 w-4" /></>)}
          </button>
          {sent && (
            <p className="font-mono text-xs text-primary">
              // Transmission received. We'll be in touch within 24h.
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
      <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md bg-background border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:shadow-glow-sm transition-all"
      />
    </div>
  );
}
