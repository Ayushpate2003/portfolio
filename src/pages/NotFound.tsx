import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { profile } from '../data/profile'
import { Button } from '../components/ui/Button'

export function NotFound() {
  useDocumentMeta(`Page not found — ${profile.name}`)

  return (
    <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8 md:py-32">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">Error 404</p>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-muted">
        The page you are looking for does not exist or has moved. You can head back to the homepage and pick up from there.
      </p>
      <div className="mt-8">
        <Button to="/">Back to homepage</Button>
      </div>
    </section>
  )
}
