import { PageBanner } from "../components/PageTitle";
import { api, EventItem } from "../lib/api";
import { EntertainmentCalendar } from "./EntertainmentCalendar";
import { Music } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

async function getEvents() {
  try {
    return await api<EventItem[]>("/events");
  } catch {
    return [];
  }
}

export default async function EntertainmentPage() {
  const events = await getEvents();

  return (
    <>
      <PageBanner 
        title="Live Entertainment" 
        copy="Browse our exciting calendar of live performances, open mic nights, and special events. Find your perfect night out!" 
        imageUrl="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80"
        badge="Join The Party"
      />
      
      <section className="section" style={{ padding: '60px 24px' }}>
        <ScrollReveal direction="up">
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><Music size={32} /></div>
            <h2>Event Calendar</h2>
            <p>Click on any date to see what's happening at Black Horse Pub. Check back regularly for new performances and special events!</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={100}>
          <EntertainmentCalendar events={events} />
        </ScrollReveal>
      </section>
    </>
  );
}
