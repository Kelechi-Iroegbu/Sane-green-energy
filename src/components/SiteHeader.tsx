import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import saneLogo from "@/assets/Logo_Redesign.png";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "Shop" },
  { to: "/products", label: "Products" },
  { to: "/solutions", label: "Solutions" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count, openCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white md:h-12 md:w-12">
            <img src={saneLogo} alt="SaneGreenEnergy Logo" className="h-10 w-10 object-contain md:h-12 md:w-12" />
          </div>
          <span className="truncate font-display text-base font-semibold tracking-tight md:text-lg">
            SaneGreenEnergy
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              activeProps={{ className: "px-4 py-2 rounded-full !text-primary-foreground !bg-primary" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          {isAuthenticated ? (
            <div className="hidden lg:flex items-center gap-1 text-sm text-muted-foreground">
              <span>Hi, {user?.name.split(" ")[0]}</span>
              <button
                onClick={logout}
                aria-label="Log out"
                className="rounded-full p-2 hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <User className="h-4 w-4" /> Log in
            </Link>
          )}
          <button
            aria-label="Cart"
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90 sm:px-5"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart · {count}</span>
            {count > 0 && (
              <span className="sm:hidden absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-background px-1 text-[10px] font-bold text-foreground border border-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-4/5 sm:max-w-xs">
          <SheetHeader>
            <SheetTitle className="font-display">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-1">
            {nav.map((n) => (
              <SheetClose asChild key={n.to}>
                <Link
                  to={n.to}
                  className="rounded-lg px-4 py-3 text-base text-foreground hover:bg-secondary"
                  activeProps={{ className: "rounded-lg px-4 py-3 text-base !bg-primary !text-primary-foreground" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
          <div className="mt-6 border-t border-border pt-6">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-4">
                <span className="text-sm text-muted-foreground">Hi, {user?.name.split(" ")[0]}</span>
                <button
                  onClick={logout}
                  aria-label="Log out"
                  className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <SheetClose asChild>
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-base text-foreground hover:bg-secondary"
                >
                  <User className="h-4 w-4" /> Log in
                </Link>
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
