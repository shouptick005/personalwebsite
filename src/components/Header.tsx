"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#results", label: "Results" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "top scrolled" : "top"} id="top">
      <div className="wrap">
        <Link className="name" href="#main">
          Mahimul Hoque
        </Link>
        <nav className="nav" aria-label="Sections">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-primary" href="#teardown">
          Get a free teardown
        </Link>
      </div>
    </header>
  );
}
