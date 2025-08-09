export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))]">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">AAASHA TRADING LTD</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Sustainable recycling and premium steel trading.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:underline" href="/about">About</a></li>
            <li><a className="hover:underline" href="/products">Products</a></li>
            <li><a className="hover:underline" href="/partners">Partners</a></li>
            <li><a className="hover:underline" href="/news">News</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm text-muted-foreground mt-3">info@aaasha-trading.com</p>
        </div>
      </div>
      <div className="border-t border-[hsl(var(--glass-border))]">
        <div className="container py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} AAASHA TRADING LTD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
