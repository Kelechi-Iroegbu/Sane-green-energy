import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, Building2, Factory, ArrowRight, Check } from "lucide-react";
import solutionsImg from "@/assets/solutions.jpg";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — SeeingGreen Energy" },
      { name: "description", content: "Residential, commercial, and industrial solar systems engineered with AI-driven optimization." },
      { property: "og:title", content: "Solar Solutions for Every Scale" },
      { property: "og:description", content: "From rooftops to utility-scale grids — intelligent solar built for any need." },
      { property: "og:image", content: solutionsImg },
      { name: "twitter:image", content: solutionsImg },
    ],
  }),
  component: Solutions,
});

const tiers = [
  {
    icon: Home,
    name: "Residential",
    tag: "Homes & Estates",
    range: "5–20 kW",
    desc: "Whisper-quiet rooftop systems with home-battery integration and a mobile control suite.",
    features: ["Smart roof mapping", "Tesla-grade battery", "App + voice control", "10-yr workmanship"],
  },
  {
    icon: Building2,
    name: "Commercial",
    tag: "Offices & Retail",
    range: "20 kW – 1 MW",
    desc: "Carport, rooftop, and façade systems engineered to crush utility bills and ESG targets.",
    features: ["Demand-charge AI", "Net-metering optimization", "ESG reporting suite", "Zero-down PPA"],
  },
  {
    icon: Factory,
    name: "Industrial",
    tag: "Plants & Utilities",
    range: "1 MW+",
    desc: "Utility-scale arrays with grid-forming inverters and microgrid orchestration.",
    features: ["Grid-forming tech", "Microgrid controller", "SCADA integration", "24/7 NOC"],
  },
];

function Solutions() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// Solutions</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter">
              Power for <span className="text-primary text-glow">every scale</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              From a single rooftop to a 100-megawatt farm — the same intelligent platform, scaled to your ambitions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-xl border border-border/50 bg-card p-8 hover:border-glow transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                  <t.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-mono text-xs text-primary">{t.range}</span>
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{t.tag}</div>
              <h3 className="mt-2 font-display text-3xl font-bold">{t.name}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              <ul className="mt-6 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary group-hover:gap-3 transition-all"
              >
                Get Quote <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={solutionsImg}
            alt="Glowing futuristic solar panel close-up"
            width={1280}
            height={960}
            loading="lazy"
            className="rounded-xl border border-glow shadow-glow"
          />
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// The Tech</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Photons in.
              <br />
              <span className="text-primary text-glow">Intelligence out.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Every panel ships with an embedded neural processor that monitors irradiance, temperature, and microcracks in real time. Combined with our cloud-based digital twin, your system gets smarter every day.
            </p>
            <ul className="mt-6 space-y-3 font-mono text-sm">
              <li className="flex gap-3"><span className="text-primary">→</span> 24.6% module efficiency (industry-leading)</li>
              <li className="flex gap-3"><span className="text-primary">→</span> Bifacial gain up to 18%</li>
              <li className="flex gap-3"><span className="text-primary">→</span> 30-year linear power warranty</li>
              <li className="flex gap-3"><span className="text-primary">→</span> Recyclable closed-loop materials</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
