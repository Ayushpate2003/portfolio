import { Link } from 'react-router-dom'
import { Award, BadgeCheck, Flag, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAchievements } from '../../lib/portfolioStorage'
import { getProject } from '../../data/projects'
import type { AchievementKind } from '../../types'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const kindMeta: Record<AchievementKind, { label: string; Icon: LucideIcon }> = {
  champion: { label: 'Champion', Icon: Trophy },
  winner: { label: 'Winner', Icon: Award },
  participation: { label: 'Participation', Icon: Flag },
  certificate: { label: 'Certificate', Icon: BadgeCheck },
}

export function Achievements() {
  const achievements = useAchievements()

  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Milestones & Recognition"
      intro="Verified hackathon championships, competition awards, and cybersecurity credentials."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {achievements.map((item, index) => {
          const { label, Icon } = kindMeta[item.kind]
          const project = item.relatedProject ? getProject(item.relatedProject) : undefined
          return (
            <li key={item.id}>
              <Reveal delay={(index % 2) * 80} className="h-full">
                <Card as="article" className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                      <Icon aria-hidden="true" size={16} />
                      {label}
                    </span>
                    <span className="font-mono text-xs text-muted">{item.period}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted">{item.issuer}</p>
                  <p className="mt-3 text-sm text-muted">{item.description}</p>
                  {project && (
                    <Link
                      to={`/projects/${project.slug}`}
                      className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                    >
                      See project: {project.name}
                    </Link>
                  )}
                </Card>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
