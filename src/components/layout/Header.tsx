import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { ThemeToggle } from './ThemeToggle'

const ids = navItems.map((item) => item.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const active = useActiveSection(ids, pathname === '/')

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const linkClass = (id: string) =>
    `rounded-md px-3 py-2 text-sm transition-colors duration-150 hover:text-accent ${
      active === id ? 'text-accent' : 'text-muted'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className="font-mono text-sm font-semibold tracking-wide text-text hover:text-accent transition-colors flex items-center gap-2.5 group"
          onClick={() => setOpen(false)}
        >
          <img
            src="/Smiling%20Professional%20in%20a%20Circular%20Badge.png"
            alt={profile.name}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover ring-2 ring-accent/50 shadow-[0_0_12px_var(--hero-orbital-shadow)] transition-transform duration-200 group-hover:scale-105 group-hover:ring-accent"
            draggable={false}
          />
          <span>{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={{ pathname: '/', hash: `#${item.id}` }}
              className={linkClass(item.id)}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-bg md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: `#${item.id}` }}
                  className="block rounded-md px-2 py-3 text-base text-text hover:text-accent"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
