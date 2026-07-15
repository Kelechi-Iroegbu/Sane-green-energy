import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, MapPin, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
      { name: "description", content: "Connect with SaneGreenEnergy-certified solar installers across Enugu State for installation, maintenance, and consultations." },
      { property: "og:title", content: "Find a Certified Installer — SaneGreenEnergy" },
      { property: "og:description", content: "Vetted solar engineers across Enugu State, ready for installation, maintenance, and consultations." },
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
    reviews: 86,
    stat: { label: "installs completed", value: 210 },
    bio: "Residential and commercial rooftop specialists serving Enugu metro since 2016.",
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
    bio: "Trusted installer for university staff housing and small businesses around Nsukka.",
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
    bio: "Hybrid inverter and battery specialists with a strong maintenance track record.",
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
    bio: "Commercial-scale installs for offices, schools, and retail sites across Enugu East.",
    services: ["Commercial Install", "Consultation"],
    lat: 6.465, lng: 7.554,
  },
  {
    id: 5,
    name: "BrightGrid Enugu",
    lga: "Enugu South",
    rating: 4.5,
    reviews: 63,
    stat: { label: "installs completed", value: 175 },
    bio: "Full-service residential installer known for fast turnaround and tidy wiring work.",
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
    bio: "Growing installer team covering Agbani and surrounding Nkanu communities.",
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
    bio: "Off-grid and hybrid system specialists for rural and peri-urban properties.",
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
    bio: "Reliable maintenance and repair service for existing solar installations.",
    services: ["Maintenance/Repair", "Consultation"],
    lat: 6.101, lng: 7.433,
  },
];

function FindInstaller() {
  const [query, setQuery] = useState("");
  const [lgaFilter, setLgaFilter] = useState("All LGAs");
  const [serviceFilter, setServiceFilter] = useState("All Services");
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
      const matchesService = serviceFilter === "All Services" || inst.services.includes(serviceFilter as ServiceType);
      return matchesQuery && matchesLga && matchesService;
    });
  }, [query, lgaFilter, serviceFilter]);

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
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-8 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Enugu State
          </span>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
            Find a Certified Installer Near You
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Connect with vetted solar engineers across Enugu State for installation, maintenance, and consultations.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="flex w-full items-stretch overflow-hidden rounded-full border border-border bg-background shadow-soft">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by area or installer name…"
            className="flex-1 bg-transparent px-6 py-4 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>

        <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-card sm:grid-cols-2 sm:gap-4 sm:p-5 lg:grid-cols-[1fr_1fr_auto]">
          <label className="flex flex-col gap-1 rounded-xl border border-border px-4 py-2.5">
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
          <label className="flex flex-col gap-1 rounded-xl border border-border px-4 py-2.5">
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </div>
      </section>

      <section ref={resultsRef} className="mx-auto max-w-7xl px-6 pb-20 scroll-mt-24">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-border bg-background p-16 text-center">
            <p className="text-muted-foreground">No installers match your search.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="lg:sticky lg:top-24 lg:self-start">
              {Map ? (
                <Map
                  installers={filtered.map((i) => ({ id: i.id, name: i.name, lga: i.lga, rating: i.rating, lat: i.lat, lng: i.lng }))}
                  activeId={activeId}
                  onSelect={handleSelect}
                />
              ) : (
                <div className="h-[420px] w-full animate-pulse rounded-3xl border border-border bg-secondary lg:h-[600px]" />
              )}
            </div>

            <div className="space-y-4">
              {filtered.map((inst) => (
                <div
                  key={inst.id}
                  ref={(el) => {
                    cardRefs.current[inst.id] = el;
                  }}
                  className={cn(
                    "rounded-2xl border bg-card p-6 transition-all hover:shadow-card",
                    activeId === inst.id ? "border-primary ring-2 ring-primary/40" : "border-border",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{inst.name}</h3>
                      <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {inst.lga}
                      </span>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                      <ShieldCheck className="h-3 w-3" /> Certified
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3 border-y border-border py-2.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-foreground text-foreground" /> {inst.rating.toFixed(1)}
                    </span>
                    <span>{inst.reviews.toLocaleString()} reviews</span>
                    <span>
                      {inst.stat.value} {inst.stat.label}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{inst.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setProfileInstaller(inst)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-secondary transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => openQuote(inst.name)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[28px] border border-border bg-card p-10 text-center md:p-16">
          <h2 className="font-display text-2xl md:text-4xl font-semibold tracking-tight">
            Don't see an installer in your area?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            We're onboarding certified installers across Enugu State every month — tell us what you need and we'll match you directly.
          </p>
          <button
            type="button"
            onClick={() => openQuote(null)}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Submit a General Quote Request <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <ProfileModal installer={profileInstaller} onOpenChange={(open) => !open && setProfileInstaller(null)} />
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
                <Star className="h-3.5 w-3.5 fill-foreground text-foreground" /> {installer.rating.toFixed(1)} ({installer.reviews} reviews) · {installer.stat.value} {installer.stat.label}
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
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
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
