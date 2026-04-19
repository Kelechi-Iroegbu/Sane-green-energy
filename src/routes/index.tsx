import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Sun, Battery, Cpu, Globe2, ShieldCheck } from "lucide-react";
import heroGrid from "@/assets/hero-grid.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SeeingGreen Energy — Solar Power, Reimagined" },
      { name: "description", content: "AI-driven solar infrastructure. Intelligent panels, smart storage, and grid-ready energy systems for homes and businesses." },
      { property: "og:title", content: "SeeingGreen Energy — Solar Power, Reimagined" },
      { property: "og:description", content: "AI-driven solar infrastructure for the next generation." },
      { property: "og:image", content: heroGrid },
      { name: "twitter:image", content: heroGrid },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "12.4 MW", label: "Deployed capacity" },
  { value: "98.7%", label: "Uptime SLA" },
  { value: "240k+", label: "Tons CO₂ offset" },
  { value: "24/7", label: "AI monitoring" },
];

const features = [
  { icon: Sun, title: "Smart Panels", desc: "Self-optimizing photovoltaic arrays with embedded ML." },
  { icon: Battery, title: "Quantum Storage", desc: "Solid-state batteries with adaptive load balancing." },
  { icon: Cpu, title: "Edge AI Grid", desc: "On-device intelligence routes power where it matters." },
  { icon: Globe2, title: "Carbon Negative", desc: "Every install removes more CO₂ than it produces." },
  { icon: ShieldCheck, title: "Grid Hardened", desc: "Cyber-secure inverters with zero-trust architecture." },
  { icon: Zap, title: "Instant Switch", desc: "Seamless failover from grid to solar in <2ms." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <img
          src={heroGrid}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />

        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 md:pt-32 md:pb-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 font-mono text-xs uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now powering 12,000+ sites
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]">
              Solar power,
              <br />
              <span className="text-primary text-glow">re-engineered</span>
              <br />
              for tomorrow.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              SeeingGreen builds intelligent solar systems that learn your energy patterns,
              optimize themselves in real time, and turn rooftops into autonomous power stations.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm uppercase tracking-widest text-primary-foreground shadow-glow hover:shadow-glow transition-all"
              >
                Explore Systems
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md border border-primary/30 px-6 py-3 font-mono text-sm uppercase tracking-widest text-primary hover:bg-primary/10"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-primary text-glow">{s.value}</div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">// Capabilities</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Built like the grid of <span className="text-primary">2050</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50 rounded-xl overflow-hidden border border-border/50">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-card p-8 hover:bg-card/80 transition-colors"
            >
              <f.icon className="h-8 w-8 text-primary mb-6" />
              <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-glow bg-gradient-to-br from-card to-background p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              Ready to <span className="text-primary text-glow">go green</span>?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Join the energy revolution. Get a custom proposal in under 48 hours.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-mono text-sm uppercase tracking-widest text-primary-foreground shadow-glow animate-pulse-glow"
            >
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
