import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { apiFetch, ApiError } from "@/lib/api";

export const Route = createFileRoute("/checkout/")({
  head: () => ({
    meta: [{ title: "Checkout — SaneGreenEnergy" }],
  }),
  component: CheckoutPage,
});

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

function CheckoutPage() {
  const { isAuthenticated, isReady } = useAuth();
  const { items, subtotal } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState<ShippingAddress>({
    address: "",
    city: "",
    postalCode: "",
    country: "Nigeria",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      navigate({ to: "/login", search: { redirect: "/checkout" } });
    }
  }, [isReady, isAuthenticated, navigate]);

  if (!isReady || !isAuthenticated) {
    return <div className="mx-auto max-w-md px-6 py-24 text-center text-sm text-muted-foreground">Loading...</div>;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const { authorizationUrl } = await apiFetch<{ authorizationUrl: string }>("/orders", {
        method: "POST",
        body: JSON.stringify({ items, shippingAddress: shipping, paymentMethod: "Card" }),
      });

      window.location.href = authorizationUrl;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Checkout</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Shipping details</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-5">
          <form onSubmit={onSubmit} className="md:col-span-3 space-y-5 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <Field
              label="Street address"
              value={shipping.address}
              onChange={(v) => setShipping((s) => ({ ...s, address: v }))}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="City"
                value={shipping.city}
                onChange={(v) => setShipping((s) => ({ ...s, city: v }))}
                required
              />
              <Field
                label="State"
                value={shipping.postalCode}
                onChange={(v) => setShipping((s) => ({ ...s, postalCode: v }))}
                required
              />
            </div>
            <Field
              label="Country"
              value={shipping.country}
              onChange={(v) => setShipping((s) => ({ ...s, country: v }))}
              required
            />

            {error && <p className="text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Redirecting to Paystack..." : (<>Pay with Paystack <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 h-fit">
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Order summary</h2>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            ) : (
              <ul className="space-y-3">
                {items.map((i) => (
                  <li key={i.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 pr-2">{i.name} × {i.qty}</span>
                    <span className="font-medium">₦{(i.price * i.qty).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl font-bold">₦{subtotal.toLocaleString()}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Shipping is calculated at payment.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:border-foreground focus:outline-none transition-all"
      />
    </div>
  );
}
