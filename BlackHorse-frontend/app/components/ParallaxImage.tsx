"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  speed?: number; // 0-1, higher = moves faster
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function ParallaxImage({
  src,
  alt = "",
  speed = 0.5,
  className = "",
  style = {},
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only apply parallax if element is visible
      if (rect.top < windowHeight && rect.bottom > 0) {
        const traveled = windowHeight - rect.top;
        const movement = (traveled * speed) / 10;
        setOffset(movement);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`parallax-image-container ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      {children}
    </div>
  );
}
