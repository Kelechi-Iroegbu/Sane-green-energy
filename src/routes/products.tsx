import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowRight, Clock, Headphones, LayoutGrid, Leaf, Sun, Wallet, Home as HomeIcon, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import heroHome from "@/assets/hero-home.jpg";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { BenefitsStrip } from "@/components/BenefitsStrip";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { resolveImage } from "@/lib/api";
import { iconForCategory } from "@/lib/category-icons";

const heroStats = [
  { icon: Sun, l1: "Sustainable", l2: "Energy" },
  { icon: Wallet, l1: "Lower Bills", l2: "Every Month" },
  { icon: HomeIcon, l1: "Increase Home", l2: "Value" },
  { icon: Users, l1: "Trusted by", l2: "Thousands" },
];

const API_URL = import.meta.env.VITE_API_URL || "/api";

type Product = {
  _id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  numReviews?: number;
  image?: string;
  brand?: string;
  countInStock?: number;
  featured?: boolean;
};

type Category = { name: string; count: number };

async function fetchProducts(params: { category?: string; search?: string }) {
  const qs = new URLSearchParams();
  if (params.category && params.category !== "All") qs.set("category", params.category);
  if (params.search) qs.set("search", params.search);
  const res = await fetch(`${API_URL}/products${qs.toString() ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error("Failed to load products");
  return (await res.json()) as Product[];
}

async function fetchCategories() {
  const res = await fetch(`${API_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to load categories");
  return (await res.json()) as Category[];
}

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — SaneGreenEnergy Solar Marketplace" },
      { name: "description", content: "Browse the full SaneGreenEnergy catalog: solar panels, batteries, inverters, EV chargers and accessories." },
      { property: "og:title", content: "All Products — SaneGreenEnergy" },
      { property: "og:description", content: "Browse panels, batteries, inverters and EV chargers in the SaneGreenEnergy marketplace." },
      { property: "og:image", content: heroHome },
    ],
  }),
  component: ProductsPage,
});

function useSlowLoad(isLoading: boolean, delay = 4000) {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      setSlow(false);
      return;
    }
    const t = setTimeout(() => setSlow(true), delay);
    return () => clearTimeout(t);
  }, [isLoading, delay]);
  return slow;
}

function ProductsPage() {
  const addToCart = useAddToCart();
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const productsQuery = useQuery({
    queryKey: ["products", active, debounced],
    queryFn: () => fetchProducts({ category: active, search: debounced }),
  });

  const isSlow = useSlowLoad(productsQuery.isLoading);

  const categories = useMemo(() => {
    const list = categoriesQuery.data ?? [];
    return [{ name: "All", count: 0 }, ...list];
  }, [categoriesQuery.data]);

  const products = productsQuery.data ?? [];

  return (
    <div className="bg-background text-foreground">
      {/* PAGE HEADER */}
      <section className="mx-auto max-w-[1600px] px-6 pt-10 sm:px-8 sm:pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Marketplace</span>
            <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">All Products</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              The complete SaneGreenEnergy catalog — panels, batteries, inverters and EV chargers, curated for performance and built to last.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[24px]">
            <img
              src={heroHome}
              alt="Modern home powered by rooftop solar panels at dusk"
              className="h-[300px] w-full object-cover sm:h-[340px]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/95 p-5 shadow-card backdrop-blur sm:inset-x-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Leaf className="h-3.5 w-3.5" />
                </span>
                Powering a greener tomorrow
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
                {heroStats.map((s) => (
                  <div key={s.l1} className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-[11px] leading-tight text-muted-foreground">
                      {s.l1}
                      <br />
                      {s.l2}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5 shadow-soft"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the catalog…"
            className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <button className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            <Search className="h-3.5 w-3.5" /> Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => {
            const Icon = c.name === "All" ? LayoutGrid : iconForCategory(c.name);
            const isActive = active === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    isActive ? "border-primary-foreground/40" : "border-border"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                </span>
                {c.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-[1600px] px-6 pt-10 pb-16 sm:px-8">
        {productsQuery.isLoading ? (
          <>
            {isSlow && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                Still loading — our server may be waking up from idle, this can take up to a minute.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </>
        ) : productsQuery.isError ? (
          <div className="rounded-3xl border border-border bg-secondary/40 p-16 text-center">
            <p className="text-muted-foreground">
              Couldn't load products. {(productsQuery.error as Error)?.message}
            </p>
            <button
              onClick={() => productsQuery.refetch()}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-border bg-secondary/40 p-16 text-center">
            <p className="text-muted-foreground">No products match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={{
                  id: p._id,
                  name: p.name,
                  category: p.category,
                  price: p.price,
                  image: resolveImage(p.image),
                }}
                onAdd={addToCart}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-secondary/50 p-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card shadow-soft">
              <Headphones className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Need a custom system?</div>
              <div className="text-xs text-muted-foreground">Our experts will help you find the perfect fit.</div>
            </div>
          </div>
          <Link
            to="/find-installer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <BenefitsStrip />
    </div>
  );
}
