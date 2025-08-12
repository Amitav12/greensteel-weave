import React, { useRef, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { gsap } from 'gsap';
import { SpringButton } from './SpringButton';
import { Phone, Recycle } from "lucide-react";

const nav = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/partners", label: "Partners" },
  { to: "/certifications", label: "Certifications" },
  { to: "/news", label: "News" },
];

export function GSAPNavigation() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const navElement = navRef.current;
    const button = buttonRef.current;

    if (!header || !logo || !navElement || !button) return;

    // Initial animation on mount
    const tl = gsap.timeline();
    
    tl.fromTo(header, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(logo, 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    )
    .fromTo(navElement.children, 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.6"
    )
    .fromTo(button, 
      { scale: 0, rotation: 180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" },
      "-=0.4"
    );

    // Scroll-based header animation
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        gsap.to(header, {
          y: -100,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        // Scrolling up - show header
        gsap.to(header, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-500 backdrop-blur-xl ${
      isActive 
        ? "text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 scale-105" 
        : "text-gray-700 hover:text-gray-900 hover:bg-white/40 hover:scale-110 hover:-translate-y-1"
    }`;

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-2xl"
    >
      <div className="container flex h-20 items-center justify-between px-6">
        <Link to="/" className="group">
          <div
            ref={logoRef}
            className="font-black tracking-tight text-2xl text-gray-900 drop-shadow-lg group-hover:text-green-600 transition-colors duration-500 flex items-center gap-3 hover:scale-110 transition-transform duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            AAASHA TRADING LTD
          </div>
        </Link>
        
        <nav ref={navRef} className="hidden md:flex items-center gap-2">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={getNavCls} end>
              {n.label}
            </NavLink>
          ))}
        </nav>
        
        <div ref={buttonRef} className="flex items-center gap-4">
          <NavLink to="/contact">
            <SpringButton 
              variant="magnetic"
              icon={<Phone className="w-4 h-4" />}
              className="font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3"
            >
              Contact Us
            </SpringButton>
          </NavLink>
        </div>
      </div>
    </header>
  );
}