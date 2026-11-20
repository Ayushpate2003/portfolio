import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Lock,
  Eye,
  EyeOff,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Search,
  RotateCcw,
  LogOut,
  ArrowLeft,
  KeyRound,
  FileText,
  Tag,
  CheckCircle2,
  AlertCircle,
  X,
  Layers,
  BookOpen,
  LayoutDashboard,
  Code,
  FolderGit2,
  Briefcase,
  Trophy,
  User,
} from 'lucide-react'
import type { BlogPost } from '../types'
import {
  useBlogs,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
  resetBlogsToDefaults,
} from '../lib/blogStorage'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { AdminSkillsEditor } from '../components/admin/AdminSkillsEditor'
import { AdminProjectsEditor } from '../components/admin/AdminProjectsEditor'
import { AdminExperienceEditor } from '../components/admin/AdminExperienceEditor'
import { AdminAchievementsEditor } from '../components/admin/AdminAchievementsEditor'
import { AdminProfileEditor } from '../components/admin/AdminProfileEditor'

const DEFAULT_ADMIN_USER = 'admin'
const DEFAULT_ADMIN_PASS = 'ayush@admin2024'
const AUTH_KEY = 'portfolio_admin_auth'
const PASS_KEY = 'portfolio_admin_password_custom'

export function AdminBlog() {
  // ── Navigation Tabs ──
  const [mainTab, setMainTab] = useState<'blogs' | 'landing'>('blogs')
  const [landingSection, setLandingSection] = useState<
    'skills' | 'projects' | 'experience' | 'achievements' | 'profile'
  >('skills')

  // ── Authentication State ──
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true'
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [authError, setAuthError] = useState('')

  // ── Password Change Modal ──
  const [showPassModal, setShowPassModal] = useState(false)
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [passMessage, setPassMessage] = useState<{ text: string; error: boolean } | null>(null)

  // ── Blogs & Filtering ──
  const blogs = useBlogs()
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('ALL')

  // ── Form Modal State ──
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [formData, setFormData] = useState<BlogPost>({
    slug: '',
    title: '',
    excerpt: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    readTime: '5 min read',
    tags: [],
    platform: 'Tech Blog',
    url: '',
    content: '',
  })
  const [tagInput, setTagInput] = useState('')
  const [formError, setFormError] = useState('')

  // ── Delete Confirmation Modal ──
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)

  // ── Toast Notification ──
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const getStoredPassword = () => {
    return localStorage.getItem(PASS_KEY) || DEFAULT_ADMIN_PASS
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    const currentSavedPass = getStoredPassword()

    if (username.trim().toLowerCase() === DEFAULT_ADMIN_USER && password === currentSavedPass) {
      setIsAuthenticated(true)
      if (rememberMe) {
        localStorage.setItem(AUTH_KEY, 'true')
      } else {
        sessionStorage.setItem(AUTH_KEY, 'true')
      }
      showToast('Welcome back, Admin!')
    } else {
      setAuthError('Invalid username or password. Check credentials and try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_KEY)
    sessionStorage.removeItem(AUTH_KEY)
    setUsername('')
    setPassword('')
    showToast('Signed out successfully', 'info')
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    const stored = getStoredPassword()
    if (currentPass !== stored) {
      setPassMessage({ text: 'Current password is incorrect', error: true })
      return
    }
    if (newPass.trim().length < 6) {
      setPassMessage({ text: 'New password must be at least 6 characters', error: true })
      return
    }
    localStorage.setItem(PASS_KEY, newPass)
    setPassMessage({ text: 'Password successfully updated!', error: false })
    setTimeout(() => {
      setShowPassModal(false)
      setCurrentPass('')
      setNewPass('')
      setPassMessage(null)
      showToast('Admin password changed successfully!')
    }, 1200)
  }

  // ── Tag Collection ──
  const allTags = useMemo(() => {
    const set = new Set<string>()
    blogs.forEach((b) => b.tags.forEach((t) => set.add(t)))
    return Array.from(set).sort()
  }, [blogs])

  // ── Filtered Blogs ──
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        search.trim() === '' ||
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        (blog.platform && blog.platform.toLowerCase().includes(search.toLowerCase()))

      const matchesTag = selectedTag === 'ALL' || blog.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [blogs, search, selectedTag])

  // ── Form Handlers ──
  const openCreateModal = () => {
    setEditingSlug(null)
    setFormData({
      slug: '',
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: '5 min read',
      tags: ['Cloud', 'DevOps'],
      platform: 'Medium',
      url: '',
      content: '',
    })
    setTagInput('')
    setFormError('')
    setIsModalOpen(true)
  }

  const openEditModal = (post: BlogPost) => {
    setEditingSlug(post.slug)
    setFormData({ ...post })
    setTagInput('')
    setFormError('')
    setIsModalOpen(true)
  }

  const handleAddTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tagToRemove) }))
  }

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.title.trim()) {
      setFormError('Please provide a blog title.')
      return
    }

    let finalSlug = formData.slug.trim()
    if (!finalSlug) {
      finalSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }

    if (formData.tags.length === 0) {
      setFormError('Please add at least one topic tag.')
      return
    }

    const postToSave: BlogPost = {
      ...formData,
      slug: finalSlug,
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      date: formData.date.trim() || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: formData.readTime.trim() || '5 min read',
    }

    if (editingSlug) {
      updateBlogPost(editingSlug, postToSave)
      showToast('Blog article updated successfully!')
    } else {
      addBlogPost(postToSave)
      showToast('New blog article published!')
    }

    setIsModalOpen(false)
  }

  const confirmDelete = () => {
    if (postToDelete) {
      deleteBlogPost(postToDelete.slug)
      showToast(`Deleted "${postToDelete.title}"`, 'info')
      setPostToDelete(null)
    }
  }

  const handleResetDefaults = () => {
    if (window.confirm('Reset all blogs back to default data? Any custom created posts will be replaced.')) {
      resetBlogsToDefaults()
      showToast('Reset blogs to default sample posts', 'info')
    }
  }

  // Auto-generate slug while typing title if not editing existing
  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const shouldUpdateSlug = !editingSlug && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
      return {
        ...prev,
        title: val,
        slug: shouldUpdateSlug
          ? val
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
          : prev.slug,
      }
    })
  }

  // ═══════════════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ═══════════════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-bg text-text relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent-secondary/15 blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          <div className="rounded-3xl border border-border bg-surface/90 backdrop-blur-xl p-8 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            {/* Header with Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-[0_0_20px_var(--hero-orbital-shadow)] mb-4">
                <Lock size={30} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-text">Admin Blog Portal</h1>
              <p className="mt-2 text-sm text-muted">
                Authenticate with your admin credentials to manage and publish portfolio blogs.
              </p>
            </div>

            {authError && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-600 dark:text-red-400">
                <AlertCircle size={16} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                  USERNAME
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-xl border border-border bg-bg/70 px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-border bg-bg/70 px-3.5 py-2.5 pr-10 text-sm text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-muted hover:text-text">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border accent-[var(--accent)]"
                  />
                  <span>Keep me signed in</span>
                </label>
                <span className="text-[11px] font-mono text-muted">Default: admin / ayush@admin2024</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast shadow-md transition-all hover:opacity-90 active:scale-[0.99]"
              >
                Sign In to Admin
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/70 flex items-center justify-between text-xs text-muted">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
              >
                <ArrowLeft size={14} />
                Return to Portfolio
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════
  // ADMIN DASHBOARD
  // ═══════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-bg text-text pb-20">
      {/* Toast Alert */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3 shadow-2xl backdrop-blur-md animate-fade-in text-sm font-medium"
        >
          {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-500" />}
          {toast.type === 'info' && <AlertCircle size={18} className="text-accent" />}
          {toast.type === 'error' && <AlertCircle size={18} className="text-red-500" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-mono text-muted hover:text-accent hover:border-accent transition-colors"
              title="Return to website"
            >
              <ArrowLeft size={14} />
              <span>Back to Site</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base">Portfolio Admin</span>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-accent border border-accent/25">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowPassModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted hover:text-text hover:border-accent transition-colors"
              title="Change Password"
            >
              <KeyRound size={14} />
              <span className="hidden sm:inline">Password</span>
            </button>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Primary Section Switcher */}
      <div className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-16 z-30">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 sm:px-8 py-2.5">
          <button
            onClick={() => setMainTab('blogs')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              mainTab === 'blogs'
                ? 'bg-accent text-accent-contrast shadow-sm'
                : 'text-muted hover:text-text hover:bg-surface'
            }`}
          >
            <BookOpen size={15} />
            <span>Blog Articles</span>
            <span className="rounded-full bg-accent-contrast/20 px-1.5 py-0.5 text-[10px] font-mono">
              {blogs.length}
            </span>
          </button>
          <button
            onClick={() => setMainTab('landing')}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              mainTab === 'landing'
                ? 'bg-accent text-accent-contrast shadow-sm'
                : 'text-muted hover:text-text hover:bg-surface'
            }`}
          >
            <LayoutDashboard size={15} />
            <span>Landing Page Editor</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-5 sm:px-8 pt-8">
        {mainTab === 'landing' ? (
          <div>
            {/* Sub-navigation for Landing Page sections */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-border bg-surface mb-8">
              <button
                onClick={() => setLandingSection('skills')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  landingSection === 'skills'
                    ? 'bg-accent/15 text-accent font-semibold border border-accent/30'
                    : 'text-muted hover:text-text'
                }`}
              >
                <Code size={14} />
                <span>Skills & Tech</span>
              </button>
              <button
                onClick={() => setLandingSection('projects')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  landingSection === 'projects'
                    ? 'bg-accent/15 text-accent font-semibold border border-accent/30'
                    : 'text-muted hover:text-text'
                }`}
              >
                <FolderGit2 size={14} />
                <span>Selected Work</span>
              </button>
              <button
                onClick={() => setLandingSection('experience')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  landingSection === 'experience'
                    ? 'bg-accent/15 text-accent font-semibold border border-accent/30'
                    : 'text-muted hover:text-text'
                }`}
              >
                <Briefcase size={14} />
                <span>Experience & Education</span>
              </button>
              <button
                onClick={() => setLandingSection('achievements')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  landingSection === 'achievements'
                    ? 'bg-accent/15 text-accent font-semibold border border-accent/30'
                    : 'text-muted hover:text-text'
                }`}
              >
                <Trophy size={14} />
                <span>Milestones & Recognition</span>
              </button>
              <button
                onClick={() => setLandingSection('profile')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  landingSection === 'profile'
                    ? 'bg-accent/15 text-accent font-semibold border border-accent/30'
                    : 'text-muted hover:text-text'
                }`}
              >
                <User size={14} />
                <span>Hero & Profile</span>
              </button>
            </div>

            {/* Active Section Content */}
            {landingSection === 'skills' && <AdminSkillsEditor onToast={showToast} />}
            {landingSection === 'projects' && <AdminProjectsEditor onToast={showToast} />}
            {landingSection === 'experience' && <AdminExperienceEditor onToast={showToast} />}
            {landingSection === 'achievements' && <AdminAchievementsEditor onToast={showToast} />}
            {landingSection === 'profile' && <AdminProfileEditor onToast={showToast} />}
          </div>
        ) : (
          <div>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <div className="flex items-center justify-between text-muted">
                  <span className="font-mono text-xs uppercase tracking-wider">Total Articles</span>
                  <FileText size={18} className="text-accent" />
                </div>
                <p className="mt-2 text-3xl font-bold text-text">{blogs.length}</p>
                <p className="mt-1 text-xs text-muted">Published & live on website</p>
              </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted">
              <span className="font-mono text-xs uppercase tracking-wider">Unique Topics</span>
              <Tag size={18} className="text-accent" />
            </div>
            <p className="mt-2 text-3xl font-bold text-text">{allTags.length}</p>
            <p className="mt-1 text-xs text-muted">Categories across all posts</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted">
              <span className="font-mono text-xs uppercase tracking-wider">Platform Hubs</span>
              <Layers size={18} className="text-accent" />
            </div>
            <p className="mt-2 text-3xl font-bold text-text">
              {new Set(blogs.map((b) => b.platform || 'General')).size}
            </p>
            <p className="mt-1 text-xs text-muted">Medium, Dev.to, Hashnode, etc.</p>
          </div>
        </div>

        {/* Action Bar & Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[240px] flex-1 sm:max-w-sm">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search articles, tags, platforms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-4 text-xs text-text placeholder:text-muted focus:border-accent focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="rounded-xl border border-border bg-surface px-3 py-2.5 text-xs text-text focus:border-accent focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Topics ({blogs.length})</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors"
              title="Reset sample data"
            >
              <RotateCcw size={13} />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-accent-contrast shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <Plus size={16} />
              <span>Create Article</span>
            </button>
          </div>
        </div>

        {/* Blog Post List */}
        {filteredBlogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-12 text-center">
            <FileText size={36} className="mx-auto text-muted mb-3 opacity-60" />
            <h3 className="text-base font-semibold">No articles match your search</h3>
            <p className="mt-1 text-xs text-muted">Try adjusting your filters or search keywords.</p>
            {search && (
              <button
                onClick={() => {
                  setSearch('')
                  setSelectedTag('ALL')
                }}
                className="mt-4 rounded-lg bg-surface border border-border px-3 py-1.5 text-xs font-mono text-accent hover:border-accent"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredBlogs.map((post) => (
              <div
                key={post.slug}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:border-accent/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted mb-1.5">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    {post.platform && (
                      <>
                        <span>•</span>
                        <span className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                          {post.platform}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-text truncate">{post.title}</h3>
                  <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/80 bg-bg px-2 py-0.5 text-[11px] font-mono text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/60">
                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-bg text-muted hover:text-accent hover:border-accent transition-colors"
                      title="Open Live Link"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <button
                    onClick={() => openEditModal(post)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-bg px-3 py-2 text-xs font-medium text-text hover:border-accent hover:text-accent transition-colors"
                  >
                    <Pencil size={13} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setPostToDelete(post)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </main>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CREATE / EDIT BLOG MODAL */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="text-xl font-bold text-text">
                {editingSlug ? 'Edit Blog Article' : 'Create New Article'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-muted hover:text-text transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                <AlertCircle size={15} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveBlog} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                  TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Architecting Scalable Cloud Microservices"
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                  URL SLUG (IDENTIFIER)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="architecting-scalable-cloud-microservices"
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs font-mono text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                  EXCERPT (SHORT SUMMARY) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Concise overview that appears on the blog card..."
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-sm text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                    DATE
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    placeholder="e.g. Oct 2024"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                    READ TIME
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                    placeholder="e.g. 6 min read"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                    PLATFORM
                  </label>
                  <input
                    type="text"
                    value={formData.platform || ''}
                    onChange={(e) => setFormData((prev) => ({ ...prev, platform: e.target.value }))}
                    placeholder="e.g. Medium / Dev.to"
                    className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                  EXTERNAL ARTICLE URL (OPTIONAL)
                </label>
                <input
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder="https://medium.com/@ayush/..."
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                  TAGS / TOPICS *
                </label>
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
                    placeholder="Type a tag and press Add or Enter..."
                    className="flex-1 rounded-xl border border-border bg-bg px-3.5 py-2 text-xs text-text focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="rounded-xl border border-border bg-bg px-4 py-2 text-xs font-medium text-text hover:border-accent"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-mono text-accent"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Optional Full Content Body */}
              <div>
                <label className="block text-xs font-mono font-medium text-muted mb-1.5">
                  ARTICLE BODY / NOTES (OPTIONAL)
                </label>
                <textarea
                  rows={4}
                  value={formData.content || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Full article markdown or key bullet points..."
                  className="w-full rounded-xl border border-border bg-bg px-3.5 py-2 text-xs font-mono text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2.5 text-xs font-medium text-muted hover:text-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-accent-contrast shadow-sm hover:opacity-90 active:scale-[0.98]"
                >
                  {editingSlug ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 sm:p-7 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-text">Delete Blog Post?</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Are you sure you want to permanently delete{' '}
              <strong className="text-text">"{postToDelete.title}"</strong>? This will remove it
              from your portfolio immediately.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setPostToDelete(null)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-muted hover:text-text"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PASSWORD CHANGE MODAL */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-border bg-surface p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-base font-bold text-text">Change Admin Password</h3>
              <button
                onClick={() => {
                  setShowPassModal(false)
                  setPassMessage(null)
                }}
                className="text-muted hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            {passMessage && (
              <div
                className={`mt-3 flex items-center gap-2 rounded-xl p-2.5 text-xs ${
                  passMessage.error
                    ? 'border border-red-500/30 bg-red-500/10 text-red-500'
                    : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                }`}
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{passMessage.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  CURRENT PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1">
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="rounded-xl border border-border px-3 py-1.5 text-xs text-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-accent px-4 py-1.5 text-xs font-semibold text-accent-contrast"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
