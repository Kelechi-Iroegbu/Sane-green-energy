import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, MapPin, Star, ShieldCheck, ArrowRight, SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewsletterCta } from "@/components/NewsletterCta";
import heroHome from "@/assets/hero-home.jpg";
import solarPro from "@/assets/solar-pro.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/find-installer")({
  head: () => ({
    meta: [
      { title: "Find an Installer — SaneGreenEnergy" },
      {
        name: "description",
        content:
          "Connect with SaneGreenEnergy-certified solar installers across Enugu State for installation, maintenance, and consultations.",
      },
      { property: "og:title", content: "Find a Certified Installer — SaneGreenEnergy" },
      {
        property: "og:description",
        content:
          "Vetted solar engineers across Enugu State, ready for installation, maintenance, and consultations.",
      },
    ],
  }),
  component: FindInstaller,
});

const lgas = [
  "Enugu East", "Enugu North", "Enugu South", "Nsukka", "Udi", "Nkanu East", "Nkanu West",
  "Igbo-Eze North", "Igbo-Eze South", "Ezeagu", "Oji River", "Awgu", "Aninri", "Isi-Uzo",
  "Igbo-Etiti", "Nkanu", "Uzo-Uwani",
];

const serviceTypes = ["Residential Install", "Commercial Install", "Maintenance/Repair", "Consultation"] as const;
type ServiceType = (typeof serviceTypes)[number];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest rated" },
  { value: "reviews", label: "Most reviews" },
  { value: "installs", label: "Most installs" },
] as const;
type SortValue = (typeof sortOptions)[number]["value"];

type Installer = {
  id: number;
  name: string;
  lga: string;
  rating: number;
  reviews: number;
  stat: { label: string; value: number };
  bio: string;
  services: ServiceType[];
  lat: number;
  lng: number;
};

const installers: Installer[] = [
  {
    id: 1,
    name: "SunCore Energy Solutions",
    lga: "Enugu North",
    rating: 4.9,
    reviews: 89,
    stat: { label: "installs completed", value: 211 },
    bio: "Residential and commercial rooftop specialists.",
    services: ["Residential Install", "Commercial Install", "Consultation"],
    lat: 6.462, lng: 7.499,
  },
  {
    id: 2,
    name: "Nsukka Solar Works",
    lga: "Nsukka",
    rating: 4.7,
    reviews: 54,
    stat: { label: "years experience", value: 9 },
    bio: "Trusted installer for homes, schools & businesses.",
    services: ["Residential Install", "Maintenance/Repair"],
    lat: 6.857, lng: 7.396,
  },
  {
    id: 3,
    name: "GreenVolt Installations",
    lga: "Udi",
    rating: 4.6,
    reviews: 41,
    stat: { label: "installs completed", value: 140 },
    bio: "Hybrid inverter and battery specialists.",
    services: ["Residential Install", "Maintenance/Repair", "Consultation"],
    lat: 6.352, lng: 7.333,
  },
  {
    id: 4,
    name: "PowerLine Renewables",
    lga: "Enugu East",
    rating: 4.8,
    reviews: 97,
    stat: { label: "years experience", value: 7 },
    bio: "Commercial-scale installs for offices & institutions.",
    services: ["Commercial Install", "Consultation"],
    lat: 6.465, lng: 7.554,
  },
  {
    id: 5,
    name: "BrightGrid Enugu",
    lga: "Enugu South",
    rating: 4.5,
    reviews: 83,
    stat: { label: "installs completed", value: 175 },
    bio: "Full-service residential installer.",
    services: ["Residential Install", "Maintenance/Repair"],
    lat: 6.418, lng: 7.49,
  },
  {
    id: 6,
    name: "Nkanu Solar Co.",
    lga: "Nkanu West",
    rating: 4.4,
    reviews: 29,
    stat: { label: "years experience", value: 5 },
    bio: "Growing installer team for Nkanu communities.",
    services: ["Residential Install", "Consultation"],
    lat: 6.367, lng: 7.517,
  },
  {
    id: 7,
    name: "Ezeagu Energy Partners",
    lga: "Ezeagu",
    rating: 4.7,
    reviews: 38,
    stat: { label: "installs completed", value: 96 },
    bio: "Off-grid and hybrid systems for rural & peri-urban areas.",
    services: ["Residential Install", "Commercial Install", "Maintenance/Repair"],
    lat: 6.284, lng: 7.216,
  },
  {
    id: 8,
    name: "Awgu Power Systems",
    lga: "Awgu",
    rating: 4.6,
    reviews: 33,
    stat: { label: "years experience", value: 6 },
    bio: "Maintenance and repair service for solar systems.",
    services: ["Maintenance/Repair", "Consultation"],
    lat: 6.101, lng: 7.433,
  },
  {
    id: 9,
    name: "Isi-Uzo Solar Collective",
    lga: "Isi-Uzo",
    rating: 4.5,
    reviews: 24,
    stat: { label: "installs completed", value: 60 },
    bio: "Community installs and maintenance for rural households.",
    services: ["Residential Install", "Maintenance/Repair", "Consultation"],
    lat: 6.66, lng: 7.68,
  },
];

const whyCertified = [
  "Verified experience and training",
  "Quality workmanship and safety standards",
  "Access to warranty and after-sales support",
  "Peace of mind for your investment",
];

const monogram = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function FindInstaller() {
  const [query, setQuery] = useState("");
  const [lgaFilter, setLgaFilter] = useState("All LGAs");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [sortBy, setSortBy] = useState<SortValue>("recommended");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [profileInstaller, setProfileInstaller] = useState<Installer | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteInstallerName, setQuoteInstallerName] = useState<string | null>(null);
  const [MapModule, setMapModule] = useState<null | typeof import("@/components/InstallerMap")>(null);

  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    import("@/components/InstallerMap").then((mod) => {
      if (mounted) setMapModule(mod);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return installers.filter((inst) => {
      const matchesQuery = !q || inst.name.toLowerCase().includes(q) || inst.lga.toLowerCase().includes(q);
      const matchesLga = lgaFilter === "All LGAs" || inst.lga === lgaFilter;
      const matchesService =
        serviceFilter === "All Services" || inst.services.includes(serviceFilter as ServiceType);
      return matchesQuery && matchesLga && matchesService;
    });
  }, [query, lgaFilter, serviceFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const installs = (i: Installer) => (i.stat.label.startsWith("installs") ? i.stat.value : -1);
    switch (sortBy) {
      case "rating":
        return arr.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return arr.sort((a, b) => b.reviews - a.reviews);
      case "installs":
        return arr.sort((a, b) => installs(b) - installs(a));
      default:
        return arr;
    }
  }, [filtered, sortBy]);

  const handleSelect = (id: number) => {
    setActiveId(id);
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const openQuote = (name: string | null) => {
    setQuoteInstallerName(name);
    setQuoteOpen(true);
  };

  const Map = MapModule?.default;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_0%,oklch(0.42_0.1_150/0.12),transparent_55%)]" />
        </div>
        <div className="mx-auto grid max-w-[1600px] items-center gap-8 px-6 pt-12 pb-10 sm:px-8 md:pt-16 lg:grid-cols-[1.1fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <MapPin className="h-3.5 w-3.5" /> Enugu State
            </span>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Find a Certified Installer Near You
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Connect with vetted solar engineers across Enugu State for installation, maintenance, and
              consultations.
            </p>
          </motion.div>
          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-3xl shadow-card">
              <img
                src={heroHome}
                alt="Solar-powered home in the Enugu countryside"
                className="h-[320px] w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          </div>
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="mx-auto max-w-[1600px] px-6 pb-10 sm:px-8">
        <div className="flex w-full items-center gap-3 overflow-hidden rounded-full border border-border bg-background px-5 shadow-soft">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by area or installer name…"
            className="flex-1 bg-transparent py-4 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-end sm:gap-4 sm:p-5">
          <label className="flex flex-1 flex-col gap-1 rounded-xl border border-border px-4 py-2.5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">LGA</span>
            <select
              value={lgaFilter}
              onChange={(e) => setLgaFilter(e.target.value)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option>All LGAs</option>
              {lgas.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-1 flex-col gap-1 rounded-xl border border-border px-4 py-2.5">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Service Type</span>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option>All Services</option>
              {serviceTypes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Search className="h-4 w-4" /> Search
          </button>
          <button
            type="button"
            aria-label="Reset filters"
            title="Reset filters"
            onClick={() => {
              setQuery("");
              setLgaFilter("All LGAs");
              setServiceFilter("All Services");
              setSortBy("recommended");
            }}
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* RESULTS */}
      <section ref={resultsRef} className="mx-auto max-w-[1600px] scroll-mt-24 px-6 pb-16 sm:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">
            {sorted.length} Certified Installer{sorted.length === 1 ? "" : "s"} Found
          </h2>
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortValue)}
              className="bg-transparent text-xs font-medium text-foreground focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-3xl border border-border bg-background p-16 text-center">
            <p className="text-muted-foreground">No installers match your search.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="lg:sticky lg:top-24 lg:self-start">
              {Map ? (
                <Map
                  installers={filtered.map((i) => ({
                    id: i.id,
                    name: i.name,
                    lga: i.lga,
                    rating: i.rating,
                    lat: i.lat,
                    lng: i.lng,
                  }))}
                  activeId={activeId}
                  onSelect={handleSelect}
                />
              ) : (
                <div className="h-[420px] w-full animate-pulse rounded-3xl border border-border bg-secondary lg:h-[600px]" />
              )}

              <div className="mt-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold">Why choose certified installers?</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {whyCertified.map((w) => (
                    <li key={w} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              {sorted.map((inst) => (
                <div
                  key={inst.id}
                  ref={(el) => {
                    cardRefs.current[inst.id] = el;
                  }}
                  className={cn(
                    "rounded-2xl border bg-card p-5 transition-all hover:shadow-card sm:p-6",
                    activeId === inst.id ? "border-primary ring-2 ring-primary/40" : "border-border",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                      {monogram(inst.name)}
                    </span>

                    <div className="min-w-0 flex-1 basis-56">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <h3 className="font-display text-base font-semibold">{inst.name}</h3>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
                          <ShieldCheck className="h-3 w-3" /> Certified
                        </span>
                      </div>

                      <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {inst.lga}
                      </span>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {inst.rating.toFixed(1)}
                        </span>
                        <span>({inst.reviews} reviews)</span>
                        <span aria-hidden>•</span>
                        <span>
                          {inst.stat.value} {inst.stat.label}
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{inst.bio}</p>
                    </div>

                    <div className="flex shrink-0 gap-2 sm:flex-col">
                      <button
                        type="button"
                        onClick={() => setProfileInstaller(inst)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:bg-secondary"
                      >
                        View Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => openQuote(inst.name)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CAN'T FIND CTA */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16 sm:px-8">
        <div className="flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-primary/15 bg-primary/[0.06] p-6 sm:flex-row sm:gap-8 sm:p-8">
          <img
            src={solarPro}
            alt="SaneGreenEnergy-certified solar engineer"
            className="h-28 w-28 shrink-0 rounded-2xl object-cover sm:h-32 sm:w-40"
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              Can't find an installer in your area?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:mx-0">
              We're onboarding certified installers across Enugu State every month — tell us what you need
              and we'll match you directly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openQuote(null)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Submit a General Quote Request <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <NewsletterCta />

      <ProfileModal
        installer={profileInstaller}
        onOpenChange={(open) => !open && setProfileInstaller(null)}
      />
      <QuoteRequestModal open={quoteOpen} onOpenChange={setQuoteOpen} installerName={quoteInstallerName} />
    </>
  );
}

function ProfileModal({
  installer,
  onOpenChange,
}: {
  installer: Installer | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={installer !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {installer && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">{installer.name}</DialogTitle>
              <DialogDescription>{installer.lga} · Enugu State</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                <ShieldCheck className="h-3 w-3" /> SaneGreenEnergy Certified
              </span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-foreground text-foreground" /> {installer.rating.toFixed(1)} (
                {installer.reviews} reviews) · {installer.stat.value} {installer.stat.label}
              </div>
              <p className="leading-relaxed text-muted-foreground">{installer.bio}</p>
              <div className="flex flex-wrap gap-2">
                {installer.services.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function QuoteRequestModal({
  open,
  onOpenChange,
  installerName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installerName: string | null;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setSubmitted(false);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {installerName ? `Request a quote from ${installerName}` : "Submit a general quote request"}
          </DialogTitle>
          <DialogDescription>
            {installerName
              ? "We'll pass your details directly to this installer."
              : "We'll match you with a certified installer in your area."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <p className="py-4 text-sm text-muted-foreground">
            Request received — {installerName ?? "a certified installer"} will reach out within 24 hours.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <QField label="Full name" name="name" required />
            <QField label="Phone number" name="phone" type="tel" required />
            <QField label="Address" name="address" required />
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                Service needed
              </label>
              <select
                required
                defaultValue=""
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-all focus:border-foreground focus:outline-none"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <QField label="Preferred date" name="date" type="date" />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Submit Request
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function QField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-all focus:border-foreground focus:outline-none"
      />
    </div>
  );
}
