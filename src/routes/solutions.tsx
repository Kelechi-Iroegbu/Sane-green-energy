import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, Building2, Factory, ArrowRight, Check } from "lucide-react";
import solutionsImg from "@/assets/solutions.jpg";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — SaneGreenEnergy" },
      { name: "description", content: "Residential, commercial, and industrial solar systems built for Nigerian homes and businesses." },
      { property: "og:title", content: "Solar Solutions for Every Scale" },
      { property: "og:description", content: "From single homes to industrial sites — reliable solar built for any need." },
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
    range: "1–10 kW",
    desc: "Reliable rooftop systems with battery backup, sized to keep your home powered through any outage.",
    features: ["Free site survey", "Lithium battery backup", "Mobile monitoring app", "5-yr workmanship warranty"],
  },
  {
    icon: Building2,
    name: "Commercial",
    tag: "Offices & Retail",
    range: "10 kW – 500 kW",
    desc: "Rooftop and hybrid systems engineered to cut diesel generator costs and keep business running.",
    features: ["Diesel-to-solar transition plan", "Hybrid inverter + battery", "Flexible financing", "Priority support"],
  },
  {
    icon: Factory,
    name: "Industrial",
    tag: "Plants & Estates",
    range: "500 kW+",
    desc: "Utility-scale arrays and hybrid power plants for factories, estates, and institutions.",
    features: ["Custom engineering", "Grid-tie or off-grid", "Maintenance contracts", "24/7 remote monitoring"],
  },
];

function Solutions() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-8 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Solutions</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Power for every scale.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            From a single home to a full industrial site — reliable solar power, sized to your needs.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-card p-8 hover:shadow-card transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <t.icon className="h-6 w-6" />
                </div>
                <span className="text-xs text-muted-foreground">{t.range}</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.tag}</div>
              <h3 className="mt-2 font-display text-2xl font-semibold">{t.name}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              <ul className="mt-6 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Get Quote <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-3xl bg-card border border-border shadow-soft">
            <img
              src={solutionsImg}
              alt="Solar panel installation"
              width={1280}
              height={960}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why SaneGreenEnergy</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Built for Nigerian conditions.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Frequent outages and unreliable grid power call for systems built to handle it. Every install is sized around your actual usage, with battery backup that carries you through extended outages — not just brief interruptions.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3"><span>→</span> Locally stocked replacement parts</li>
              <li className="flex gap-3"><span>→</span> Certified installers in every major state</li>
              <li className="flex gap-3"><span>→</span> 5–25 year warranties depending on system</li>
              <li className="flex gap-3"><span>→</span> Flexible payment plans available</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
