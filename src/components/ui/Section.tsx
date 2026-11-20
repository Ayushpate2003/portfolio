import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
          <h2 id={`${id}-title`} className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight">
            {title}
          </h2>
          {intro && <p className="mt-4 text-muted">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
