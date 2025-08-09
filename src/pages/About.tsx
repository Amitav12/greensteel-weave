import SEO from "@/components/seo/SEO";

export default function About() {
  return (
    <main>
      <SEO title="About — AAASHA TRADING LTD" description="Our story, mission, and commitment to environmental responsibility." />
      <section className="container py-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          AAASHA TRADING LTD is committed to sustainable recycling and premium steel trading. Our mission is to reduce environmental impact while delivering world-class materials and service.
        </p>
      </section>
      <section className="container py-12 grid gap-6 md:grid-cols-3" data-aos="fade-up">
        <div className="rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] p-6"><h3 className="font-semibold">History</h3><p className="text-sm text-muted-foreground mt-2">Founded with a vision for circular economy and quality trading.</p></div>
        <div className="rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] p-6"><h3 className="font-semibold">Mission</h3><p className="text-sm text-muted-foreground mt-2">Driving sustainability through responsible sourcing and recycling.</p></div>
        <div className="rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] p-6"><h3 className="font-semibold">Commitment</h3><p className="text-sm text-muted-foreground mt-2">Environmental stewardship, safety, and integrity.</p></div>
      </section>
    </main>
  );
}
