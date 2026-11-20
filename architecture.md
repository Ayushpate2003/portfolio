# Architecture

## Stack and rationale
| Choice | Why |
|---|---|
| React 19 + TypeScript (strict) | Matches the owner's React skills; typed content models |
| Vite | Fast dev/build, static output |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Token-driven styling with no config file |
| Lucide React | Small tree-shakable icon set |
| React Router | Needed only for `/projects/:slug` and 404 |
| Vitest + Testing Library | Unit and smoke tests |
| ESLint (typescript-eslint, react-hooks) | Static checks |

No backend, database, auth or animation library. Scroll reveal uses `IntersectionObserver` and CSS.

## Folder layout
```
portfolio/
  index.html              meta tags, theme bootstrap script
  vite.config.ts          React, Tailwind, SEO/resume build plugin
  public/                 favicon, robots.txt, _redirects, (resume PDF, og-image)
  src/
    main.tsx              entry, BrowserRouter
    App.tsx               routes
    index.css             Tailwind import + design tokens
    types.ts              content models
    data/                 profile, skills, projects, experience, achievements, navigation
    components/
      layout/             Layout, Header, Footer, ThemeToggle
      ui/                 Button, Badge, Card, Section, Reveal, ExternalLink
      sections/           Hero, About, Skills, Projects, Experience, Achievements, Contact
    hooks/                useTheme, useActiveSection, useDocumentMeta
    pages/                Home, ProjectDetail, NotFound
    lib/                  links helpers
    test/                 vitest suites
```

## Frontend architecture
- Sections are presentational components that read typed arrays from `src/data`. No section contains hard-coded personal content.
- Reusable primitives in `components/ui` carry all styling decisions; sections compose them.
- Pages: `Home` composes the seven sections; `ProjectDetail` looks up a project by slug; `NotFound` is the catch-all.

## Routing
| Path | Page |
|---|---|
| `/` | Home (anchors `#about`, `#skills`, `#projects`, `#experience`, `#achievements`, `#contact`) |
| `/projects/:slug` | Project detail; unknown slug renders NotFound |
| `*` | NotFound |

A scroll manager in `Layout` scrolls to the hash target or to top on navigation. Hosts must rewrite unknown paths to `index.html` (`vercel.json`, `public/_redirects` included).

## Data models (`src/types.ts`)
`Profile`, `SocialLink`, `SkillCategory`, `Project`, `TimelineEntry`, `Achievement`. `Project.links.github/live` are optional; the UI renders a link only when defined. `Achievement.kind` is `"champion" | "winner" | "participation" | "certificate"` so claim strength stays explicit.

## State management
No global store. Theme is a small hook (`useTheme`) backed by `localStorage`; mobile menu state is local to `Header`; active section is derived via `IntersectionObserver`.

## API and backend boundaries
None. Contact is `mailto:` plus social links. A future form must use a third-party endpoint configured through `VITE_`-prefixed public variables only; no secrets in the client.

## Error handling and validation
- Unknown routes/slugs → NotFound.
- `localStorage` access wrapped in `try/catch`.
- Tests assert data integrity (unique slugs, `https://` links, non-empty fields).

## Security considerations
- No secrets, tokens or env values required at runtime.
- External links use `rel="noopener noreferrer"`.
- Phone number from the resume is intentionally not published.
- Recommended response headers are set in `vercel.json` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`).

## Testing strategy
`npm test` (Vitest + jsdom): data integrity, router smoke test (home sections render, project detail renders, 404 renders), theme toggle behaviour. Manual: keyboard walk-through and viewport checks, documented in the delivery report.

## Commands
| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |

## Build and deployment
`npm run build` → `tsc -b && vite build` → `dist/`. The Vite plugin:
1. checks for `public/Ayush-Patel-Resume.pdf` and defines `__RESUME_AVAILABLE__`;
2. injects canonical / `og:url` / `og:image` only when `SITE_URL` is set and `public/og-image.png` exists.

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages with a 404 fallback).
