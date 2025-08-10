import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <main>
      <SEO title="Contact — AAASHA TRADING LTD" description="Get in touch with AAASHA TRADING LTD for inquiries and partnerships." />
      <section className="container py-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">We'd love to hear from you. Fill out the form and our team will get back soon.</p>
        <form className="mt-8 grid gap-4 max-w-2xl">
          <Input placeholder="Your name" required aria-label="Your name" />
          <Input placeholder="Email" type="email" required aria-label="Email" />
          <Textarea placeholder="Message" rows={5} required aria-label="Message" />
          <Button variant="hero" className="justify-self-start">Send Message</Button>
        </form>
      </section>
    </main>
  );
}
