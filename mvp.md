# MVP and Implementation Priorities

Status key: ✅ done · 🟡 partial · ⬜ not started · ⏸ deferred

## P0 — Essential
| Feature | Status | Depends on | Acceptance criteria |
|---|---|---|---|
| Responsive homepage + navigation | ✅ | Layout, Header | Works 320–1920 px, no horizontal scroll |
| Hero (name, intro, CTAs) | ✅ | profile data | Name, headline, View Projects, resume CTA, 3 social links |
| About | ✅ | profile data | Text derived from resume summary and interests |
| Skills | ✅ | skills data | 7 categories, no percentages |
| Projects | ✅ | projects data | 6 resume projects as cards; links only when set |
| Experience + Education | ✅ | experience data | Ediglobe, Miraiyantra, Sandip University, Polytechnic diploma |
| Achievements + certifications | ✅ | achievements data | Champion / winner / participation kept distinct; IIT Jodhpur certificate |
| Contact | ✅ | profile data | `mailto:` + social links, no fake form |
| Resume download | 🟡 | `public/Ayush-Patel-Resume.pdf` | Button renders only if file exists at build. **PDF not yet copied into repo.** |
| Mobile navigation | ✅ | Header | Toggle, Escape closes, `aria-expanded` |
| Basic SEO + a11y | ✅ | index.html plugin | Meta, OG, JSON-LD, skip link, focus rings |
| Production build + tests | ✅ | — | `npm run lint && npm run typecheck && npm test && npm run build` |

## P1 — Important enhancements
| Feature | Status | Depends on | Acceptance criteria |
|---|---|---|---|
| Dark/light toggle | ✅ | useTheme | System default, persisted, no flash on load |
| Project detail pages | ✅ | React Router | `/projects/:slug` renders; unknown slug → 404 |
| Subtle animations | ✅ | Reveal | Fade/slide on scroll, disabled for reduced motion |
| Social sharing metadata | 🟡 | `SITE_URL` env | OG/Twitter tags present; absolute `og:url` and `og:image` added only when `SITE_URL` is set and `public/og-image.png` exists |
| Custom 404 | ✅ | Router | Unknown routes show 404 with link home |

## P2 — Optional
| Feature | Status | Notes |
|---|---|---|
| Blog / technical writing | ⏸ | Needs content source |
| Project filtering / search | ⏸ | Only worthwhile with > 10 projects |
| Privacy-friendly analytics | ⏸ | Requires owner's choice of provider |
| Working contact form | ⏸ | Requires a configured form service (e.g. Formspree); not faked |
| Developer-themed interactive widgets | ⏸ | Hero already has a static terminal-style panel |

## Known placeholders
- Project GitHub / live-demo URLs: empty in `projects.ts` (resume gives none).
- Project screenshots: none; cards are text-first by design.
- Resume PDF and OG image: owner supplies.
