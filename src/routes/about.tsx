import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, BadgePercent, Wrench, Leaf, Mail } from "lucide-react";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — SaneGreenEnergy" },
      { name: "description", content: "We're engineers and installers on a mission to make reliable solar power the default for Nigerian homes and businesses." },
      { property: "og:title", content: "About SaneGreenEnergy" },
      { property: "og:description", content: "On a mission to make reliable solar power the default in Nigeria." },
      { property: "og:image", content: aboutImg },
      { name: "twitter:image", content: aboutImg },
    ],
  }),
  component: About,
});

const stats = [
  { value: "3,200+", label: "Homes & businesses powered" },
  { value: "24", label: "States with certified installers" },
  { value: "10+", label: "Years of combined field experience" },
  { value: "25 yr", label: "Maximum warranty coverage" },
];

const values = [
  { icon: ShieldCheck, title: "Built for local conditions", desc: "Every system is sized for your actual usage and the realities of grid power in Nigeria — not a generic template." },
  { icon: BadgePercent, title: "Transparent pricing", desc: "Clear quotes, no hidden costs. You know exactly what you're paying for before you commit." },
  { icon: Wrench, title: "Long-term support", desc: "Warranties that last, and local technicians who'll actually pick up the phone." },
  { icon: Leaf, title: "Sustainability first", desc: "Every install displaces diesel — for us, that's the point, not a marketing line." },
];

const team = [
  { name: "Chidi Okonkwo", role: "Co-Founder & CEO", bio: "10+ years in renewable energy project delivery across West Africa.", email: "chidi@sanegreenenergy.com" },
  { name: "Amina Bello", role: "Chief Engineer", bio: "Electrical engineer specializing in solar system design and battery storage.", email: "amina@sanegreenenergy.com" },
  { name: "Tunde Adeyemi", role: "Head of Installations", bio: "Leads certified installer teams across Lagos, Abuja, and Port Harcourt.", email: "tunde@sanegreenenergy.com" },
  { name: "Ifeoma Nwosu", role: "Head of Customer Success", bio: "Makes sure every install is followed up with real support, not just a warranty card.", email: "ifeoma@sanegreenenergy.com" },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-8 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">About Us</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
            We're done watching Nigeria run on diesel.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            SaneGreenEnergy designs, sells, and installs solar systems that keep homes and businesses running through outages — engineered for the grid we actually have, not the one on a spec sheet.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/find-installer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="overflow-hidden rounded-3xl bg-card border border-border shadow-soft order-2 md:order-1">
          <img
            src={aboutImg}
            alt="SaneGreenEnergy engineers reviewing a solar installation"
            width={1280}
            height={960}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our story</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Started by people tired of the generator.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            SaneGreenEnergy started with a simple frustration: solar in Nigeria was either too expensive, badly installed, or both. We brought together engineers who'd rather size a system properly than oversell one, and installers who stand behind their own work.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Today that means transparent Naira pricing, systems built around your actual usage, and a team that's still reachable long after the install van has left.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="font-display text-3xl md:text-4xl font-bold">{s.value}</div>
              <div className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Principles</span>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight mb-12">How we operate.</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-5 rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-6 pb-24 scroll-mt-24">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The people behind it</span>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight mb-12">
          The team you'll actually talk to.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6 hover:shadow-card transition-all"
            >
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-bold">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{p.name}</h3>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{p.role}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.bio}</p>
              <a
                href={`mailto:${p.email}`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5" /> {p.email}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[28px] border border-border bg-card p-10 text-center md:p-16">
          <h2 className="font-display text-2xl md:text-4xl font-semibold tracking-tight">
            Ready to stop paying for diesel?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Tell us about your home or business and we'll size a system around what you actually use.
          </p>
          <Link
            to="/find-installer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
