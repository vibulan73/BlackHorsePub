"use client";

import { useState } from "react";
import { Grid3x3, List, BookOpen } from "lucide-react";

export function MenuViewButtons() {
  const [activeView, setActiveView] = useState("grid");

  const viewOptions = [
    { id: "grid", label: "Grid View", icon: Grid3x3 },
    { id: "list", label: "List View", icon: List },
    { id: "book", label: "Menu Book", icon: BookOpen },
  ];

  return (
    <div style={{ display: 'inline-flex', background: 'var(--surface)', padding: '6px', borderRadius: '50px', border: '1px solid var(--border2)' }}>
      {viewOptions.map((option) => {
        const Icon = option.icon;
        const isActive = activeView === option.id;
        return (
          <button
            key={option.id}
            onClick={() => setActiveView(option.id)}
            title={option.label}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
              borderRadius: '50px', cursor: 'pointer',
              background: isActive ? 'var(--glass)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--ink2)',
              fontWeight: isActive ? 600 : 500, fontSize: '14px',
              transition: 'var(--transition)',
              boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
              border: isActive ? '1px solid var(--border)' : '1px solid transparent',
            }}
          >
            <Icon size={16} />
            <span style={{ display: 'none' }}>{option.label}</span> {/* Hidden text on mobile, normally media query but simple for now */}
            <span className="hide-on-mobile">{option.label}</span>
          </button>
        );
      })}
      <style>{`
        @media (max-width: 600px) { .hide-on-mobile { display: none !important; } }
      `}</style>
    </div>
  );
}