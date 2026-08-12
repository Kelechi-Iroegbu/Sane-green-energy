import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Menu,
  Star,
  Zap,
  Sun,
  Battery,
  Cpu,
  Plug,
  ArrowRight,
  Leaf,
  Heart,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Award,
  Headphones,
  Lock,
  FileText,
  Briefcase,
  Truck,
  Quote,
  Home as HomeIcon,
  MessageCircle,
  PanelsTopLeft,
  ClipboardList,
  HardHat,
  Wrench,
  Wind,
  ShoppingCart,
  Mail,
} from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import ecoHome from "@/assets/eco-home.jpg";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/SocialIcons";
import { resolveImage } from "@/lib/api";

const API_URL = import.meta.env.VITE_API_URL || "/api";

type FeaturedProduct = {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  numReviews?: number;
  image?: string;
  featured?: boolean;
};

async function fetchFeaturedProducts() {
  const res = await fetch(`${API_URL}/products?featured=true`);
  if (!res.ok) throw new Error("Failed to load products");
  return (await res.json()) as FeaturedProduct[];
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SaneGreenEnergy — Power Your Home. Save for a Lifetime." },
      { name: "description", content: "Nigeria's trusted solar marketplace. Compare trusted products, get expert installation, and start saving on energy — all in one place." },
      { property: "og:title", content: "SaneGreenEnergy — Power Your Home. Save for a Lifetime." },
      { property: "og:description", content: "Affordable, efficient, and eco-friendly energy tailored for your home." },
      { property: "og:image", content: heroHome },
      { name: "twitter:image", content: heroHome },
    ],
  }),
  component: Home,
});

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Products", to: "/products" as const },
  { label: "Savings", to: "/solutions" as const },
  { label: "Find an Installer", to: "/find-installer" as const },
];

const categoryIcon: Record<string, typeof Sun> = {
  panel: Sun,
  panels: Sun,
  solar: Sun,
  battery: Battery,
  batteries: Battery,
  inverter: Cpu,
  inverters: Cpu,
  charger: Plug,
  chargers: Plug,
};

function iconForCategory(category: string) {
  const key = category?.toLowerCase() ?? "";
  for (const [needle, icon] of Object.entries(categoryIcon)) {
    if (key.includes(needle)) return icon;
  }
  return Zap;
}

const fallbackProducts = [
  { id: "fallback-1", name: "Solar Panel – 550W", category: "Solar Panels", desc: "High efficiency monocrystalline panel", price: 265000, icon: Sun, badge: undefined as string | undefined },
  { id: "fallback-2", name: "Solar Inverter – 5kW", category: "Inverters", desc: "Reliable hybrid inverter", price: 850000, icon: Cpu, badge: undefined },
  { id: "fallback-3", name: "Lithium Battery – 5kWh", category: "Batteries", desc: "Long life. More backup.", price: 1200000, icon: Battery, badge: undefined },
  { id: "fallback-4", name: "All-in-One Solar System – 5kW", category: "Systems", desc: "Inverter + Battery + Accessories", price: 2250000, icon: Zap, badge: "Best Seller" },
];

const steps = [
  { n: 1, icon: HomeIcon, badge: MessageCircle, t: "Tell us about your home", d: "Answer a few quick questions about your energy needs." },
  { n: 2, icon: PanelsTopLeft, badge: ClipboardList, t: "Get matched", d: "We recommend the best solar system for your home." },
  { n: 3, icon: HardHat, badge: Wrench, t: "Get installed & save", d: "Our certified installers handle everything from start to finish." },
];

const trustBadges = [
  { icon: ShieldCheck, t: "Certified", t2: "Installers" },
  { icon: Award, t: "Quality", t2: "Products" },
  { icon: Headphones, t: "Expert", t2: "Support" },
  { icon: Lock, t: "Secure", t2: "& Reliable" },
];

const benefits = [
  { icon: FileText, t: "Best Prices", d: "Competitive & transparent" },
  { icon: Briefcase, t: "Secure Payments", d: "Safe and trusted checkout" },
  { icon: Truck, t: "Fast Delivery", d: "Delivered to your door" },
  { icon: ShieldCheck, t: "Warranty Included", d: "Peace of mind guaranteed" },
];

const testimonials = [
  { quote: "SaneGreenEnergy made everything so easy. From choosing the right system to installation, the team was amazing.", name: "Chinedu Okafor", loc: "Lagos, Nigeria", initials: "CO" },
  { quote: "My electricity bills have dropped by more than half. I highly recommend them!", name: "Amina Yusuf", loc: "Abuja, Nigeria", initials: "AY" },
  { quote: "Professional, timely and affordable. The best solar investment I've made.", name: "Tunde Adebayo", loc: "Ibadan, Nigeria", initials: "TA" },
];

const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" as const },
      { label: "How It Works", to: "/solutions" as const },
      { label: "Careers", to: undefined },
      { label: "Blog", to: undefined },
      { label: "Contact Us", to: undefined },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", to: undefined },
      { label: "Shipping & Delivery", to: undefined },
      { label: "Returns", to: undefined },
      { label: "Warranty", to: undefined },
      { label: "FAQs", to: undefined },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Solar Guide", to: undefined },
      { label: "Energy Savings 101", to: undefined },
      { label: "News & Updates", to: undefined },
      { label: "Installer Program", to: "/find-installer" as const },
    ],
  },
];

function Home() {
  const addToCart = useAddToCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [productStart, setProductStart] = useState(0);
  const featuredQuery = useQuery({
    queryKey: ["products", "featured"],
    queryFn: fetchFeaturedProducts,
  });

  const products =
    featuredQuery.data && featuredQuery.data.length > 0
      ? featuredQuery.data.map((p) => ({
          id: p._id,
          name: p.name,
          category: p.category,
          desc: p.category,
          price: p.price,
          icon: iconForCategory(p.category),
          image: resolveImage(p.image),
          badge: p.featured ? "Best Seller" : undefined,
          raw: p,
        }))
      : fallbackProducts.map((p) => ({ ...p, image: undefined, raw: undefined }));

  const visibleProducts = products.slice(productStart, productStart + 4);
  const canPrev = productStart > 0;
  const canNext = productStart + 4 < products.length;

  return (
    <div className="bg-background text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">SaneGreenEnergy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/80">
            {navLinks.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="transition-colors hover:text-foreground"
                activeProps={{ className: "!text-primary font-semibold" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1 transition-colors hover:text-foreground">
              Resources <ChevronDown className="h-3.5 w-3.5" />
            </a>
          </nav>
          <div className="flex items-center gap-1.5">
            <button aria-label="Wishlist" className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:inline-flex">
              <Heart className="h-4.5 w-4.5" />
            </button>
            <Link to="/login" aria-label="Account" className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:inline-flex">
              <User className="h-4.5 w-4.5" />
            </Link>
            <Link
              to="/find-installer"
              className="ml-1 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get a Free Quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
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
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src={heroHome}
            alt="Modern home powered by rooftop solar panels at dusk"
            className="h-[560px] w-full object-cover sm:h-[560px]"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, var(--background) 0%, var(--background) 40%, color-mix(in oklch, var(--background) 15%, transparent) 62%, transparent 78%)" }}
          />

          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-14">
            <div className="max-w-lg">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                Nigeria's Trusted Solar Marketplace
              </span>
              <h1 className="mt-4 font-serif text-[40px] leading-[1.12] tracking-tight text-foreground sm:text-[48px] lg:text-[54px]">
                Power your home.
                <br />
                Save <em className="italic text-primary font-medium">for a lifetime</em>.
              </h1>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                Compare trusted products, get expert installation, and start saving on energy — all in one place.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-4 shadow-card"
              >
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <Link
                  to="/find-installer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Get Started <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </form>

              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                {trustBadges.map((b) => (
                  <div key={b.t} className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card shadow-soft">
                      <b.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-xs font-medium leading-tight text-foreground">
                      {b.t}
                      <br />
                      {b.t2}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 hidden max-w-xs items-center gap-3 rounded-2xl bg-[oklch(0.22_0.03_150)] p-4 shadow-card sm:flex lg:right-10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
              <Wind className="h-5 w-5 text-[oklch(0.22_0.03_150)]" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Save More. Live Greener.</div>
              <p className="mt-0.5 text-[11px] leading-snug text-white/70">
                Reduce your bills and your carbon footprint with clean, reliable solar energy.
              </p>
            </div>
            <Link
              to="/solutions"
              aria-label="Learn more"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[oklch(0.22_0.03_150)] hover:opacity-90"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 pt-24 sm:px-8">
        <div className="mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">How It Works</span>
          <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">Solar made simple in 3 steps</h2>
        </div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute left-0 top-[52px] hidden w-full md:block"
            height="24"
            viewBox="0 0 1000 24"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M170,12 C230,-6 270,30 330,12 S 430,-6 500,12"
              stroke="var(--primary)"
              strokeOpacity="0.3"
              strokeWidth="2"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
            <path
              d="M500,12 C560,-6 600,30 660,12 S 760,-6 830,12"
              stroke="var(--primary)"
              strokeOpacity="0.3"
              strokeWidth="2"
              strokeDasharray="6 7"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7">
                <span className="absolute -top-4 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-card">
                  {s.n}
                </span>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-foreground/70">
                  <s.icon className="h-7 w-7" />
                  <div className="absolute -bottom-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                    <s.badge className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h3 className="mt-6 text-base font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP POPULAR PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 pt-24 sm:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Shop Popular Products</span>
          </div>
          <Link to="/products" className="hidden items-center gap-1.5 text-sm font-medium text-primary hover:opacity-70 sm:inline-flex">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous products"
            disabled={!canPrev}
            onClick={() => setProductStart((s) => Math.max(0, s - 4))}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent lg:inline-flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredQuery.isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="aspect-[4/3] animate-pulse bg-secondary" />
                    <div className="space-y-2 p-5">
                      <div className="h-4 w-3/4 animate-pulse rounded-full bg-secondary" />
                      <div className="h-3 w-1/2 animate-pulse rounded-full bg-secondary" />
                    </div>
                  </div>
                ))
              : visibleProducts.map((p) => (
                  <article key={p.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card">
                    {p.badge && (
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
                        {p.badge}
                      </span>
                    )}
                    <div className="flex aspect-[4/3] items-center justify-center bg-secondary/70">
                      {p.image ? (
                        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <p.icon className="h-14 w-14 text-primary/70" strokeWidth={1.25} />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-sm font-semibold leading-snug">{p.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <div className="text-base font-bold text-primary">₦{p.price.toLocaleString()}</div>
                        <button
                          aria-label="Add to cart"
                          onClick={() =>
                            addToCart({
                              id: p.id,
                              name: p.name,
                              category: p.category,
                              price: p.price,
                              rating: 0,
                              reviews: 0,
                              image: p.image || heroHome,
                            })
                          }
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
          </div>

          <button
            type="button"
            aria-label="Next products"
            disabled={!canNext}
            onClick={() => setProductStart((s) => s + 4)}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent lg:inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* BENEFITS STRIP */}
      <section className="mt-24 bg-secondary/60 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.t} className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card shadow-soft">
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">{b.t}</div>
                <div className="text-xs text-muted-foreground">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="scroll-mt-24 bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">What Our Customers Say</span>
              <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">Trusted by thousands of homeowners</h2>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" onClick={(e) => e.preventDefault()} className="hidden items-center gap-1.5 text-sm font-medium text-primary hover:opacity-70 sm:inline-flex">
                View all reviews <ArrowRight className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-2">
                <button aria-label="Previous reviews" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-card">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button aria-label="Next reviews" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-card">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[oklch(0.22_0.03_150)]">
          <img src={ecoHome} alt="" className="absolute inset-y-0 left-0 h-full w-1/2 object-cover opacity-40 sm:opacity-60" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, oklch(0.22 0.03 150) 0%, oklch(0.22 0.03 150) 45%, color-mix(in oklch, oklch(0.22 0.03 150) 85%, transparent) 75%, oklch(0.22 0.03 150) 100%)" }}
          />
          <Leaf className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-white/5" strokeWidth={0.75} />
          <Leaf className="pointer-events-none absolute -bottom-16 right-16 h-40 w-40 text-white/5" strokeWidth={0.75} />

          <div className="relative flex flex-col items-start gap-6 p-10 text-white sm:p-14 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Ready to start saving?</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                Get a free, no-obligation quote for your home today.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-white" /> Takes less than 2 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-white" /> 100% free
                </span>
              </div>
            </div>
            <Link
              to="/find-installer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[oklch(0.22_0.03_150)] hover:opacity-90 transition-opacity"
            >
              Get My Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Leaf className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold tracking-tight">SaneGreenEnergy</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Making clean, affordable energy accessible to every home in Nigeria.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#" onClick={(e) => e.preventDefault()} className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors">
                  <TwitterIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">{col.heading}</h4>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {col.links.map((l) =>
                    l.to ? (
                      <li key={l.label}>
                        <Link to={l.to} className="hover:text-foreground transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground transition-colors">
                          {l.label}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Subscribe to our newsletter</h4>
              <p className="mt-4 text-sm text-muted-foreground">Get tips, updates and exclusive offers.</p>
              {subscribed ? (
                <p className="mt-3 text-sm font-medium text-primary">You're subscribed — welcome aboard!</p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                  className="mt-3 flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-4"
                >
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span>© {new Date().getFullYear()} SaneGreenEnergy. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-foreground transition-colors">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
