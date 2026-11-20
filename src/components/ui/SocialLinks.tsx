import { Mail } from 'lucide-react'
import type { SocialIcon } from '../../types'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from './Icons'

const icons: Record<SocialIcon, (props: { size?: number }) => React.JSX.Element> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: (props) => <Mail aria-hidden="true" size={props.size ?? 20} />,
}

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {profile.socials.map((social) => {
        const Icon = icons[social.icon]
        const external = social.href.startsWith('http')
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={external ? `${social.label} (opens in new tab)` : social.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-[0_0_16px_var(--hero-orbital-shadow)] hover:scale-105"
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon size={19} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
