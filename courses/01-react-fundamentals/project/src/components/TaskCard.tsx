import { useEffect, useState } from 'react'
import Button from './Button'
import Badge from './Badge'
import StatusIndicator from './StatusIndicator'
import FormInput from './FormInput'

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
  category = 'General',
  tags = [],
  dueDate,
  onToggle,
  onDelete,
  onUpdateTask,
  editing = false,
  onEdit,
  onCancelEdit,
}: TaskCardProps) {
  const [editTitle, setEditTitle] =
    useState(title)

  const [editDescription, setEditDescription] =
    useState(description)

  const [editPriority, setEditPriority] =
    useState(priority)

  const [editCategory, setEditCategory] =
    useState(category)

  const [editTags, setEditTags] =
    useState(tags.join(', '))

  const [editDueDate, setEditDueDate] =
    useState(
      dueDate
        ? new Date(dueDate)
            .toISOString()
            .split('T')[0]
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
    onToggle?.(id)
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

    if (!trimmedTitle) {
      return
    }

    const parsedTags = editTags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    onUpdateTask?.(id, {
      title: trimmedTitle,
      description: editDescription.trim(),
      priority: editPriority,
      category:
        editCategory.trim() || 'General',
      tags: parsedTags,
      dueDate:
        editDueDate || undefined,
    })

    onCancelEdit?.()
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

    onCancelEdit?.()
  }

  // Challenge 13: Due date status
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

    const daysUntilDue = Math.ceil(
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
          <FormInput
            label="Title"
            id={`edit-title-${id}`}
            value={editTitle}
            onChange={(event) =>
              setEditTitle(event.target.value)
            }
          />

          {/* Description */}
          <FormInput
            label="Description"
            id={`edit-description-${id}`}
            type="textarea"
            value={editDescription}
            onChange={(event) =>
              setEditDescription(
                event.target.value
              )
            }
          />

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
          <FormInput
            label="Tags"
            id={`edit-tags-${id}`}
            value={editTags}
            placeholder="tag1, tag2, tag3"
            onChange={(event) =>
              setEditTags(event.target.value)
            }
          />

          {/* Due Date */}
          <FormInput
            label="Due Date"
            id={`edit-due-date-${id}`}
            type="date"
            value={editDueDate}
            onChange={(event) =>
              setEditDueDate(
                event.target.value
              )
            }
          />

          {/* Save */}
          <Button
            type="button"
            variant="primary"
            onClick={handleSave}
          >
            Save
          </Button>

          {/* Cancel */}
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
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
            Priority:{' '}
            <Badge variant="priority">
              {priority}
            </Badge>
          </p>

          {/* Category */}
          <p id="task-category">
            Category:{' '}
            <Badge variant="category">
              {category}
            </Badge>
          </p>

          {/* Tags */}
          <div id="task-tags">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="tag"
              >
                {tag}
              </Badge>
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
                <StatusIndicator
                  status={
                    dueStatus === 'Overdue'
                      ? 'overdue'
                      : dueStatus ===
                        'Due Today'
                      ? 'due-today'
                      : 'due-soon'
                  }
                />
              )}
            </div>
          )}

          {/* Completed status */}
          {completed && (
            <StatusIndicator
              status="completed"
            />
          )}

          {/* Edit */}
          {onUpdateTask && (
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                onEdit?.(id)
              }
            >
              Edit
            </Button>
          )}

          {/* Delete */}
          {onDelete && (
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </>
      )}
    </article>
  )
}