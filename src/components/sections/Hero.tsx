import {
  ArrowRight,
  Download,
  GraduationCap,
  Briefcase,
  Code2,
  Trophy,
} from 'lucide-react'
import { useProfile } from '../../lib/portfolioStorage'
import { SocialLinks } from '../ui/SocialLinks'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  const profile = useProfile()

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20"
      style={{
        background: 'var(--hero-radial-bg)',
      }}
    >
      {/* Background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Main Two-Column Hero Grid */}
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1.15fr] md:gap-8">
          {/* Left Column: Intro & Headline */}
          <div className="relative z-20">
            {/* Eyebrow badge */}
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] animate-pulse" />
              <span>{profile.role}</span>
            </div>

            {/* Oversized Bold Headline */}
            <h1
              id="hero-title"
              className="text-[clamp(2.75rem,5.5vw,4.5rem)] font-extrabold leading-[1.06] tracking-tight text-text"
            >
              Building <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent-secondary drop-shadow-[0_0_35px_var(--hero-orbital-shadow)]">
                Intelligent
              </span>{' '}
              <br className="hidden sm:inline" />
              Solutions
              <span className="inline-block text-accent font-light animate-cursor-blink ml-1">
                |
              </span>
            </h1>

            {/* Specialty compact line */}
            <div className="mt-5 font-mono text-xs font-medium tracking-[0.22em] text-accent/90">
              CLOUD · SECURITY · FULL-STACK · AI
            </div>

            {/* Supporting text */}
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted">
              {profile.intro}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_var(--hero-orbital-shadow)] transition-all duration-200 hover:shadow-[0_0_32px_var(--hero-orbital-shadow)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowRight aria-hidden="true" size={17} />
                <span>Explore My Projects</span>
              </a>

              {__RESUME_AVAILABLE__ ? (
                <a
                  href={__RESUME_PATH__}
                  download="Ayush-Patel-Resume.pdf"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-medium text-text shadow-sm transition-all duration-200 hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download aria-hidden="true" size={17} />
                  <span>Download Resume</span>
                </a>
              ) : (
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-medium text-text transition-all duration-200 hover:border-accent hover:text-accent"
                >
                  <span>Get in touch</span>
                </a>
              )}
            </div>

            {/* Social Icons */}
            <div className="mt-8">
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Visual Stage with Illustrated Portrait & Floating Cards */}
          <HeroVisual />
        </div>

        {/* ── 6. Bottom Professional Summary Bar ── */}
        <div className="mt-10 md:mt-16 rounded-2xl md:rounded-3xl border border-border bg-surface/90 p-5 sm:p-7 shadow-lg backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-border">
            {/* Column 1: Education */}
            <div className="flex items-start gap-3.5 md:px-4 first:md:pl-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-accent">
                <GraduationCap size={18} />
              </div>
              <div>
                <span className="font-mono text-base font-bold text-accent">GPA 8.52 · 2027</span>
                <p className="mt-0.5 text-sm font-semibold text-text">B.Tech in CSE</p>
                <p className="text-xs text-muted">Cloud Computing &amp; Info Security</p>
                <p className="text-[11px] text-muted/75">Sandip University, Nashik</p>
              </div>
            </div>

            {/* Column 2: Experience */}
            <div className="flex items-start gap-3.5 md:px-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-accent">
                <Briefcase size={18} />
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-accent">2</span>
                <p className="mt-0.5 text-sm font-semibold text-text">Internships (Ediglobe &amp; Miraiyantra)</p>
                <p className="text-xs text-muted">Cloud &amp; Software Dev</p>
                <p className="text-[11px] text-muted/75">Pune &amp; Nashik, MH</p>
              </div>
            </div>

            {/* Column 3: Projects */}
            <div className="flex items-start gap-3.5 md:px-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-accent">
                <Code2 size={18} />
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-accent">6</span>
                <p className="mt-0.5 text-sm font-semibold text-text">Featured Projects</p>
                <p className="text-xs text-muted">Healthcare, AI &amp; Cloud</p>
                <p className="text-[11px] text-muted/75">Full-Stack &amp; Cryptographic</p>
              </div>
            </div>

            {/* Column 4: Achievements */}
            <div className="flex items-start gap-3.5 md:px-4 last:md:pr-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-accent">
                <Trophy size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">Awards &amp; Certs</p>
                <p className="mt-1 text-xs text-accent font-medium">ML Nashik Champion '26</p>
                <p className="text-xs text-muted">Sun Hack Production Winner</p>
                <p className="text-[11px] text-muted/75">IIT Jodhpur Cyber Security</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
