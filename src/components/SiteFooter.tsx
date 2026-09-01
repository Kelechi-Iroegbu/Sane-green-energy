import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon, YouTubeIcon } from "@/components/SocialIcons";
import logoUrl from "@/assets/logo.png";

const shopLinks = [
  { label: "Solar Panels", to: "/products" as const },
  { label: "Batteries", to: "/products" as const },
  { label: "Inverters", to: "/products" as const },
  { label: "EV Chargers", to: "/products" as const },
  { label: "Accessories", to: "/products" as const },
  { label: "All Products", to: "/products" as const },
];

const companyLinks = [
  { label: "About Us", to: "/about" as const },
  { label: "How It Works", to: "/solutions" as const },
  { label: "Careers", to: undefined },
  { label: "Blog", to: undefined },
  { label: "Contact Us", to: undefined },
];

const supportLinks = [
  { label: "Help Center", to: undefined },
  { label: "Shipping & Delivery", to: undefined },
  { label: "Returns", to: undefined },
  { label: "Warranty", to: undefined },
  { label: "FAQs", to: undefined },
];

const resourceLinks = [
  { label: "Solar Guide", to: undefined },
  { label: "Energy Savings 101", to: undefined },
  { label: "News & Updates", to: undefined },
  { label: "Installer Program", to: "/find-installer" as const },
];

function FooterLinkList({ links }: { links: { label: string; to?: string }[] }) {
  return (
    <ul className="space-y-2 text-sm text-[oklch(0.9_0.02_90/0.8)]">
      {links.map((l) =>
        l.to ? (
          <li key={l.label}>
            <Link to={l.to as never} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ) : (
          <li key={l.label}>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              {l.label}
            </a>
          </li>
        ),
      )}
    </ul>
  );
}

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="mt-32 bg-[oklch(0.16_0.025_150)] text-[oklch(0.9_0.02_90)]">
      {/* NEWSLETTER STRIP */}
      <div className="border-b border-white/10 bg-[oklch(0.2_0.03_150)]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-lg font-semibold text-white">
            Stay updated with the latest
            <br className="hidden sm:block" /> tips, offers and energy news.
          </p>
          {subscribed ? (
            <p className="text-sm font-medium text-white">You're subscribed — welcome aboard!</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="flex w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5 sm:w-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none sm:w-64"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-16 grid gap-10 md:grid-cols-7">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={logoUrl} alt="SaneGreenEnergy" className="h-14 w-14 object-contain" />
            <span className="text-lg font-bold text-white">SaneGreenEnergy</span>
          </div>
          <p className="text-sm text-[oklch(0.9_0.02_90/0.7)] max-w-sm">
            Making clean, affordable energy accessible to every home in Nigeria.
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
            <a href="#" onClick={(e) => e.preventDefault()} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <YouTubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[oklch(0.9_0.02_90/0.6)] mb-4">Shop</h4>
          <FooterLinkList links={shopLinks} />
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[oklch(0.9_0.02_90/0.6)] mb-4">Company</h4>
          <FooterLinkList links={companyLinks} />
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[oklch(0.9_0.02_90/0.6)] mb-4">Support</h4>
          <FooterLinkList links={supportLinks} />
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[oklch(0.9_0.02_90/0.6)] mb-4">Resources</h4>
          <FooterLinkList links={resourceLinks} />
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[oklch(0.9_0.02_90/0.6)] mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-[oklch(0.9_0.02_90/0.8)]">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0" /> +234 801 234 5678</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0" /> hello@sanegreenenergy.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" /> Lagos, Nigeria</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="text-xs text-[oklch(0.9_0.02_90/0.6)]">
            © {new Date().getFullYear()} SaneGreenEnergy. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-xs text-[oklch(0.9_0.02_90/0.7)]">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
