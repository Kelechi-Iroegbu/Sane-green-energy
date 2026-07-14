import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SaneGreenEnergy" },
      { name: "description", content: "We're engineers and installers on a mission to make reliable solar power the default for Nigerian homes and businesses." },
      { property: "og:title", content: "About SaneGreenEnergy" },
      { property: "og:description", content: "On a mission to make reliable solar power the default in Nigeria." },
      { property: "og:image", content: aboutImg },
      { name: "twitter:image", content: aboutImg },
    ],
  }),
  component: About,
});

const values = [
  { num: "01", title: "Built for local conditions", desc: "Every system is sized for your actual usage and the realities of grid power in Nigeria — not a generic template." },
  { num: "02", title: "Transparent pricing", desc: "Clear quotes, no hidden costs. You know exactly what you're paying for before you commit." },
  { num: "03", title: "Long-term support", desc: "Warranties that last, and local technicians who'll actually pick up the phone." },
];

const team = [
  { name: "Chidi Okonkwo", role: "Co-Founder & CEO", bio: "10+ years in renewable energy project delivery across West Africa." },
  { name: "Amina Bello", role: "Chief Engineer", bio: "Electrical engineer specializing in solar system design and battery storage." },
  { name: "Tunde Adeyemi", role: "Head of Installations", bio: "Leads certified installer teams across Lagos, Abuja, and Port Harcourt." },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-8 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">About</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
            Reliable power, made for Nigerian homes.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Founded to make solar power practical and affordable in Nigeria. We design, sell, and install systems that keep homes and businesses running through outages — not just brochures.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="overflow-hidden rounded-3xl bg-card border border-border shadow-soft">
          <img
            src={aboutImg}
            alt="SaneGreenEnergy engineers reviewing a solar installation"
            width={1280}
            height={960}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our mission</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Make solar the obvious choice.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Power outages cost Nigerian households and businesses time and money every day. We believe switching to solar shouldn't be complicated or overpriced — it should be the easy, obvious upgrade for anyone tired of the generator.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Principles</span>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight mb-12">How we operate.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="font-display text-4xl font-bold text-muted-foreground/30">{v.num}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-6 pb-24 scroll-mt-24">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Team</span>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight mb-12">
          Built by people who install it themselves.
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {team.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-8 hover:shadow-card transition-all">
              <div className="h-24 w-24 mx-auto rounded-full bg-primary text-primary-foreground mb-6 flex items-center justify-center font-display text-2xl font-bold">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="text-center font-display text-lg font-semibold">{p.name}</h3>
              <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mt-1">{p.role}</div>
              <p className="mt-4 text-sm text-muted-foreground text-center leading-relaxed">{p.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
