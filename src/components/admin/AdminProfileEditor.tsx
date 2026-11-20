import { useState } from 'react'
import { RotateCcw, Save } from 'lucide-react'
import type { Profile } from '../../types'
import { useProfile, saveStoredProfile, resetStoredProfile } from '../../lib/portfolioStorage'

export function AdminProfileEditor({ onToast }: { onToast: (msg: string) => void }) {
  const currentProfile = useProfile()
  const [formData, setFormData] = useState<Profile>(currentProfile)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    saveStoredProfile(formData)
    onToast('Profile information saved!')
  }

  const handleReset = () => {
    if (window.confirm('Reset hero profile information back to default resume data?')) {
      resetStoredProfile()
      onToast('Profile reset to defaults')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="text-xl font-bold text-text">Hero & Profile Details</h2>
          <p className="text-xs text-muted mt-1">
            Update your hero greeting, name, role tagline, bio intro, and contact information.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-muted mb-1">FULL NAME *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-1">ROLE EYEBROW *</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
              placeholder="CLOUD, SECURITY & FULL-STACK DEVELOPER"
              className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-muted mb-1">HERO MAIN HEADLINE *</label>
            <input
              type="text"
              required
              value={formData.headline}
              onChange={(e) => setFormData((prev) => ({ ...prev, headline: e.target.value }))}
              placeholder="e.g. Building Intelligent Solutions"
              className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-1">TAGLINE</label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
              placeholder="Passionate about turning challenges into opportunities..."
              className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-muted mb-1">HERO INTRO BIO *</label>
          <textarea
            rows={3}
            required
            value={formData.intro}
            onChange={(e) => setFormData((prev) => ({ ...prev, intro: e.target.value }))}
            className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-muted mb-1">LOCATION</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-1">EMAIL ADDRESS</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-muted mb-1">PHONE NUMBER</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-accent-contrast shadow-sm hover:opacity-90 active:scale-[0.98]"
          >
            <Save size={14} />
            <span>Save Profile Information</span>
          </button>
        </div>
      </form>
    </div>
  )
}
