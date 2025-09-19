# VOA Typography System - Font Stack Mapping

## Font Families

### Primary Display Font: **Fredoka One**

- **Purpose**: Headlines, hero text, navigation, buttons, section titles
- **Character**: Rounded, friendly, bold display font that matches reference images
- **Fallbacks**: 'Luckiest Guy', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

### Body Font: **Inter**

- **Purpose**: Body text, paragraphs, form labels, captions, cards content
- **Character**: Clean, geometric humanist sans with excellent web readability
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)
- **Fallbacks**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

### Monospace Font: **JetBrains Mono**

- **Purpose**: Quote boxes, captions, typewriter-style text, code elements
- **Character**: Modern, legible monospace with good character distinction
- **Weights**: 400 (regular), 500 (medium), 600 (semibold)
- **Fallbacks**: 'Courier Prime', 'Space Mono', 'Courier New', monospace

## Element Mapping

### Hero Section

- **Main heading "VOA"**: Display font, very large (clamp(3rem, 8vw, 8rem))
- **Subheading "VOICE OF ARTIST"**: Display font, large (clamp(1.5rem, 4vw, 3rem))
- **Body text**: Body font, medium (1.125rem)
- **Quote box**: Monospace font, italic, medium (1rem)
- **Buttons**: Display font, uppercase, medium (1rem)

### Navigation

- **Brand "VOA"**: Display font, large (2rem)
- **Nav items**: Display font, uppercase, small (0.875rem)
- **CTA Button "APPLY NOW"**: Display font, uppercase, medium (1rem)

### Section Headings

- **H1**: Display font, extra large (clamp(2.5rem, 6vw, 4.5rem))
- **H2**: Display font, large (clamp(2rem, 5vw, 3.5rem))
- **H3**: Display font, medium (clamp(1.5rem, 4vw, 2.5rem))
- **H4**: Display font, small (1.5rem)

### Content Areas

- **Body paragraphs**: Body font, regular (1rem, line-height: 1.6)
- **Card titles**: Display font, medium (1.25rem)
- **Card content**: Body font, regular (0.875rem)
- **Captions**: Body font, small (0.75rem)
- **Quote blocks**: Monospace font, italic (1.125rem)

### Forms & Interactive

- **Form labels**: Body font, semibold (0.875rem), uppercase
- **Input text**: Body font, regular (1rem)
- **Button text**: Display font, uppercase (0.875rem - 1rem)
- **Newsletter heading**: Display font, large (clamp(2rem, 5vw, 4rem))

### Right Rail & Cards

- **Card headings**: Display font, uppercase (1rem)
- **Card body**: Body font, regular (0.875rem)
- **Category labels**: Monospace font, uppercase (0.75rem)
- **CTA buttons**: Display font, uppercase (0.875rem)

### Footer

- **Section headings**: Display font, uppercase (1.125rem)
- **Links**: Body font, regular (0.875rem)
- **Copyright**: Body font, small (0.75rem)

## Typography Scale & Responsive Behavior

### Desktop (≥1440px)

- Hero: 8rem / 3rem / 1.125rem
- Section H2: 3.5rem
- Body: 1rem (16px base)

### Tablet (768px - 1024px)

- Hero: 6rem / 2.5rem / 1rem
- Section H2: 3rem
- Body: 1rem (16px base)

### Mobile (≤767px)

- Hero: 4rem / 2rem / 1rem
- Section H2: 2.5rem
- Body: 0.875rem (14px base)

## Letter Spacing & Line Height

### Display Font (Fredoka One)

- **Large headings**: letter-spacing: -0.02em, line-height: 1.1
- **Medium headings**: letter-spacing: 0, line-height: 1.2
- **Buttons/Nav**: letter-spacing: 0.05em, line-height: 1

### Body Font (Inter)

- **Body text**: letter-spacing: 0, line-height: 1.6
- **Captions**: letter-spacing: 0.025em, line-height: 1.4

### Monospace Font (JetBrains Mono)

- **All uses**: letter-spacing: 0.05em, line-height: 1.5

## Font Loading Strategy

### Critical Fonts (Preload)

1. **Fredoka One Regular** - Used for hero heading (largest visual impact)
2. **Inter Regular** - Used for body text (most content)

### Font Display

- All fonts use `font-display: swap` for fast text rendering
- Fallback fonts provide similar character width to prevent layout shift

### Google Fonts URL

```
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
```

## CSS Custom Properties

```css
:root {
  --font-display: "Fredoka One", "Luckiest Guy", system-ui, sans-serif;
  --font-body:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", "Courier Prime", "Space Mono", monospace;
}
```

## Implementation Notes

1. **Consistency**: Use single font family per element type - no mixing display + body on same line
2. **Emphasis**: Use font-weight or color for emphasis, not font-family changes
3. **Accessibility**: Minimum 12px font size, high contrast ratios, focus states
4. **Performance**: Subset fonts to Latin characters only, preload critical fonts
5. **Fallbacks**: Always include system font fallbacks for reliability
