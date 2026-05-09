import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Star, Truck, ShieldCheck, Zap, Sun, Battery, Cpu, Plug, Sparkles, ArrowRight, Check, ArrowUpRight } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import teamEngineers from "@/assets/team-engineers.jpg";
import ecoHome from "@/assets/eco-home.jpg";
import premiumInstall from "@/assets/premium-install.jpg";
import solarPro from "@/assets/solar-pro.jpg";
import productPanel from "@/assets/product-panel.jpg";
import productBattery from "@/assets/product-battery.jpg";
import productInverter from "@/assets/product-inverter.jpg";
import productCharger from "@/assets/product-charger.jpg";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SeeingGreen — Sun-Powered Solutions for Every Home" },
      { name: "description", content: "Affordable, efficient, and eco-friendly energy tailored for your home. Solar panels, batteries, inverters and EV chargers — delivered fast." },
      { property: "og:title", content: "SeeingGreen — Sun-Powered Solutions for Every Home" },
      { property: "og:description", content: "Affordable, efficient, and eco-friendly energy tailored for your home." },
      { property: "og:image", content: heroHome },
      { name: "twitter:image", content: heroHome },
    ],
  }),
  component: Home,
});

const categories = [
  { icon: Sun, label: "Solar Panels", count: "120+" },
  { icon: Battery, label: "Batteries", count: "48" },
  { icon: Cpu, label: "Inverters", count: "36" },
  { icon: Plug, label: "EV Chargers", count: "24" },
  { icon: Zap, label: "Generators", count: "18" },
  { icon: Sparkles, label: "Smart Home", count: "92" },
];

const products = [
  { id: 1, name: "Helios X9 Mono Panel 450W", price: 289, oldPrice: 349, rating: 4.8, reviews: 1240, badge: "Best Seller", img: productPanel },
  { id: 2, name: "PowerWall Quantum 13.5kWh", price: 8499, oldPrice: 9999, rating: 4.9, reviews: 562, badge: "−15%", img: productBattery },
  { id: 3, name: "FluxCore Hybrid Inverter 10kW", price: 1899, oldPrice: 2199, rating: 4.7, reviews: 318, badge: "New", img: productInverter },
  { id: 4, name: "VoltLink EV Charger 22kW", price: 749, oldPrice: 899, rating: 4.8, reviews: 980, badge: "Prime Ship", img: productCharger },
];

const specialties = ["Sustainable Freedom", "Reduce Power Bills", "Property Value", "Green Energy"];
const brands = ["Upwork", "Dropbox", "Booking.com", "Shopify", "Medium"];

const trustReasons = [
  { title: "Premium Installations", desc: "We deliver top-quality solar installations using advanced technology and skilled expertise. Trust us for reliable and long-lasting energy solutions.", img: premiumInstall },
  { title: "Solar Energy Professional", desc: "Our solar energy professionals bring expertise and precision to every project. From consultation to installation, seamless and efficient.", img: solarPro },
];

function Home() {
  const { addItem } = useCart();
  return (
    <div className="bg-background">
      {/* HERO — big rounded image card */}
      <section className="mx-auto max-w-7xl px-6 pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-card"
        >
          <img
            src={heroHome}
            alt="Solar panels powering a modern home"
            width={1920}
            height={1080}
            className="h-[460px] md:h-[600px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

          {/* Headline */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-background max-w-4xl leading-[1.05]">
              Sun-Powered Solutions
              <br />for Every Home
            </h1>
          </div>

          {/* Bottom-left explore badge */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <button className="group flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-background text-foreground shadow-card hover:scale-105 transition-transform">
              <span className="font-display text-xs font-semibold uppercase tracking-widest">Explore</span>
            </button>
          </div>

          {/* Bottom-right tagline */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 max-w-sm text-right">
            <p className="text-sm md:text-base text-background/90 leading-relaxed">
              Affordable, efficient, and eco-friendly energy tailored for your home. Start your solar journey today.
            </p>
          </div>
        </motion.div>

        {/* Search row under hero */}
        <div className="mt-6 flex w-full items-stretch rounded-full border border-border bg-card shadow-soft overflow-hidden">
          <div className="hidden sm:flex items-center gap-2 px-5 text-xs uppercase tracking-widest text-muted-foreground border-r border-border">
            <Sun className="h-4 w-4" /> All categories
          </div>
          <input
            type="text"
            placeholder="Search panels, batteries, EV chargers…"
            className="flex-1 bg-transparent px-5 py-4 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <button className="m-1.5 inline-flex items-center gap-2 rounded-full bg-foreground px-6 text-sm text-background hover:opacity-90 transition-opacity">
            <Search className="h-4 w-4" /> Search
          </button>
        </div>
      </section>

      {/* SUN-POWERED SOLUTIONS — 2-col editorial */}
      <section className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            Sun-Powered Solutions
            <br />for Every Home
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed pt-2">
            Making solar energy accessible and effortless. Because every home deserves the power of the sun. Power your home with the energy of the sun. Simple, efficient, and eco-friendly solutions. Transform your home with renewable energy. Enjoy savings and sustainability every day.
          </p>
        </div>

        {/* Specialty + image bento */}
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="overflow-hidden rounded-3xl bg-card border border-border shadow-soft">
            <img src={teamEngineers} alt="Two engineers reviewing a solar installation plan on a tablet" width={1200} height={900} loading="lazy" className="h-72 md:h-[420px] w-full object-cover" />
          </div>
          <div className="bento-card p-8 md:p-10 flex flex-col">
            <h3 className="font-display text-2xl font-semibold">Our Specialty</h3>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {specialties.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <div className="overflow-hidden rounded-2xl">
                <img src={ecoHome} alt="Modern eco-friendly home with solar at sunset" width={1200} height={700} loading="lazy" className="h-56 md:h-64 w-full object-cover" />
              </div>
              <div className="mt-4 flex justify-end">
                <Link to="/about" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs uppercase tracking-widest text-background hover:opacity-90">
                  Explore more about us <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Brand strip */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-y-6 gap-x-10 border-y border-border py-8">
          {brands.map((b) => (
            <span key={b} className="font-display text-lg md:text-xl font-semibold text-muted-foreground/70 tracking-tight">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORIES — clean bento */}
      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Shop by category</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">Browse the catalog</h2>
          </div>
          <Link to="/solutions" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-foreground hover:opacity-70">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <button
              key={c.label}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary group-hover:bg-foreground group-hover:text-background transition-colors">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold">{c.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.count} items</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* TOP REASONS TO TRUST US */}
      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">Top Reasons to Trust Us</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A proven track record of customer satisfaction and exceptional service. We provide innovative, eco-friendly energy solutions that meet your unique needs.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {trustReasons.map((r) => (
            <article key={r.title} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <img src={r.img} alt={r.title} width={1200} height={800} loading="lazy" className="h-64 w-full object-cover" />
              <div className="p-7">
                <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                <Link to="/solutions" className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs uppercase tracking-widest text-background hover:opacity-90">
                  View More <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">Top picks this week</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-foreground hover:opacity-70">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img src={p.img} alt={p.name} width={768} height={768} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/95 text-foreground text-[10px] uppercase tracking-widest font-semibold">
                  {p.badge}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-display text-sm font-semibold leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-foreground text-foreground" />
                  <span className="text-foreground font-medium">{p.rating}</span>
                  <span>({p.reviews.toLocaleString()})</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-lg font-bold">${p.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">${p.oldPrice.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, img: p.img })}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-3 py-2.5 text-[11px] uppercase tracking-widest text-background hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Truck, t: "Fast, free shipping", d: "Most orders ship in 24h. Free over $99." },
            { icon: ShieldCheck, t: "25-year warranty", d: "Industry-leading coverage on every panel." },
            { icon: Zap, t: "Certified install", d: "Vetted local pros, fixed transparent pricing." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-border bg-card p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <v.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 font-display text-lg font-semibold">{v.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{v.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-12 md:p-20 text-center text-background">
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
            Need a full system? We'll design it.
          </h2>
          <p className="mt-5 text-background/70 max-w-xl mx-auto">
            Get a free custom proposal in 48 hours — panels, batteries, install, financing.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm uppercase tracking-widest text-foreground hover:opacity-90"
          >
            Get Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
