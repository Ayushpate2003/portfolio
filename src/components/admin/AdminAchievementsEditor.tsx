import { useState } from 'react'
import { Plus, Pencil, Trash2, RotateCcw, X, Trophy, Award, BadgeCheck, Flag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Achievement, AchievementKind } from '../../types'
import {
  useAchievements,
  saveStoredAchievements,
  resetStoredAchievements,
} from '../../lib/portfolioStorage'

const kindMeta: Record<AchievementKind, { label: string; Icon: LucideIcon }> = {
  champion: { label: 'Champion', Icon: Trophy },
  winner: { label: 'Winner', Icon: Award },
  participation: { label: 'Participation', Icon: Flag },
  certificate: { label: 'Certificate', Icon: BadgeCheck },
}

export function AdminAchievementsEditor({ onToast }: { onToast: (msg: string) => void }) {
  const achievements = useAchievements()
  const [editingItem, setEditingItem] = useState<Achievement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Achievement | null>(null)

  const emptyAchievement: Achievement = {
    id: '',
    title: '',
    issuer: '',
    period: new Date().getFullYear().toString(),
    kind: 'winner',
    description: '',
    relatedProject: '',
  }

  const [formData, setFormData] = useState<Achievement>(emptyAchievement)

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData(emptyAchievement)
    setIsModalOpen(true)
  }

  const openEditModal = (item: Achievement) => {
    setEditingItem(item)
    setFormData({ ...item })
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.issuer.trim()) return

    const id =
      formData.id.trim() ||
      formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    const entryToSave: Achievement = {
      ...formData,
      id,
      title: formData.title.trim(),
      issuer: formData.issuer.trim(),
      period: formData.period.trim(),
      description: formData.description.trim(),
      relatedProject: formData.relatedProject?.trim() || undefined,
    }

    let updated: Achievement[]
    if (editingItem) {
      updated = achievements.map((a) => (a.id === editingItem.id ? entryToSave : a))
      onToast(`Updated achievement "${entryToSave.title}"`)
    } else {
      updated = [entryToSave, ...achievements.filter((a) => a.id !== entryToSave.id)]
      onToast(`Added achievement "${entryToSave.title}"`)
    }

    saveStoredAchievements(updated)
    setIsModalOpen(false)
  }

  const confirmDelete = () => {
    if (!itemToDelete) return
    const updated = achievements.filter((a) => a.id !== itemToDelete.id)
    saveStoredAchievements(updated)
    onToast(`Deleted "${itemToDelete.title}"`)
    setItemToDelete(null)
  }

  const handleReset = () => {
    if (window.confirm('Reset achievements back to default verified milestones?')) {
      resetStoredAchievements()
      onToast('Achievements reset to defaults')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="text-xl font-bold text-text">Milestones & Recognition</h2>
          <p className="text-xs text-muted mt-1">
            Manage your verified hackathon championships, production awards, and certifications.
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
            <span>Add Milestone</span>
          </button>
        </div>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {achievements.map((item) => {
          const { label, Icon } = kindMeta[item.kind] || kindMeta.winner
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:border-accent/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-border/70">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Icon size={15} />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                      {label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted">{item.period}</span>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1 text-muted hover:text-accent rounded-lg"
                      title="Edit Achievement"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-1 text-muted hover:text-red-500 rounded-lg"
                      title="Delete Achievement"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-text mt-2">{item.title}</h3>
                <p className="font-mono text-xs text-muted mt-1">{item.issuer}</p>
                <p className="text-xs text-muted mt-3 leading-relaxed">{item.description}</p>
              </div>

              {item.relatedProject && (
                <div className="pt-3 mt-4 border-t border-border/60 text-xs font-mono text-accent">
                  Project: /{item.relatedProject}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Add / Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-lg font-bold text-text">
                {editingItem ? 'Edit Milestone' : 'Add New Milestone'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-text">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  AWARD / CERTIFICATE TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. ML Nashik Hackathon Champion 2026"
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">ISSUER / ORGANIZER *</label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData((prev) => ({ ...prev, issuer: e.target.value }))}
                    placeholder="e.g. ML Nashik Hackathon · Build with Gemma"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">YEAR / PERIOD *</label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData((prev) => ({ ...prev, period: e.target.value }))}
                    placeholder="e.g. 2026 or Oct 2023 – Jan 2024"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">RECOGNITION TYPE</label>
                  <select
                    value={formData.kind}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, kind: e.target.value as AchievementKind }))
                    }
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  >
                    <option value="champion">🏆 Champion</option>
                    <option value="winner">🥇 Winner</option>
                    <option value="certificate">🎓 Certificate</option>
                    <option value="participation">🚩 Project Participation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">
                    RELATED PROJECT SLUG (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formData.relatedProject || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, relatedProject: e.target.value }))
                    }
                    placeholder="e.g. ml-interviewer"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs font-mono text-text focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">DESCRIPTION *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Details of the hackathon, system built, or certified skills..."
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
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
                  {editingItem ? 'Save Changes' : 'Create Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl">
            <h3 className="text-base font-bold text-text">Delete Milestone?</h3>
            <p className="mt-2 text-xs text-muted">
              Are you sure you want to delete <strong>"{itemToDelete.title}"</strong>?
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                onClick={() => setItemToDelete(null)}
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
