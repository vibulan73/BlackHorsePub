import { PageBanner } from "../components/PageTitle";
import { Gift, Zap, Sparkles } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export default function GiftCardsPage() {
  return (
    <>
      <PageBanner 
        title="Gift Cards" 
        copy="The perfect gift for every occasion. Give your loved ones the Black Horse Pub experience." 
        imageUrl="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1920&q=80"
        badge="Share the Love"
      />
      
      <section className="section">
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '700px', margin: '0 auto 80px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-glow)', color: 'var(--accent)', marginBottom: '24px' }}>
              <Gift size={40} />
            </div>
            <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Coming Soon</h2>
            <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: '1.7' }}>
              We're preparing something special! Electronic gift cards will be available soon, allowing you to share the Black Horse Pub experience with friends and family.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid">
          <ScrollReveal direction="up" delay={0}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Gift size={24} /></div>
              <h3 className="card-title">Perfect Gift</h3>
              <p className="card-desc">Surprise someone special with a night of great food, drinks, and entertainment.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Zap size={24} /></div>
              <h3 className="card-title">Instant Delivery</h3>
              <p className="card-desc">Send digital gift cards instantly via email. No shipping required!</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Sparkles size={24} /></div>
              <h3 className="card-title">Flexible Options</h3>
              <p className="card-desc">Choose from various denominations to suit any budget and occasion.</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <button className="btn btn-primary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              Purchase Gift Card
            </button>
            <p style={{ color: 'var(--muted)', marginTop: '16px', fontSize: '14px' }}>
              We'll notify you via our newsletter when gift cards become available
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
