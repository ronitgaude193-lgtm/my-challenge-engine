import { useEffect, useState } from 'react'

interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: string
  completed?: boolean

  // Challenge 12
  category?: string
  tags?: string[]

  // Challenge 13
  dueDate?: string | number

  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void

  // Challenge 08 + 12 + 13
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
      category?: string
      tags?: string[]
      dueDate?: string | number
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

  // Challenge 12
  category = 'General',
  tags = [],

  // Challenge 13
  dueDate,

  onToggle,
  onDelete,
  onUpdateTask,
  editing = false,
  onEdit,
  onCancelEdit,
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] =
    useState(description)
  const [editPriority, setEditPriority] =
    useState(priority)

  // Challenge 12
  const [editCategory, setEditCategory] =
    useState(category)

  const [editTags, setEditTags] =
    useState(tags.join(', '))

  // Challenge 13
  const [editDueDate, setEditDueDate] =
    useState(
      dueDate
        ? new Date(dueDate).toISOString().split('T')[0]
        : ''
    )

  useEffect(() => {
    if (editing) {
      setEditTitle(title)
      setEditDescription(description)
      setEditPriority(priority)
      setEditCategory(category)
      setEditTags(tags.join(', '))

      setEditDueDate(
        dueDate
          ? new Date(dueDate)
              .toISOString()
              .split('T')[0]
          : ''
      )
    }
  }, [
    editing,
    title,
    description,
    priority,
    category,
    tags,
    dueDate,
  ])

  const handleToggle = () => {
    if (onToggle) {
      onToggle(id)
    }
  }

  const handleDelete = () => {
    if (
      onDelete &&
      window.confirm('Are you sure?')
    ) {
      onDelete(id)
    }
  }

  const handleSave = () => {
    const trimmedTitle = editTitle.trim()

    // Title cannot be empty
    if (!trimmedTitle) {
      return
    }

    const parsedTags = editTags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    if (onUpdateTask) {
      onUpdateTask(id, {
        title: trimmedTitle,
        description: editDescription.trim(),
        priority: editPriority,
        category:
          editCategory.trim() || 'General',
        tags: parsedTags,
        dueDate:
          editDueDate || undefined,
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
    setEditCategory(category)
    setEditTags(tags.join(', '))

    setEditDueDate(
      dueDate
        ? new Date(dueDate)
            .toISOString()
            .split('T')[0]
        : ''
    )

    if (onCancelEdit) {
      onCancelEdit()
    }
  }

  // --------------------------------
  // Challenge 13: Due date status
  // --------------------------------
  const getDueStatus = () => {
    if (!dueDate || completed) {
      return ''
    }

    const today = new Date()
    const due = new Date(dueDate)

    today.setHours(0, 0, 0, 0)
    due.setHours(0, 0, 0, 0)

    const difference =
      due.getTime() - today.getTime()

    const daysUntilDue =
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      )

    if (daysUntilDue < 0) {
      return 'Overdue'
    }

    if (daysUntilDue === 0) {
      return 'Due Today'
    }

    if (daysUntilDue <= 3) {
      return 'Due Soon'
    }

    return ''
  }

  const dueStatus = getDueStatus()

  return (
    <article
      id="task-card"
      data-completed={completed}
      data-overdue={
        dueStatus === 'Overdue'
          ? 'true'
          : 'false'
      }
    >
      {/* Complete checkbox */}
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
        />
      )}

      {editing ? (
        <>
          {/* Title */}
          <div>
            <label
              htmlFor={`edit-title-${id}`}
            >
              Title
            </label>

            <input
              id={`edit-title-${id}`}
              value={editTitle}
              onChange={(event) =>
                setEditTitle(
                  event.target.value
                )
              }
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor={`edit-description-${id}`}
            >
              Description
            </label>

            <textarea
              id={`edit-description-${id}`}
              value={editDescription}
              onChange={(event) =>
                setEditDescription(
                  event.target.value
                )
              }
            />
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor={`edit-priority-${id}`}
            >
              Priority
            </label>

            <select
              id={`edit-priority-${id}`}
              value={editPriority}
              onChange={(event) =>
                setEditPriority(
                  event.target.value
                )
              }
            >
              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor={`edit-category-${id}`}
            >
              Category
            </label>

            <select
              id={`edit-category-${id}`}
              value={editCategory}
              onChange={(event) =>
                setEditCategory(
                  event.target.value
                )
              }
            >
              <option value="General">
                General
              </option>

              <option value="Work">
                Work
              </option>

              <option value="Personal">
                Personal
              </option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor={`edit-tags-${id}`}
            >
              Tags
            </label>

            <input
              id={`edit-tags-${id}`}
              type="text"
              value={editTags}
              placeholder="tag1, tag2, tag3"
              onChange={(event) =>
                setEditTags(
                  event.target.value
                )
              }
            />
          </div>

          {/* Due Date - Challenge 13 */}
          <div>
            <label
              htmlFor={`edit-due-date-${id}`}
            >
              Due Date
            </label>

            <input
              id={`edit-due-date-${id}`}
              type="date"
              value={editDueDate}
              onChange={(event) =>
                setEditDueDate(
                  event.target.value
                )
              }
            />
          </div>

          {/* Save */}
          <button
            type="button"
            onClick={handleSave}
          >
            Save
          </button>

          {/* Cancel */}
          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {/* Title */}
          <h2
            style={{
              textDecoration: completed
                ? 'line-through'
                : 'none',
            }}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            style={{
              textDecoration: completed
                ? 'line-through'
                : 'none',
            }}
          >
            {description}
          </p>

          {/* Priority */}
          <p>
            Priority: {priority}
          </p>

          {/* Category */}
          <p id="task-category">
            Category: {category}
          </p>

          {/* Tags */}
          <div id="task-tags">
            {tags.map((tag) => (
              <span
                key={tag}
                data-tag={tag}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Due Date */}
          {dueDate && (
            <div>
              <p
                id="task-due-date"
                data-overdue={
                  dueStatus === 'Overdue'
                    ? 'true'
                    : 'false'
                  }
              >
                Due:{' '}
                {new Date(
                  dueDate
                ).toLocaleDateString()}
              </p>

              {dueStatus && (
                <span
                  data-overdue={
                    dueStatus ===
                    'Overdue'
                      ? 'true'
                      : 'false'
                  }
                >
                  {dueStatus}
                </span>
              )}
            </div>
          )}

          {/* Edit */}
          {onUpdateTask && (
            <button
              type="button"
              onClick={() =>
                onEdit?.(id)
              }
            >
              Edit
            </button>
          )}

          {/* Delete */}
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