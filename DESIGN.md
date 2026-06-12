---
name: El-Djazair Presidential 2024
colors:
  surface: '#f0fcf7'
  surface-dim: '#d0ddd8'
  surface-bright: '#f0fcf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf6f1'
  surface-container: '#e4f1ec'
  surface-container-high: '#deebe6'
  surface-container-highest: '#d9e5e0'
  on-surface: '#131e1b'
  on-surface-variant: '#404945'
  inverse-surface: '#27332f'
  inverse-on-surface: '#e7f4ee'
  outline: '#707975'
  outline-variant: '#c0c9c3'
  surface-tint: '#326858'
  primary: '#002b21'
  on-primary: '#ffffff'
  primary-container: '#044335'
  on-primary-container: '#79b09d'
  inverse-primary: '#9ad2be'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#69fb8e'
  on-secondary-container: '#007231'
  tertiary: '#162a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#264200'
  on-tertiary-container: '#71b706'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b6eeda'
  primary-fixed-dim: '#9ad2be'
  on-primary-fixed: '#002018'
  on-primary-fixed-variant: '#175041'
  secondary-fixed: '#6dfe90'
  secondary-fixed-dim: '#4ce177'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#acf851'
  tertiary-fixed-dim: '#91da36'
  on-tertiary-fixed: '#102000'
  on-tertiary-fixed-variant: '#2e4f00'
  background: '#f0fcf7'
  on-background: '#131e1b'
  surface-variant: '#d9e5e0'
typography:
  headline-xl:
    fontFamily: Cairo
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Cairo
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Cairo
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: IBM Plex Arabic
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: IBM Plex Arabic
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  headline-xl-mobile:
    fontFamily: Cairo
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The brand personality is authoritative, visionary, and rooted in national progress. It balances traditional Algerian values with a modern, reformist outlook. The design system prioritizes a professional "Statesman" aesthetic for a female candidate, focusing on clarity, trust, and structural stability.

The design style is **Minimalist-Modern**. It utilizes expansive off-white whitespace to convey transparency, while using deep forest green to anchor the UI in institutional authority. There are no gradients or decorative flourishes; the visual impact relies on bold typography, rigorous grid alignment, and a high-contrast palette. The emotional response should be one of confidence, stability, and "The Future of Algeria."

## Colors
The palette is a tricolor evolution of the Algerian flag, optimized for digital legibility and professional prestige.

- **Primary (#044335):** Used for high-level containers like navigation bars, footers, and hero section backgrounds. It represents the state and seriousness.
- **Secondary (#00B753):** Reserved exclusively for primary Action (CTA) buttons and progress indicators.
- **Accent (#9CE641):** Used sparingly for data visualizations, counter numbers, and small highlights to inject energy into the "growth" narrative.
- **Text & UI:** Charcoal (#1A2522) is used for all body copy to ensure maximum readability against the Off-white (#F7F9F8) background. Pure white is reserved for cards to create a subtle lift from the page.

## Typography
The typography system is designed for trilingual excellence (Arabic, French, and English). 

- **Headlines:** Cairo (Extra Bold) provides a heavy, authoritative presence suitable for political slogans. For Arabic, ensure the `lang="ar"` attribute is set to handle specific script shaping.
- **Body:** IBM Plex Arabic offers a technical, modern feel that bridges the gap between traditional calligraphic styles and modern sans-serifs. 
- **Latin/Labels:** Inter is used for small UI labels, tags, and secondary Latin text (French/English) to maintain a global, professional standard.

**RTL Priority:** All typography must be right-aligned by default. Ensure line heights are generous for Arabic scripts to prevent diacritic clipping.

## Layout & Spacing
The design system employs a **Fixed Grid** model for desktop to maintain a classic, editorial feel, transitioning to a fluid model for mobile.

- **Desktop (1200px+):** 12-column grid with 24px gutters. Content is centered.
- **Tablet (768px - 1199px):** 8-column grid with 24px gutters and 32px side margins.
- **Mobile (< 767px):** 4-column fluid grid with 16px side margins.

**RTL Logic:** Spacing tokens must use logical properties (e.g., `padding-inline-start` instead of `padding-left`) to ensure the layout mirrors correctly when switching between Arabic and French/English versions.

## Elevation & Depth
This design system avoids heavy shadows to maintain a clean, modern aesthetic. 

- **Surface Layers:** The background is #F7F9F8. Primary content cards use #FFFFFF.
- **Subtle Elevation:** For cards and interactive elements, use a "Whisper Shadow": `0px 4px 12px rgba(26, 37, 34, 0.05)`. 
- **Active States:** Elements should not lift higher on hover; instead, use a 1px border stroke of the Primary color to indicate focus or selection.
- **Flat Depth:** Depth is primarily communicated through color blocking (e.g., a Primary #044335 footer sitting flush against the Off-white body).

## Shapes
Shapes are disciplined and "Soft-Industrial." We avoid fully round "pill" shapes to maintain a sense of formal structure.

- **Standard Elements:** Buttons and Input fields use a 0.25rem (4px) radius.
- **Large Containers:** Cards and Hero images use a 0.5rem (8px) radius.
- **Iconography:** Use geometric, sharp-edged icons with a 2px stroke weight to match the weight of the Cairo typeface.

## Components
- **Buttons:** Primary buttons are Solid Emerald (#00B753) with White text. Hover state shifts to a 10% darker shade. Secondary buttons use a Primary (#044335) outline with 1px weight.
- **Input Fields:** Use a subtle Off-white fill with a 1px Charcoal (#1A2522) border at 10% opacity. On focus, the border becomes Primary (#044335).
- **Cards:** White background, 8px corner radius, and the "Whisper Shadow." Content within cards should have 24px internal padding.
- **Campaign Counter:** Use Lime (#9CE641) for large numerical data (e.g., "Days until election" or "Supporters") set in Cairo 800.
- **Language Switcher:** A clean, text-only toggle in the top-right (or top-left for RTL) using Inter Bold. Current language is underlined with a 2px Primary stroke.
- **Lists:** Use custom emerald checkmarks for policy bullet points to emphasize the "action-oriented" nature of the campaign.