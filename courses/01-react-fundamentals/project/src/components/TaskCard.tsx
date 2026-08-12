import { useEffect, useState } from 'react'

interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => void
  isEditing?: boolean
  onStartEdit?: (id: string | number) => void
  onCancelEdit?: () => void
}

export default function TaskCard({
  id,
  title,
  description,
  priority,
  completed = false,
  onToggle,
  onDelete,
  onUpdateTask,
  isEditing = false,
  onStartEdit,
  onCancelEdit,
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPriority, setEditPriority] = useState(priority)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditing) {
      setEditTitle(title)
      setEditDescription(description)
      setEditPriority(priority)
      setError('')
    }
  }, [isEditing, title, description, priority])

  const handleToggle = () => {
    if (onToggle) {
      onToggle(id)
    }
  }

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure?')) {
      onDelete(id)
    }
  }

  const handleSave = () => {
    const trimmedTitle = editTitle.trim()

    if (!trimmedTitle) {
      setError('Title is required')
      return
    }

    if (onUpdateTask) {
      onUpdateTask(id, {
        title: trimmedTitle,
        description: editDescription,
        priority: editPriority,
      })
    }

    setError('')
  }

  const handleCancel = () => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)
    setError('')

    if (onCancelEdit) {
      onCancelEdit()
    }
  }

  return (
    <article
      id="task-card"
      data-completed={completed}
    >
      {onToggle && !isEditing && (
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
        />
      )}

      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            aria-label="Task title"
          />

          <textarea
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
            aria-label="Task description"
          />

          <select
            value={editPriority}
            onChange={(event) => setEditPriority(event.target.value)}
            aria-label="Task priority"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {error && (
            <p id="task-edit-error">
              {error}
            </p>
          )}

          <button type="button" onClick={handleSave}>
            Save
          </button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2
            style={{
              textDecoration: completed ? 'line-through' : 'none',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              textDecoration: completed ? 'line-through' : 'none',
            }}
          >
            {description}
          </p>

          <p>Priority: {priority}</p>

          {onUpdateTask && (
            <button
              type="button"
              onClick={() => onStartEdit?.(id)}
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </>
      )}
    </article>
  )
}