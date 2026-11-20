# System Design

## 1. Overview
A static single-page application. All content is compiled into the bundle from typed TypeScript modules. There is no runtime server component.

```mermaid
flowchart LR
  V[Visitor browser] -->|HTTPS| CDN[Static host / CDN]
  CDN --> A[index.html + JS/CSS bundle + public assets]
  A --> R[React app]
  R --> D[(src/data modules, compiled in)]
  R --> LS[(localStorage: theme only)]
  R -.mailto / social links.-> E[Email client, GitHub, LinkedIn]
```

## 2. Component relationships
```mermaid
flowchart TD
  main --> BrowserRouter --> App
  App --> Layout
  Layout --> Header
  Layout --> Outlet
  Layout --> Footer
  Header --> ThemeToggle
  Outlet --> Home & ProjectDetail & NotFound
  Home --> Hero & About & Skills & Projects & Experience & Achievements & Contact
  Hero & About & Skills & Projects & Experience & Achievements & Contact --> ui[Section / Card / Badge / Button / Reveal]
```

## 3. Page navigation and user flows
- **Recruiter:** Hero → Download Resume (if bundled) → Experience → Contact (mailto).
- **Developer:** Hero → View Projects → card → `/projects/:slug` → back to `/#projects`.
- **Deep link:** `/#achievements` loads Home and the scroll manager scrolls to the section.
- From a project page, header links point to `/#section`, returning to Home and scrolling.

## 4. Data flow
`src/data/*.ts` (typed constants) → imported by section components → rendered with ui primitives. `profile.ts` also supplies the per-route title/description set by `useDocumentMeta`. The static `<title>`, meta/OG tags and the JSON-LD `Person` block live in `index.html` (so crawlers see them without running JS) and are kept in sync with `profile.ts` by hand.

## 5. Contact flow
No form. "Email me" opens `mailto:` with a prefilled subject. Social links open in a new tab. Rationale: a form without a configured service would be non-functional, which the requirements forbid.

## 6. Project and resume navigation
- Project cards link internally to detail pages; GitHub/live links render only when defined.
- Resume button links to `/Ayush-Patel-Resume.pdf` with the `download` attribute; rendered only if the file existed at build (`__RESUME_AVAILABLE__`).

## 7. Theme preference
```mermaid
sequenceDiagram
  participant H as index.html script
  participant LS as localStorage
  participant T as useTheme
  H->>LS: read "theme"
  alt stored
    H->>H: apply stored class
  else none
    H->>H: apply prefers-color-scheme
  end
  T->>T: toggle → set class
  T->>LS: write "theme" (try/catch)
```

## 8. Performance and caching
- Single route chunk; icons tree-shaken; no images in the critical path.
- Fonts: preconnect + `display=swap`.
- Host should serve hashed assets with `Cache-Control: public, max-age=31536000, immutable` and `index.html` with `no-cache` (Vercel/Netlify defaults do this).

## 9. Security and privacy boundaries
Client-only; no user input is stored or transmitted. Only `localStorage` key: `theme`. No cookies, no analytics. Public data is limited to what the owner chose to publish (email, GitHub, LinkedIn). Phone is excluded.

## 10. Error and fallback behavior
| Situation | Behavior |
|---|---|
| Unknown URL / slug | NotFound page with link home |
| Resume PDF absent at build | Resume buttons not rendered |
| Project without GitHub/live URL | Link omitted; detail page notes "Source/demo link not published" |
| `localStorage` blocked | Theme still works for the session |
| JS disabled | Blank shell; `<noscript>` message with email and resume text |

## 11. Deployment architecture
```mermaid
flowchart LR
  Dev[git push] --> CI[Host build: npm ci && npm run build]
  CI --> Dist[dist/]
  Dist --> Edge[CDN edge]
  Edge --> User
```
SPA fallback rewrite sends every non-file path to `index.html`.
