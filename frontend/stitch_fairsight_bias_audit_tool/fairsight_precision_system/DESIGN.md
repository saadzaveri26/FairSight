---
name: FairSight Precision System
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d2027'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#c5c6ce'
  on-secondary: '#2e3037'
  secondary-container: '#45464e'
  on-secondary-container: '#b4b4bd'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e2e2eb'
  secondary-fixed-dim: '#c5c6ce'
  on-secondary-fixed: '#191b22'
  on-secondary-fixed-variant: '#45464e'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 20px
  margin: 32px
---

## Brand & Style

This design system is engineered to convey high-stakes analytical authority. The brand personality is clinical, objective, and precise, mirroring the rigorous nature of AI bias auditing. It targets data scientists, compliance officers, and executive stakeholders who require a high-density information environment that remains legible and stress-free.

The visual style is **Corporate / Modern** with a lean toward **Technical Minimalism**. It prioritizes function over form, utilizing a "Dashboard-First" philosophy. The UI avoids unnecessary ornamentation, relying on strict alignment, consistent stroke weights, and a hierarchical use of color to signal importance and system status. The emotional goal is to instill a sense of "radical transparency" and "technical confidence."

## Colors

The palette is optimized for long-duration technical monitoring in low-light environments. The primary background (#0F1117) provides a deep, stable foundation that reduces eye strain and allows data visualizations to pop.

- **Primary Accent:** Electric Blue is reserved for interactive elements and primary focus states.
- **Semantic Logic:** Green, Red, and Amber are used strictly for audit results (Fair, Biased, Cautionary). These must never be used for decorative purposes.
- **Neutral Scale:** Use varying opacities of Slate and Steel grays to establish hierarchy in secondary text and UI borders.

## Typography

This design system utilizes a dual-font strategy to separate narrative from data.

1.  **Inter (Prose & Interface):** Used for all UI controls, headings, and explanatory text. Its neutral character ensures it does not distract from the data.
2.  **JetBrains Mono (Data & Values):** Applied to all numerical outputs, percentages, code snippets, and raw data tables. The monospaced nature ensures that columns of numbers align perfectly, aiding in rapid scanning.
3.  **Space Grotesk (Labels):** Used sparingly for high-level category labels and section headers in all-caps to provide a subtle "technical" aesthetic.

## Layout & Spacing

The design system employs a **Fixed-Fluid Hybrid Grid**. Sidebars and inspector panels are fixed-width (280px - 320px), while the central data stage is fluid.

- **The 4px Rule:** All spacing increments must be multiples of 4px to maintain a rhythmic vertical cadence.
- **Data Density:** Use "Compact" (8px) spacing for data tables and "Spacious" (24px) spacing for high-level dashboard summaries.
- **Alignment:** Every element must align to the grid. Use 20px gutters between cards to provide clear visual separation without wasting excessive screen real estate.

## Elevation & Depth

This design system avoids traditional drop shadows in favor of **Tonal Layering** and **Subtle Outlines**. This mimics the look of a high-end technical instrument.

- **Base Layer:** #0F1117 (The canvas).
- **Surface Layer:** #1E293B (Cards, panels).
- **Elevated Layer:** #334155 (Modals, tooltips).
- **Borders:** Use 1px solid borders (#1E293B) instead of shadows to define container boundaries.
- **Active State:** Elements in focus or "active" receive a 1px glow or stroke of the Primary Accent (#3B82F6).

## Shapes

The shape language is **Soft-Technical**. A consistent 4px border radius is applied to almost all components, providing a professional look that is modern but not "playful."

- **Primary Radius:** 4px (Buttons, Inputs, Small Cards).
- **Secondary Radius:** 8px (Large Dashboard Containers).
- **Interactive Elements:** Maintain strict rectangularity with slight rounding; avoid pill shapes or circular buttons unless they are icon-only actions.

## Components

**Buttons:** 
- Primary: Solid #3B82F6 with white text. 
- Ghost: Transparent with #1E293B border and #94A3B8 text.
- Interaction: 10% brightness increase on hover.

**Cards:**
- Background: #1E293B. 
- Border: 1px solid #334155.
- Header: 40px height with a bottom border to separate title from content.

**Input Fields:**
- Background: #0F1117 (sunken look).
- Border: 1px solid #334155.
- Focus: Border changes to #3B82F6 with a 0 0 0 2px glow.

**Data Chips / Badges:**
- Use for status indicators. High-contrast text on a low-opacity background of the same color (e.g., Success: 10% green background, 100% green text).

**Visualizations:**
- Chart axes should be #475569. Grid lines should be dashed and #1E293B. Use the status colors (Green/Red/Amber) for data lines and bars to indicate health metrics.

**Audit Specifics:**
- **The "Bias Gauge":** A specialized component featuring a horizontal track with a needle or marker indicating the bias variance from the "Fair" center-point.