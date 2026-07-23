import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ApiError } from "@/lib/api";

type RegisterSearch = { redirect?: string };

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): RegisterSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [{ title: "Create account — SaneGreenEnergy" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const { pendingItem, addItem, setPendingItem } = useCart();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(name, email, password);
      if (pendingItem) {
        addItem(pendingItem);
        toast.success("Added to cart", { description: pendingItem.name });
        setPendingItem(null);
      }
      navigate({ to: redirect || "/dashboard" });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Join SaneGreenEnergy</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have one?{" "}
          <Link to="/login" search={{ redirect }} className="text-foreground underline underline-offset-4 hover:opacity-70">
            Log in
          </Link>
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <Field label="Name" name="name" value={name} onChange={setName} required />
          <Field label="Email" name="email" type="email" value={email} onChange={setEmail} required />
          <Field
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            required
            minLength={6}
          />

          {error && <p className="text-xs text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Creating account..." : (<>Create account <UserPlus className="h-4 w-4" /></>)}
          </button>
        </form>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  minLength,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:border-foreground focus:outline-none transition-all"
      />
    </div>
  );
}
