import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

type LoginSearch = { redirect?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [{ title: "Log in — SaneGreenEnergy" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: redirect || "/" });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome back</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Log in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/register" search={{ redirect }} className="text-foreground underline underline-offset-4 hover:opacity-70">
            Create an account
          </Link>
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-8 shadow-soft">
          <Field label="Email" name="email" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" name="password" type="password" value={password} onChange={setPassword} required />

          {error && <p className="text-xs text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Logging in..." : (<>Log in <LogIn className="h-4 w-4" /></>)}
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
}: {
  label: string;
  name: string;
  type?: string;
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
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:border-foreground focus:outline-none transition-all"
      />
    </div>
  );
}
