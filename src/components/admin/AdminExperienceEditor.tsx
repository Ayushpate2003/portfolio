import { useState } from 'react'
import { Plus, Pencil, Trash2, RotateCcw, X, Briefcase, GraduationCap } from 'lucide-react'
import type { TimelineEntry } from '../../types'
import {
  useExperience,
  saveStoredExperience,
  saveStoredEducation,
  resetStoredExperience,
  resetStoredEducation,
} from '../../lib/portfolioStorage'

export function AdminExperienceEditor({ onToast }: { onToast: (msg: string) => void }) {
  const { experience, education } = useExperience()
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience')
  const [editingItem, setEditingItem] = useState<TimelineEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [highlightInput, setHighlightInput] = useState('')
  const [itemToDelete, setItemToDelete] = useState<TimelineEntry | null>(null)

  const emptyEntry: TimelineEntry = {
    id: '',
    title: '',
    organization: '',
    location: '',
    period: '',
    details: '',
    highlights: [],
  }

  const [formData, setFormData] = useState<TimelineEntry>(emptyEntry)

  const currentList = activeTab === 'experience' ? experience : education

  const openCreateModal = () => {
    setEditingItem(null)
    setFormData(emptyEntry)
    setHighlightInput('')
    setIsModalOpen(true)
  }

  const openEditModal = (item: TimelineEntry) => {
    setEditingItem(item)
    setFormData({ ...item })
    setHighlightInput('')
    setIsModalOpen(true)
  }

  const handleAddHighlight = () => {
    const h = highlightInput.trim()
    if (h) {
      setFormData((prev) => ({ ...prev, highlights: [...prev.highlights, h] }))
      setHighlightInput('')
    }
  }

  const handleRemoveHighlight = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== idx),
    }))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.organization.trim()) return

    const id =
      formData.id.trim() ||
      formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    const entryToSave: TimelineEntry = {
      ...formData,
      id,
      title: formData.title.trim(),
      organization: formData.organization.trim(),
      location: formData.location?.trim() || undefined,
      period: formData.period?.trim() || undefined,
      details: formData.details?.trim() || undefined,
    }

    if (activeTab === 'experience') {
      let updated: TimelineEntry[]
      if (editingItem) {
        updated = experience.map((item) => (item.id === editingItem.id ? entryToSave : item))
        onToast(`Updated experience "${entryToSave.title}"`)
      } else {
        updated = [entryToSave, ...experience.filter((i) => i.id !== entryToSave.id)]
        onToast(`Added experience "${entryToSave.title}"`)
      }
      saveStoredExperience(updated)
    } else {
      let updated: TimelineEntry[]
      if (editingItem) {
        updated = education.map((item) => (item.id === editingItem.id ? entryToSave : item))
        onToast(`Updated education "${entryToSave.title}"`)
      } else {
        updated = [entryToSave, ...education.filter((i) => i.id !== entryToSave.id)]
        onToast(`Added education "${entryToSave.title}"`)
      }
      saveStoredEducation(updated)
    }

    setIsModalOpen(false)
  }

  const confirmDelete = () => {
    if (!itemToDelete) return
    if (activeTab === 'experience') {
      saveStoredExperience(experience.filter((i) => i.id !== itemToDelete.id))
      onToast(`Deleted "${itemToDelete.title}"`)
    } else {
      saveStoredEducation(education.filter((i) => i.id !== itemToDelete.id))
      onToast(`Deleted "${itemToDelete.title}"`)
    }
    setItemToDelete(null)
  }

  const handleReset = () => {
    if (window.confirm(`Reset ${activeTab} timeline back to original defaults?`)) {
      if (activeTab === 'experience') {
        resetStoredExperience()
        onToast('Work experience reset to defaults')
      } else {
        resetStoredEducation()
        onToast('Education timeline reset to defaults')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="text-xl font-bold text-text">Experience & Education</h2>
          <p className="text-xs text-muted mt-1">
            Manage your career history, developer internships, university degrees, and credentials.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset {activeTab === 'experience' ? 'Experience' : 'Education'}</span>
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-accent-contrast shadow-sm hover:opacity-90 active:scale-[0.98]"
          >
            <Plus size={15} />
            <span>Add {activeTab === 'experience' ? 'Experience' : 'Education'}</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Experience vs Education */}
      <div className="flex gap-2 p-1 rounded-2xl border border-border bg-surface max-w-sm">
        <button
          onClick={() => setActiveTab('experience')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'experience'
              ? 'bg-accent text-accent-contrast shadow-sm'
              : 'text-muted hover:text-text'
          }`}
        >
          <Briefcase size={14} />
          <span>Experience ({experience.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'education'
              ? 'bg-accent text-accent-contrast shadow-sm'
              : 'text-muted hover:text-text'
          }`}
        >
          <GraduationCap size={15} />
          <span>Education ({education.length})</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {currentList.map((entry) => (
          <div
            key={entry.id}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:border-accent/50 flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted mb-1">
                <span>{entry.period || 'Current'}</span>
                {entry.location && (
                  <>
                    <span>•</span>
                    <span>{entry.location}</span>
                  </>
                )}
              </div>

              <h3 className="text-lg font-bold text-text">{entry.title}</h3>
              <p className="text-sm font-medium text-accent mt-0.5">{entry.organization}</p>

              {entry.details && (
                <p className="text-xs text-muted mt-2 font-mono bg-bg/60 inline-block px-2.5 py-1 rounded-lg border border-border/60">
                  {entry.details}
                </p>
              )}

              {/* Highlights */}
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-xs text-muted">
                  {entry.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/60">
              <button
                onClick={() => openEditModal(entry)}
                className="inline-flex items-center gap-1 rounded-xl border border-border bg-bg px-3 py-1.5 text-xs font-medium text-text hover:border-accent hover:text-accent"
              >
                <Pencil size={13} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setItemToDelete(entry)}
                className="inline-flex items-center gap-1 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/20"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add / Edit Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-lg font-bold text-text">
                {editingItem
                  ? `Edit ${activeTab === 'experience' ? 'Experience' : 'Education'}`
                  : `Add ${activeTab === 'experience' ? 'Experience' : 'Education'}`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-text">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  {activeTab === 'experience' ? 'JOB / ROLE TITLE *' : 'DEGREE / DIPLOMA TITLE *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder={
                    activeTab === 'experience'
                      ? 'e.g. Cloud Developer Intern'
                      : 'e.g. B.Tech in Computer Science Engineering'
                  }
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">
                    {activeTab === 'experience' ? 'COMPANY / ORGANIZATION *' : 'INSTITUTION / UNIVERSITY *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                    placeholder={activeTab === 'experience' ? 'e.g. Ediglobe' : 'e.g. Sandip University'}
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Pune, MH or Nashik, Maharashtra"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">PERIOD / DURATION</label>
                  <input
                    type="text"
                    value={formData.period || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, period: e.target.value }))}
                    placeholder="e.g. 2024 – 2025 or Oct 2024 – Apr 2027"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-1">
                    SUBTITLE / DETAILS (GPA, SPECIALIZATION)
                  </label>
                  <input
                    type="text"
                    value={formData.details || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
                    placeholder="e.g. Specialization in Cloud Computing · GPA: 8.52"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  KEY HIGHLIGHTS & RESPONSIBILITIES
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddHighlight()
                      }
                    }}
                    placeholder="Add highlight bullet point..."
                    className="flex-1 rounded-xl border border-border bg-bg px-3.5 py-1.5 text-xs text-text focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="rounded-xl border border-border bg-bg px-3 py-1.5 text-xs font-medium text-accent"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {formData.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-2 text-xs rounded-lg border border-border bg-bg px-2.5 py-1 text-muted"
                    >
                      <span className="truncate">• {h}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
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
                  {editingItem ? 'Save Changes' : 'Create Entry'}
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
            <h3 className="text-base font-bold text-text">Delete Entry?</h3>
            <p className="mt-2 text-xs text-muted">
              Are you sure you want to delete <strong>"{itemToDelete.title}"</strong> from your{' '}
              {activeTab}?
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
