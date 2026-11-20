# Design System

## Direction
Minimal, editorial, technical. Warm paper-toned light theme and near-black dark theme, one teal accent, monospaced labels for a terminal flavour, generous whitespace. No stock photos, no heavy gradients or glassmorphism. Interface icons come from Lucide (never emoji).

## Color tokens
Defined as CSS variables in `src/index.css`, exposed to Tailwind via `@theme`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#f7f6f2` | `#0b0d0f` | Page background |
| `surface` | `#ffffff` | `#12151a` | Cards |
| `surface-muted` | `#efede7` | `#181c22` | Chips, code panel |
| `border` | `#dcd9d0` | `#262b33` | Dividers, card borders |
| `text` | `#15171a` | `#eceef0` | Body and headings |
| `muted` | `#555a63` | `#9aa1ab` | Secondary text |
| `accent` | `#0b6b63` | `#5fd4c4` | Links, focus ring, CTA |
| `accent-contrast` | `#ffffff` | `#04211d` | Text on accent fills |

All text/background pairs target ≥ 4.5:1.

## Typography
- Body/headings: **Instrument Sans** (Google Fonts, `display=swap`), fallback system sans.
- Labels, code, dates: **JetBrains Mono**, fallback `ui-monospace`.
- Scale: hero `clamp(2.5rem, 6vw, 4.5rem)`; section title `clamp(1.75rem, 3.5vw, 2.5rem)`; body 1rem/1.7; labels 0.75rem mono uppercase with letter-spacing.

## Layout and spacing
- Container: `max-w-6xl`, horizontal padding 1.25rem (mobile) → 2rem (≥ 640 px).
- Section vertical rhythm: `py-20` mobile, `py-28` desktop.
- Breakpoints (Tailwind defaults): `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- Projects grid: 1 col → 2 cols (`md`) ; skills grid 1 → 2 → 3 cols; timeline single column with left rule.

## Components
| Component | Notes |
|---|---|
| `Button` | Variants `primary` (accent fill) and `secondary` (bordered); renders `<a>` or `<Link>` |
| `Badge` | Mono, rounded-md, `surface-muted` background |
| `Card` | `surface`, 1 px border, 12 px radius; hover raises border to accent at 40 % |
| `Section` | `<section>` with id, eyebrow label, title, optional intro |
| `Reveal` | Fade + 12 px slide-in on first intersection |
| `ThemeToggle` | Icon button with `aria-label`, Sun/Moon icon |
| Header | Sticky, blurred-free solid background with bottom border; mobile drawer below `md` |
| Footer | Nav, socials, copyright, back-to-top |

## Theme behavior
`<html class="dark">` toggled. An inline script in `index.html` applies the stored or system preference before first paint. Choice is persisted in `localStorage` (wrapped in `try/catch`). `color-scheme` is set so native controls match.

## States
- **Hover:** border/accent color change, 150 ms.
- **Focus:** 2 px accent outline with 2 px offset on every interactive element (`:focus-visible`).
- **Active:** slight translate on buttons.
- **Loading / empty:** there is no async data; the resume button is simply absent when no PDF is bundled, and project links are absent when no URL is set. Project detail 404s render the NotFound page.

## Accessibility
Skip-to-content link, one `<h1>`, ordered headings, landmarks (`header`, `nav`, `main`, `footer`), `aria-current` on the active nav link, `aria-expanded`/`aria-controls` on the menu button, external links get `rel="noopener noreferrer"` and visible "(opens in new tab)" screen-reader text, decorative icons `aria-hidden`.

## Motion
Purposeful and small: scroll reveal and hover transitions only. Under `prefers-reduced-motion: reduce`, reveals render immediately, transitions are shortened to near-zero and smooth scrolling is off.

## Responsive layouts
- **Mobile (< 768):** stacked hero, terminal panel below text, hamburger menu, single-column cards.
- **Tablet (768–1023):** two-column project and skill grids, inline nav.
- **Desktop (≥ 1024):** hero is two columns (text + terminal panel), three-column skill grid, timeline with date column.
