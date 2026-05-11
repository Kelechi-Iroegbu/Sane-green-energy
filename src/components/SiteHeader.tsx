import { Link } from "@tanstack/react-router";
import {ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import sane.png from "@/assets/sane.png";

const nav = [
  { to: "/", label: "Shop" },
  { to: "/products", label: "Products" },
  { to: "/solutions", label: "Solutions" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count, openCart } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <img src={sane.png} alt="SaneGreenEnergy Logo" className="h-8 w-auto" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            SaneGreenEnergy
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              activeProps={{ className: "px-4 py-2 rounded-full text-background bg-foreground" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Cart"
          onClick={openCart}
          className="relative inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-xs uppercase tracking-widest text-background hover:opacity-90"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart · {count}</span>
          {count > 0 && (
            <span className="sm:hidden absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-background px-1 text-[10px] font-bold text-foreground border border-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
