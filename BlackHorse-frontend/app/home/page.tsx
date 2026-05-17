import Link from "next/link";
import { ShoppingBag, CalendarDays, Utensils, Music, Wine, Heart, Users } from "lucide-react";
import { api, EventItem } from "../lib/api";
import { ParallaxHero } from "../components/ParallaxHero";
import { ScrollReveal } from "../components/ScrollReveal";
import { AnimatedCounter } from "../components/AnimatedCounter";

async function featuredEvents() {
  try {
    return await api<EventItem[]>("/events/featured");
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const events = await featuredEvents();

  return (
    <>
      <ParallaxHero
        badge="Est. 2026"
        title="Welcome to Black Horse Pub"
        subtitle="Cold beer, proper pub food, live entertainment, and a community that feels like family. Experience the perfect night out."
      >
        <Link className="btn btn-primary" href="/orders"><ShoppingBag size={18} /> Order Online</Link>
        <Link className="btn btn-outline" href="/reservations"><CalendarDays size={18} /> Reserve Table</Link>
        <Link className="btn btn-ghost" href="/menu"><Utensils size={18} /> View Menu</Link>
      </ParallaxHero>

      {/* Stats Ribbon */}
      <section style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(16,185,129,0.08) 100%)', borderTop: '1px solid rgba(139,92,246,0.2)', borderBottom: '1px solid rgba(139,92,246,0.2)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
          <AnimatedCounter target={12} suffix="+" label="Beers on Tap" />
          <AnimatedCounter target={150} suffix="+" label="Live Performances" />
          <AnimatedCounter target={4} label="Years Pouring" />
          <AnimatedCounter target={5} suffix="k+" label="Happy Patrons" />
        </div>
      </section>

      {/* Featured Events */}
      <section className="section">
        <ScrollReveal direction="up">
          <div className="section-header">
            <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><Music size={32} /></div>
            <h2>Upcoming Live Events</h2>
            <p>From acoustic sets to open mic comedy, see what's happening this week.</p>
          </div>
        </ScrollReveal>

        <div className="grid">
          {(events.length ? events : [
            { id: 1, title: "Live Music Friday", date: "Coming soon", description: "Featured events will appear here once admins publish them." }
          ]).map((event, i) => (
            <ScrollReveal direction="up" delay={i * 100} key={event.id}>
              <article className="glass-card">
                <div className="card-icon-wrap"><Music size={24} /></div>
                <h3 className="card-title">{event.title}</h3>
                <p className="event-date">{event.date}{event.time ? ` at ${event.time}` : ""}</p>
                <p className="card-desc">{event.description}</p>
                <Link href="/entertainment" className="card-link">Learn More →</Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link className="btn btn-outline" href="/entertainment">Full Event Calendar</Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-full" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, rgba(139,92,246,0.06) 50%, rgba(16,185,129,0.06) 100%)' }}>
        <div className="section">
          <ScrollReveal direction="up">
            <div className="section-header">
              <h2>The Pub Experience</h2>
              <p>What makes Black Horse Pub the neighborhood favorite.</p>
            </div>
          </ScrollReveal>

          <div className="grid">
            <ScrollReveal direction="left" delay={0}>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent)', fontSize: '40px', marginBottom: '20px' }}><Wine size={48} style={{ margin: '0 auto' }} /></div>
                <h3 className="card-title">Premium Selection</h3>
                <p className="card-desc">Curated local and international beers, fine wines, and signature cocktails.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent)', fontSize: '40px', marginBottom: '20px' }}><Utensils size={48} style={{ margin: '0 auto' }} /></div>
                <h3 className="card-title">Pub Classics</h3>
                <p className="card-desc">Hearty comfort food made fresh daily by our expert culinary team.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="glass-card" style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent)', fontSize: '40px', marginBottom: '20px' }}><Users size={48} style={{ margin: '0 auto' }} /></div>
                <h3 className="card-title">Community Spirit</h3>
                <p className="card-desc">A welcoming atmosphere where neighbors become friends.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ position: 'relative', padding: '100px 24px', textAlign: 'center', background: 'var(--surface)' }}>
        <div className="parallax-grain" />
        <ScrollReveal direction="up">
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px', margin: '0 auto' }}>
            <Heart size={40} style={{ color: 'var(--red)', margin: '0 auto 24px' }} />
            <h2 style={{ fontSize: '40px', marginBottom: '20px' }}>Join Us Tonight</h2>
            <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '32px' }}>Whether it's for a quick pint or a full dinner, your table is waiting.</p>
            <Link href="/reservations" className="btn btn-primary">Book Your Table</Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
