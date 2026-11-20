import { useState } from 'react'
import {
  Check,
  Cloud,
  ShieldCheck,
  Brain,
  Code2,
} from 'lucide-react'

export function HeroVisual() {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* ── Main Hero Visual Container ── */}
      <div className="relative flex w-full items-center justify-center min-h-[480px] sm:min-h-[520px] md:h-[600px] select-none">
        
        {/* ── LAYER 1: Background Glow & Abstract Shapes ── */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
          aria-hidden="true"
        >
          {/* Ambient radial background glow */}
          <div className="absolute h-[380px] w-[380px] rounded-full bg-[var(--hero-platform-glow)] blur-[90px] animate-pulse-glow" />

          {/* Abstract curved organic ribbon / 3D figure matching reference */}
          <svg
            className="absolute h-[540px] w-[480px] max-w-none opacity-85 select-none"
            viewBox="0 0 520 580"
            fill="none"
          >
            <defs>
              <linearGradient id="heroRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--hero-ribbon-color-1)" stopOpacity="0.55" />
                <stop offset="45%" stopColor="var(--hero-ribbon-color-2)" stopOpacity="0.32" />
                <stop offset="85%" stopColor="var(--hero-ribbon-color-1)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--hero-ribbon-grad-end)" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="heroRibbonGrad2" x1="100%" y1="10%" x2="10%" y2="90%">
                <stop offset="0%" stopColor="var(--hero-ribbon-color-2)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="var(--hero-ribbon-color-1)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--hero-ribbon-grad-end)" stopOpacity="0" />
              </linearGradient>

              <filter id="heroRibbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Upper Right Smooth Lobe */}
            <path
              d="M260 70 C 370 45, 450 140, 420 260 C 390 350, 310 370, 240 330 C 180 295, 190 200, 240 165 C 290 130, 370 145, 360 230"
              fill="url(#heroRibbonGrad1)"
              filter="url(#heroRibbonGlow)"
            />

            {/* Lower Left Smooth Lobe */}
            <path
              d="M170 210 C 110 260, 100 370, 170 430 C 240 480, 330 450, 340 370 C 350 290, 260 250, 200 270 C 150 290, 140 370, 220 390"
              fill="url(#heroRibbonGrad2)"
              filter="url(#heroRibbonGlow)"
            />

            {/* Central S-Curve Flow */}
            <path
              d="M280 120 C 380 180, 350 330, 250 390 C 160 450, 120 370, 150 300 C 190 220, 290 230, 310 160"
              fill="url(#heroRibbonGrad1)"
              opacity="0.45"
            />
          </svg>

          {/* ── LAYER 2: Orbital Rings, Light Trails & Particles ── */}
          <svg
            className="absolute h-[540px] w-[500px] max-w-none select-none pointer-events-none"
            viewBox="0 0 500 540"
            fill="none"
          >
            {/* Primary Diagonal Orbital Ring (sweeps around torso and legs) */}
            <ellipse
              cx="260"
              cy="295"
              rx="195"
              ry="75"
              transform="rotate(-22 260 295)"
              stroke="var(--hero-orbital-ring)"
              strokeWidth="1.75"
              strokeDasharray="6 4"
              opacity="0.55"
              filter="drop-shadow(0 0 8px var(--hero-orbital-shadow))"
            />

            {/* Secondary Faint Ring */}
            <ellipse
              cx="260"
              cy="310"
              rx="220"
              ry="85"
              transform="rotate(-20 260 310)"
              stroke="var(--accent-secondary)"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Accent Light Arc passing behind */}
            <path
              d="M100 240 Q 250 170 410 230"
              stroke="var(--accent)"
              strokeWidth="1.5"
              opacity="0.45"
            />
          </svg>

          {/* Twinkling Particle Dots */}
          <div className="absolute top-[22%] left-[18%] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] animate-pulse" />
          <div className="absolute top-[35%] right-[15%] h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_var(--accent)] animate-pulse" />
          <div className="absolute bottom-[38%] left-[12%] h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_var(--accent)]" />
          <div className="absolute bottom-[28%] right-[10%] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)] animate-pulse" />
          <div className="absolute top-[15%] right-[28%] h-1 w-1 rounded-full bg-accent opacity-75" />
          <div className="absolute bottom-[16%] left-[25%] h-1 w-1 rounded-full bg-accent opacity-80" />

          {/* Small diamond particle */}
          <div className="absolute bottom-[32%] left-[8%] h-1.5 w-1.5 rotate-45 border border-accent bg-accent/40 shadow-[0_0_8px_var(--accent)]" />
        </div>

        {/* ── LAYER 3: Glowing Circular Platform Beneath Feet ── */}
        <div
          className="pointer-events-none absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] h-[95px] select-none"
          aria-hidden="true"
        >
          {/* Ground reflection glow pool */}
          <div className="absolute inset-x-8 inset-y-4 rounded-[100%] bg-[var(--hero-platform-glow)] blur-xl transform scale-y-[0.32]" />

          {/* Outer faint platform ring */}
          <div className="absolute inset-0 rounded-[100%] border border-[var(--hero-platform-ring-outer)] shadow-[0_0_20px_var(--hero-orbital-shadow)] transform scale-y-[0.32]" />

          {/* Inner bright platform ring directly under shoes */}
          <div className="absolute inset-x-8 inset-y-3 rounded-[100%] border-2 border-[var(--hero-platform-ring)] shadow-[0_0_24px_var(--hero-orbital-shadow)] transform scale-y-[0.32]" />

          {/* Central pedestal fill */}
          <div className="absolute inset-x-16 inset-y-5 rounded-[100%] bg-[var(--hero-platform-glow)] blur-sm transform scale-y-[0.32]" />
        </div>

        {/* ── LAYER 4: Main Illustrated Portrait ── */}
        <img
          src="/portrait.png"
          alt="Ayush Patel illustrated portrait"
          onLoad={() => setImgLoaded(true)}
          className={`relative z-10 h-[440px] sm:h-[520px] lg:h-[590px] w-auto max-w-full object-contain pointer-events-none select-none transition-opacity duration-500 drop-shadow-[0_15px_30px_rgba(23,36,58,0.18)] dark:drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* ── LAYER 5: Floating Technical Cards & Badges (Desktop) ── */}
        
        {/* Card A: Cloud Deployment (Top-Left) */}
        <div className="hidden md:block absolute top-[5%] -left-6 xl:-left-10 z-20 w-[215px] glass-card rounded-2xl p-4 text-left animate-float-slow">
          <div className="flex items-center justify-between font-mono text-[11px] text-accent pb-2 mb-2.5 border-b border-border">
            <span className="font-semibold tracking-tight">&gt; cloud deploy --success</span>
            <Cloud size={15} className="shrink-0 text-accent" />
          </div>
          <ul className="space-y-2 font-mono text-[11px] text-text">
            <li className="flex items-center gap-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>EC2 Deployed</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>S3 Connected</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Check size={11} strokeWidth={3} />
              </span>
              <span>Application Live</span>
            </li>
          </ul>
        </div>

        {/* Card B: Cybersecurity (Top-Right) */}
        <div className="hidden md:block absolute top-[15%] -right-4 xl:-right-8 z-20 w-[195px] glass-card rounded-2xl p-4 text-left animate-float-delayed">
          <div className="flex items-center gap-2 text-xs font-semibold text-text pb-2 mb-2.5 border-b border-border">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <ShieldCheck size={16} />
            </div>
            <span>Cybersecurity</span>
          </div>
          <ul className="space-y-1.5 text-xs text-muted">
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>Secure Systems</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>Threat Analysis</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>Information Security</span>
            </li>
          </ul>
        </div>

        {/* Card C: AI / LLM (Bottom-Left) */}
        <div className="hidden md:block absolute bottom-[24%] left-[2%] z-20 w-[200px] glass-card rounded-2xl p-4 text-left animate-float-delayed">
          <div className="flex items-center gap-2 text-xs font-semibold text-text pb-2 mb-2.5 border-b border-border">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Brain size={16} />
            </div>
            <span>AI / LLM</span>
          </div>
          <ul className="space-y-1.5 text-xs text-muted">
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>Prompt Engineering</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>RAG Architecture</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>Intelligent Applications</span>
            </li>
          </ul>
        </div>

        {/* Floating React Atom Badge (Below AI/LLM card) */}
        <div
          className="hidden md:flex absolute bottom-[13%] left-[15%] z-20 h-12 w-12 items-center justify-center rounded-2xl glass-pill shadow-md animate-float-micro"
          title="React"
        >
          <svg className="h-7 w-7 text-[var(--react-atom-color)]" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
            <circle cx="0" cy="0" r="2.05" />
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        </div>

        {/* Card D: Full-Stack (Bottom-Right) */}
        <div className="hidden md:block absolute bottom-[10%] -right-4 xl:-right-8 z-20 w-[195px] glass-card rounded-2xl p-4 text-left animate-float-slow">
          <div className="flex items-center gap-2 text-xs font-semibold text-text pb-2 mb-2.5 border-b border-border">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Code2 size={16} />
            </div>
            <span>Full-Stack</span>
          </div>
          <ul className="space-y-1.5 text-xs text-muted">
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>MERN Stack</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>Modern Web Apps</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">-</span>
              <span>Scalable Solutions</span>
            </li>
          </ul>
        </div>

        {/* Floating AWS Badge */}
        <div
          className="hidden md:flex absolute top-[47%] right-[11%] xl:right-[13%] z-20 h-11 px-3 items-center justify-center rounded-xl glass-pill animate-float-slow"
          title="Amazon Web Services"
        >
          {/* Light Mode AWS (dark navy text) */}
          <img
            src="/logo-aws-dark-text.png"
            alt="AWS"
            className="h-6 w-auto object-contain block dark:hidden"
            draggable={false}
          />
          {/* Dark Mode AWS (white text) */}
          <img
            src="/logo-aws.png"
            alt="AWS"
            className="h-6 w-auto object-contain hidden dark:block"
            draggable={false}
          />
        </div>

        {/* Floating Docker Badge */}
        <div
          className="hidden md:flex absolute top-[53%] -right-2 xl:right-[0%] z-20 h-11 w-11 items-center justify-center rounded-xl glass-pill animate-float-delayed"
          title="Docker Containerization"
        >
          <img
            src="/logo-docker.png"
            alt="Docker"
            className="h-7 w-7 object-contain"
            draggable={false}
          />
        </div>

        {/* Floating Python Badge */}
        <div
          className="hidden md:flex absolute bottom-[38%] right-[16%] xl:right-[18%] z-20 h-11 w-11 items-center justify-center rounded-xl glass-pill animate-float-micro"
          title="Python"
        >
          <img
            src="/logo-python.png"
            alt="Python"
            className="h-7 w-7 object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* ── Mobile Tech Badges Row (React, AWS, Docker, Python) ── */}
      <div className="mt-5 mb-1 flex md:hidden items-center justify-center gap-3.5 w-full">
        {/* React Badge */}
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl glass-pill shadow-sm animate-float-micro transition-transform hover:scale-110 active:scale-95"
          title="React"
        >
          <svg className="h-6 w-6 text-[var(--react-atom-color)]" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
            <circle cx="0" cy="0" r="2.05" />
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        </div>

        {/* AWS Badge */}
        <div
          className="flex h-11 px-3 items-center justify-center rounded-xl glass-pill shadow-sm animate-float-slow transition-transform hover:scale-110 active:scale-95"
          title="Amazon Web Services"
        >
          {/* Light Mode AWS (dark navy text) */}
          <img
            src="/logo-aws-dark-text.png"
            alt="AWS"
            className="h-5 w-auto object-contain block dark:hidden"
            draggable={false}
          />
          {/* Dark Mode AWS (white text) */}
          <img
            src="/logo-aws.png"
            alt="AWS"
            className="h-5 w-auto object-contain hidden dark:block"
            draggable={false}
          />
        </div>

        {/* Docker Badge */}
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl glass-pill shadow-sm animate-float-delayed transition-transform hover:scale-110 active:scale-95"
          title="Docker Containerization"
        >
          <img
            src="/logo-docker.png"
            alt="Docker"
            className="h-6 w-6 object-contain"
            draggable={false}
          />
        </div>

        {/* Python Badge */}
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl glass-pill shadow-sm animate-float-micro transition-transform hover:scale-110 active:scale-95"
          title="Python"
        >
          <img
            src="/logo-python.png"
            alt="Python"
            className="h-6 w-6 object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* ── Mobile/Tablet Cards Grid (Positioned cleanly below portrait, preventing overlap) ── */}
      <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
        {/* Card A: Cloud */}
        <div className="glass-card rounded-xl p-4 text-left">
          <div className="flex items-center justify-between font-mono text-xs text-accent pb-2 mb-2 border-b border-border">
            <span className="font-semibold">&gt; cloud deploy --success</span>
            <Cloud size={14} />
          </div>
          <div className="text-xs text-text space-y-1 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Check size={9} strokeWidth={3} />
              </span>
              <span>EC2 Deployed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Check size={9} strokeWidth={3} />
              </span>
              <span>S3 Connected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Check size={9} strokeWidth={3} />
              </span>
              <span>Application Live</span>
            </div>
          </div>
        </div>

        {/* Card B: Cybersecurity */}
        <div className="glass-card rounded-xl p-4 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-text pb-2 mb-2 border-b border-border">
            <ShieldCheck size={15} className="text-accent" />
            <span>Cybersecurity</span>
          </div>
          <div className="text-xs text-muted space-y-1">
            <div>- Secure Systems</div>
            <div>- Threat Analysis</div>
            <div>- Information Security</div>
          </div>
        </div>

        {/* Card C: AI / LLM */}
        <div className="glass-card rounded-xl p-4 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-text pb-2 mb-2 border-b border-border">
            <Brain size={15} className="text-accent" />
            <span>AI / LLM</span>
          </div>
          <div className="text-xs text-muted space-y-1">
            <div>- Prompt Engineering</div>
            <div>- RAG Architecture</div>
            <div>- Intelligent Applications</div>
          </div>
        </div>

        {/* Card D: Full-Stack */}
        <div className="glass-card rounded-xl p-4 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-text pb-2 mb-2 border-b border-border">
            <Code2 size={15} className="text-accent" />
            <span>Full-Stack</span>
          </div>
          <div className="text-xs text-muted space-y-1">
            <div>- MERN Stack</div>
            <div>- Modern Web Apps</div>
            <div>- Scalable Solutions</div>
          </div>
        </div>
      </div>
    </div>
  )
}
