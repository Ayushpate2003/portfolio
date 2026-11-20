import { useState } from 'react'
import {
  Brain,
  Cloud,
  Code,
  Container,
  Layout,
  ShieldCheck,
  Wrench,
  Plus,
  Trash2,
  Pencil,
  RotateCcw,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SkillCategory, SkillIcon } from '../../types'
import { useSkills, saveStoredSkills, resetStoredSkills } from '../../lib/portfolioStorage'

const icons: Record<SkillIcon, LucideIcon> = {
  code: Code,
  layout: Layout,
  cloud: Cloud,
  container: Container,
  shield: ShieldCheck,
  brain: Brain,
  wrench: Wrench,
}

const iconOptions: { label: string; value: SkillIcon }[] = [
  { label: 'Cloud / Infrastructure', value: 'cloud' },
  { label: 'Security & Systems', value: 'shield' },
  { label: 'Front-End / UI', value: 'layout' },
  { label: 'Full-Stack / Code', value: 'code' },
  { label: 'AI / Brain', value: 'brain' },
  { label: 'DevOps / Container', value: 'container' },
  { label: 'Tools / Wrench', value: 'wrench' },
]

export function AdminSkillsEditor({ onToast }: { onToast: (msg: string) => void }) {
  const categories = useSkills()
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({})
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCatTitle, setNewCatTitle] = useState('')
  const [newCatIcon, setNewCatIcon] = useState<SkillIcon>('cloud')

  const handleAddSkillToCategory = (catId: string) => {
    const text = (newSkillInput[catId] || '').trim()
    if (!text) return

    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        if (cat.skills.includes(text)) return cat
        return { ...cat, skills: [...cat.skills, text] }
      }
      return cat
    })

    saveStoredSkills(updated)
    setNewSkillInput((prev) => ({ ...prev, [catId]: '' }))
    onToast(`Added "${text}" to skills`)
  }

  const handleRemoveSkill = (catId: string, skillToRemove: string) => {
    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        return { ...cat, skills: cat.skills.filter((s) => s !== skillToRemove) }
      }
      return cat
    })
    saveStoredSkills(updated)
    onToast(`Removed "${skillToRemove}"`)
  }

  const handleDeleteCategory = (catId: string, catTitle: string) => {
    if (window.confirm(`Delete the entire category "${catTitle}"?`)) {
      const updated = categories.filter((c) => c.id !== catId)
      saveStoredSkills(updated)
      onToast(`Deleted category "${catTitle}"`)
    }
  }

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatTitle.trim()) return

    const id = newCatTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const newCategory: SkillCategory = {
      id,
      title: newCatTitle.trim(),
      icon: newCatIcon,
      skills: [],
    }

    saveStoredSkills([...categories, newCategory])
    setIsAddModalOpen(false)
    setNewCatTitle('')
    onToast(`Created category "${newCatTitle}"`)
  }

  const handleSaveEditCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCategory) return

    const updated = categories.map((c) => (c.id === editingCategory.id ? editingCategory : c))
    saveStoredSkills(updated)
    setEditingCategory(null)
    onToast('Category updated!')
  }

  const handleReset = () => {
    if (window.confirm('Reset all skills categories and badges back to original defaults?')) {
      resetStoredSkills()
      onToast('Skills reset to defaults')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="text-xl font-bold text-text">Skills & Technologies</h2>
          <p className="text-xs text-muted mt-1">
            Manage the domain cards and technology badges displayed in the "Technologies I Work With" section.
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
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-accent-contrast shadow-sm hover:opacity-90 active:scale-[0.98]"
          >
            <Plus size={15} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => {
          const IconComponent = icons[category.icon] || Code
          return (
            <div
              key={category.id}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:border-accent/40 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/70">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <IconComponent size={17} />
                    </div>
                    <h3 className="font-semibold text-sm text-text truncate">{category.title}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingCategory({ ...category })}
                      className="p-1 text-muted hover:text-accent rounded-lg"
                      title="Edit Category Name & Icon"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id, category.title)}
                      className="p-1 text-muted hover:text-red-500 rounded-lg"
                      title="Delete Category"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Skill Badges List */}
                <div className="flex flex-wrap gap-1.5 mb-4 min-h-[60px]">
                  {category.skills.length === 0 ? (
                    <span className="text-xs text-muted/60 italic py-2">No skills yet. Add below.</span>
                  ) : (
                    category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-bg px-2.5 py-1 text-xs font-mono text-text transition-colors hover:border-accent/40"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(category.id, skill)}
                          className="text-muted hover:text-red-500 transition-colors"
                          title="Remove skill"
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Add Skill Input */}
              <div className="pt-3 border-t border-border/60 flex gap-2">
                <input
                  type="text"
                  placeholder="Add skill (e.g. Kubernetes)..."
                  value={newSkillInput[category.id] || ''}
                  onChange={(e) =>
                    setNewSkillInput((prev) => ({ ...prev, [category.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddSkillToCategory(category.id)
                    }
                  }}
                  className="flex-1 rounded-xl border border-border bg-bg px-3 py-1.5 text-xs text-text focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkillToCategory(category.id)}
                  className="rounded-xl border border-border bg-bg px-2.5 py-1.5 text-xs font-medium text-accent hover:border-accent"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Add Category Modal ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-text">Create Skill Domain</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-text">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted mb-1">DOMAIN TITLE *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile Engineering (Flutter)"
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">DOMAIN ICON</label>
                <select
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value as SkillIcon)}
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-border px-3 py-1.5 text-xs text-muted hover:text-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-4 py-1.5 text-xs font-semibold text-accent-contrast"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit Category Modal ── */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-text">Edit Skill Domain</h3>
              <button onClick={() => setEditingCategory(null)} className="text-muted hover:text-text">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSaveEditCategory} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted mb-1">DOMAIN TITLE *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.title}
                  onChange={(e) =>
                    setEditingCategory((prev) => (prev ? { ...prev, title: e.target.value } : null))
                  }
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">DOMAIN ICON</label>
                <select
                  value={editingCategory.icon}
                  onChange={(e) =>
                    setEditingCategory((prev) =>
                      prev ? { ...prev, icon: e.target.value as SkillIcon } : null
                    )
                  }
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="rounded-xl border border-border px-3 py-1.5 text-xs text-muted hover:text-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-4 py-1.5 text-xs font-semibold text-accent-contrast"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
