import type { ReactNode } from 'react'

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-border/80 bg-surface px-2.5 py-1 font-mono text-xs text-text transition-colors hover:border-accent/50">
      {children}
    </span>
  )
}
