"use client";

import { useState } from "react";
import { OpenMicSignup } from "./OpenMicSignup";
import { Mic2, Star, CheckCircle } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export type OpenMicEvent = { id: number; title: string; description?: string; date: string; maxParticipants?: number };

// Premium animated house rule list item
function HouseRuleItem({ rule }: { rule: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        color: hovered ? 'var(--ink)' : 'var(--ink2)',
        fontSize: '15px',
        transform: hovered ? 'translateX(8px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        padding: '2px 0'
      }}
    >
      <CheckCircle
        size={18}
        style={{
          color: hovered ? 'var(--accent)' : 'var(--accent-glow)',
          transform: hovered ? 'scale(1.25) rotate(360deg)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          flexShrink: 0,
          marginTop: '2px',
        }}
      />
      <span style={{ fontWeight: hovered ? 600 : 400, transition: 'color 0.2s ease' }}>{rule}</span>
    </li>
  );
}

// Premium animated event selection card
function OpenMicEventCard({ 
  event, 
  isSelected, 
  onSelect 
}: { 
  event: OpenMicEvent; 
  isSelected: boolean; 
  onSelect: () => void 
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isSelected 
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0.04) 100%)' 
          : 'var(--glass)',
        border: isSelected 
          ? '2px solid var(--accent)' 
          : hovered 
            ? '1.5px solid var(--accent)' 
            : '1px solid var(--border2)',
        boxShadow: isSelected 
          ? '0 16px 40px rgba(139, 92, 246, 0.22)' 
          : hovered 
            ? '0 12px 30px rgba(139, 92, 246, 0.12)' 
            : 'var(--shadow)',
        transform: hovered ? 'translateY(-8px)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        padding: '36px',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Decorative premium hover glow */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div 
          style={{ 
            width: '52px', 
            height: '52px', 
            borderRadius: '14px',
            background: isSelected ? 'var(--accent)' : hovered ? 'var(--accent-glow)' : 'var(--surface2)',
            color: isSelected ? '#fff' : hovered ? 'var(--accent)' : 'var(--ink2)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '24px',
            transform: hovered ? 'scale(1.1) rotate(10deg)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: isSelected ? '0 8px 16px rgba(139, 92, 246, 0.3)' : 'none'
          }}
        >
          <Mic2 size={24} />
        </div>

        <h3 className="card-title" style={{ fontSize: '22px', fontWeight: 800, marginBottom: '10px', color: 'var(--ink)' }}>{event.title}</h3>
        
        <p className="event-date" style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '16px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ transform: hovered ? 'scale(1.2)' : 'none', transition: 'all 0.3s' }}>📅</span> {event.date}
        </p>

        {event.maxParticipants && (
          <span style={{ 
            display: 'inline-block', 
            padding: '6px 12px', 
            background: isSelected ? 'var(--accent)' : 'var(--accent-glow)', 
            color: isSelected ? '#fff' : 'var(--accent)', 
            borderRadius: '50px', 
            fontSize: '11px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            marginBottom: '20px',
            boxShadow: isSelected ? '0 4px 12px rgba(139, 92, 246, 0.2)' : 'none'
          }}>
            Max {event.maxParticipants} Performers
          </span>
        )}

        <p className="card-desc" style={{ color: 'var(--ink2)', fontSize: '14.5px', lineHeight: 1.7, marginBottom: '28px' }}>
          {event.description}
        </p>
      </div>

      <button 
        className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
        onClick={onSelect}
        style={{ 
          width: '100%', 
          justifyContent: 'center',
          transform: hovered && !isSelected ? 'translateY(-2px)' : 'none',
          boxShadow: hovered && !isSelected ? '0 6px 16px rgba(139, 92, 246, 0.15)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {isSelected ? '✓ Selected' : 'Select This Date'}
      </button>
    </article>
  );
}

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

  const [cardHovered, setCardHovered] = useState(false);

  return (
    <section className="section" style={{ padding: '80px 24px' }}>
      <ScrollReveal direction="up">
        <div className="section-header" style={{ marginBottom: '48px' }}>
          <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><Mic2 size={36} /></div>
          <h2 style={{ fontSize: '42px', fontWeight: 900 }}>Performer Guidelines</h2>
          <p>Everything you need to know before stepping up to the mic.</p>
        </div>
      </ScrollReveal>

      <div className="grid" style={{ marginBottom: '80px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'stretch' }}>
        <ScrollReveal direction="right">
          <div 
            className="glass-card" 
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            style={{ 
              height: '100%', 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(139, 92, 246, 0.08) 100%)', 
              padding: '40px',
              border: cardHovered ? '1.5px solid var(--accent)' : '1px solid var(--border2)',
              boxShadow: cardHovered ? '0 16px 40px rgba(139, 92, 246, 0.15)' : 'var(--shadow)',
              transform: cardHovered ? 'translateY(-6px)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div 
              className="card-icon-wrap" 
              style={{ 
                color: '#fff', 
                background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
                marginBottom: '24px',
                transform: cardHovered ? 'scale(1.1) rotate(-5deg)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <Star size={24} />
            </div>
            <h3 className="card-title" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)' }}>House Rules</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '28px', padding: 0 }}>
              {[
                "Keep sets tight and engaging (5-15 min)",
                "Respect the room and audience (no hate speech)",
                "Arrive 30 mins early for sound check",
                "Bring only essential gear (we provide DI boxes & mics)",
                "Have fun and enjoy the stage!"
              ].map((rule, i) => (
                <HouseRuleItem key={i} rule={rule} />
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={200}>
          <div id="signup-form-container" style={{ height: '100%' }}>
            <OpenMicSignup 
              events={events} 
              selectedEventId={selectedEventId} 
              onEventChange={setSelectedEventId} 
            />
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up">
        <div className="section-header" style={{ marginTop: '100px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '38px', fontWeight: 900 }}>Upcoming Open Mic Nights</h2>
          <p>Find a date that works for you and register below.</p>
        </div>
      </ScrollReveal>

      {events.length > 0 ? (
        <div className="grid" style={{ gap: '32px', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {events.map((event, i) => {
            const isSelected = selectedEventId === event.id;
            return (
              <ScrollReveal direction="up" delay={(i % 3) * 100} key={event.id}>
                <OpenMicEventCard
                  event={event}
                  isSelected={isSelected}
                  onSelect={() => handleSelectEvent(event.id)}
                />
              </ScrollReveal>
            );
          })}
        </div>
      ) : (
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--glass)', border: '1px solid var(--border2)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)' }}>
            <div style={{ color: 'var(--muted)', marginBottom: '20px' }}><Mic2 size={48} style={{ margin: '0 auto', opacity: 0.5 }}/></div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: 'var(--ink)' }}>Dates Coming Soon!</h3>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Check back for upcoming open mic night schedules.</p>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
