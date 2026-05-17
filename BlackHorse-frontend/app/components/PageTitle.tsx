interface PageBannerProps {
  title: string;
  copy: string;
  imageUrl?: string;
  badge?: string;
}

export function PageBanner({
  title,
  copy,
  imageUrl = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80",
  badge,
}: PageBannerProps) {
  return (
    <section className="page-banner" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="page-banner-overlay" />
      <div className="page-banner-grain" />
      <div className="page-banner-content">
        {badge && <span className="page-banner-badge">{badge}</span>}
        <h1 className="page-banner-title">{title}</h1>
        <p className="page-banner-copy">{copy}</p>
      </div>
    </section>
  );
}

// Keep old PageTitle as alias so imports don't break
export function PageTitle({ title, copy }: { title: string; copy: string }) {
  return <PageBanner title={title} copy={copy} />;
}
