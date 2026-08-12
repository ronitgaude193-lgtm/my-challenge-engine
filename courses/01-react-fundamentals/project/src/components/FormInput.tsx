import type { ChangeEvent } from 'react'

/**
 * Reusable form field component.
 */
interface FormInputProps {
  label: string
  id: string
  value: string
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void
  type?: string
  placeholder?: string
  error?: string
  multiline?: boolean
}

export default function FormInput({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  multiline = false,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}

      {error && (
        <p id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}