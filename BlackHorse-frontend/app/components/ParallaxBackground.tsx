"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  color?: "purple" | "blue" | "green" | "cyan" | "rose" | "amber";
  intensity?: number; // 0-1
  className?: string;
}

export function ParallaxBackground({
  children,
  color = "purple",
  intensity = 0.5,
  className = "",
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 30 * intensity;
      const y = (e.clientY / window.innerHeight - 0.5) * 30 * intensity;

      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [intensity]);

  const colorGradients: Record<string, string> = {
    purple:
      "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.02) 100%)",
    blue: "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.02) 100%)",
    green:
      "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.02) 100%)",
    cyan: "linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.02) 100%)",
    rose: "linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(244, 63, 94, 0.02) 100%)",
    amber:
      "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.02) 100%)",
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background: colorGradients[color],
      }}
    >
      {/* Parallax background elements */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.2s ease-out",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)",
          transform: `translate(${-mousePos.x * 0.7}px, ${-mousePos.y * 0.7}px)`,
          transition: "transform 0.2s ease-out",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
}
