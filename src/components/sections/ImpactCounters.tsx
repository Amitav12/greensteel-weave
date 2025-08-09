import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const counters = [
  { label: "Tons Recycled", value: 125000 },
  { label: "CO₂ Saved (kg)", value: 890000 },
  { label: "Clients Served", value: 350 },
];

export default function ImpactCounters() {
  const refs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    refs.current.forEach((el, i) => {
      if (!el) return;
      const target = counters[i].value;
      const obj = { val: 0 } as any;
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toLocaleString();
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        } as any,
      });
    });
  }, []);

  return (
    <section className="container py-12" data-aos="fade-up">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {counters.map((c, idx) => (
          <div key={c.label} className="rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] p-6 text-center shadow-[var(--shadow-elegant)]">
            <span
              ref={(el) => { if (el) refs.current[idx] = el; }}
              className="text-4xl font-extrabold text-primary block"
              aria-label={`${c.label} counter`}
            />
            <p className="mt-2 text-sm text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
