import { PageBanner } from "../components/PageTitle";
import { Sparkles, GlassWater, Music, ChefHat } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export default function ExperiencesPage() {
  return (
    <>
      <PageBanner 
        title="Experiences" 
        copy="Curated moments and special packages designed to make your visit to Black Horse Pub unforgettable." 
        imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
        badge="Special Packages"
      />
      
      <section className="section">
        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '700px', margin: '0 auto 80px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-glow)', color: 'var(--accent)', marginBottom: '24px' }}>
              <Sparkles size={40} />
            </div>
            <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Coming Soon</h2>
            <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: '1.7' }}>
              We're crafting special experiences for you! From private events to unique dining packages, exciting options are in development.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid">
          <ScrollReveal direction="up" delay={0}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><GlassWater size={24} /></div>
              <h3 className="card-title">Tastings & Tours</h3>
              <p className="card-desc">Learn about our beer selection, wine list, and brewing techniques through guided experiences.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><ChefHat size={24} /></div>
              <h3 className="card-title">Food Pairings</h3>
              <p className="card-desc">Enjoy expertly curated food and drink pairings designed by our culinary team.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Music size={24} /></div>
              <h3 className="card-title">VIP Access</h3>
              <p className="card-desc">Experience premium seating and exclusive access to special performances and events.</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up">
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <button className="btn btn-primary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              Coming Soon
            </button>
            <p style={{ color: 'var(--muted)', marginTop: '16px', fontSize: '14px' }}>
              Reach out to us directly for inquiries about custom private experiences
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
