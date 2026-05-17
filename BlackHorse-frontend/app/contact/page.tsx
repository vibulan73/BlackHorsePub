import { Mail, MapPin, Phone, MessageSquare, Clock } from "lucide-react";
import { PageBanner } from "../components/PageTitle";
import { LocationMap } from "../components/LocationMap";
import { ScrollReveal } from "../components/ScrollReveal";

export default function ContactPage() {
  return (
    <>
      <PageBanner 
        title="Contact Us" 
        copy="We're here to help with reservations, private events, or just to chat about your favorite drink." 
        imageUrl="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1920&q=80"
        badge="Get in Touch"
      />
      
      <section className="section">
        <ScrollReveal direction="up">
          <div className="section-header">
            <h2>Reach Out</h2>
            <p>Connect with us using any of the methods below. We'd love to hear from you.</p>
          </div>
        </ScrollReveal>

        <div className="grid">
          <ScrollReveal direction="up" delay={0}>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ borderRadius: '50%' }}><MapPin size={24} /></div>
              <h3 className="card-title">Location</h3>
              <p className="card-desc">123 Main Street<br/>Your City, ST 12345</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ borderRadius: '50%' }}><Phone size={24} /></div>
              <h3 className="card-title">Phone</h3>
              <p className="card-desc"><a href="tel:+10000000000" style={{ color: 'var(--ink)' }}>+1 (000) 000-0000</a></p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ borderRadius: '50%' }}><Mail size={24} /></div>
              <h3 className="card-title">Email</h3>
              <p className="card-desc"><a href="mailto:hello@blackhorsepub.com" style={{ color: 'var(--ink)' }}>hello@blackhorsepub.com</a><br/><span style={{ fontSize: '13px' }}>Response within 24hrs</span></p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ borderRadius: '50%' }}><Clock size={24} /></div>
              <h3 className="card-title">Hours</h3>
              <p className="card-desc">Mon-Thu: 11am-11pm<br/>Fri-Sat: 11am-1am<br/>Sun: 11am-10pm</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-full" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.08) 100%)', borderTop: '1px solid rgba(139,92,246,0.2)', borderBottom: '1px solid rgba(139,92,246,0.2)' }}>
        <div className="section">
          <LocationMap />
        </div>
      </section>
    </>
  );
}
