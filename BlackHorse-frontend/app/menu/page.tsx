import { PageBanner } from "../components/PageTitle";
import { LocationMap } from "../components/LocationMap";
import { api, MenuItem } from "../lib/api";
import { MenuFilter } from "./MenuFilter";
import { MenuViewButtons } from "./MenuViewButtons";
import { ScrollReveal } from "../components/ScrollReveal";

async function getMenu() {
  try {
    return await api<MenuItem[]>("/menu-items");
  } catch {
    return [];
  }
}

export default async function MenuPage() {
  const items = await getMenu();
  const menu = items.length ? items : [
    { id: 1, name: "Menu items coming soon", category: "Full Menu", description: "Admins can add food, wine, and cocktails." }
  ];

  return (
    <>
      <PageBanner 
        title="Menu" 
        copy="Our full menu, wine list, and signature cocktails. Expertly crafted for your enjoyment." 
        imageUrl="https://images.unsplash.com/photo-1608032158038-3eb9b718af5a?auto=format&fit=crop&w=1920&q=80"
        badge="Sip & Savor"
      />
      
      <section className="section">
        <ScrollReveal direction="up">
          <div className="section-header">
            <h2>Explore Our Selection</h2>
            <p>Browse our culinary offerings and carefully curated drinks.</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <MenuViewButtons />
          </div>
        </ScrollReveal>
        
        <MenuFilter items={menu} />
      </section>

      <section className="section-full" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(139,92,246,0.08) 100%)', borderTop: '1px solid rgba(139,92,246,0.2)', borderBottom: '1px solid rgba(139,92,246,0.2)' }}>
        <div className="section">
          <ScrollReveal direction="up">
            <div className="section-header">
              <h2>Find Us Here</h2>
              <p>Located in the heart of the city, perfect for any occasion.</p>
            </div>
          </ScrollReveal>
          <LocationMap />
        </div>
      </section>
    </>
  );
}
