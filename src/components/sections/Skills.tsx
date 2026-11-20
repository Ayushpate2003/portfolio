import { Brain, Cloud, Code, Container, Layout, ShieldCheck, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useSkills } from '../../lib/portfolioStorage'
import type { SkillIcon } from '../../types'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const icons: Record<SkillIcon, LucideIcon> = {
  code: Code,
  layout: Layout,
  cloud: Cloud,
  container: Container,
  shield: ShieldCheck,
  brain: Brain,
  wrench: Wrench,
}

export function Skills() {
  const skillCategories = useSkills()

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technologies I Work With"
      intro="Grouped by domain across cloud infrastructure, security, full-stack, and generative AI."
    >
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => {
          const Icon = icons[category.icon]
          return (
            <li key={category.id}>
              <Reveal delay={(index % 3) * 80} className="h-full">
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <Icon aria-hidden="true" size={20} className="text-accent" />
                    <h3 className="font-semibold">{category.title}</h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li key={skill}>
                        <Badge>{skill}</Badge>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
