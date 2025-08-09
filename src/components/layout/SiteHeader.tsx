import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/partners", label: "Partners" },
  { to: "/certifications", label: "Certifications" },
  { to: "/news", label: "News" },
];

export default function SiteHeader() {
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[hsl(var(--glass-bg))] border-b border-[hsl(var(--glass-border))]">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-extrabold tracking-tight text-lg">
          AAASHA TRADING LTD
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={getNavCls} end>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <NavLink to="/contact">
            <Button variant="hero" size="lg">Contact Us</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
