interface TaskCardProps {
  id: string | number
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void
}

export default function TaskCard({
  id,
  title,
  description,
  priority,
  completed = false,
  onToggle,
  onDelete,
}: TaskCardProps) {
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

      {onDelete && (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </article>
  )
}