import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'

function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this session.
  }
}

/** The initial theme is applied by the inline script in index.html before first paint. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }, [theme])

  return { theme, toggleTheme }
}
