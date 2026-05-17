"use client";

import { useState } from "react";
import { OpenMicSignup } from "./OpenMicSignup";
import { Mic2, Star, CheckCircle } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export type OpenMicEvent = { id: number; title: string; description?: string; date: string; maxParticipants?: number };

// Animated Music Visualizer subcomponent
function SoundwaveVisualizer({ active }: { active: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '24px', marginLeft: 'auto', paddingRight: '8px' }}>
      {[0.6, 1.1, 0.8, 1.3, 0.5, 0.9].map((delay, i) => (
        <span
          key={i}
          className="sound-bar"
          style={{
            animationDelay: `${delay}s`,
            animationPlayState: active ? 'running' : 'paused',
            width: '3px',
            borderRadius: '3px',
            opacity: active ? 1 : 0.4,
            transition: 'opacity 0.3s ease'
          }}
        />
      ))}
    </div>
  );
}

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

// Premium animated event selection card with Dynamic Color Spectrum themes
function OpenMicEventCard({ 
  event, 
  isSelected, 
  onSelect,
  index
}: { 
  event: OpenMicEvent; 
  isSelected: boolean; 
  onSelect: () => void;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  // Dynamic Rainbow Theme selector
  const themes = [
    { name: "purple", primary: "var(--accent)", glow: "var(--accent-glow)", shadow: "rgba(139, 92, 246, 0.25)" },
    { name: "cyan", primary: "var(--cyan)", glow: "rgba(6, 182, 212, 0.18)", shadow: "rgba(6, 182, 212, 0.25)" },
    { name: "rose", primary: "var(--rose)", glow: "rgba(244, 63, 94, 0.18)", shadow: "rgba(244, 63, 94, 0.25)" },
    { name: "emerald", primary: "var(--emerald)", glow: "rgba(16, 185, 129, 0.18)", shadow: "rgba(16, 185, 129, 0.25)" }
  ];
  const theme = themes[index % themes.length];

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isSelected 
          ? `linear-gradient(135deg, ${theme.glow} 0%, rgba(255, 255, 255, 0.04) 100%)` 
          : 'var(--glass)',
        border: isSelected 
          ? `2px solid ${theme.primary}` 
          : hovered 
            ? `1.5px solid ${theme.primary}` 
            : '1px solid var(--border2)',
        boxShadow: isSelected 
          ? `0 16px 40px ${theme.shadow}` 
          : hovered 
            ? `0 12px 30px ${theme.shadow}` 
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
        justifyContent: 'space-between',
        zIndex: 1
      }}
    >
      {/* Dynamic ambient hover glow orb */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 60%)`,
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
            background: isSelected ? theme.primary : hovered ? theme.glow : 'var(--surface2)',
            color: isSelected ? '#fff' : hovered ? theme.primary : 'var(--ink2)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '24px',
            transform: hovered ? 'scale(1.1) rotate(10deg)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: isSelected ? `0 8px 16px ${theme.shadow}` : 'none'
          }}
        >
          <Mic2 size={24} />
        </div>

        <h3 className="card-title" style={{ fontSize: '22px', fontWeight: 800, marginBottom: '10px', color: 'var(--ink)' }}>{event.title}</h3>
        
        <p className="event-date" style={{ color: theme.primary, fontWeight: 700, marginBottom: '16px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ transform: hovered ? 'scale(1.2)' : 'none', transition: 'all 0.3s' }}>📅</span> {event.date}
        </p>

        {event.maxParticipants && (
          <span style={{ 
            display: 'inline-block', 
            padding: '6px 12px', 
            background: isSelected ? theme.primary : theme.glow, 
            color: isSelected ? '#fff' : theme.primary, 
            borderRadius: '50px', 
            fontSize: '11px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            marginBottom: '20px',
            boxShadow: isSelected ? `0 4px 12px ${theme.shadow}` : 'none'
          }}>
            Max {event.maxParticipants} Performers
          </span>
        )}

        <p className="card-desc" style={{ color: 'var(--ink2)', fontSize: '14.5px', lineHeight: 1.7, marginBottom: '28px' }}>
          {event.description}
        </p>
      </div>

      <button 
        className="btn"
        onClick={onSelect}
        style={{ 
          width: '100%', 
          justifyContent: 'center',
          background: isSelected ? theme.primary : 'transparent',
          border: isSelected ? 'none' : `2px solid ${theme.primary}`,
          color: isSelected ? '#fff' : theme.primary,
          transform: hovered && !isSelected ? 'translateY(-2px)' : 'none',
          boxShadow: hovered && !isSelected ? `0 6px 16px ${theme.shadow}` : 'none',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          zIndex: 1,
          fontWeight: 700
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
    <section className="section" style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      
      {/* 🌌 Animated Backdrop Orbs (Vibrant Neon Glow Bleed) */}
      <div className="floating-orb" style={{ top: '5%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%)' }} />
      <div className="floating-orb" style={{ top: '40%', right: '5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)', animationDelay: '-5s' }} />
      <div className="floating-orb" style={{ bottom: '5%', left: '20%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.18) 0%, transparent 70%)', animationDelay: '-10s' }} />

      <ScrollReveal direction="up">
        <div className="section-header" style={{ marginBottom: '48px', position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><Mic2 size={36} /></div>
          <h2 className="text-shimmer" style={{ fontSize: '42px', fontWeight: 900, display: 'inline-block' }}>Performer Guidelines</h2>
          <p>Everything you need to know before stepping up to the mic.</p>
        </div>
      </ScrollReveal>

      <div className="grid" style={{ marginBottom: '80px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'stretch', position: 'relative', zIndex: 1 }}>
        <ScrollReveal direction="right">
          <div 
            className="glass-card" 
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            style={{ 
              height: '100%', 
              background: 'linear-gradient(135deg, rgba(250, 248, 253, 0.85) 0%, rgba(139, 92, 246, 0.08) 100%)', 
              padding: '40px',
              border: cardHovered ? '1.5px solid var(--accent)' : '1px solid var(--border2)',
              boxShadow: cardHovered ? '0 16px 40px rgba(139, 92, 246, 0.15)' : 'var(--shadow)',
              transform: cardHovered ? 'translateY(-6px)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div 
                className="card-icon-wrap" 
                style={{ 
                  color: '#fff', 
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
                  margin: 0,
                  transform: cardHovered ? 'scale(1.1) rotate(-5deg)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <Star size={24} />
              </div>
              <SoundwaveVisualizer active={cardHovered} />
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
        <div className="section-header" style={{ marginTop: '100px', marginBottom: '48px', position: 'relative', zIndex: 1 }}>
          <h2 className="text-shimmer" style={{ fontSize: '38px', fontWeight: 900, display: 'inline-block' }}>Upcoming Open Mic Nights</h2>
          <p>Find a date that works for you and register below.</p>
        </div>
      </ScrollReveal>

      {events.length > 0 ? (
        <div className="grid" style={{ gap: '32px', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', position: 'relative', zIndex: 1 }}>
          {events.map((event, i) => {
            const isSelected = selectedEventId === event.id;
            return (
              <ScrollReveal direction="up" delay={(i % 3) * 100} key={event.id}>
                <OpenMicEventCard
                  event={event}
                  isSelected={isSelected}
                  onSelect={() => handleSelectEvent(event.id)}
                  index={i}
                />
              </ScrollReveal>
            );
          })}
        </div>
      ) : (
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--glass)', border: '1px solid var(--border2)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', position: 'relative', zIndex: 1 }}>
            <div style={{ color: 'var(--muted)', marginBottom: '20px' }}><Mic2 size={48} style={{ margin: '0 auto', opacity: 0.5 }}/></div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: 'var(--ink)' }}>Dates Coming Soon!</h3>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Check back for upcoming open mic night schedules.</p>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}
