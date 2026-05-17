"use client";

import { FormEvent, useState } from "react";
import { API_BASE } from "../lib/api";
import { Facebook, Instagram, Phone, Mail, MapPin, Clock, ArrowUp } from "lucide-react";

const hours = [
  ["Mon – Thu", "11am – 11pm"],
  ["Fri – Sat", "11am – 1am"],
  ["Sunday", "11am – 10pm"],
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const response = await fetch(`${API_BASE}/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setMessage(response.ok ? "✓ You're on the list!" : "Please try again.");
    if (response.ok) setEmail("");
  }

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-mark">BH</span>
            <span>Black Horse Pub</span>
          </div>
          <p>Cold beer, proper pub food, live entertainment, and a community that feels like family. Your neighbourhood gathering place.</p>
          <div className="footer-contact-row">
            <a href="tel:+17057420633" className="footer-contact-link"><Phone size={14} /> +1 (705) 742-0633</a>
            <a href="mailto:hello@blackhorsepub.com" className="footer-contact-link"><Mail size={14} /> hello@blackhorsepub.com</a>
            <span className="footer-contact-link"><MapPin size={14} /> 452 George Street North, Peterborough, ON K9H-3R7</span>
          </div>
          <div className="footer-socials">
            <a href="https://www.facebook.com/theblackhorsepub?fref=ts#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon"><Facebook size={16} /></a>
            <a href="https://www.instagram.com/blackhorseptbo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon"><Instagram size={16} /></a>
          </div>
        </div>

        {/* Map */}
        <div className="footer-col" style={{ minWidth: '320px', flex: '1.5' }}>
          <h4>Our Location</h4>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border2)', height: '260px', marginTop: '16px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2855.118322111352!2d-78.3199549!3d44.307518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d58ce0339dc40f%3A0x9830a9bad4cbb14f!2sThe%20Black%20Horse%20Pub!5e0!3m2!1sen!2slk!4v1779042764455!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Hours & Stay in the Loop */}
        <div className="footer-col" style={{ minWidth: '240px' }}>
          <h4><Clock size={14} style={{ display: "inline", marginRight: 6 }} />Hours</h4>
          <ul className="footer-hours">
            {hours.map(([day, time]) => (
              <li key={day}>
                <span>{day}</span>
                <span className="hours-time">{time}</span>
              </li>
            ))}
          </ul>
          <p className="footer-note" style={{ marginBottom: '28px' }}>Kitchen closes 1hr before close.</p>

          <h4 style={{ marginTop: '24px' }}>Stay in the Loop</h4>
          <p style={{ fontSize: '14px', color: 'var(--ink2)', marginBottom: '16px' }}>Events, specials, and exclusive updates — straight to your inbox.</p>
          <form onSubmit={subscribe} className="footer-newsletter">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@email.com"
              required
            />
            <button type="submit">Subscribe</button>
            {message && <p className={`newsletter-msg ${message.includes("✓") ? "success" : "error"}`}>{message}</p>}
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Black Horse Pub. All rights reserved.</p>
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
