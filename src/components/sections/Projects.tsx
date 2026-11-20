import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProjects } from '../../lib/portfolioStorage'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { GithubIcon } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Projects() {
  const projects = useProjects()

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected Work"
      intro="Projects where software engineering, cloud technologies, and AI come together to solve practical problems."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={(index % 2) * 80} className="h-full">
              <Card as="article" className="flex h-full flex-col">
                <p className="font-mono text-xs text-muted">{project.context}</p>
                <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm font-medium">{project.problem}</p>
                <p className="mt-3 text-sm text-muted">{project.description}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Badge>{tag}</Badge>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                  >
                    View details
                    <ArrowRight aria-hidden="true" size={14} />
                    <span className="sr-only"> for {project.name}</span>
                  </Link>
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted hover:text-accent"
                    >
                      <GithubIcon size={14} />
                      Source
                      <span className="sr-only"> for {project.name} (opens in new tab)</span>
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent"
                    >
                      Live demo
                      <span className="sr-only"> of {project.name} (opens in new tab)</span>
                    </a>
                  )}
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
