import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Rate { symbol: string; value: number; prev: number }

const initial: Rate[] = [
  { symbol: "USD/INR", value: 83.2, prev: 83.1 },
  { symbol: "USD/CNY", value: 7.24, prev: 7.25 },
  { symbol: "Iron (INR/kg)", value: 62.4, prev: 62.0 },
  { symbol: "Steel (USD/ton)", value: 690, prev: 685 },
];

export default function LiveDataTicker() {
  const [rates, setRates] = useState<Rate[]>(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setRates((prev) =>
        prev.map((r) => {
          const delta = (Math.random() - 0.5) * (r.value > 10 ? 2 : 0.02);
          return { ...r, prev: r.value, value: +(r.value + delta).toFixed(2) };
        })
      );
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const items = useMemo(() => rates.map((r) => {
    const up = r.value >= r.prev;
    return (
      <div key={r.symbol} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] shadow-sm">
        <span className="text-sm font-medium">{r.symbol}</span>
        <span className={`text-sm font-semibold ${up ? 'text-primary' : 'text-destructive'}`}>{r.value}</span>
        {up ? <ArrowUpRight className="h-4 w-4 text-primary" /> : <ArrowDownRight className="h-4 w-4 text-destructive" />}
      </div>
    );
  }), [rates]);

  return (
    <section className="container py-8" aria-label="Live market data">
      <div className="flex flex-wrap gap-3 items-center justify-center" data-aos="fade-up">
        {items}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">Auto-refreshes every 30 seconds</p>
    </section>
  );
}
