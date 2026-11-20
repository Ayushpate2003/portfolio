import { useState } from 'react'
import { Plus, Pencil, Trash2, ExternalLink, RotateCcw, X, FolderGit2 } from 'lucide-react'
import type { Project } from '../../types'
import { useProjects, saveStoredProjects, resetStoredProjects } from '../../lib/portfolioStorage'

export function AdminProjectsEditor({ onToast }: { onToast: (msg: string) => void }) {
  const projects = useProjects()
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [contributionInput, setContributionInput] = useState('')
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  const emptyProject: Project = {
    slug: '',
    name: '',
    context: '',
    problem: '',
    description: '',
    tags: [],
    contributions: [],
    links: { github: '', live: '' },
  }

  const [formData, setFormData] = useState<Project>(emptyProject)

  const openCreateModal = () => {
    setEditingProject(null)
    setFormData(emptyProject)
    setTagInput('')
    setContributionInput('')
    setIsModalOpen(true)
  }

  const openEditModal = (proj: Project) => {
    setEditingProject(proj)
    setFormData({
      ...proj,
      links: { github: proj.links?.github || '', live: proj.links?.live || '' },
    })
    setTagInput('')
    setContributionInput('')
    setIsModalOpen(true)
  }

  const handleNameChange = (nameVal: string) => {
    setFormData((prev) => {
      const shouldUpdateSlug = !editingProject && (!prev.slug || prev.slug === prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
      return {
        ...prev,
        name: nameVal,
        slug: shouldUpdateSlug
          ? nameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
          : prev.slug,
      }
    })
  }

  const handleAddTag = () => {
    const t = tagInput.trim()
    if (t && !formData.tags.includes(t)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, t] }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tagToRemove) }))
  }

  const handleAddContribution = () => {
    const c = contributionInput.trim()
    if (c) {
      setFormData((prev) => ({ ...prev, contributions: [...prev.contributions, c] }))
      setContributionInput('')
    }
  }

  const handleRemoveContribution = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      contributions: prev.contributions.filter((_, i) => i !== index),
    }))
  }

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const slug =
      formData.slug.trim() ||
      formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    const finalProject: Project = {
      ...formData,
      slug,
      name: formData.name.trim(),
      context: formData.context.trim(),
      problem: formData.problem.trim(),
      description: formData.description.trim(),
      links: {
        github: formData.links?.github?.trim() || undefined,
        live: formData.links?.live?.trim() || undefined,
      },
    }

    let updated: Project[]
    if (editingProject) {
      updated = projects.map((p) => (p.slug === editingProject.slug ? finalProject : p))
      onToast(`Updated project "${finalProject.name}"`)
    } else {
      updated = [finalProject, ...projects.filter((p) => p.slug !== finalProject.slug)]
      onToast(`Created project "${finalProject.name}"`)
    }

    saveStoredProjects(updated)
    setIsModalOpen(false)
  }

  const confirmDelete = () => {
    if (!projectToDelete) return
    const updated = projects.filter((p) => p.slug !== projectToDelete.slug)
    saveStoredProjects(updated)
    onToast(`Deleted "${projectToDelete.name}"`)
    setProjectToDelete(null)
  }

  const handleReset = () => {
    if (window.confirm('Reset all projects back to default selected work?')) {
      resetStoredProjects()
      onToast('Projects reset to default data')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="text-xl font-bold text-text">Selected Work & Projects</h2>
          <p className="text-xs text-muted mt-1">
            Manage projects, case studies, problem statements, tags, and source code links.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-accent-contrast shadow-sm hover:opacity-90 active:scale-[0.98]"
          >
            <Plus size={15} />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:border-accent/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-border/70">
                <div>
                  <p className="font-mono text-[11px] text-muted">{project.context}</p>
                  <h3 className="text-lg font-bold text-text mt-1">{project.name}</h3>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-1.5 text-muted hover:text-accent rounded-lg"
                    title="Edit Project"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setProjectToDelete(project)}
                    className="p-1.5 text-muted hover:text-red-500 rounded-lg"
                    title="Delete Project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-xs font-medium text-text mt-2">{project.problem}</p>
              <p className="text-xs text-muted mt-2 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-bg px-2 py-0.5 text-[11px] font-mono text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links preview */}
            <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted">
              <div className="flex items-center gap-3">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-accent"
                  >
                    <FolderGit2 size={13} />
                    GitHub
                  </a>
                )}
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                )}
              </div>
              <span>Slug: /{project.slug}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add / Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-lg font-bold text-text">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-text">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">PROJECT NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Arogya-Prepare"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">SLUG (URL PATH) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="arogya-prepare"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs font-mono text-text focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">CONTEXT / SUBTITLE</label>
                <input
                  type="text"
                  value={formData.context}
                  onChange={(e) => setFormData((prev) => ({ ...prev, context: e.target.value }))}
                  placeholder="e.g. Healthcare Platform · Cryptographic Identity & AI"
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">ONE-LINE PROBLEM STATEMENT *</label>
                <input
                  type="text"
                  required
                  value={formData.problem}
                  onChange={(e) => setFormData((prev) => ({ ...prev, problem: e.target.value }))}
                  placeholder="One sentence describing the challenge or problem solved..."
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">FULL DESCRIPTION *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Comprehensive description of the architecture and solution..."
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">GITHUB REPO URL</label>
                  <input
                    type="url"
                    value={formData.links?.github || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        links: { ...prev.links, github: e.target.value },
                      }))
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">LIVE DEMO URL</label>
                  <input
                    type="url"
                    value={formData.links?.live || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        links: { ...prev.links, live: e.target.value },
                      }))
                    }
                    placeholder="https://yourproject.vercel.app"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-mono text-muted mb-1">TECH STACK TAGS</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                    placeholder="Add tag (e.g. React, Docker, Python)..."
                    className="flex-1 rounded-xl border border-border bg-bg px-3.5 py-1.5 text-xs text-text focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-xl border border-border bg-bg px-3 py-1.5 text-xs font-medium text-accent"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-lg border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-mono text-accent"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Contributions / Highlights */}
              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  KEY CONTRIBUTIONS & HIGHLIGHTS
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={contributionInput}
                    onChange={(e) => setContributionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddContribution()
                      }
                    }}
                    placeholder="Add bullet highlight (e.g. Implemented zero-PHI audit ledger)..."
                    className="flex-1 rounded-xl border border-border bg-bg px-3.5 py-1.5 text-xs text-text focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddContribution}
                    className="rounded-xl border border-border bg-bg px-3 py-1.5 text-xs font-medium text-accent"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {formData.contributions.map((c, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-2 text-xs rounded-lg border border-border bg-bg px-2.5 py-1 text-muted"
                    >
                      <span className="truncate">• {c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveContribution(idx)}
                        className="text-muted hover:text-red-500 shrink-0"
                      >
                        <X size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-muted hover:text-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-5 py-2 text-xs font-semibold text-accent-contrast shadow-sm hover:opacity-90 active:scale-[0.98]"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl">
            <h3 className="text-base font-bold text-text">Delete Project?</h3>
            <p className="mt-2 text-xs text-muted">
              Are you sure you want to delete <strong>"{projectToDelete.name}"</strong>? It will
              be removed from your live portfolio.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                onClick={() => setProjectToDelete(null)}
                className="rounded-xl border border-border px-3.5 py-1.5 text-xs text-muted"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
