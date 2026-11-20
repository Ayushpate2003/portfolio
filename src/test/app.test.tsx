import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { navItems } from '../data/navigation'
import { projects } from '../data/projects'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('home page', () => {
  it('renders the hero and every section', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1, name: /building intelligent solutions/i })).toBeInTheDocument()
    for (const item of navItems) {
      expect(document.getElementById(item.id)).not.toBeNull()
    }
  })

  it('renders every project card with a details link', () => {
    renderAt('/')
    const section = document.getElementById('projects')!
    for (const project of projects) {
      expect(within(section).getByRole('heading', { name: project.name })).toBeInTheDocument()
    }
    expect(within(section).getAllByRole('link', { name: /view details/i })).toHaveLength(projects.length)
  })

  it('does not render GitHub or live links for projects without URLs', () => {
    renderAt('/')
    const section = document.getElementById('projects')!
    expect(within(section).queryByRole('link', { name: /source/i })).toBeNull()
    expect(within(section).queryByRole('link', { name: /live demo/i })).toBeNull()
  })

  it('does not show a resume download when no PDF is bundled', () => {
    renderAt('/')
    if (!__RESUME_AVAILABLE__) {
      expect(screen.queryByRole('link', { name: /download resume/i })).toBeNull()
    }
  })

  it('exposes safe external social links', () => {
    renderAt('/')
    const github = screen.getAllByRole('link', { name: /github/i })[0]
    expect(github).toHaveAttribute('target', '_blank')
    expect(github).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})

describe('routing', () => {
  it('renders a project detail page', () => {
    renderAt('/projects/ml-interviewer')
    expect(screen.getByRole('heading', { level: 1, name: 'ML Interviewer' })).toBeInTheDocument()
    expect(screen.getByText(/has not been published/i)).toBeInTheDocument()
  })

  it('renders the 404 page for an unknown project and unknown route', () => {
    const first = renderAt('/projects/does-not-exist')
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    first.unmount()
    renderAt('/nowhere')
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })
})

describe('interactions', () => {
  it('toggles and persists the theme', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: /switch to dark theme/i }))
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    await user.click(screen.getByRole('button', { name: /switch to light theme/i }))
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('opens the mobile menu and closes it with Escape', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('navigation', { name: /mobile/i })).toBeNull()
  })
})
