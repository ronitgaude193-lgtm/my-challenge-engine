import { useEffect, useState } from 'react'

interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: string
  completed?: boolean

  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void

  // Challenge 08
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => void

  editing?: boolean
  onEdit?: (id: string | number) => void
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
  editing = false,
  onEdit,
  onCancelEdit,
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [editPriority, setEditPriority] = useState(priority)

  useEffect(() => {
    if (editing) {
      setEditTitle(title)
      setEditDescription(description)
      setEditPriority(priority)
    }
  }, [editing, title, description, priority])

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

    // Title cannot be empty
    if (!trimmedTitle) {
      return
    }

    if (onUpdateTask) {
      onUpdateTask(id, {
        title: trimmedTitle,
        description: editDescription,
        priority: editPriority,
      })
    }

    if (onCancelEdit) {
      onCancelEdit()
    }
  }

  const handleCancel = () => {
    setEditTitle(title)
    setEditDescription(description)
    setEditPriority(priority)

    if (onCancelEdit) {
      onCancelEdit()
    }
  }

  return (
    <article
      id="task-card"
      data-completed={completed}
    >
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
        />
      )}

      {editing ? (
        <>
          <div>
            <label htmlFor={`edit-title-${id}`}>
              Title
            </label>

            <input
              id={`edit-title-${id}`}
              value={editTitle}
              onChange={(event) =>
                setEditTitle(event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor={`edit-description-${id}`}>
              Description
            </label>

            <textarea
              id={`edit-description-${id}`}
              value={editDescription}
              onChange={(event) =>
                setEditDescription(event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor={`edit-priority-${id}`}>
              Priority
            </label>

            <select
              id={`edit-priority-${id}`}
              value={editPriority}
              onChange={(event) =>
                setEditPriority(event.target.value)
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

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
              textDecoration: completed
                ? 'line-through'
                : 'none',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              textDecoration: completed
                ? 'line-through'
                : 'none',
            }}
          >
            {description}
          </p>

          <p>Priority: {priority}</p>

          {onUpdateTask && (
            <button
              type="button"
              onClick={() => onEdit?.(id)}
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </>
      )}
    </article>
  )
}