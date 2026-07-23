import { Heart, MapPin, ShieldCheck, ShoppingCart, Star } from "lucide-react";

export type ProductCardData = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
};

export function ProductCard({ product, onAdd }: { product: ProductCardData; onAdd: (p: ProductCardData) => void }) {
  const p = product;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {p.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground">
            {p.badge}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/95 text-foreground hover:text-primary"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-muted-foreground">
          <MapPin className="h-3 w-3" /> {p.category}
        </span>
        <h3 className="mt-1.5 text-sm font-semibold leading-snug line-clamp-2 min-h-[2.5rem]">{p.name}</h3>

        <div className="mt-3 flex items-center gap-3 border-y border-border py-2.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-foreground text-foreground" /> {p.rating.toFixed(1)}
          </span>
          <span>{p.reviews.toLocaleString()} reviews</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> 25yr
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-bold">₦{p.price.toLocaleString()}</div>
            {p.oldPrice && p.oldPrice > p.price && (
              <div className="text-xs text-muted-foreground line-through">₦{p.oldPrice.toLocaleString()}</div>
            )}
          </div>
          <button
            onClick={() => onAdd(p)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
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
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded-full bg-secondary" />
        <div className="space-y-1.5">
          <div className="h-4 w-full animate-pulse rounded-full bg-secondary" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-secondary" />
        </div>
        <div className="h-9 animate-pulse rounded-lg bg-secondary" />
        <div className="mt-1 flex items-center justify-between">
          <div className="h-5 w-20 animate-pulse rounded-full bg-secondary" />
          <div className="h-9 w-28 animate-pulse rounded-full bg-secondary" />
        </div>
      </div>
    </div>
  );
}
