import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  icon?: ReactNode
  /** Internal route or hash route, e.g. "/#projects". */
  to?: string
  /** Plain anchor target (mailto:, files, external URLs). */
  href?: string
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean
  download?: boolean
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,transform] duration-150 active:translate-y-px'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-contrast hover:opacity-90',
  secondary: 'border border-border bg-surface text-text hover:border-accent',
}

export function Button({
  children,
  variant = 'primary',
  icon,
  to,
  href,
  external,
  download,
  className = '',
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      download={download ? '' : undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  )
}
