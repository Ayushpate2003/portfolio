import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { SocialLinks } from '../ui/SocialLinks'

export function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}. {profile.location}.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: `#${item.id}` }}
                  className="py-1 transition-colors duration-150 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <SocialLinks />
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors duration-150 hover:text-accent"
          >
            <ArrowUp aria-hidden="true" size={16} />
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  )
}
