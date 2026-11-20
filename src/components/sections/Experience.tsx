import { useExperience } from '../../lib/portfolioStorage'
import type { TimelineEntry } from '../../types'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

function Timeline({ title, entries }: { title: string; entries: TimelineEntry[] }) {
  return (
    <div>
      <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-accent">{title}</h3>
      <ol className="space-y-8 border-l border-border pl-6">
        {entries.map((entry) => (
          <li key={entry.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg"
            />
            <Reveal>
              <article>
                {entry.period && <p className="font-mono text-xs text-muted">{entry.period}</p>}
                <h4 className="mt-1 text-lg font-semibold">{entry.title}</h4>
                <p className="text-sm text-muted">
                  {entry.organization}
                  {entry.location && ` · ${entry.location}`}
                </p>
                {entry.details && <p className="mt-2 text-sm">{entry.details}</p>}
                {entry.highlights.length > 0 && (
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function Experience() {
  const { experience, education } = useExperience()

  return (
    <Section id="experience" eyebrow="Experience & education" title="Experience & Growth">
      <div className="grid gap-14 lg:grid-cols-2">
        <Timeline title="Experience" entries={experience} />
        <Timeline title="Education" entries={education} />
      </div>
    </Section>
  )
}
