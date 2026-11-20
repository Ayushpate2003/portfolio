# Product Requirements Document — Ayush Patel Portfolio

## 1. Vision and purpose
A fast, accessible, single-owner portfolio site that lets a visitor understand within a minute who Ayush Patel is, what he can build, and how to reach him. It is a credibility tool, not a marketing funnel: every claim on the site must trace to the owner's resume.

**Source of truth:** `Ayush Patel resume.pdf` (latest version, modified 2026-10-17, read from the owner's Google Drive). Content that the resume does not support is either omitted or marked as a placeholder in the data files.

## 2. Target audience
| Audience | What they want |
|---|---|
| Recruiters / hiring managers | Skills, internships, education, dates, resume, contact |
| Developers / peers | Project descriptions, tech used, GitHub |
| Hackathon organizers / collaborators | Competition record, ways to get in touch |

## 3. User problems and goals
- "Is this person credible for a cloud / full-stack / security internship?" → clear experience, skills, achievements.
- "What have they actually built?" → project cards with problem, contribution and stack, and honest "no live demo yet" states.
- "How do I contact them?" → email and social links visible in hero, contact section and footer.

## 4. Functional requirements
| ID | Requirement |
|---|---|
| F1 | Sticky header with section navigation, active-section highlight, mobile menu |
| F2 | Hero: name, headline, short intro, CTAs (View Projects, Download Resume), GitHub / LinkedIn / email links |
| F3 | About, Skills (7 categories, no percentages), Projects, Experience & Education, Achievements, Contact, Footer |
| F4 | Projects and all other content driven from `src/data/*.ts` |
| F5 | Project detail pages at `/projects/:slug` (resume-backed content only) |
| F6 | Light/dark theme, follows system preference, persisted locally |
| F7 | Resume download button shown only when the PDF exists at build time |
| F8 | Custom 404 page |
| F9 | Contact via `mailto:` and social links (no form, because no backend is configured) |

## 5. Nonfunctional requirements
- **Performance:** Lighthouse performance ≥ 90 on mobile; initial JS < 200 kB gzipped; no layout shift from fonts beyond `font-display: swap`.
- **Accessibility:** WCAG 2.2 AA target — semantic landmarks, skip link, visible focus, 4.5:1 text contrast, keyboard-operable menu, reduced-motion support.
- **Responsiveness:** 320 px to 1920 px, no horizontal overflow.
- **SEO:** unique `<title>`/description per route, Open Graph + Twitter tags, JSON-LD `Person`, `robots.txt`.
- **Privacy:** no analytics or trackers by default; phone number is not published.
- **Browser support:** last two versions of Chrome, Edge, Firefox, Safari.

## 6. User stories and acceptance criteria
1. *As a recruiter I can download the resume.* — Button appears in hero and contact when `public/Ayush-Patel-Resume.pdf` exists at build; clicking downloads the PDF. If missing, no button is rendered.
2. *As a hiring manager I can see experience quickly.* — Experience section lists Ediglobe (2025) and Miraiyantra, plus education with dates as in the resume.
3. *As a developer I can inspect projects.* — Each project card shows problem, description, stack, contributions; links appear only if a URL is set.
4. *As a mobile user I can navigate.* — Menu opens/closes with button and Escape, links close it, focus stays visible.
5. *As a visitor with a dark-mode OS I get dark mode.* — First load matches `prefers-color-scheme`; toggle overrides and persists.
6. *As a visitor with reduced-motion set I see no animation.* — Reveal and smooth-scroll effects are disabled.

## 7. Analytics and privacy
None shipped. If added later (P2), use a cookieless provider, document it here, and add a privacy note to the footer.

## 8. Success criteria
- All P0 items in `mvp.md` complete; production build, type-check, lint and tests pass.
- No fabricated metrics, URLs or awards anywhere in the content.
- Owner can add a project by editing one array in `src/data/projects.ts`.

## 9. Out of scope
Backend, database, CMS, authentication, blog, analytics (see P2 in `mvp.md`).
