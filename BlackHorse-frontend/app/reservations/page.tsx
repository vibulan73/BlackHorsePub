import { PageBanner } from "../components/PageTitle";
import { ReservationForm } from "./ReservationForm";
import { ScrollReveal } from "../components/ScrollReveal";
import { Zap, Users, MapPin } from "lucide-react";

export default function ReservationsPage() {
  return (
    <>
      <PageBanner 
        title="Reserve Your Table" 
        copy="Book a table at Black Horse Pub and guarantee your spot for the perfect night out. Quick, easy, and hassle-free." 
        imageUrl="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80"
        badge="Join Us"
      />
      
      <section className="section">
        <div className="grid" style={{ marginBottom: '64px' }}>
          <ScrollReveal direction="up" delay={0}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Zap size={24} /></div>
              <h3 className="card-title">Instant Confirmation</h3>
              <p className="card-desc">Get immediate booking confirmation with our smart reservation system.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><Users size={24} /></div>
              <h3 className="card-title">Flexible Groups</h3>
              <p className="card-desc">Book for any party size, from intimate dinners to large celebrations.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <div className="card-icon-wrap" style={{ margin: '0 auto 24px' }}><MapPin size={24} /></div>
              <h3 className="card-title">Best Seating</h3>
              <p className="card-desc">We always ensure you get the best available table for your requested time.</p>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal direction="up">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="section-header">
              <h2>Book Now</h2>
              <p>Select your preferred date and time to see availability.</p>
            </div>
            <ReservationForm />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
