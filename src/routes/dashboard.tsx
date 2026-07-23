import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Package,
  MapPin,
  Hash,
  LogOut,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { apiFetch } from "@/lib/api";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — SaneGreenEnergy" }],
  }),
  component: DashboardPage,
});

type OrderItem = {
  product?: string;
  name: string;
  image: string;
  price: number;
  qty: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  shippingAddress: { address: string; city: string; postalCode: string; country: string };
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paymentReference?: string;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
};

function getOrderStatus(order: Order): { label: string; className: string } {
  if (order.isDelivered) return { label: "Delivered", className: "bg-secondary text-primary" };
  if (order.isPaid) return { label: "Paid", className: "bg-secondary text-primary" };
  if (order.paymentStatus === "failed") {
    return { label: "Payment Failed", className: "bg-destructive/10 text-destructive" };
  }
  return { label: "Pending Payment", className: "bg-secondary text-muted-foreground" };
}

function DashboardPage() {
  const { user, isAuthenticated, isReady, logout } = useAuth();
  const { items: cartItems, subtotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      navigate({ to: "/login", search: { redirect: "/dashboard" } });
    }
  }, [isReady, isAuthenticated, navigate]);

  const ordersQuery = useQuery({
    queryKey: ["orders", "mine"],
    queryFn: () => apiFetch<Order[]>("/orders/mine"),
    enabled: isAuthenticated,
  });

  if (!isReady || !isAuthenticated || !user) {
    return <div className="mx-auto max-w-md px-6 py-24 text-center text-sm text-muted-foreground">Loading...</div>;
  }

  const firstName = user.name.split(" ")[0];

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-8 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Dashboard</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">Here's what's happening with your account.</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Current Cart */}
            <div>
              <h2 className="font-display text-xl font-semibold">Current Cart</h2>
              {cartItems.length === 0 ? (
                <div className="mt-4 flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center shadow-card">
                  <ShoppingBag className="mb-4 h-10 w-10 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">Your cart is empty — browse our products</p>
                  <Link
                    to="/products"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Browse Products <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <ul className="space-y-3">
                    {cartItems.map((i) => (
                      <li key={i.id} className="flex items-center gap-4 rounded-xl border border-border p-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <img src={i.img} alt={i.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold">{i.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            Qty {i.qty} · ₦{i.price.toLocaleString()} each
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-bold">₦{(i.price * i.qty).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Subtotal</span>
                    <span className="font-display text-lg font-bold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Checkout Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Order History */}
            <div>
              <h2 className="font-display text-xl font-semibold">Order History</h2>
              {ordersQuery.isLoading ? (
                <div className="mt-4 space-y-3">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-secondary" />
                  ))}
                </div>
              ) : ordersQuery.isError ? (
                <div className="mt-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card">
                  <p className="text-sm text-muted-foreground">Couldn't load your orders. Please refresh.</p>
                </div>
              ) : !ordersQuery.data || ordersQuery.data.length === 0 ? (
                <div className="mt-4 flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center shadow-card">
                  <Package className="mb-4 h-10 w-10 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">You haven't placed any orders yet</p>
                </div>
              ) : (
                <ul className="mt-4 space-y-3">
                  {ordersQuery.data.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Account */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-semibold">Account</h2>
              <div className="mt-4 space-y-1">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" /> Log out
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const status = getOrderStatus(order);

  return (
    <li className="rounded-2xl border border-border bg-card shadow-card">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {order.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="h-11 w-11 overflow-hidden rounded-full border-2 border-card bg-secondary"
              >
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Hash className="h-3.5 w-3.5 text-muted-foreground" />
              {order._id.slice(-8)}
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              · {order.items.length} item{order.items.length !== 1 && "s"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${status.className}`}>
            {status.label}
          </span>
          <span className="font-display text-base font-bold">₦{order.totalPrice.toLocaleString()}</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border p-5">
          <ul className="space-y-2.5">
            {order.items.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <span className="flex-1 truncate">{item.name}</span>
                <span className="text-muted-foreground">× {item.qty}</span>
                <span className="w-24 text-right font-medium">₦{(item.price * item.qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </span>
            <span>Ref: {order.paymentReference || "—"}</span>
          </div>
        </div>
      )}
    </li>
  );
}
