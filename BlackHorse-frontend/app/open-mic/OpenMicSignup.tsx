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
      <div className="form-card" style={{ height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ color: '#10b981', marginBottom: '24px' }}>
          <CheckCircle2 size={64} />
        </div>
        <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>You're on the list!</h3>
        <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px' }}>{message}</p>
        <button className="btn btn-outline" onClick={() => { setIsSuccess(false); setMessage(""); }}>
          Register Another
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" style={{ height: '100%', padding: '32px' }} onSubmit={submit}>
      <h3 style={{ fontSize: '24px', marginBottom: '8px', fontWeight: 700 }}>Join the Lineup</h3>
      <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px' }}>Fill out the form below to secure your spot on stage.</p>
      
      <div className="field" style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={14}/> Stage Name / Full Name</span>
        </label>
        <input 
          name="userName" 
          required 
          placeholder="How should we introduce you?" 
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: '8px',
            color: 'var(--ink)',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      </div>
      
      <div className="field" style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14}/> Email Address</span>
        </label>
        <input 
          name="email" 
          type="email" 
          required 
          placeholder="Where can we send details?" 
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: '8px',
            color: 'var(--ink)',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      </div>
      
      <div className="field" style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={14}/> Select Event Date</span>
        </label>
        <select 
          name="eventId" 
          value={selectedEventId || ""} 
          onChange={(e) => onEventChange?.(Number(e.target.value))}
          required 
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            borderRadius: '8px',
            color: 'var(--ink)',
            fontSize: '15px',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="" disabled>Choose an upcoming date...</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.date} - {event.title}
            </option>
          ))}
        </select>
        <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>
          Or select an event date from the cards below.
        </span>
      </div>
      
      <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
        {loading ? "Registering..." : "Submit Registration"}
      </button>
      
      {message && !isSuccess && (
        <p style={{ color: 'var(--red)', marginTop: '16px', fontSize: '14px', textAlign: 'center' }}>{message}</p>
      )}
    </form>
  );
}
