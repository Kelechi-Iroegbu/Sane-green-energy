import { Heart, ShoppingCart } from "lucide-react";
import { iconForCategory } from "@/lib/category-icons";

export type ProductCardData = {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
};

export function ProductCard({ product, onAdd }: { product: ProductCardData; onAdd: (p: ProductCardData) => void }) {
  const p = product;
  const CategoryIcon = iconForCategory(p.category);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-secondary/70">
        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/95 text-foreground hover:text-primary"
        >
          <Heart className="h-4 w-4" />
        </button>
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CategoryIcon className="h-16 w-16 text-primary/60" strokeWidth={1.25} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{p.category}</span>
        <h3 className="mt-1 text-sm font-semibold leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>

        <div className="mt-3 flex flex-1 items-end justify-between gap-2">
          <div className="text-base font-bold">₦{p.price.toLocaleString()}</div>
          <button
            aria-label="Add to cart"
            onClick={() => onAdd(p)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[4/3] animate-pulse bg-secondary" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded-full bg-secondary" />
        <div className="space-y-1.5">
          <div className="h-4 w-full animate-pulse rounded-full bg-secondary" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-secondary" />
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="h-5 w-20 animate-pulse rounded-full bg-secondary" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-secondary" />
        </div>
      </div>
    </div>
  );
}
