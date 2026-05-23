---
name: Zenit Finance
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#8bd6b4'
  on-secondary: '#003827'
  secondary-container: '#005c42'
  on-secondary-container: '#87d2b0'
  tertiary: '#b7c8e1'
  on-tertiary: '#213145'
  tertiary-container: '#94a4bd'
  on-tertiary-container: '#2a3a4f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#a6f2cf'
  secondary-fixed-dim: '#8bd6b4'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#00513a'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1280px
---

## Brand & Style

The design system is anchored in the concept of **Elevated Precision**. It targets individuals who view personal finance not as a chore, but as a strategic pursuit of growth. The aesthetic bridges the gap between high-end fintech and serene productivity tools.

The visual style is a blend of **Minimalism** and **Glassmorphism**. It utilizes a deep, monochromatic base to allow vibrant financial data to take center stage. The use of translucent layers and soft blurs creates a sense of spatial depth, making the interface feel lightweight despite the dark theme. The overall emotional response should be one of "calm control"—professional enough to be trusted with wealth, but modern enough to feel effortless.

## Colors

The palette is designed for high-contrast legibility within a dark environment. 

- **Emerald Green (Primary):** Used for growth indicators, primary actions, and success states. It represents the "Zenit" of financial health.
- **Soft Mint (Secondary):** Used for subtle accents, progress bars, and background highlights for interactive elements.
- **Slate (Tertiary):** Applied to non-critical data, borders, and secondary text to maintain hierarchy.
- **Deep Charcoal/Black (Neutral):** The canvas uses a near-black slate to prevent pure-black eye strain, while cards use a slightly lighter, translucent slate to establish depth.

## Typography

This design system employs a dual-font strategy to balance character with utility. 

**Plus Jakarta Sans** is used for headings and display numbers to provide a geometric, modern flair. **Inter** is used for all body text, inputs, and data tables to ensure maximum readability at small sizes. 

Generous tracking (+0.01em to +0.05em) is applied to labels and body text to enhance the "airy" feel of the dark UI. Large numerical data should use "tabular lining" figures to ensure columns of numbers align perfectly in financial views.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a 12-column structure on desktop and a 4-column structure on mobile.

- **Desktop (1024px+):** 12 columns, 24px gutters, 40px side margins. 
- **Tablet (768px - 1023px):** 8 columns, 20px gutters, 24px side margins.
- **Mobile (Up to 767px):** 4 columns, 16px gutters, 16px side margins.

We use an 8px spacing scale for layout components and a 4px scale for micro-spacing within components (e.g., icon-to-text). Content should be grouped in cards that expand to fill column spans, maintaining a rhythmic vertical flow.

## Elevation & Depth

Depth is communicated through **Glassmorphism and Tonal Layering** rather than traditional heavy shadows.

1.  **Level 0 (Canvas):** Deep Slate `#020617`.
2.  **Level 1 (Cards/Panels):** Semi-transparent Slate `rgba(30, 41, 59, 0.5)` with a `20px` backdrop blur and a `1px` subtle border of `rgba(255, 255, 255, 0.08)`.
3.  **Level 2 (Modals/Popovers):** Higher opacity `rgba(30, 41, 59, 0.95)` with a soft ambient shadow: `0px 20px 40px rgba(0, 0, 0, 0.4)`.

The use of "inner glows" (a top-aligned 1px semi-transparent white stroke) on buttons and cards mimics physical light hitting an edge, reinforcing the premium feel.

## Shapes

The shape language is consistently **Rounded**, reflecting a friendly yet structured environment.

- **Small Components (Buttons, Inputs):** 8px corner radius.
- **Medium Components (Cards, Modals):** 16px corner radius.
- **Large Sections (Sidebars, Hero Areas):** 24px corner radius.
- **Interactive Elements:** Use a consistent 2px focus ring in the Primary Emerald color, offset by 2px from the element itself.

## Components

### Buttons
- **Primary:** Solid Emerald Green background, white text, bold weight. Subtle scale-down interaction on click (98%).
- **Secondary:** Ghost style with a 1px Emerald Green border and 10% Emerald Green background tint on hover.
- **Tertiary:** Subtle Slate text with no border, becoming white on hover.

### Cards
- All cards must feature the backdrop-blur effect. 
- Padding should be a minimum of 24px.
- Card titles should use `title-md` in Plus Jakarta Sans.

### Input Fields
- Background: Solid `rgba(15, 23, 42, 1)`.
- Border: 1px Slate. On focus, the border transitions to Emerald Green.
- Placeholder text: Low-contrast Slate (`#64748B`).

### Chips/Tags
- Category chips use a pill shape (32px radius) with a 10% opacity background of the category's assigned color (e.g., Emerald for Income, Crimson for Expense).

### Icons
- Icons must be **2px thin-stroke line icons**. 
- They should always be accompanied by a label unless their meaning is universally understood (e.g., Search, Settings).