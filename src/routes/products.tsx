import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowRight, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import productPanel from "@/assets/product-panel.jpg";
import premiumInstall from "@/assets/premium-install.jpg";
import { useCart } from "@/context/CartContext";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";

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
      { title: "All Products — SaneGreenEnergy Solar Marketplace" },
      { name: "description", content: "Browse the full SaneGreenEnergy catalog: solar panels, batteries, inverters, EV chargers and accessories." },
      { property: "og:title", content: "All Products — SaneGreenEnergy" },
      { property: "og:description", content: "Browse panels, batteries, inverters and EV chargers in the SaneGreenEnergy marketplace." },
      { property: "og:image", content: premiumInstall },
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

  const isSlow = useSlowLoad(productsQuery.isLoading);

  const categories = useMemo(() => {
    const list = categoriesQuery.data ?? [];
    return ["All", ...list.map((c) => c.name)];
  }, [categoriesQuery.data]);

  const products = productsQuery.data ?? [];

  return (
    <div className="bg-secondary/60 px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-card shadow-card">
        <section className="px-6 pt-12 sm:px-10 md:pt-16">
          <div className="grid gap-10 md:grid-cols-2 items-end">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Marketplace</span>
              <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05]">
                All Products
              </h1>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The complete SaneGreenEnergy catalog — panels, batteries, inverters and EV chargers, curated for performance and built to last.
            </p>
          </div>

          <div className="mt-8 flex w-full items-stretch rounded-full border border-border bg-background shadow-soft overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the catalog…"
              className="flex-1 bg-transparent px-6 py-4 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <button className="m-1.5 inline-flex items-center gap-2 rounded-full bg-primary px-6 text-sm text-primary-foreground hover:opacity-90">
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
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="px-6 pt-10 pb-24 sm:px-10">
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
            <div className="rounded-3xl border border-border bg-background p-16 text-center">
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
            <div className="rounded-3xl border border-border bg-background p-16 text-center">
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
                    oldPrice: p.originalPrice,
                    rating: p.rating ?? 0,
                    reviews: p.numReviews ?? 0,
                    badge: p.featured ? "Featured" : undefined,
                    image: p.image || productPanel,
                  }}
                  onAdd={(item) =>
                    addItem({
                      id: item.id as unknown as number,
                      name: item.name,
                      price: item.price,
                      img: item.image,
                    })
                  }
                />
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs uppercase tracking-widest hover:bg-secondary">
              Need a custom system? Get a quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
