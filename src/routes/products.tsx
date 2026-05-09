import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Star, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import productPanel from "@/assets/product-panel.jpg";
import premiumInstall from "@/assets/premium-install.jpg";
import { useCart } from "@/context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "/api";

type Product = {
  _id: string;
  name: string;
  category: string;
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
      { title: "All Products — SeeingGreen Solar Marketplace" },
      { name: "description", content: "Browse the full SeeingGreen catalog: solar panels, batteries, inverters, EV chargers and accessories." },
      { property: "og:title", content: "All Products — SeeingGreen" },
      { property: "og:description", content: "Browse panels, batteries, inverters and EV chargers in the SeeingGreen marketplace." },
      { property: "og:image", content: premiumInstall },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { addItem } = useCart();
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

  const categories = useMemo(() => {
    const list = categoriesQuery.data ?? [];
    return ["All", ...list.map((c) => c.name)];
  }, [categoriesQuery.data]);

  const products = productsQuery.data ?? [];

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-12 md:pt-16">
        <div className="grid md:grid-cols-2 gap-10 items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Marketplace</span>
            <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              All Products
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            The complete SeeingGreen catalog — panels, batteries, inverters and EV chargers, curated for performance and built to last.
          </p>
        </div>

        <div className="mt-8 flex w-full items-stretch rounded-full border border-border bg-card shadow-soft overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the catalog…"
            className="flex-1 bg-transparent px-6 py-4 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <button className="m-1.5 inline-flex items-center gap-2 rounded-full bg-foreground px-6 text-sm text-background hover:opacity-90">
            <Search className="h-4 w-4" /> Search
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                active === c
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-10 pb-24">
        {productsQuery.isLoading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading products…
          </div>
        ) : productsQuery.isError ? (
          <div className="rounded-3xl border border-border bg-card p-16 text-center">
            <p className="text-muted-foreground">
              Couldn't load products. {(productsQuery.error as Error)?.message}
            </p>
            <button
              onClick={() => productsQuery.refetch()}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs uppercase tracking-widest text-background hover:opacity-90"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-16 text-center">
            <p className="text-muted-foreground">No products match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p, i) => (
              <motion.article
                key={p._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={p.image || productPanel}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/95 text-foreground text-[10px] uppercase tracking-widest font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</span>
                  <h3 className="mt-1 font-display text-sm font-semibold leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-foreground text-foreground" />
                    <span className="text-foreground font-medium">{(p.rating ?? 0).toFixed(1)}</span>
                    <span>({(p.numReviews ?? 0).toLocaleString()})</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-lg font-bold">${p.price.toLocaleString()}</span>
                    {p.originalPrice && p.originalPrice > p.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${p.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        id: p._id as unknown as number,
                        name: p.name,
                        price: p.price,
                        img: p.image || productPanel,
                      })
                    }
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-3 py-2.5 text-[11px] uppercase tracking-widest text-background hover:opacity-90"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs uppercase tracking-widest hover:bg-secondary">
            Need a custom system? Get a quote <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
