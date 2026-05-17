"use client";

import { FormEvent, useEffect, useState } from "react";
import { API_BASE } from "../lib/api";
import { CheckCircle2, Calendar as CalendarIcon, Clock, Users, MapPin, User, Mail, Phone } from "lucide-react";

const getTodayString = () => {
  const t = new Date();
  const year = t.getFullYear();
  const month = String(t.getMonth() + 1).padStart(2, "0");
  const day = String(t.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const GRID_SLOTS = [
  "2:15 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM",
  "3:30 PM", "3:45 PM", "4:00 PM", "4:15 PM", "4:30 PM",
  "4:45 PM", "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM"
];

const ALL_SLOTS = [
  ...GRID_SLOTS,
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
];

function parseSlotTime(slot: string): { hour: number; minute: number } {
  const match = slot.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return { hour: 0, minute: 0 };
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && hour !== 12) {
    hour += 12;
  } else if (ampm === "AM" && hour === 12) {
    hour = 0;
  }
  return { hour, minute };
}

const isSlotPassed = (slot: string, selectedDateStr: string) => {
  const todayStr = getTodayString();
  if (selectedDateStr < todayStr) return true;
  if (selectedDateStr > todayStr) return false;

  const { hour: slotHour, minute: slotMin } = parseSlotTime(slot);
  const now = new Date();
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();

  if (slotHour < currentHour) return true;
  if (slotHour === currentHour && slotMin < currentMin) return true;
  return false;
};

export function ReservationForm() {
  const [date, setDate] = useState(getTodayString());
  const [slots, setSlots] = useState<string[]>([]);
  const [hasFetchedBackend, setHasFetchedBackend] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      setHasFetchedBackend(false);
      setSelectedSlot("");
      return;
    }
    fetch(`${API_BASE}/reservations/slots?date=${date}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.availableSlots)) {
          setSlots(data.availableSlots);
          setHasFetchedBackend(true);
        } else {
          setSlots(ALL_SLOTS);
          setHasFetchedBackend(false);
        }
      })
      .catch(() => {
        setSlots(ALL_SLOTS);
        setHasFetchedBackend(false);
      });
    
    // Clear selection if it becomes invalid on date change
    setSelectedSlot("");
  }, [date]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) {
      setMessage("Please select a time slot.");
      return;
    }
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${API_BASE}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          date,
          timeSlot: selectedSlot,
          partySize: Number(form.get("partySize"))
        })
      });
      if (response.ok) {
        setIsSuccess(true);
        setMessage("Reservation request sent for approval. We'll be in touch shortly!");
        event.currentTarget.reset();
        setDate(getTodayString());
        setSelectedSlot("");
      } else {
        setMessage("Reservation could not be submitted. Please try again.");
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
        <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>Request Received</h3>
        <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px' }}>{message}</p>
        <button className="btn btn-outline" onClick={() => { setIsSuccess(false); setMessage(""); }}>
          Make Another Reservation
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <input type="hidden" name="timeSlot" value={selectedSlot} required />

      <div className="form-row">
        <label className="field">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14}/> Location</span>
          <select name="location"><option>Black Horse Pub</option></select>
        </label>
        <label className="field">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={14}/> Party Size</span>
          <input name="partySize" type="number" min="1" defaultValue="2" required />
        </label>
      </div>
      
      <div className="form-row">
        <label className="field" style={{ width: '100%' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CalendarIcon size={14}/> Date</span>
          <input 
            type="date" 
            value={date} 
            min={getTodayString()} 
            onChange={(event) => setDate(event.target.value)} 
            required 
          />
        </label>
      </div>

      <div style={{ marginTop: '28px', marginBottom: '28px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
          <Clock size={14}/> Select Time Slot (2:15 PM - 5:45 PM)
        </span>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '12px',
          marginTop: '8px'
        }}>
          {GRID_SLOTS.map((slot) => {
            const isSelected = selectedSlot === slot;
            const isPassed = isSlotPassed(slot, date);
            
            // Only treat as booked if the backend explicitly returned a response that includes
            // some of our new grid slots (indicating it successfully has the updated slot list),
            // and didn't include this specific slot.
            const backendSupportsGridSlots = slots.some(s => GRID_SLOTS.includes(s));
            const isBooked = hasFetchedBackend && backendSupportsGridSlots && !slots.includes(slot);
            const disabled = isPassed || isBooked;

            return (
              <button
                key={slot}
                type="button"
                className={`slot-btn ${isSelected ? 'selected' : ''}`}
                disabled={disabled}
                onClick={() => setSelectedSlot(slot)}
                title={isPassed ? "Time slot has passed" : isBooked ? "Time slot is already booked" : `Select ${slot}`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <hr style={{ border: 0, borderTop: '1px dashed var(--border2)', margin: '32px 0' }} />
      
      <div className="form-row">
        <label className="field">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={14}/> Full Name</span>
          <input name="name" placeholder="John Doe" required />
        </label>
      </div>

      <div className="form-row">
        <label className="field">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14}/> Email</span>
          <input name="email" type="email" placeholder="john@example.com" required />
        </label>
        <label className="field">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14}/> Phone Number</span>
          <input name="phone" placeholder="(555) 123-4567" required />
        </label>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', maxWidth: '300px' }}>
          {loading ? "Processing..." : "Request Reservation"}
        </button>
        {message && !isSuccess && (
          <p style={{ color: 'var(--red)', marginTop: '16px', fontSize: '14px' }}>{message}</p>
        )}
      </div>

      <style>{`
        .slot-btn {
          background: var(--surface2);
          border: 1px solid var(--border2);
          color: var(--ink);
          border-radius: 8px;
          padding: 14px 8px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slot-btn:hover:not(:disabled):not(.selected) {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-glow);
          transform: translateY(-2px);
        }
        .slot-btn.selected {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
        }
        .slot-btn:disabled {
          background: rgba(0, 0, 0, 0.04) !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          color: var(--muted) !important;
          opacity: 0.45;
          text-decoration: line-through;
          cursor: not-allowed;
          box-shadow: none !important;
          transform: none !important;
        }
      `}</style>
    </form>
  );
}
