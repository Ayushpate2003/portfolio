import { ArrowUpRight, Calendar, Clock, BookOpen } from 'lucide-react'
import { useBlogs } from '../../lib/blogStorage'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Blog() {
  const blogs = useBlogs()

  return (
    <Section
      id="blog"
      eyebrow="Writing & Articles"
      title="Thoughts & Technical Insights"
      intro="Articles, blueprints, and practical guides on cloud architecture, AI engineering, cybersecurity, and high-performance web systems."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {blogs.map((post, index) => (
          <li key={post.slug} className="flex">
            <Reveal delay={(index % 2) * 80} className="w-full h-full">
              <Card as="article" className="group flex h-full flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
                {/* Subtle decorative gradient on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />

                <div>
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted mb-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={13} className="text-accent" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={13} className="text-accent" />
                        {post.readTime}
                      </span>
                    </div>

                    {post.platform && (
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium border border-accent/25 bg-accent/10 text-accent">
                        {post.platform}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold leading-snug text-text transition-colors duration-150 group-hover:text-accent">
                    <a
                      href={post.url ?? '#'}
                      target={post.url?.startsWith('http') ? '_blank' : undefined}
                      rel={post.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-start gap-1.5 focus:outline-none"
                    >
                      <span>{post.title}</span>
                      <ArrowUpRight
                        size={17}
                        className="shrink-0 mt-1 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 text-accent"
                        aria-hidden="true"
                      />
                    </a>
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer with Tags and Read Link */}
                <div className="mt-6 pt-4 border-t border-border/60">
                  <ul className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <Badge>{tag}</Badge>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center justify-between pt-1">
                    <a
                      href={post.url ?? '#'}
                      target={post.url?.startsWith('http') ? '_blank' : undefined}
                      rel={post.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent hover:underline focus:outline-none"
                    >
                      <BookOpen size={13} aria-hidden="true" />
                      Read Article
                      <span className="sr-only">: {post.title}</span>
                    </a>
                  </div>
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
