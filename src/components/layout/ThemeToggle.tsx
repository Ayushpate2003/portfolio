import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative inline-flex h-9 w-[66px] items-center rounded-full p-1 border border-border bg-surface transition-colors duration-200 cursor-pointer shadow-xs hover:border-accent ${className}`}
    >
      {/* Sliding active pill indicator */}
      <span
        aria-hidden="true"
        className={`absolute top-1 bottom-1 w-7 rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
          isDark
            ? 'translate-x-[30px] bg-[#35E0D0]/20 text-[#35E0D0] shadow-[0_0_10px_rgba(53,224,208,0.35)]'
            : 'translate-x-0 bg-[#F15B50]/15 text-[#F15B50] shadow-[0_0_10px_rgba(241,91,80,0.25)]'
        }`}
      />
      <div className="relative z-10 flex w-full items-center justify-between px-1 text-xs select-none">
        <span
          className={`flex h-6 w-6 items-center justify-center transition-colors duration-200 ${
            !isDark ? 'text-[#F15B50]' : 'text-muted hover:text-text'
          }`}
        >
          <Sun size={15} strokeWidth={!isDark ? 2.4 : 1.8} />
        </span>
        <span
          className={`flex h-6 w-6 items-center justify-center transition-colors duration-200 ${
            isDark ? 'text-[#35E0D0]' : 'text-muted hover:text-text'
          }`}
        >
          <Moon size={15} strokeWidth={isDark ? 2.4 : 1.8} />
        </span>
      </div>
    </button>
  )
}
