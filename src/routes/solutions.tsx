import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Home,
  Building2,
  Factory,
  ArrowRight,
  Check,
  ShieldCheck,
  RefreshCw,
  Cpu,
  Layers,
  Wifi,
  Mail,
  Award,
  Users,
} from "lucide-react";
import solutionsImg from "@/assets/solutions.jpg";
import heroHome from "@/assets/hero-home.jpg";
import solarPro from "@/assets/solar-pro.jpg";
import premiumInstall from "@/assets/premium-install.jpg";
import productBattery from "@/assets/product-battery.jpg";
import ecoHome from "@/assets/eco-home.jpg";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — SaneGreenEnergy" },
      {
        name: "description",
        content:
          "Residential, commercial, and industrial solar systems built for Nigerian homes and businesses.",
      },
      { property: "og:title", content: "Solar Solutions for Every Scale" },
      {
        property: "og:description",
        content: "From single homes to industrial sites — reliable solar built for any need.",
      },
      { property: "og:image", content: solutionsImg },
      { name: "twitter:image", content: solutionsImg },
    ],
  }),
  component: Solutions,
});

const tiers = [
  {
    icon: Home,
    scale: "Smaller systems",
    name: "Residential",
    desc: "Reliable solar solutions for homes to cut energy bills and power what matters most.",
    points: [
      "Lower energy costs",
      "Uninterrupted backup",
      "Modern, space-saving design",
      "Easy to install & maintain",
    ],
    image: heroHome,
    imageAlt: "Modern home with a rooftop solar array",
  },
  {
    icon: Building2,
    scale: "Medium systems",
    name: "Commercial",
    desc: "Scalable solar systems to power offices, retail spaces, and business operations.",
    points: [
      "High performance & savings",
      "Built for reliability",
      "Flexible financing",
      "Modular & scalable",
    ],
    image: solarPro,
    imageAlt: "Solar professional inspecting a commercial installation",
  },
  {
    icon: Factory,
    scale: "Larger systems",
    name: "Industrial",
    desc: "High-capacity solar systems designed for factories, warehouses, and large facilities.",
    points: [
      "Maximum power output",
      "Built to last",
      "Zero downtime operation",
      "Engineered for heavy loads",
    ],
    image: premiumInstall,
    imageAlt: "Utility-scale solar farm",
  },
];

const lfpFeatures = [
  { icon: ShieldCheck, title: "Safe & Reliable", desc: "Advanced LiFePO₄ chemistry with multi-layer protection." },
  { icon: RefreshCw, title: "Long Life", desc: "6000+ cycles with 80%+ capacity retention." },
  { icon: Cpu, title: "Smart BMS", desc: "Real-time monitoring and protection for peak efficiency." },
  { icon: Layers, title: "Flexible Design", desc: "Modular & stackable to suit your energy needs." },
  { icon: Wifi, title: "Remote Monitoring", desc: "Track and manage your system anytime, anywhere." },
];

const localConditions = [
  "Handles extreme heat & humidity",
  "Corrosion-resistant components",
  "Dust, grime & rain protection",
  "Proven performance across Nigeria",
  "Proudly supporting green energy",
];

const trustBadges = [
  { icon: ShieldCheck, label: "Engineered for Local Conditions" },
  { icon: Award, label: "Tested for Durability" },
  { icon: Users, label: "Trusted by Professionals" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
  );
}

function CheckDot() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Check className="h-3 w-3" />
    </span>
  );
}

function Solutions() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,oklch(0.42_0.1_150/0.12),transparent_70%)]" />
          <svg
            className="absolute bottom-0 right-0 hidden h-72 w-[720px] text-primary/[0.10] lg:block"
            viewBox="0 0 640 240"
            preserveAspectRatio="xMaxYMax meet"
            fill="currentColor"
          >
            <rect x="40" y="120" width="70" height="120" />
            <rect x="120" y="80" width="60" height="160" />
            <rect x="190" y="140" width="50" height="100" />
            <rect x="250" y="40" width="80" height="200" />
            <rect x="340" y="100" width="46" height="140" />
            <rect x="396" y="150" width="60" height="90" />
            <rect x="466" y="70" width="70" height="170" />
            <rect x="546" y="130" width="60" height="110" />
            <path d="M250 40l40-28 40 28z" />
            <rect x="284" y="0" width="12" height="24" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="mx-auto max-w-[1600px] px-6 pt-16 pb-20 sm:px-8 md:pt-24 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <Pill>Solutions</Pill>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Power for
              <br />
              <span className="text-primary">every scale.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              From a single home to a full industrial site — reliable solar power, sized to your needs.
            </p>
            <a
              href="#systems"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore Solutions <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* SYSTEM TIERS */}
      <section id="systems" className="mx-auto max-w-[1600px] scroll-mt-24 px-6 pb-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <t.icon className="h-6 w-6" />
              </div>
              <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                {t.scale}
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{t.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              <ul className="mt-6 space-y-3">
                {t.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm">
                    <CheckDot />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <Link
                  to="/find-installer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-70"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </Link>
                <img
                  src={t.image}
                  alt={t.imageAlt}
                  loading="lazy"
                  className="h-20 w-36 shrink-0 rounded-xl object-cover"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* LFP ENERGY STORAGE PACK */}
      <section className="mx-auto max-w-[1600px] px-6 pt-16 pb-8 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Pill>Featured Storage Technology</Pill>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              LFP Energy Storage Pack
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              A versatile, all-in-one energy solution built with advanced LiFePO₄ battery technology for
              maximum safety, longer lifespan, and reliable performance.
            </p>
            <ul className="mt-8 space-y-5">
              {lfpFeatures.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-foreground">{f.title}</span>
                    <span className="text-muted-foreground"> — {f.desc}</span>
                  </p>
                </li>
              ))}
            </ul>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Learn more about LFP Storage Pack <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img
              src={productBattery}
              alt="LFP Energy Storage Pack — stackable lithium iron phosphate battery module"
              width={1280}
              height={1280}
              loading="lazy"
              className="aspect-square w-full object-cover md:aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* BUILT FOR NIGERIAN CONDITIONS */}
      <section className="mx-auto max-w-[1600px] px-6 py-16 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl shadow-card">
            <img
              src={ecoHome}
              alt="Solar-powered home in the Nigerian countryside at sunset"
              loading="lazy"
              className="h-full min-h-[400px] w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 sm:inset-x-6 sm:bottom-6 sm:gap-3">
              {trustBadges.map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl border border-white/20 bg-background/85 p-3 text-center backdrop-blur"
                >
                  <b.icon className="mx-auto h-5 w-5 text-primary" />
                  <div className="mt-1.5 text-[11px] font-medium leading-tight">{b.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Pill>Built for Nigerian Conditions</Pill>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Built for Nigerian conditions.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Our systems are engineered to perform in the toughest environments, delivering reliable
              power when you need it most.
            </p>
            <ul className="mt-6 space-y-3">
              {localConditions.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm">
                  <CheckDot />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-[1600px] px-6 pb-24 sm:px-8">
        <div className="rounded-3xl bg-[oklch(0.22_0.03_150)] px-8 py-10 sm:px-12 sm:py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <Mail className="h-5 w-5" />
              </span>
              <p className="text-lg font-semibold text-white">
                Stay updated with the latest tips, offers and energy news.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}

function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="text-sm font-medium text-white md:text-right">Thanks — you're subscribed.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex w-full items-center gap-2 rounded-full bg-white/10 p-1.5 pl-5 md:max-w-md"
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[oklch(0.22_0.03_150)] transition-opacity hover:opacity-90"
      >
        <ArrowRight className="h-3.5 w-3.5" /> Subscribe
      </button>
    </form>
  );
}
