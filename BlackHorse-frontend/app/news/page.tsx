import { PageBanner } from "../components/PageTitle";
import { api } from "../lib/api";
import { Newspaper } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

type News = { id: number; title: string; content?: string; link?: string; date?: string };

async function getNews() {
  try {
    return await api<News[]>("/news");
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <PageBanner 
        title="In the News" 
        copy="Press features, mentions, and the latest updates from Black Horse Pub. Stay informed about what's happening." 
        imageUrl="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80"
        badge="Latest Updates"
      />
      
      <section className="section">
        <ScrollReveal direction="up">
          <div className="section-header">
            <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><Newspaper size={32} /></div>
            <h2>Latest News & Features</h2>
            <p>Follow our journey and discover exciting announcements, media features, and pub updates.</p>
          </div>
        </ScrollReveal>

        {(news.length ? news : [
          { 
            id: 1, 
            title: "News Coming Soon", 
            date: "May 2026",
            content: "Admins can add articles, press releases, and links to showcase Black Horse Pub in the media." 
          }
        ]).length > 0 ? (
          <div className="grid">
            {(news.length ? news : [
              { 
                id: 1, 
                title: "News Coming Soon", 
                date: "May 2026",
                content: "Admins can add articles, press releases, and links to showcase Black Horse Pub in the media." 
              }
            ]).map((item, i) => (
              <ScrollReveal direction="up" delay={(i % 3) * 100} key={item.id}>
                <article className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="card-icon-wrap"><Newspaper size={24} /></div>
                  <h3 className="card-title">{item.title}</h3>
                  {item.date && <p className="event-date">📅 {item.date}</p>}
                  <p className="card-desc" style={{ flex: 1 }}>{item.content}</p>
                  {item.link && (
                    <a className="btn btn-outline" href={item.link} target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
                      Read Full Article →
                    </a>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal direction="up">
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--glass)', border: '1px solid var(--border2)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ color: 'var(--muted)', marginBottom: '16px' }}><Newspaper size={48} style={{ margin: '0 auto' }}/></div>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>No news yet</h3>
              <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Stay tuned for exciting announcements!</p>
            </div>
          </ScrollReveal>
        )}
      </section>
    </>
  );
}
