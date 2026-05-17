"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxFloatProps {
  depth?: number; // 0-1, where 1 is move most, 0 is move least
  size?: "sm" | "md" | "lg";
  color?: "purple" | "green" | "cyan" | "blue" | "rose" | "amber";
  className?: string;
}

export function ParallaxFloat({
  depth = 0.5,
  size = "md",
  color = "purple",
  className = "",
}: ParallaxFloatProps) {
  const floatRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!floatRef.current) return;
      
      const x = (e.clientX / window.innerWidth - 0.5) * 40 * depth;
      const y = (e.clientY / window.innerHeight - 0.5) * 40 * depth;
      
      setPosition({ x, y });
    };

    const handleScroll = () => {
      if (!floatRef.current) return;
      const scrolled = window.scrollY * depth * 0.1;
      setPosition(prev => ({ ...prev, y: prev.y + scrolled }));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [depth]);

  const sizeMap = { sm: "40px", md: "60px", lg: "100px" };
  const colorMap: Record<string, string> = {
    purple: "rgba(139, 92, 246, 0.25)",
    green: "rgba(16, 185, 129, 0.25)",
    cyan: "rgba(6, 182, 212, 0.25)",
    blue: "rgba(59, 130, 246, 0.25)",
    rose: "rgba(244, 63, 94, 0.25)",
    amber: "rgba(245, 158, 11, 0.25)",
  };

  return (
    <div
      ref={floatRef}
      className={`parallax-float ${className}`}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        background: `radial-gradient(circle, ${colorMap[color]}, transparent)`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out",
        borderRadius: "50%",
        pointerEvents: "none",
        position: "absolute",
      }}
    />
  );
}
