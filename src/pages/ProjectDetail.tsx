import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { GithubIcon } from '../components/ui/Icons'
import { Button } from '../components/ui/Button'
import { getProject } from '../data/projects'
import { profile } from '../data/profile'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  useDocumentMeta(
    project ? `${project.name} — ${profile.name}` : `Project not found — ${profile.name}`,
    project?.description,
  )

  if (!project) return <NotFound />

  const hasLinks = Boolean(project.links?.github || project.links?.live)

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
      <Link
        to={{ pathname: '/', hash: '#projects' }}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        All projects
      </Link>

      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-accent">{project.context}</p>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight">{project.name}</h1>
      <p className="mt-4 text-lg">{project.problem}</p>

      <section aria-labelledby="overview" className="mt-10">
        <h2 id="overview" className="font-mono text-xs uppercase tracking-widest text-muted">
          Overview
        </h2>
        <p className="mt-3 text-muted">{project.description}</p>
      </section>

      <section aria-labelledby="contributions" className="mt-10">
        <h2 id="contributions" className="font-mono text-xs uppercase tracking-widest text-muted">
          Key contributions
        </h2>
        <ul className="mt-3 space-y-3">
          {project.contributions.map((item) => (
            <li key={item} className="flex gap-3 text-muted">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stack" className="mt-10">
        <h2 id="stack" className="font-mono text-xs uppercase tracking-widest text-muted">
          Technologies and approach
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="links" className="mt-10">
        <h2 id="links" className="font-mono text-xs uppercase tracking-widest text-muted">
          Links
        </h2>
        {hasLinks ? (
          <div className="mt-3 flex flex-wrap gap-3">
            {project.links?.github && (
              <Button href={project.links.github} external variant="secondary" icon={<GithubIcon size={16} />}>
                Source code
              </Button>
            )}
            {project.links?.live && (
              <Button href={project.links.live} external>
                Live demo
              </Button>
            )}
          </div>
        ) : (
          <p className="mt-3 text-muted">A public source or demo link has not been published for this project.</p>
        )}
      </section>
    </article>
  )
}
