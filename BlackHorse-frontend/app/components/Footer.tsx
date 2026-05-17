"use client";

import { FormEvent, useState } from "react";
import { API_BASE } from "../lib/api";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock, ArrowUp } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  ["Home", "/home"],
  ["Menu", "/menu"],
  ["On Tap", "/on-tap"],
  ["Reservations", "/reservations"],
  ["Entertainment", "/entertainment"],
  ["Open Mic", "/open-mic"],
  ["Our Story", "/our-story"],
  ["Contact", "/contact"],
];

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
            <a href="tel:+10000000000" className="footer-contact-link"><Phone size={14} /> +1 (000) 000-0000</a>
            <a href="mailto:hello@blackhorsepub.com" className="footer-contact-link"><Mail size={14} /> hello@blackhorsepub.com</a>
            <span className="footer-contact-link"><MapPin size={14} /> 123 Main Street, Your City</span>
          </div>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook" className="social-icon"><Facebook size={16} /></a>
            <a href="#" aria-label="Instagram" className="social-icon"><Instagram size={16} /></a>
            <a href="#" aria-label="Twitter" className="social-icon"><Twitter size={16} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            {quickLinks.map(([label, href]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div className="footer-col">
          <h4><Clock size={14} style={{ display: "inline", marginRight: 6 }} />Hours</h4>
          <ul className="footer-hours">
            {hours.map(([day, time]) => (
              <li key={day}>
                <span>{day}</span>
                <span className="hours-time">{time}</span>
              </li>
            ))}
          </ul>
          <p className="footer-note">Kitchen closes 1hr before close.</p>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h4>Stay in the Loop</h4>
          <p>Events, specials, and exclusive updates — straight to your inbox.</p>
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
