import { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  imageUrl?: string;
  children?: ReactNode;
}

export function ParallaxHero({
  title,
  subtitle,
  badge,
  imageUrl = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80",
  children,
}: ParallaxHeroProps) {
  return (
    <section className="parallax-hero" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="parallax-grain" />
      <div className="parallax-content">
        {badge && <span className="hero-badge">{badge}</span>}
        <h1 className="hero-title">{title}</h1>
        <p className="hero-copy">{subtitle}</p>
        {children && <div className="hero-actions">{children}</div>}
      </div>
    </section>
  );
}
