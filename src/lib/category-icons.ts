import { Sun, Battery, Cpu, Plug, Package, Zap, type LucideIcon } from "lucide-react";

const iconByKeyword: Record<string, LucideIcon> = {
  panel: Sun,
  panels: Sun,
  solar: Sun,
  battery: Battery,
  batteries: Battery,
  inverter: Cpu,
  inverters: Cpu,
  charger: Plug,
  chargers: Plug,
  accessory: Package,
  accessories: Package,
};

export function iconForCategory(category: string | undefined): LucideIcon {
  const key = category?.toLowerCase() ?? "";
  for (const [needle, icon] of Object.entries(iconByKeyword)) {
    if (key.includes(needle)) return icon;
  }
  return Zap;
}
