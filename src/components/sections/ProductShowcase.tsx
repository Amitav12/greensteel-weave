import { useEffect, useState } from "react";
import coils from "@/assets/product-steel-coils.jpg";
import pipes from "@/assets/product-steel-pipes.jpg";
import beams from "@/assets/product-structural-steel.jpg";

const products = [
  { name: "Steel Coils", image: coils },
  { name: "Steel Pipes", image: pipes },
  { name: "Structural Steel", image: beams },
];

export default function ProductShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 3000);
    return () => clearInterval(id);
  }, []);

  const current = products[index];

  return (
    <section className="container py-14" data-aos="fade-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
        <p className="text-muted-foreground mt-2">Auto-sliding 3D showcase</p>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] shadow-[var(--shadow-elegant)] transition-transform duration-300 will-change-transform">
          <img src={current.image} alt={`${current.name} product image`} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="inline-block rounded-lg bg-[hsl(var(--glass-bg))] border border-[hsl(var(--glass-border))] px-4 py-2 shadow-sm">
              <span className="font-semibold">{current.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
