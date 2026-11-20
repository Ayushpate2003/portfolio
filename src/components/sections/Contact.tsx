import { Download, Mail, Phone } from 'lucide-react'
import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SocialLinks } from '../ui/SocialLinks'

export function Contact() {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Something Meaningful"
      intro="Have an idea involving cloud infrastructure, full-stack development, cybersecurity, or AI? I'd be glad to connect and explore what we can build."
    >
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={mailto} icon={<Mail aria-hidden="true" size={16} />}>
            {profile.email}
          </Button>
          {profile.phone && (
            <Button
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              variant="secondary"
              icon={<Phone aria-hidden="true" size={16} />}
            >
              {profile.phone}
            </Button>
          )}
          {__RESUME_AVAILABLE__ && (
            <Button
              href={__RESUME_PATH__}
              download
              variant="secondary"
              icon={<Download aria-hidden="true" size={16} />}
            >
              Download Resume
            </Button>
          )}
        </div>
        <SocialLinks className="mt-6" />
      </Reveal>
    </Section>
  )
}
