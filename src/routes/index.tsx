import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Star, Truck, ShieldCheck, Zap, Sun, Battery, Cpu, Plug, Sparkles, ArrowRight } from "lucide-react";
import heroGrid from "@/assets/hero-grid.jpg";
import productPanel from "@/assets/product-panel.jpg";
import productBattery from "@/assets/product-battery.jpg";
import productInverter from "@/assets/product-inverter.jpg";
import productCharger from "@/assets/product-charger.jpg";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SeeingGreen — Shop Solar Panels, Batteries & EV Chargers" },
      { name: "description", content: "The marketplace for clean energy. Shop solar panels, home batteries, inverters, and EV chargers with free shipping and 25-year warranties." },
      { property: "og:title", content: "SeeingGreen — Shop Solar Panels, Batteries & EV Chargers" },
      { property: "og:description", content: "The marketplace for clean energy. Free shipping, expert install, 25-year warranty." },
      { property: "og:image", content: heroGrid },
      { name: "twitter:image", content: heroGrid },
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

const deals = [
  { name: "Helios X9 Panel", price: 289, oldPrice: 349, off: 17, img: productPanel },
  { name: "PowerWall Quantum", price: 8499, oldPrice: 9999, off: 15, img: productBattery },
  { name: "FluxCore Inverter", price: 1899, oldPrice: 2199, off: 14, img: productInverter },
  { name: "VoltLink Charger", price: 749, oldPrice: 899, off: 17, img: productCharger },
];

function Home() {
  const { addItem } = useCart();
  return (
    <>
      {/* HERO + SEARCH */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <img
          src={heroGrid}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 font-mono text-xs uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Free shipping on orders over $99
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
              The marketplace
              <br />
              for <span className="text-primary text-glow">clean energy</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Shop thousands of vetted solar panels, batteries, inverters, and EV chargers — delivered fast, installed by certified pros.
            </p>

            {/* SEARCH BAR */}
            <div className="mt-10 flex w-full max-w-2xl items-stretch rounded-md border border-glow bg-card/80 backdrop-blur shadow-glow-sm overflow-hidden">
              <select className="hidden sm:block bg-secondary/60 px-4 font-mono text-xs uppercase tracking-widest text-muted-foreground border-r border-border/50 focus:outline-none">
                <option>All</option>
                <option>Panels</option>
                <option>Batteries</option>
                <option>Inverters</option>
                <option>Chargers</option>
              </select>
              <input
                type="text"
                placeholder="Search 10,000+ products..."
                className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button className="flex items-center gap-2 bg-primary px-5 text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>

            {/* TRUST STRIP */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free Shipping $99+</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> 25-Year Warranty</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> 4.9 / 5 (12k reviews)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary">// Shop by category</span>
              <h2 className="mt-1 font-display text-2xl md:text-3xl font-bold">Browse the catalog</h2>
            </div>
            <Link to="/solutions" className="hidden sm:inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-primary hover:text-primary/80">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c) => (
              <button
                key={c.label}
                className="group relative flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card p-6 hover:border-primary/50 hover:shadow-glow-sm transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <c.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-display text-sm font-semibold">{c.label}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.count} items</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// Featured</span>
            <h2 className="mt-1 font-display text-3xl md:text-4xl font-bold">Top picks this week</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col rounded-xl border border-border/50 bg-card overflow-hidden hover:border-primary/50 hover:shadow-glow-sm transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-background">
                <img
                  src={p.img}
                  alt={p.name}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2 py-1 rounded bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest">
                  {p.badge}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-display text-sm font-semibold leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-foreground font-medium">{p.rating}</span>
                  <span>({p.reviews.toLocaleString()})</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-xl font-bold text-primary">${p.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">${p.oldPrice.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, img: p.img })}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* DEALS STRIP */}
      <section className="bg-card/30 border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary">// Lightning deals</span>
              <h2 className="mt-1 font-display text-2xl md:text-3xl font-bold">
                Save up to <span className="text-primary text-glow">40%</span> — ends in 04:21:33
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {deals.map((d) => (
              <div key={d.name} className="group rounded-xl bg-card border border-border/50 p-4 hover:border-primary/50 transition-colors">
                <div className="aspect-square rounded-lg overflow-hidden bg-background mb-3">
                  <img src={d.img} alt={d.name} width={768} height={768} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-primary">−{d.off}% off</div>
                <div className="mt-1 font-display text-sm font-semibold line-clamp-1">{d.name}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-bold text-primary">${d.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through">${d.oldPrice.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Truck, t: "Fast, free shipping", d: "Most orders ship in 24h. Free over $99." },
            { icon: ShieldCheck, t: "25-year warranty", d: "Industry-leading coverage on every panel." },
            { icon: Zap, t: "Certified install", d: "Vetted local pros, fixed transparent pricing." },
          ].map((v) => (
            <div key={v.t} className="rounded-xl border border-border/50 bg-card p-8">
              <v.icon className="h-8 w-8 text-primary mb-4" />
              <div className="font-display text-lg font-semibold">{v.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{v.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-glow bg-gradient-to-br from-card to-background p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Need a full system? <span className="text-primary text-glow">We'll design it.</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              Get a free custom proposal in 48 hours — panels, batteries, install, financing.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-mono text-sm uppercase tracking-widest text-primary-foreground shadow-glow animate-pulse-glow"
            >
              Get Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
