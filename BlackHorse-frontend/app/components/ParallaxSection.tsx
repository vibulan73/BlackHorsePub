"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  accent?: "purple" | "green" | "cyan" | "blue";
  className?: string;
}

export function ParallaxSection({ children, accent = "purple", className = "" }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate vertical position relative to viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        setOffset((windowHeight - rect.top) * 0.05);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const accentClass = `accent-section-${accent}`;

  return (
    <section
      ref={sectionRef}
      className={`parallax-section ${accentClass} ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {/* Floating elements */}
      <div className="parallax-float parallax-float-1" />
      <div className="parallax-float parallax-float-2" />
      <div className="parallax-float parallax-float-3" />
      
      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {children}
      </div>
    </section>
  );
}
