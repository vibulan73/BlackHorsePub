"use client";

import { useState } from "react";
import { OpenMicSignup } from "./OpenMicSignup";
import { Mic2, Star, CheckCircle } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export type OpenMicEvent = { id: number; title: string; description?: string; date: string; maxParticipants?: number };

export function OpenMicContent({ events }: { events: OpenMicEvent[] }) {
  const [selectedEventId, setSelectedEventId] = useState<number | undefined>(
    events[0]?.id
  );

  const handleSelectEvent = (id: number) => {
    setSelectedEventId(id);
    const formElement = document.getElementById("signup-form-container");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="section" style={{ padding: '60px 24px' }}>
      <ScrollReveal direction="up">
        <div className="section-header" style={{ marginBottom: '36px' }}>
          <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><Mic2 size={32} /></div>
          <h2>Performer Guidelines</h2>
          <p>Everything you need to know before stepping up to the mic.</p>
        </div>
      </ScrollReveal>

      <div className="grid" style={{ marginBottom: '64px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        <ScrollReveal direction="right">
          <div className="glass-card" style={{ height: '100%', background: 'linear-gradient(135deg, var(--glass), var(--accent-glow2))', padding: '32px' }}>
            <div className="card-icon-wrap" style={{ color: 'var(--accent)', marginBottom: '20px' }}><Star size={24} /></div>
            <h3 className="card-title" style={{ fontSize: '24px', fontWeight: 700 }}>House Rules</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px', padding: 0 }}>
              {[
                "Keep sets tight and engaging (5-15 min)",
                "Respect the room and audience (no hate speech)",
                "Arrive 30 mins early for sound check",
                "Bring only essential gear (we provide DI boxes & mics)",
                "Have fun and enjoy the stage!"
              ].map((rule, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--ink2)', fontSize: '15px' }}>
                  <CheckCircle size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={200}>
          <div id="signup-form-container">
            <OpenMicSignup 
              events={events} 
              selectedEventId={selectedEventId} 
              onEventChange={setSelectedEventId} 
            />
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up">
        <div className="section-header" style={{ marginTop: '80px', marginBottom: '36px' }}>
          <h2>Upcoming Open Mic Nights</h2>
          <p>Find a date that works for you and register below.</p>
        </div>
      </ScrollReveal>

      {events.length > 0 ? (
        <div className="grid" style={{ gap: '24px' }}>
          {events.map((event, i) => {
            const isSelected = selectedEventId === event.id;
            return (
              <ScrollReveal direction="up" delay={(i % 3) * 100} key={event.id}>
                <article 
                  className="glass-card hover-lift" 
                  style={{ 
                    border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border2)',
                    boxShadow: isSelected ? '0 8px 32px rgba(139, 92, 246, 0.2)' : 'none',
                    transition: 'all 0.3s ease',
                    padding: '32px'
                  }}
                >
                  <div className="card-icon-wrap" style={{ color: isSelected ? 'var(--accent)' : 'inherit', marginBottom: '20px' }}>
                    <Mic2 size={24} />
                  </div>
                  <h3 className="card-title" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{event.title}</h3>
                  <p className="event-date" style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '12px', fontSize: '14px' }}>
                    📅 {event.date}
                  </p>
                  {event.maxParticipants && (
                    <span style={{ display: 'inline-block', padding: '4px 10px', background: 'var(--accent-glow)', color: 'var(--accent)', borderRadius: '4px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                      Max {event.maxParticipants} Performers
                    </span>
                  )}
                  <p className="card-desc" style={{ color: 'var(--ink2)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                    {event.description}
                  </p>
                  <button 
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleSelectEvent(event.id)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {isSelected ? 'Selected' : 'Select This Date'}
                  </button>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      ) : (
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--glass)', border: '1px solid var(--border2)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ color: 'var(--muted)', marginBottom: '16px' }}><Mic2 size={48} style={{ margin: '0 auto' }}/></div>
            <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Dates Coming Soon!</h3>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Check back for upcoming open mic night schedules.</p>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
