"use client";

import { useMemo, useState } from "react";
import type { MenuItem } from "../lib/api";
import { ScrollReveal } from "../components/ScrollReveal";

export function MenuFilter({ items }: { items: MenuItem[] }) {
  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean))) as string[];
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => category === "All" ? items : items.filter((item) => item.category === category), [items, category]);

  return (
    <>
      <ScrollReveal direction="fade" delay={300}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
          {["All", "Full Menu", "Wine List", "Cocktails", ...categories.filter((item) => !["Full Menu", "Wine List", "Cocktails"].includes(item))].map((item) => (
            <button 
              className={`btn ${category === item ? "btn-primary" : "btn-ghost"}`} 
              key={item} 
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </ScrollReveal>
      
      <div className="grid">
        {filtered.map((item, i) => (
          <ScrollReveal direction="up" delay={(i % 6) * 100} key={item.id}>
            <article className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {item.imageUrl && (
                <div style={{ margin: '-32px -32px 24px -32px', height: '200px', overflow: 'hidden', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 className="card-title" style={{ margin: 0 }}>{item.name}</h3>
                {item.price ? <span className="price">${item.price.toFixed(2)}</span> : null}
              </div>
              <span style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'block' }}>
                {item.category}
              </span>
              <p className="card-desc" style={{ flex: 1, margin: 0 }}>{item.description}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
