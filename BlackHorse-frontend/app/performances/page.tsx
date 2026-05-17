import { PageBanner } from "../components/PageTitle";
import { api } from "../lib/api";
import { Play } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { PerformanceList } from "./PerformanceList";

type Media = { id: number; title: string; url: string; type: "IMAGE" | "VIDEO" };

async function getMedia() {
  try {
    return await api<Media[]>("/media");
  } catch {
    return [];
  }
}

export default async function PerformancesPage() {
  const media = await getMedia();

  return (
    <>
      <PageBanner 
        title="Live Performances" 
        copy="Relive the magic! Watch highlights and clips from spectacular nights of live entertainment at Black Horse Pub." 
        imageUrl="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1920&q=80"
        badge="Live Video Gallery"
      />
      
      <section className="section" style={{ padding: '60px 24px' }}>
        <ScrollReveal direction="up">
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <div style={{ color: 'var(--accent)', marginBottom: '16px' }}><Play size={32} /></div>
            <h2>Video Highlights</h2>
            <p>Hover over a video to quick-preview, click to open full-fidelity cinematic play inside details, and tap the heart to react!</p>
          </div>
        </ScrollReveal>

        <PerformanceList backendMedia={media} />
      </section>
    </>
  );
}
