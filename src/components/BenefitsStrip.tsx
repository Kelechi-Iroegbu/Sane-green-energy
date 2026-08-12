import { FileText, Briefcase, Truck, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: FileText, t: "Best Prices", d: "Competitive & transparent" },
  { icon: Briefcase, t: "Secure Payments", d: "Safe and trusted checkout" },
  { icon: Truck, t: "Fast Delivery", d: "Delivered to your door" },
  { icon: ShieldCheck, t: "Warranty Included", d: "Peace of mind guaranteed" },
];

export function BenefitsStrip() {
  return (
    <section className="bg-secondary/60 py-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 px-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.t} className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card shadow-soft">
              <b.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">{b.t}</div>
              <div className="text-xs text-muted-foreground">{b.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
