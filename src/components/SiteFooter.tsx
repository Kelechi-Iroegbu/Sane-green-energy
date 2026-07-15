import { Link } from "@tanstack/react-router";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/SocialIcons";

const categoryLinks = [
  { label: "Solar Panels", to: "/products" as const },
  { label: "Batteries", to: "/products" as const },
  { label: "Inverters", to: "/products" as const },
  { label: "EV Chargers", to: "/products" as const },
];

const companyLinks = [
  { label: "About Us", to: "/about" as const },
  { label: "Solutions", to: "/solutions" as const },
  { label: "Shop", to: "/products" as const },
  { label: "Find an Installer", to: "/find-installer" as const },
];

const supportLinks = [
  { label: "Warranty", to: "/solutions" as const },
  { label: "Installation", to: "/solutions" as const },
  { label: "Financing", to: "/find-installer" as const },
  { label: "FAQs", to: "/find-installer" as const },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-[oklch(0.2_0.03_150)] text-[oklch(0.9_0.02_90)]">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[oklch(0.9_0.02_90)]">
              <Leaf className="h-4 w-4 text-[oklch(0.2_0.03_150)]" />
            </div>
            <span className="text-lg font-bold text-white">SaneGreenEnergy</span>
          </div>
          <p className="text-sm text-[oklch(0.9_0.02_90/0.7)] max-w-sm">
            Affordable, efficient, and eco-friendly solar energy for Nigerian homes and businesses.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="#" onClick={(e) => e.preventDefault()} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <TwitterIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[oklch(0.9_0.02_90/0.6)] mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-[oklch(0.9_0.02_90/0.8)]">
            {categoryLinks.map((l) => (
              <li key={l.label}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[oklch(0.9_0.02_90/0.6)] mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-[oklch(0.9_0.02_90/0.8)]">
            {companyLinks.map((l) => (
              <li key={l.label}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[oklch(0.9_0.02_90/0.6)] mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-[oklch(0.9_0.02_90/0.8)]">
            {supportLinks.map((l) => (
              <li key={l.label}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[oklch(0.9_0.02_90/0.7)]">
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> hello@sanegreenenergy.com</span>
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +234 801 234 5678</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Lagos, Nigeria</span>
          </div>
          <div className="text-xs text-[oklch(0.9_0.02_90/0.6)]">
            © {new Date().getFullYear()} SaneGreenEnergy — All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
