import { Link } from "@tanstack/react-router";
import { Leaf, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const nav = [
  { to: "/", label: "Shop" },
  { to: "/solutions", label: "Solutions" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count, openCart } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-neon shadow-glow-sm group-hover:animate-pulse-glow">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Seeing<span className="text-primary text-glow">Green</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-widest">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 rounded-md text-muted-foreground transition-colors hover:text-primary hover:bg-secondary/50"
              activeProps={{ className: "px-4 py-2 rounded-md text-primary bg-secondary/50" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Cart"
          onClick={openCart}
          className="relative inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-mono uppercase tracking-widest text-primary-foreground shadow-glow-sm transition-all hover:shadow-glow"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart · {count}</span>
          {count > 0 && (
            <span className="sm:hidden absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
