import { useState } from 'react'
import TaskList, { type Task } from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

type FilterType = 'all' | 'active' | 'completed'

type SortOrder =
  | 'recent'
  | 'priority-high'
  | 'priority-low'
  | 'alphabetical'

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm = false,
  countFormat = 'tasks',
  showFilterBar = false,
  onDelete,
}: TaskAppProps) {
  const [filter, setFilter] = useState<FilterType>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent')

  const handleAddTask = (task: Task) => {
    if (setTasks) {
      setTasks((prev) => [...prev, task])
    }
  }

  const handleToggle = (id: string | number) => {
    if (setTasks) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      )
    }
  }

  // Challenge 06: Filtering
  let filteredTasks = tasks

  if (filter === 'active') {
    filteredTasks = tasks.filter((task) => !task.completed)
  }

  if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed)
  }

  // Challenge 07: Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === 'priority-high') {
      const priority: Record<string, number> = {
        High: 3,
        Medium: 2,
        Low: 1,
      }

      return priority[b.priority] - priority[a.priority]
    }

    if (sortOrder === 'priority-low') {
      const priority: Record<string, number> = {
        High: 3,
        Medium: 2,
        Low: 1,
      }

      return priority[a.priority] - priority[b.priority]
    }

    if (sortOrder === 'alphabetical') {
      return a.title.localeCompare(b.title, undefined, {
        sensitivity: 'base',
      })
    }

    // Recently Added = original order
    return 0
  })

  const countText =
    countFormat === 'completed'
      ? `${tasks.filter((task) => task.completed).length} of ${tasks.length} completed`
      : showFilterBar
        ? `Showing ${sortedTasks.length} of ${tasks.length} tasks`
        : `${tasks.length} tasks`

  return (
    <div>
      {showForm && <TaskForm onAddTask={handleAddTask} />}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      )}

      {showFilterBar && sortedTasks.length === 0 && (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      )}

      <TaskList
        tasks={sortedTasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={onDelete}
      />
    </div>
  )
}