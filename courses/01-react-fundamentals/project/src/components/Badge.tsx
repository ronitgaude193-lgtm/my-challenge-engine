import type { ReactNode } from 'react'

/**
 * Reusable badge for categories, priorities, and tags.
 */
interface BadgeProps {
  children: ReactNode
  variant?:
    | 'default'
    | 'category'
    | 'priority'
    | 'tag'
    | 'high'
    | 'medium'
    | 'low'
}

export default function Badge({
  children,
  variant = 'default',
}: BadgeProps) {
  return (
    <span
      data-variant={variant}
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        marginRight: '4px',
        marginBottom: '4px',
        borderRadius: '12px',
        fontSize: '0.85rem',
      }}
    >
      {children}
    </span>
  )
}