import { describe, expect, it } from 'vitest'
import { achievements } from '../data/achievements'
import { education, experience } from '../data/experience'
import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { getProject, projects } from '../data/projects'
import { skillCategories } from '../data/skills'

describe('content data integrity', () => {
  it('has unique, URL-safe project slugs', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/))
  })

  it('gives every project the fields the UI renders', () => {
    for (const project of projects) {
      expect(project.name).not.toBe('')
      expect(project.problem).not.toBe('')
      expect(project.description).not.toBe('')
      expect(project.contributions.length).toBeGreaterThan(0)
      expect(project.tags.length).toBeGreaterThan(0)
    }
  })

  it('only uses https links for projects and socials (mailto allowed for email)', () => {
    for (const project of projects) {
      for (const url of Object.values(project.links ?? {})) {
        if (url) expect(url).toMatch(/^https:\/\//)
      }
    }
    for (const social of profile.socials) {
      expect(social.href).toMatch(/^(https:\/\/|mailto:)/)
    }
  })

  it('links achievements only to projects that exist', () => {
    for (const achievement of achievements) {
      if (achievement.relatedProject) expect(getProject(achievement.relatedProject)).toBeDefined()
    }
  })

  it('has unique ids across timeline, achievements, skills and navigation', () => {
    for (const ids of [
      [...experience, ...education].map((entry) => entry.id),
      achievements.map((item) => item.id),
      skillCategories.map((category) => category.id),
      navItems.map((item) => item.id),
    ]) {
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('does not publish a phone number', () => {
    // Strip emails and URLs first: the email address legitimately contains digits.
    const text = JSON.stringify(profile)
      .replace(/[\w.+-]+@[\w.-]+/g, '')
      .replace(/https?:\/\/[^\s"]+/g, '')
    expect(text).not.toMatch(/\+?\d[\d\s-]{8,}\d/)
  })
})
