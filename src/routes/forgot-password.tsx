import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Reset password — SaneGreenEnergy" }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const msg = await requestPasswordReset(email);
      setMessage(msg);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Forgot password</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the email tied to your account and we'll send you a link to set a new password.
        </p>

        {message ? (
          <div className="mt-8 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <p className="text-sm text-muted-foreground">{message}</p>
            <Link
              to="/login"
              className="mt-6 inline-flex text-sm text-foreground underline underline-offset-4 hover:opacity-70"
            >
              Back to log in
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-sm focus:border-foreground focus:outline-none transition-all"
              />
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Sending..." : (<>Send reset link <Mail className="h-4 w-4" /></>)}
            </button>

            <p className="text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-foreground underline underline-offset-4 hover:opacity-70">
                Back to log in
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
}
