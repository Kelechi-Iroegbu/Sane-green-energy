import { Link } from "@tanstack/react-router";
import { Menu, Heart, User, ArrowRight, ShoppingCart, LogOut } from "lucide-react";
import { useState } from "react";
import logoUrl from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Products", to: "/products" as const },
  { label: "Solutions", to: "/solutions" as const },
  { label: "Find an Installer", to: "/find-installer" as const },
];

export function SiteHeader() {
  const { count, openCart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-6 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoUrl} alt="SaneGreenEnergy" className="h-12 w-12 object-contain" />
          <span className="text-lg font-bold tracking-tight">SaneGreenEnergy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/80">
          {navLinks.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="border-b-2 border-transparent pb-1 transition-colors hover:text-foreground"
              activeProps={{ className: "border-b-2 !border-primary pb-1 !text-primary font-semibold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <button aria-label="Wishlist" className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:inline-flex">
            <Heart className="h-4.5 w-4.5" />
          </button>
          <button
            aria-label="Cart"
            onClick={openCart}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:inline-flex"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          {isAuthenticated ? (
            <button
              aria-label="Log out"
              onClick={logout}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:inline-flex"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          ) : (
            <Link to="/login" aria-label="Account" className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:inline-flex">
              <User className="h-4.5 w-4.5" />
            </Link>
          )}
          <Link
            to="/find-installer"
            className="ml-1 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get a Free Quote <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            aria-label="Cart"
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-secondary hover:text-foreground sm:hidden"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-4/5 sm:max-w-xs">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-1">
            {navLinks.map((n) => (
              <SheetClose asChild key={n.label}>
                <Link
                  to={n.to}
                  className="rounded-lg px-4 py-3 text-base text-foreground hover:bg-secondary"
                  activeProps={{ className: "rounded-lg px-4 py-3 text-base !text-primary font-semibold" }}
                  activeOptions={{ exact: true }}
                >
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
    </header>
  );
}
