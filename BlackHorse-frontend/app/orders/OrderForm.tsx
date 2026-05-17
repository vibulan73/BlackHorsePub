"use client";

import { FormEvent, useState } from "react";
import { API_BASE, MenuItem } from "../lib/api";
import { CheckCircle2, User, UtensilsCrossed, Hash, Car, ShoppingBag } from "lucide-react";

export function OrderForm({ items }: { items: MenuItem[] }) {
  const [type, setType] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const itemId = Number(form.get("itemId"));
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          type,
          items: [{ item: { id: itemId }, quantity: Number(form.get("quantity")) }]
        })
      });
      if (response.ok) {
        setIsSuccess(true);
        setMessage("Order received. Our kitchen is getting to work!");
        event.currentTarget.reset();
      } else {
        setMessage("Order could not be submitted. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="form-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ color: '#10b981', display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <CheckCircle2 size={64} />
        </div>
        <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>Order Placed!</h3>
        <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px' }}>{message}</p>
        <button className="btn btn-outline" onClick={() => { setIsSuccess(false); setMessage(""); }}>
          Start New Order
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px', background: 'var(--bg2)', padding: '8px', borderRadius: '50px', border: '1px solid var(--border2)' }}>
        <button 
          type="button" 
          onClick={() => setType("PICKUP")}
          style={{ flex: 1, padding: '12px 24px', border: 'none', borderRadius: '50px', background: type === "PICKUP" ? 'var(--accent)' : 'transparent', color: type === "PICKUP" ? '#000' : 'var(--ink2)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'var(--transition)' }}
        >
          <ShoppingBag size={18} /> Pickup
        </button>
        <button 
          type="button" 
          onClick={() => setType("DELIVERY")}
          style={{ flex: 1, padding: '12px 24px', border: 'none', borderRadius: '50px', background: type === "DELIVERY" ? 'var(--accent)' : 'transparent', color: type === "DELIVERY" ? '#000' : 'var(--ink2)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'var(--transition)' }}
        >
          <Car size={18} /> Delivery
        </button>
      </div>

      <div className="form-row">
        <label className="field" style={{ gridColumn: '1 / -1' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={14}/> Full Name</span>
          <input name="customerName" placeholder="Enter your name" required />
        </label>
      </div>
      
      <div className="form-row">
        <label className="field" style={{ flex: 2 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><UtensilsCrossed size={14}/> Select Item</span>
          <select name="itemId" required>
            {items.map((item) => (
              <option value={item.id} key={item.id}>{item.name} {item.price ? `($${item.price.toFixed(2)})` : ""}</option>
            ))}
          </select>
        </label>
        <label className="field" style={{ flex: 1 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Hash size={14}/> Quantity</span>
          <input name="quantity" type="number" min="1" defaultValue="1" required />
        </label>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', maxWidth: '300px' }}>
          {loading ? "Processing..." : "Complete Checkout"}
        </button>
        {message && !isSuccess && (
          <p style={{ color: 'var(--red)', marginTop: '16px', fontSize: '14px' }}>{message}</p>
        )}
      </div>
    </form>
  );
}
