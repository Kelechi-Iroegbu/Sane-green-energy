import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-neon shadow-glow-sm">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">
              SaneGreen<span className="text-primary"></span> Energy
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Powering tomorrow's grid with intelligent solar infrastructure. Clean energy, engineered for the future.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/solutions" className="hover:text-primary">Solutions</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@sanegreen.energy</li>
            <li>+1 (415) 555-0142</li>
            <li>San Francisco, CA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs font-mono text-muted-foreground">
        © {new Date().getFullYear()} SaneGreenEnergy — All systems operational
      </div>
    </footer>
  );
}
