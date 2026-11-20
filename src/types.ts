export type SocialIcon = 'github' | 'linkedin' | 'mail'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export interface Profile {
  name: string
  role: string
  headline: string
  tagline?: string
  intro: string
  location: string
  email: string
  phone?: string
  emailSubject: string
  socials: SocialLink[]
  about: string[]
  interests: string[]
  siteTitle: string
  siteDescription: string
}

export type SkillIcon = 'code' | 'layout' | 'cloud' | 'container' | 'shield' | 'brain' | 'wrench'

export interface SkillCategory {
  id: string
  title: string
  icon: SkillIcon
  skills: string[]
}

export interface Project {
  slug: string
  name: string
  /** One-line problem statement. */
  problem: string
  description: string
  context: string
  tags: string[]
  contributions: string[]
  links?: {
    github?: string
    live?: string
  }
}

export interface TimelineEntry {
  id: string
  title: string
  organization: string
  location?: string
  period?: string
  details?: string
  highlights: string[]
}

export type AchievementKind = 'champion' | 'winner' | 'participation' | 'certificate'

export interface Achievement {
  id: string
  title: string
  issuer: string
  period: string
  kind: AchievementKind
  description: string
  relatedProject?: string
}

export interface NavItem {
  id: string
  label: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  url?: string
  platform?: string
  content?: string
}


