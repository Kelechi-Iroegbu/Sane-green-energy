import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

export function NewsletterCta() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-24 sm:px-8">
      <div className="rounded-3xl bg-[oklch(0.22_0.03_150)] px-8 py-10 sm:px-12 sm:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
              <Mail className="h-5 w-5" />
            </span>
            <p className="text-lg font-semibold text-white">
              Stay updated with the latest tips, offers and energy news.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="text-sm font-medium text-white md:text-right">Thanks — you're subscribed.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex w-full items-center gap-2 rounded-full bg-white/10 p-1.5 pl-5 md:max-w-md"
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[oklch(0.22_0.03_150)] transition-opacity hover:opacity-90"
      >
        <ArrowRight className="h-3.5 w-3.5" /> Subscribe
      </button>
    </form>
  );
}
