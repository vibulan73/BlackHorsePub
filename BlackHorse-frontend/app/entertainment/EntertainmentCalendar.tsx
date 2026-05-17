"use client";

import { X } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import type { EventItem } from "../lib/api";

export function EntertainmentCalendar({ events }: { events: EventItem[] }) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [modalOpen, setModalOpen] = useState(false);
  const [autoOpenDone, setAutoOpenDone] = useState(false);
  
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const selectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
  const eventDates = useMemo(() => new Set(events.map((event) => event.date)), [events]);
  const selectedEvents = useMemo(() => events.filter((event) => event.date === selectedDate), [events, selectedDate]);
  const selectedDateLabel = new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // Responsive tile sizing so calendar fits viewport without scrolling
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [tileSize, setTileSize] = useState<number>(64);
  const rowCount = Math.ceil((monthStart.getDay() + daysInMonth) / 7);
  const dayFont = Math.max(12, Math.min(18, Math.round(tileSize * 0.28)));

  useEffect(() => {
    function computeSize() {
      const gap = 8; // grid gap
      const containerW = calendarRef.current?.clientWidth ?? window.innerWidth;
      const tileWidth = Math.floor((containerW - gap * 6) / 7);

      const headerApprox = 160; // approx header + week labels + paddings
      const availableHeight = window.innerHeight - headerApprox;
      const tileHeight = Math.floor((availableHeight - 40) / Math.max(1, rowCount));

      const size = Math.max(36, Math.min(tileWidth, tileHeight));
      setTileSize(size);
    }

    computeSize();
    window.addEventListener('resize', computeSize, { passive: true });
    return () => window.removeEventListener('resize', computeSize);
  }, [rowCount]);

  // Auto-open today's events on page load
  useEffect(() => {
    if (!autoOpenDone && selectedEvents.length > 0) {
      setModalOpen(true);
      setAutoOpenDone(true);
    }
  }, [autoOpenDone, selectedEvents]);

  function openDate(day: number) {
    setSelectedDay(day);
    setModalOpen(true);
  }

  return (
    <>
      <div style={{ width: '100%' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border2)', paddingBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>{today.toLocaleString("default", { month: "long", year: "numeric" })}</h3>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} /> Has Event
            </span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '12px', textAlign: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--ink2)' }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', minHeight: '320px' }}>
            {Array.from({ length: monthStart.getDay() }).map((_, index) => <span key={`blank-${index}`} />)}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const hasEvents = eventDates.has(date);
              const isActive = selectedDay === day;
              const isToday = day === today.getDate();

              return (
                <button
                  key={day}
                  onClick={() => openDate(day)}
                  style={{
                    aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: isActive ? 'var(--accent)' : hasEvents ? 'var(--accent-glow)' : isToday ? 'rgba(139, 92, 246, 0.05)' : 'var(--surface2)',
                    color: isActive ? '#fff' : hasEvents ? 'var(--accent)' : isToday ? 'var(--accent)' : 'var(--ink)',
                    border: isActive ? '2px solid var(--accent)' : hasEvents ? '2px solid var(--accent)' : isToday ? '2px solid var(--accent)' : '1px solid var(--border2)',
                    borderRadius: '12px', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative',
                    fontWeight: isActive || hasEvents ? 700 : 400,
                    fontSize: '16px',
                    boxShadow: isActive ? '0 4px 16px rgba(139, 92, 246, 0.3)' : 'none'
                  }}
                  aria-label={`${date}${hasEvents ? ", has events" : ""}`}
                >
                  <span>{day}</span>
                  {hasEvents && !isActive && <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)', position: 'absolute', bottom: '6px' }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', animation: 'fadeIn 0.3s ease-out' }} onClick={() => setModalOpen(false)}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'auto', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border2)', paddingBottom: '24px', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '32px', marginBottom: '8px', fontWeight: 900 }}>{selectedDateLabel}</h2>
                <p style={{ color: 'var(--accent)', margin: 0, fontSize: '15px', fontWeight: 600 }}>
                  {selectedEvents.length ? `${selectedEvents.length} event${selectedEvents.length === 1 ? "" : "s"} scheduled` : "No events scheduled"}
                </p>
              </div>
              <button 
                onClick={() => setModalOpen(false)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--ink2)', 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-glow)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                <X size={24} />
              </button>
            </div>
            
            {selectedEvents.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {selectedEvents.map((event) => (
                  <article key={event.id} style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 100%)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border2)', transition: 'all 0.3s ease' }} className="hover-lift">
                    {event.imageUrl && <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />}
                    <div style={{ padding: '28px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'inline-block', background: 'var(--accent-glow)', padding: '6px 12px', borderRadius: '6px', marginBottom: '12px' }}>{event.category ?? "event"}</span>
                      <h3 style={{ fontSize: '26px', margin: '12px 0', fontWeight: 700 }}>{event.title}</h3>
                      <p style={{ color: '#10b981', fontWeight: 600, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                        {event.time ?? "Time TBA"}
                      </p>
                      {event.description && <p style={{ color: 'var(--ink2)', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>{event.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎭</div>
                <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No Entertainment Scheduled</div>
                <p style={{ margin: 0 }}>Check back soon for exciting events!</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
