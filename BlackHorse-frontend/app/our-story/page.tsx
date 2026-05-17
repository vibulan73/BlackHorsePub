import { PageBanner } from "../components/PageTitle";
import { Heart, Music, UtensilsCrossed } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export default function OurStoryPage() {
  return (
    <>
      <PageBanner 
        title="Our Story" 
        copy="A neighborhood pub built around good food, live music, and friends who feel at home. This is where memories are made." 
        imageUrl="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80"
        badge="Since 2026"
      />
      
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '64px', alignItems: 'center', marginBottom: '100px' }}>
          <ScrollReveal direction="left">
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-16px', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', zIndex: 0 }}></div>
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80" 
                alt="Black Horse Pub Interior" 
                style={{ borderRadius: 'var(--radius)', width: "100%", boxShadow: 'var(--shadow-lg)', position: 'relative', zIndex: 1 }} 
              />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h2 style={{ fontSize: '40px', marginBottom: '24px' }}>Our Heritage</h2>
              <p style={{ fontSize: '18px', color: 'var(--ink2)', lineHeight: '1.8', marginBottom: '24px' }}>
                The Black Horse Pub is located in the historic Morrow Building, built by local architect John E. Belcher in 1875 and designed in the French Second Empire style.
              </p>
              <p style={{ fontSize: '18px', color: 'var(--ink2)', lineHeight: '1.8', marginBottom: '24px' }}>
                The building began its history with the Post Office as its prominent early tenant, later housing the Peterborough Club, YMCA, Trent Canal, Inland Revenue Service, George Mathews Meat Packers, Peterborough Light and Power Company and several other retail stores, offices and restaurants.
              </p>
              <p style={{ fontSize: '18px', color: 'var(--ink2)', lineHeight: '1.8' }}>
                The building was completely restored in 1995 by Mark Porter and now houses Your Neighborhood Pub!
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up">
          <div className="section-header">
            <h2>What Makes Us Different</h2>
            <p>The core pillars of the Black Horse Pub experience.</p>
          </div>
        </ScrollReveal>

        <div className="grid">
          <ScrollReveal direction="up" delay={0}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Heart size={24} /></div>
              <h3 className="card-title">Community First</h3>
              <p className="card-desc">We're built on strong relationships with our customers, staff, and the neighborhood. Your feedback shapes our future.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Music size={24} /></div>
              <h3 className="card-title">Live Entertainment</h3>
              <p className="card-desc">From intimate acoustic performances to full bands, great music is at the heart of everything we do.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><UtensilsCrossed size={24} /></div>
              <h3 className="card-title">Quality Food</h3>
              <p className="card-desc">Our chefs craft every dish with care, using fresh ingredients and time-tested recipes.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
