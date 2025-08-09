import SEO from "@/components/seo/SEO";

export default function Products() {
  return (
    <main className="min-h-[60vh]">
      <SEO title="Products — AAASHA TRADING LTD" description="Steel coils, sheets, structural steel, pipes, and recycled materials." />
      <section className="container py-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold">Products</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Explore our steel categories and recycled materials. Advanced filtering, quick views, and specs coming soon.</p>
      </section>
    </main>
  );
}
