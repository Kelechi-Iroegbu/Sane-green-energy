import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SeeingGreen Energy" },
      { name: "description", content: "We're engineers, scientists, and operators on a mission to make clean energy the default — not the exception." },
      { property: "og:title", content: "About SeeingGreen Energy" },
      { property: "og:description", content: "On a mission to make clean energy the default." },
      { property: "og:image", content: aboutImg },
      { name: "twitter:image", content: aboutImg },
    ],
  }),
  component: About,
});

const values = [
  { num: "01", title: "Engineered, not assembled", desc: "Every system is custom-modeled for your site. No cookie-cutter installs." },
  { num: "02", title: "Radically transparent", desc: "Live dashboards. Open performance data. No greenwashing — ever." },
  { num: "03", title: "Long-term aligned", desc: "30-year warranties because we plan to be around in 30 years." },
];

const team = [
  { name: "Aria Chen", role: "Founder & CEO", bio: "Ex-Tesla Energy. Built grid-scale storage in 14 countries." },
  { name: "Marcus Okafor", role: "Chief Engineer", bio: "PhD photovoltaics, MIT. Holds 12 patents in panel optimization." },
  { name: "Lena Vasquez", role: "Head of Operations", bio: "Scaled three solar startups from seed to series C." },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// About</span>
            <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl">
              We see a planet that
              <br />
              <span className="text-primary text-glow">runs on sunlight</span>.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Founded in 2021 by climate engineers who got tired of waiting. Today we deploy across three continents, with one mission: make clean energy the obvious choice.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={aboutImg}
          alt="Engineers analyzing a green holographic globe"
          width={1280}
          height={960}
          loading="lazy"
          className="rounded-xl border border-glow shadow-glow"
        />
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-primary">// Our mission</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Decarbonize. <br />
            <span className="text-primary">Profitably.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We believe the energy transition isn't a sacrifice — it's the biggest economic opportunity of our generation. Our job is to make solar so smart, so reliable, and so beautiful that switching becomes inevitable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">// Principles</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight mb-16">How we operate.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border/50 bg-card p-8"
            >
              <div className="font-mono text-5xl font-bold text-primary/30">{v.num}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">// Team</span>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Built by people who <span className="text-primary">ship</span>.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((p) => (
            <div key={p.name} className="rounded-xl border border-border/50 bg-card p-8 hover:border-glow transition-all">
              <div className="h-32 w-32 mx-auto rounded-full bg-gradient-neon shadow-glow-sm mb-6 flex items-center justify-center font-display text-3xl font-bold text-primary-foreground">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="text-center font-display text-xl font-semibold">{p.name}</h3>
              <div className="text-center font-mono text-xs uppercase tracking-widest text-primary mt-1">{p.role}</div>
              <p className="mt-4 text-sm text-muted-foreground text-center leading-relaxed">{p.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
