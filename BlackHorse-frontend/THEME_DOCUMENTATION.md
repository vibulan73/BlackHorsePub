# Black Horse Pub - Colorful Light Theme & Parallax Implementation

## Overview
The frontend has been completely redesigned with a vibrant, colorful light theme and enhanced parallax effects throughout the application.

## Color Palette

### Primary Colors
- **Vibrant Purple (Accent)**: `#8b5ce6` - Main brand color
- **Purple Dark**: `#7c3aed` - Used for hover states
- **Accent Glow**: `rgba(139, 92, 246, 0.25)` - Used for shadows and backgrounds

### Secondary Colors
- **Blue**: `#3b82f6` - Primary action button
- **Emerald**: `#10b981` - Success states
- **Cyan**: `#06b6d4` - Interactive elements
- **Rose**: `#f43f5e` - Error/Alert states
- **Amber**: `#f59e0b` - Warnings

### Background Colors
- **Primary Background**: `#f8fafb` - Light, clean background
- **Secondary Background**: `#f0f3f7` - Subtle variant
- **Surface (Cards)**: `#ffffff` - Pure white surface
- **Surface 2**: `#f5f9fc` - Slight blue tint

### Text Colors
- **Primary Text**: `#1a1a2e` - Deep navy for text
- **Secondary Text**: `#4a5568` - Medium gray
- **Muted Text**: `#6b7280` - Light gray
- **Muted 2**: `#9ca3af` - Very light gray

## Components

### New Parallax Components

#### 1. `ParallaxSection`
Wrapper component that adds animated floating elements and parallax scroll effects
```tsx
import { ParallaxSection } from "@/components/ParallaxSection";

<ParallaxSection accent="purple">
  <div className="section">
    {/* Your content here */}
  </div>
</ParallaxSection>
```
Props:
- `accent`: "purple" | "green" | "cyan" | "blue" (color theme)
- `className`: Additional CSS classes

#### 2. `ParallaxFloat`
Interactive floating element that responds to mouse movement and scroll
```tsx
import { ParallaxFloat } from "@/components/ParallaxFloat";

<ParallaxFloat
  depth={0.5}
  size="md"
  color="purple"
  className="my-class"
/>
```
Props:
- `depth`: 0-1 (how much movement)
- `size`: "sm" | "md" | "lg"
- `color`: "purple" | "blue" | "green" | "cyan" | "rose" | "amber"

#### 3. `ParallaxImage`
Images with scroll-based parallax effect
```tsx
import { ParallaxImage } from "@/components/ParallaxImage";

<ParallaxImage
  src="/image.jpg"
  alt="Description"
  speed={0.5}
  className="my-image"
/>
```
Props:
- `src`: Image URL
- `alt`: Alt text
- `speed`: 0-1 (parallax intensity)

#### 4. `ParallaxBackground`
Dynamic background with mouse-tracking gradients
```tsx
import { ParallaxBackground } from "@/components/ParallaxBackground";

<ParallaxBackground color="purple" intensity={0.5}>
  {/* Content */}
</ParallaxBackground>
```
Props:
- `color`: Color theme
- `intensity`: 0-1 (mouse tracking intensity)

### Existing Components Enhanced

#### ParallaxHero
- Updated with new light theme overlay
- Added animated gradient floats
- Enhanced title and copy animations

#### PageBanner
- New light theme overlay
- Added parallax animation background
- Improved badge styling

## CSS Classes & Utilities

### Gradient Utilities
```css
.gradient-purple
.gradient-blue
.gradient-green
.gradient-cyan
.gradient-rose
.gradient-amber
```

### Text Gradients
```css
.text-gradient     /* Purple to Blue */
.text-gradient-green /* Green to Blue */
```

### Accent Sections
```css
.accent-section-purple
.accent-section-green
.accent-section-cyan
.accent-section-blue
```

### Interactive Effects
```css
.hover-lift        /* Lifts element on hover with glow */
.glow-on-hover     /* Adds glow effect on hover */
.spotlight         /* Spotlight effect on hover */
```

## Button Styles

All buttons now have updated styling with the new color scheme:

- `.btn-primary` - Purple gradient with white text
- `.btn-outline` - Purple outline with transparent bg
- `.btn-ghost` - Subtle background with border
- `.btn-red` - Red gradient for alerts

## Animations

### Floating Animation
Elements using `.parallax-float` automatically animate with 6-12 second float cycles

### Parallax Scroll
Sections respond to scroll position with smooth parallax movement

### Mouse Tracking
Interactive elements respond to mouse movement with smooth parallax

### Fade-in Animations
- `@keyframes fadeInUp` - Animations from bottom
- `@keyframes fadeInDown` - Animations from top
- `@keyframes floatGradient` - Smooth gradient shape changes
- `@keyframes float` - Floating element movement

## Implementation Examples

### Example 1: Colorful Section with Cards
```tsx
<section className="section accent-section-purple">
  <div className="grid">
    {items.map((item) => (
      <div key={item.id} className="glass-card hover-lift">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
</section>
```

### Example 2: Parallax Hero with Floating Elements
```tsx
<section className="parallax-hero" 
  style={{ backgroundImage: `url(${imageUrl})` }}>
  <div className="parallax-grain" />
  <ParallaxFloat depth={0.7} size="lg" color="purple" />
  <ParallaxFloat depth={0.5} size="md" color="cyan" />
  <div className="parallax-content">
    <h1>Welcome</h1>
  </div>
</section>
```

### Example 3: Mouse-Interactive Background
```tsx
<ParallaxBackground color="blue" intensity={0.7}>
  <div className="section">
    <h2>Interactive Section</h2>
  </div>
</ParallaxBackground>
```

## Page Updates

### Homepage
- New vibrant gradient background
- Updated stats section with colorful accent
- Why Choose Us section with blue/purple gradient
- Enhanced call-to-action banner

### Contact Page
- Updated banner with parallax effects
- Contact cards with new styling
- Map section with cyan gradient accent

### Entertainment Page
- Upcoming highlights with purple/green gradient
- Cards with hover lift effects

### Menu Page
- Cyan gradient section for location
- Updated styling throughout

## Browser Compatibility

- Uses CSS backdrop-filter (supported in modern browsers)
- Falls back gracefully in older browsers
- Parallax effects use scroll/mouse event listeners with passive flags for performance

## Performance Tips

1. Use `useTransition` for heavy parallax sections
2. Parallax components use `passive: true` for scroll events
3. Floating elements use CSS transforms for hardware acceleration
4. Consider reducing parallax effects on mobile devices if needed

## Customization

To customize colors, edit the theme variables in `globals.css` `:root`:
```css
:root {
  --accent: #8b5ce6; /* Change primary color */
  --primary-blue: #3b82f6; /* Change secondary */
  /* ... other variables */
}
```

## Future Enhancements

- Add more gradient combinations
- Implement per-section color themes
- Add animation timing controls
- Create additional parallax variants
