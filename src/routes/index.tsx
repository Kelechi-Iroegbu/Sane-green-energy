import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Menu,
  Star,
  Zap,
  Sun,
  Battery,
  Cpu,
  Plug,
  Sparkles,
  ArrowRight,
  Leaf,
  Heart,
  User,
  Mail,
  Phone,
  MapPin,
  Search,
  ShieldCheck,
  BadgePercent,
  Wrench,
  ListChecks,
  Quote,
} from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import teamEngineers from "@/assets/team-engineers.jpg";
import premiumInstall from "@/assets/premium-install.jpg";
import productPanel from "@/assets/product-panel.jpg";
import productBattery from "@/assets/product-battery.jpg";
import productInverter from "@/assets/product-inverter.jpg";
import productCharger from "@/assets/product-charger.jpg";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/SocialIcons";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SaneGreenEnergy — Find Your Perfect Solar System" },
      { name: "description", content: "Nigeria's solar marketplace. Shop panels, batteries, inverters and EV chargers, or get a free custom install quote in 48 hours." },
      { property: "og:title", content: "SaneGreenEnergy — Find Your Perfect Solar System" },
      { property: "og:description", content: "Affordable, efficient, and eco-friendly energy tailored for your home." },
      { property: "og:image", content: heroHome },
      { name: "twitter:image", content: heroHome },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Home,
});

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Products", to: "/products" as const },
  { label: "Solutions", to: "/solutions" as const },
  { label: "About", to: "/about" as const },
  { label: "Find an Installer", to: "/find-installer" as const },
];

const categories = [
  { icon: Sun, label: "Solar Panels", count: "120+" },
  { icon: Battery, label: "Batteries", count: "48" },
  { icon: Cpu, label: "Inverters", count: "36" },
  { icon: Plug, label: "EV Chargers", count: "24" },
  { icon: Zap, label: "Generators", count: "18" },
  { icon: Sparkles, label: "Smart Home", count: "92" },
];

const products = [
  { id: 1, name: "Helios X9 Mono Panel 450W", category: "Solar Panels", price: 185000, oldPrice: 219000, rating: 4.8, reviews: 1240, badge: "Best Seller", img: productPanel },
  { id: 2, name: "PowerWall Quantum 13.5kWh", category: "Batteries", price: 4800000, oldPrice: 5600000, rating: 4.9, reviews: 562, badge: "−15%", img: productBattery },
  { id: 3, name: "FluxCore Hybrid Inverter 10kW", category: "Inverters", price: 1750000, oldPrice: 2000000, rating: 4.7, reviews: 318, badge: "New", img: productInverter },
  { id: 4, name: "VoltLink EV Charger 22kW", category: "EV Chargers", price: 650000, oldPrice: 780000, rating: 4.8, reviews: 980, badge: "Prime Ship", img: productCharger },
];

const whyChoose = [
  { icon: ShieldCheck, t: "Certified Products", d: "Every panel, battery and inverter is tested and warrantied." },
  { icon: BadgePercent, t: "Best Price", d: "Transparent Naira pricing with no hidden install fees." },
  { icon: Wrench, t: "Expert Installers", d: "Vetted, certified engineers across 24 Nigerian states." },
  { icon: ListChecks, t: "Easy Process", d: "Quote, purchase, install — done in as little as a week." },
];

const testimonials = [
  { quote: "Our shop hasn't lost power once since switching. Installation took a single afternoon.", name: "Adaeze O.", loc: "Lagos, Nigeria", rating: 5 },
  { quote: "Transparent pricing and the install crew showed up on time. Exactly what they promised.", name: "Chinedu K.", loc: "Abuja, Nigeria", rating: 5 },
  { quote: "Cut our diesel generator bill by more than half in the first month. Wish we'd switched sooner.", name: "Funmilayo A.", loc: "Ibadan, Nigeria", rating: 4 },
];

function Home() {
  const addToCart = useAddToCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="bg-secondary/60 px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-card shadow-card">
        {/* TOP UTILITY BAR */}
        <div className="hidden items-center justify-between border-b border-border px-10 py-2.5 text-xs text-muted-foreground sm:flex">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> hello@sanegreenenergy.com</span>
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +234 801 234 5678</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Victoria Island, Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" onClick={(e) => e.preventDefault()} className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <TwitterIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* NAV */}
        <header className="flex h-[88px] items-center justify-between px-6 sm:px-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">SaneGreenEnergy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-9 text-[15px] text-foreground/80">
            {navLinks.map((n) => (
              <Link key={n.label} to={n.to} className="hover:text-foreground transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Wishlist" className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:inline-flex">
              <Heart className="h-4.5 w-4.5" />
            </button>
            <Link to="/login" aria-label="Account" className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:inline-flex">
              <User className="h-4.5 w-4.5" />
            </Link>
            <Link
              to="/find-installer"
              className="hidden sm:inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get a Free Quote
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="right" className="w-4/5 sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((n) => (
                <SheetClose asChild key={n.label}>
                  <Link to={n.to} className="rounded-lg px-4 py-3 text-base text-foreground hover:bg-secondary">
                    {n.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link to="/find-installer" className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground">
                  Get a Free Quote
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

        {/* HERO */}
        <div className="px-6 pt-4 sm:px-10 md:pt-6">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Nigeria's Solar Marketplace
              </span>
              <h1 className="mt-5 text-[38px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.02em]">
                Find Your Perfect
                <br />Solar System
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Explore thousands of vetted panels, batteries, and inverters — or get a free custom install quote from certified engineers near you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/solutions" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium hover:bg-secondary transition-colors">
                  How It Works
                </Link>
              </div>
              <div className="mt-9 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["AO", "CK", "FA", "TB"].map((i) => (
                    <div key={i} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-primary text-[11px] font-semibold text-primary-foreground">
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-foreground">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-foreground text-foreground" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">Trusted by 3,200+ happy homes</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-[28px]"
              >
                <img
                  src={heroHome}
                  alt="Solar panels powering a modern home"
                  width={1200}
                  height={1000}
                  className="h-[320px] w-full object-cover sm:h-[420px] md:h-[460px]"
                />
              </motion.div>
              <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:-left-6">
                <div className="h-14 w-14 overflow-hidden rounded-xl bg-secondary shrink-0">
                  <img src={productPanel} alt="Helios X9 panel" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-base font-bold">₦185,000</div>
                  <div className="text-xs text-muted-foreground">Helios X9 · In stock, Lagos</div>
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH BAR — overlaps hero bottom edge */}
          <div className="relative z-10 mt-16 sm:mt-10">
            <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:grid-cols-2 sm:gap-4 sm:p-5 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
              <label className="flex flex-col gap-1 rounded-xl border border-border px-4 py-2.5">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Location</span>
                <select className="bg-transparent text-sm focus:outline-none">
                  <option>Any state</option>
                  <option>Lagos</option>
                  <option>Abuja (FCT)</option>
                  <option>Rivers</option>
                  <option>Oyo</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 rounded-xl border border-border px-4 py-2.5">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Product Type</span>
                <select className="bg-transparent text-sm focus:outline-none">
                  <option>Any type</option>
                  <option>Solar Panels</option>
                  <option>Batteries</option>
                  <option>Inverters</option>
                  <option>EV Chargers</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 rounded-xl border border-border px-4 py-2.5">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Price Range</span>
                <select className="bg-transparent text-sm focus:outline-none">
                  <option>Any price</option>
                  <option>Under ₦200,000</option>
                  <option>₦200,000 – ₦1,000,000</option>
                  <option>₦1,000,000+</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 rounded-xl border border-border px-4 py-2.5">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">System Size</span>
                <select className="bg-transparent text-sm focus:outline-none">
                  <option>Any size</option>
                  <option>Under 5kW</option>
                  <option>5–10kW</option>
                  <option>10kW+</option>
                </select>
              </label>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Search className="h-4 w-4" /> Search Products
              </Link>
            </div>
          </div>
        </div>

        {/* EXPLORE CATEGORIES */}
        <div className="px-6 pt-20 sm:px-10">
          <div className="mb-8 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Explore</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <button
                key={c.label}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{c.label}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{c.count} listings</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED PRODUCTS */}
        <div className="px-6 pt-20 sm:px-10">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Featured Products</h2>
            </div>
            <Link to="/products" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-foreground hover:opacity-70">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={{ ...p, image: p.img }} onAdd={addToCart} />
            ))}
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="px-6 pt-20 sm:px-10">
          <div className="mb-10 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why Us</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Why Choose SaneGreenEnergy?</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-base font-semibold">{v.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{v.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT OUR CLIENTS SAY */}
        <div id="testimonials" className="scroll-mt-24 px-6 pt-20 sm:px-10">
          <div className="mb-10 text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Testimonials</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">What Our Clients Say</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-7">
                <Quote className="h-7 w-7 text-primary" />
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-foreground text-foreground" : "text-border"}`} />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
                <div className="mt-5 text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.loc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER CTA */}
        <div className="px-6 pt-20 sm:px-10">
          <div className="relative overflow-hidden rounded-[28px]">
            <img src={premiumInstall} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[oklch(0.16_0.02_140/0.85)]" />
            <div className="relative p-10 text-center text-primary-foreground md:p-16">
              <h2 className="text-2xl md:text-4xl font-semibold tracking-[-0.02em]">Get Exclusive Solar Deals &amp; Updates</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80">
                New product drops, price cuts, and install financing offers — straight to your inbox.
              </p>
              {subscribed ? (
                <p className="mt-7 text-sm font-medium">You're subscribed — welcome aboard!</p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                  className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90 transition-opacity"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="h-16 sm:h-20" />
      </div>
    </div>
  );
}
