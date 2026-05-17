# Quick Start Guide - Colorful Light Theme & Parallax

## 🎨 Using the New Theme

### Option 1: Add Color to a Section
```tsx
<section className="accent-section-purple">
  {/* Your content */}
</section>
```
Available options: `purple`, `green`, `cyan`, `blue`

### Option 2: Gradient Background
```tsx
<div className="gradient-purple">
  {/* Content with gradient background */}
</div>
```

### Option 3: Dynamic Parallax Background
```tsx
import { ParallaxBackground } from "@/components/ParallaxBackground";

<ParallaxBackground color="blue" intensity={0.6}>
  <div className="section">
    {/* Content with interactive parallax */}
  </div>
</ParallaxBackground>
```

## 🎪 Adding Parallax Effects

### Floating Elements
```tsx
import { ParallaxFloat } from "@/components/ParallaxFloat";

<div style={{ position: "relative" }}>
  <ParallaxFloat depth={0.5} size="md" color="purple" />
  {/* Your content */}
</div>
```

### Parallax Sections
```tsx
import { ParallaxSection } from "@/components/ParallaxSection";

<ParallaxSection accent="cyan">
  <div className="section">
    {/* Auto-adds floating elements and parallax */}
  </div>
</ParallaxSection>
```

### Parallax Images
```tsx
import { ParallaxImage } from "@/components/ParallaxImage";

<ParallaxImage 
  src="/hero.jpg" 
  speed={0.7}
  style={{ height: "400px" }}
/>
```

## ✨ Card Styling

### Basic Card with Hover Effect
```tsx
<div className="glass-card hover-lift">
  <h3>Title</h3>
  <p>Description</p>
</div>
```

### Card with Spotlight
```tsx
<div className="glass-card spotlight">
  {/* Spotlight follows mouse on hover */}
</div>
```

## 🎯 Buttons

```tsx
{/* Primary Button */}
<button className="btn btn-primary">Click Me</button>

{/* Outline Button */}
<button className="btn btn-outline">Cancel</button>

{/* Ghost Button */}
<button className="btn btn-ghost">Learn More</button>

{/* Red Alert Button */}
<button className="btn btn-red">Delete</button>
```

## 📱 Full Page Example

```tsx
import { ParallaxSection } from "@/components/ParallaxSection";
import { ParallaxFloat } from "@/components/ParallaxFloat";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* Colorful Hero */}
      <section 
        className="parallax-hero"
        style={{ backgroundImage: "url(/hero.jpg)" }}
      >
        <div className="parallax-content">
          <h1>Welcome</h1>
          <p>Discover something amazing</p>
          <Link href="/explore" className="btn btn-primary">
            Explore Now
          </Link>
        </div>
      </section>

      {/* Stats with Gradient */}
      <section className="section accent-section-blue">
        <div className="section-header">
          <h2>By The Numbers</h2>
        </div>
        <div className="grid">
          {/* Cards here */}
        </div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection accent="purple">
        <div className="section-header">
          <h2>Our Experience</h2>
        </div>
        <div className="grid">
          {/* Cards with parallax floats */}
        </div>
      </ParallaxSection>

      {/* Interactive Background */}
      <ParallaxBackground color="cyan" intensity={0.7}>
        <section className="section">
          <h2>Join Us</h2>
          {/* Content */}
        </section>
      </ParallaxBackground>
    </>
  );
}
```

## 🎨 Color Options

**Accent Colors**: purple, blue, green, cyan, rose, amber

Use in:
- `<ParallaxSection accent="color">`
- `<ParallaxFloat color="color">`
- `<ParallaxBackground color="color">`
- `.gradient-{color}` CSS class
- `.accent-section-{color}` CSS class

## ⚡ Performance Tips

1. **Limit floating elements** - Use 2-3 per section max
2. **Mobile optimization** - Consider hiding parallax on small screens:
   ```tsx
   <div className="hidden md:block">
     <ParallaxFloat />
   </div>
   ```
3. **Lazy load images** - Use next/image with loading="lazy"

## 🔄 Existing Component Usage

### ParallaxHero (Already Updated)
```tsx
<ParallaxHero
  badge="New!"
  title="Amazing Experience"
  subtitle="Discover our pub"
  imageUrl="/image.jpg"
/>
```

### PageBanner (Already Updated)
```tsx
<PageBanner
  title="Contact Us"
  copy="Get in touch with us"
  imageUrl="/contact.jpg"
  badge="Questions?"
/>
```

## 📝 Popular Combinations

### Vibrant Modern Section
```tsx
<section className="accent-section-purple">
  <div className="grid">
    {items.map(item => (
      <article key={item.id} className="glass-card hover-lift glow-on-hover">
        {/* Content */}
      </article>
    ))}
  </div>
</section>
```

### Interactive Experience
```tsx
<ParallaxBackground color="blue">
  <section className="section">
    <ParallaxFloat depth={0.8} size="lg" color="cyan" />
    <div style={{ position: "relative", zIndex: 10 }}>
      {/* Content floating above background */}
    </div>
  </section>
</ParallaxBackground>
```

## 🐛 Troubleshooting

**Parallax not working?**
- Check that `overflow: hidden` is applied to parent
- Ensure `position: relative` on parent container

**Colors not showing?**
- Clear build cache: `next clean` then `next build`
- Verify CSS variables are loaded in globals.css

**Performance issues?**
- Reduce number of parallax elements
- Increase animation intervals
- Use `will-change` CSS property sparingly

---

**Need help?** Refer to [THEME_DOCUMENTATION.md](./THEME_DOCUMENTATION.md) for detailed information.
