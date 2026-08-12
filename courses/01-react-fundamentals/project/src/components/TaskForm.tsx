import { useState, type FormEvent } from 'react'
import Button from './Button'
import FormInput from './FormInput'

interface TaskFormProps {
  onAddTask?: (task: {
    id: string | number
    title: string
    description: string
    priority: string
    completed: boolean
    category: string
    tags: string[]
    dueDate?: string
  }) => void

  categories?: string[]
}

export default function TaskForm({
  onAddTask,
  categories = [],
}: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')

  // Challenge 12
  const [category, setCategory] = useState('General')
  const [tagsInput, setTagsInput] = useState('')

  // Challenge 13
  const [dueDate, setDueDate] = useState('')

  const [error, setError] = useState('')

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,

      // Challenge 12
      category: category.trim() || 'General',
      tags,

      // Challenge 13
      ...(dueDate ? { dueDate } : {}),
    }

    onAddTask?.(newTask)

    // Reset form
    setTitle('')
    setDescription('')
    setPriority('Medium')
    setCategory('General')
    setTagsInput('')
    setDueDate('')
    setError('')
  }

  const formCategories = [
    'General',
    ...categories.filter(
      (existingCategory) =>
        existingCategory !== 'General'
    ),
  ]

  return (
    <form onSubmit={handleSubmit}>
      {/* Challenge 03: Title */}
      <FormInput
        label="Title"
        id="task-title"
        value={title}
        type="text"
        onChange={(event) =>
          setTitle(event.target.value)
        }
        error={error}
      />

      {/* Challenge 03: Description */}
      <FormInput
        label="Description"
        id="task-description"
        value={description}
        type="textarea"
        onChange={(event) =>
          setDescription(event.target.value)
        }
      />

      {/* Challenge 03: Priority */}
      <div>
        <label htmlFor="task-priority">
          Priority
        </label>

        <select
          id="task-priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value)
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Challenge 12: Category */}
      <div>
        <label htmlFor="task-category">
          Category
        </label>

        <select
          id="task-category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          {formCategories.map((categoryOption) => (
            <option
              key={categoryOption}
              value={categoryOption}
            >
              {categoryOption}
            </option>
          ))}
        </select>
      </div>

      {/* Challenge 12: Tags */}
      <FormInput
        label="Tags"
        id="task-tags-input"
        type="text"
        value={tagsInput}
        placeholder="e.g. react, college, project"
        onChange={(event) =>
          setTagsInput(event.target.value)
        }
      />

      {/* Challenge 13: Due Date */}
      <FormInput
        label="Due Date"
        id="task-due-date"
        type="date"
        value={dueDate}
        onChange={(event) =>
          setDueDate(event.target.value)
        }
      />

      {/* Error */}
      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}

      {/* Challenge 15: Reusable Button */}
      <Button
        type="submit"
        variant="primary"
      >
        Add Task
      </Button>
    </form>
  )
}