"use client";

import { FormEvent, useState } from "react";
import { API_BASE } from "../lib/api";
import { CheckCircle2, User, Mail, Calendar } from "lucide-react";
import type { OpenMicEvent } from "./OpenMicContent";

export function OpenMicSignup({ 
  events, 
  selectedEventId, 
  onEventChange 
}: { 
  events: OpenMicEvent[];
  selectedEventId?: number;
  onEventChange?: (id: number) => void;
}) {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Track focus for each input to trigger premium animations
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [formHovered, setFormHovered] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${API_BASE}/open-mic/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.get("userName"),
          email: form.get("email"),
          eventId: Number(form.get("eventId"))
        })
      });
      if (response.ok) {
        setIsSuccess(true);
        setMessage("Registration received. We'll be in touch with details!");
        event.currentTarget.reset();
      } else {
        setMessage("Registration could not be submitted. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div 
        className="glass-card" 
        style={{ 
          height: '100%', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1.5px solid var(--emerald)',
          boxShadow: '0 20px 48px rgba(16, 185, 129, 0.15)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div style={{ color: 'var(--emerald)', marginBottom: '24px', animation: 'scaleUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <CheckCircle2 size={72} />
        </div>
        <h3 style={{ fontSize: '30px', fontWeight: 900, marginBottom: '16px', color: 'var(--ink)' }}>You're on the list!</h3>
        <p style={{ color: 'var(--ink2)', fontSize: '16px', marginBottom: '32px', maxWidth: '320px', lineHeight: 1.6 }}>{message}</p>
        <button className="btn btn-outline" onClick={() => { setIsSuccess(false); setMessage(""); }} style={{ border: '2px solid var(--emerald)', color: 'var(--emerald)' }}>
          Register Another
        </button>
        <style>{`
          @keyframes scaleUp {
            from { transform: scale(0.6); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  const getLabelStyle = (fieldName: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 700,
    color: focusedField === fieldName ? 'var(--accent)' : 'var(--ink)',
    transition: 'all 0.3s ease',
    marginBottom: '8px'
  });

  const getIconStyle = (fieldName: string) => ({
    color: focusedField === fieldName ? 'var(--accent)' : hoveredField === fieldName ? 'var(--cyan)' : 'var(--muted)',
    transform: focusedField === fieldName ? 'scale(1.2) translateY(-1px)' : 'none',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    display: 'flex'
  });

  const getInputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '14px 18px',
    background: 'var(--surface2)',
    border: focusedField === fieldName 
      ? '1.5px solid var(--accent)' 
      : hoveredField === fieldName 
        ? '1px solid var(--cyan)' 
        : '1px solid var(--border2)',
    borderRadius: '10px',
    color: 'var(--ink)',
    fontSize: '15px',
    outline: 'none',
    boxShadow: focusedField === fieldName 
      ? '0 0 16px rgba(139, 92, 246, 0.15)' 
      : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'text'
  });

  return (
    <form 
      className="glass-card" 
      onMouseEnter={() => setFormHovered(true)}
      onMouseLeave={() => setFormHovered(false)}
      style={{ 
        height: '100%', 
        padding: '40px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: formHovered ? '1.5px solid var(--cyan)' : '1px solid var(--border2)',
        boxShadow: formHovered ? '0 16px 40px rgba(6, 182, 212, 0.15)' : 'var(--shadow)',
        transform: formHovered ? 'translateY(-6px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        borderRadius: 'var(--radius-lg)'
      }} 
      onSubmit={submit}
    >
      <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 800, color: 'var(--ink)' }}>Join the Lineup</h3>
      <p style={{ color: 'var(--ink2)', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>Fill out the form below to secure your spot on stage.</p>
      
      {/* Name Input */}
      <div 
        className="field" 
        style={{ marginBottom: '24px' }}
        onMouseEnter={() => setHoveredField("userName")}
        onMouseLeave={() => setHoveredField(null)}
      >
        <label style={getLabelStyle("userName")}>
          <span style={getIconStyle("userName")}><User size={16}/></span>
          <span>Stage Name / Full Name</span>
        </label>
        <input 
          name="userName" 
          required 
          placeholder="How should we introduce you?" 
          onFocus={() => setFocusedField("userName")}
          onBlur={() => setFocusedField(null)}
          style={getInputStyle("userName")}
        />
      </div>
      
      {/* Email Input */}
      <div 
        className="field" 
        style={{ marginBottom: '24px' }}
        onMouseEnter={() => setHoveredField("email")}
        onMouseLeave={() => setHoveredField(null)}
      >
        <label style={getLabelStyle("email")}>
          <span style={getIconStyle("email")}><Mail size={16}/></span>
          <span>Email Address</span>
        </label>
        <input 
          name="email" 
          type="email" 
          required 
          placeholder="Where can we send details?" 
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          style={getInputStyle("email")}
        />
      </div>
      
      {/* Event Select Dropdown */}
      <div 
        className="field" 
        style={{ marginBottom: '36px' }}
        onMouseEnter={() => setHoveredField("eventId")}
        onMouseLeave={() => setHoveredField(null)}
      >
        <label style={getLabelStyle("eventId")}>
          <span style={getIconStyle("eventId")}><Calendar size={16}/></span>
          <span>Select Event Date</span>
        </label>
        <select 
          name="eventId" 
          value={selectedEventId || ""} 
          onChange={(e) => onEventChange?.(Number(e.target.value))}
          required 
          onFocus={() => setFocusedField("eventId")}
          onBlur={() => setFocusedField(null)}
          style={{
            ...getInputStyle("eventId"),
            cursor: 'pointer',
            paddingRight: '36px' // more space for native arrow
          }}
        >
          <option value="" disabled>Choose an upcoming date...</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.date} - {event.title}
            </option>
          ))}
        </select>
        <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginTop: '8px', paddingLeft: '4px' }}>
          💡 Tip: You can also select an event date directly from the cards below!
        </span>
      </div>
      
      <button 
        className="btn btn-primary" 
        type="submit" 
        disabled={loading} 
        style={{ 
          width: '100%', 
          justifyContent: 'center', 
          background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
          fontWeight: 800,
          letterSpacing: '0.5px',
          boxShadow: formHovered ? '0 8px 24px var(--accent-glow)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {loading ? "Registering..." : "Submit Registration"}
      </button>
      
      {message && !isSuccess && (
        <p style={{ color: 'var(--red)', marginTop: '20px', fontSize: '14.5px', textAlign: 'center', fontWeight: 600 }}>⚠️ {message}</p>
      )}
    </form>
  );
}
