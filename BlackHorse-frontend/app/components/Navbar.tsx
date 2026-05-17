"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const mainLinks = [
  ["Home", "/home"],
  ["Open Mic", "/open-mic"],
  ["Entertainment", "/entertainment"],
  ["On Tap", "/on-tap"],
  ["Reservations", "/reservations"],
  ["Gift Cards", "/gift-cards"],
] as const;

const moreLinks = [
  ["Online Orders", "/orders"],
  ["Menu", "/menu"],
  ["Performances", "/performances"],
  ["In the News", "/news"],
  ["Our Story", "/our-story"],
  ["Experiences", "/experiences"],
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link className="brand" href="/home">
          <span className="brand-mark">BH</span>
          <span className="brand-text">Black Horse</span>
        </Link>

        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {mainLinks.map(([label, href]) => (
            <Link
              className={`nav-link ${isActive(href) ? "active" : ""}`}
              href={href}
              key={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="dropdown">
            <button
              className={`dropdown-trigger ${moreOpen ? "open" : ""}`}
              onClick={() => setMoreOpen(!moreOpen)}
              aria-expanded={moreOpen}
            >
              More
              <ChevronDown size={14} className={`chevron ${moreOpen ? "rotated" : ""}`} />
            </button>
            {moreOpen && (
              <div className="dropdown-menu">
                {moreLinks.map(([label, href]) => (
                  <Link
                    className={`dropdown-link ${isActive(href) ? "active" : ""}`}
                    href={href}
                    key={href}
                    onClick={() => { setOpen(false); setMoreOpen(false); }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link className="nav-cta" href="/reservations">Reserve</Link>
        </nav>
      </div>
    </header>
  );
}
