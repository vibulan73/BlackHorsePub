import { PageBanner } from "../components/PageTitle";
import { api, Beer } from "../lib/api";
import { ScrollReveal } from "../components/ScrollReveal";

async function getBeers() {
  try {
    return await api<Beer[]>("/beers");
  } catch {
    return [];
  }
}

export default async function OnTapPage() {
  const beers = await getBeers();
  const items = beers.length ? beers : [
    { id: 1, name: "Tap list coming soon", type: "Draft", description: "Admins can update beers from the dashboard." }
  ];

  return (
    <>
      <PageBanner 
        title="On Tap" 
        copy="Discover our rotating selection of premium draft beers, craft pours, and pub favorites. Always cold, always fresh." 
        imageUrl="https://images.unsplash.com/photo-1575037614876-c3852d790d1c?auto=format&fit=crop&w=1920&q=80"
        badge="Craft Selection"
      />
      
      <section className="section">
        <ScrollReveal direction="up">
          <div className="section-header">
            <h2>Our Beer Selection</h2>
            <p>From local craft breweries to international favorites, we have something for every palate.</p>
          </div>
        </ScrollReveal>

        <div className="grid">
          {items.map((beer, i) => (
            <ScrollReveal direction="up" delay={(i % 6) * 100} key={beer.id}>
              <article className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 className="card-title" style={{ margin: 0 }}>{beer.name}</h3>
                  {"price" in beer && beer.price ? <span className="price" style={{ fontSize: '18px' }}>${beer.price}</span> : null}
                </div>
                
                <span style={{ display: 'inline-block', padding: '4px 10px', background: 'var(--accent-glow)', color: 'var(--accent)', borderRadius: '4px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', alignSelf: 'flex-start' }}>
                  {beer.type}
                </span>
                
                <p className="card-desc" style={{ flex: 1 }}>{beer.description}</p>
                
                <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                  Order Now
                </button>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
