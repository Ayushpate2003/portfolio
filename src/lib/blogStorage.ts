import { useState, useEffect } from 'react'
import type { BlogPost } from '../types'
import { blogs as defaultBlogs } from '../data/blogs'

const STORAGE_KEY = 'ayush_portfolio_blogs'
const UPDATE_EVENT = 'portfolio-blogs-updated'

export function getStoredBlogs(): BlogPost[] {
  if (typeof window === 'undefined') return defaultBlogs
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogs))
      return defaultBlogs
    }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
    }
    return defaultBlogs
  } catch (err) {
    console.error('Failed to read blogs from storage:', err)
    return defaultBlogs
  }
}

export function saveStoredBlogs(blogs: BlogPost[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs))
    window.dispatchEvent(new Event(UPDATE_EVENT))
  } catch (err) {
    console.error('Failed to save blogs to storage:', err)
  }
}

export function addBlogPost(post: BlogPost): void {
  const current = getStoredBlogs()
  // Add new post to top of list
  const updated = [post, ...current.filter((p) => p.slug !== post.slug)]
  saveStoredBlogs(updated)
}

export function updateBlogPost(slug: string, post: BlogPost): void {
  const current = getStoredBlogs()
  const updated = current.map((p) => (p.slug === slug ? post : p))
  saveStoredBlogs(updated)
}

export function deleteBlogPost(slug: string): void {
  const current = getStoredBlogs()
  const updated = current.filter((p) => p.slug !== slug)
  saveStoredBlogs(updated)
}

export function resetBlogsToDefaults(): void {
  saveStoredBlogs(defaultBlogs)
}

/** React hook to reactively subscribe to stored blogs */
export function useBlogs(): BlogPost[] {
  const [blogs, setBlogs] = useState<BlogPost[]>(getStoredBlogs)

  useEffect(() => {
    const refresh = () => setBlogs(getStoredBlogs())
    window.addEventListener(UPDATE_EVENT, refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener(UPDATE_EVENT, refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return blogs
}
