import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { apiFetch, ApiError } from "@/lib/api";

type CallbackSearch = { reference?: string; trxref?: string };

type Order = {
  _id: string;
  totalPrice: number;
  isPaid: boolean;
  paymentStatus: "pending" | "paid" | "failed";
};

export const Route = createFileRoute("/checkout/callback")({
  validateSearch: (search: Record<string, unknown>): CallbackSearch => ({
    reference: typeof search.reference === "string" ? search.reference : undefined,
    trxref: typeof search.trxref === "string" ? search.trxref : undefined,
  }),
  head: () => ({
    meta: [{ title: "Confirming payment — SaneGreenEnergy" }],
  }),
  component: CheckoutCallback,
});

function CheckoutCallback() {
  const { reference, trxref } = Route.useSearch();
  const { clear } = useCart();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ref = reference || trxref;

  useEffect(() => {
    if (!ref) {
      setStatus("failed");
      setError("Missing payment reference.");
      return;
    }
    apiFetch<Order>(`/orders/verify/${ref}`)
      .then((data) => {
        setOrder(data);
        if (data.isPaid) {
          clear();
          setStatus("success");
        } else {
          setStatus("failed");
        }
      })
      .catch((err) => {
        setError(err instanceof ApiError ? err.message : "Could not verify payment.");
        setStatus("failed");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <section className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-32 text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        {status === "verifying" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin" />
            <h1 className="mt-6 font-display text-2xl font-semibold">Confirming your payment...</h1>
            <p className="mt-2 text-sm text-muted-foreground">Hang tight, this only takes a second.</p>
          </>
        )}

        {status === "success" && order && (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14" />
            <h1 className="mt-6 font-display text-3xl font-semibold">Payment confirmed</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Order <span className="text-foreground">#{order._id.slice(-8)}</span> — ₦
              {order.totalPrice.toLocaleString()} paid.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90"
            >
              Continue shopping
            </Link>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="mx-auto h-14 w-14 text-destructive" />
            <h1 className="mt-6 font-display text-3xl font-semibold">Payment not confirmed</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {error || "We couldn't confirm this payment. If you were charged, contact support with your reference."}
            </p>
            <Link
              to="/checkout"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90"
            >
              Try again
            </Link>
          </>
        )}
      </motion.div>
    </section>
  );
}
