import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

export function Card({ children, as = 'div', className = '' }: CardProps) {
  const Tag = as as 'div'
  return (
    <Tag
      className={`rounded-2xl border border-border bg-surface backdrop-blur-sm p-6 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-accent hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(53,224,208,0.1)] ${className}`}
    >
      {children}
    </Tag>
  )
}
