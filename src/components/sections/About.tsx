import { MapPin } from 'lucide-react'
import { useProfile } from '../../lib/portfolioStorage'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function About() {
  const profile = useProfile()
  return (
    <Section id="about" eyebrow="About" title="Engineering With Purpose">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={100}>
          <Card>
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Focus areas</h3>
            <ul className="mt-4 space-y-2">
              {profile.interests.map((interest) => (
                <li key={interest} className="flex gap-3 text-sm">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {interest}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted">
              <MapPin aria-hidden="true" size={16} />
              {profile.location}
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
