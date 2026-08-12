import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Reusable button component.
 *
 * Supports primary, secondary, and danger variants.
 */
interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  id?: string
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  id,
}: ButtonProps) {
  const variantStyles: Record<
    NonNullable<ButtonProps['variant']>,
    ButtonHTMLAttributes<HTMLButtonElement>['style']
  > = {
    primary: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: '#ffffff',
    },
    danger: {
      backgroundColor: '#dc2626',
      color: '#ffffff',
    },
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variantStyles[variant],
        padding: '8px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled
          ? 'not-allowed'
          : 'pointer',
      }}
    >
      {children}
    </button>
  )
}