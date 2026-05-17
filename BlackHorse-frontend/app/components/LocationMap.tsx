"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function LocationMap() {
  return (
    <div className="location-map-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
      <ScrollReveal direction="left">
        <div className="glass-card" style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '28px', marginBottom: '24px', color: 'var(--ink)' }}>Visit Us</h3>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ color: 'var(--accent)', marginTop: '4px' }}><MapPin size={20} /></div>
            <div>
              <strong style={{ display: 'block', fontSize: '16px', color: 'var(--ink)' }}>The Black Horse Pub</strong>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>452 George Street North<br/>Peterborough, ON K9H-3R7</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ color: 'var(--accent)', marginTop: '4px' }}><Clock size={20} /></div>
            <div>
              <strong style={{ display: 'block', fontSize: '16px', color: 'var(--ink)' }}>Hours</strong>
              <span style={{ color: 'var(--muted)', fontSize: '15px' }}>Mon-Thu: 11am - 11pm<br/>Fri-Sat: 11am - 1am<br/>Sun: 11am - 10pm</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ color: 'var(--accent)', marginTop: '4px' }}><Phone size={20} /></div>
            <div>
              <a href="tel:+17057420633" style={{ color: 'var(--ink)', fontSize: '15px' }}>+1 (705) 742-0633</a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ color: 'var(--accent)', marginTop: '4px' }}><Mail size={20} /></div>
            <div>
              <a href="mailto:hello@blackhorsepub.com" style={{ color: 'var(--ink)', fontSize: '15px' }}>hello@blackhorsepub.com</a>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)', height: '450px' }}>
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
      </ScrollReveal>
    </div>
  );
}
