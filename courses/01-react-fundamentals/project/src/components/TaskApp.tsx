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
  // Challenge 06
  const [filter, setFilter] = useState<FilterType>('all')

  // Challenge 07
  const [sortOrder, setSortOrder] =
    useState<SortOrder>('recent')

  // Challenge 08
  const [editingId, setEditingId] =
    useState<string | number | null>(null)

  // Challenge 09
  const [searchText, setSearchText] = useState('')

  // -----------------------------
  // Challenge 03: Add Task
  // -----------------------------
  const handleAddTask = (task: Task) => {
    if (setTasks) {
      setTasks((prev) => [...prev, task])
    }
  }

  // -----------------------------
  // Challenge 04: Toggle
  // -----------------------------
  const handleToggle = (id: string | number) => {
    if (setTasks) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: !task.completed,
              }
            : task
        )
      )
    }
  }

  // -----------------------------
  // Challenge 08: Update Task
  // -----------------------------
  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => {
    if (setTasks) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                ...updates,
              }
            : task
        )
      )
    }

    setEditingId(null)
  }

  // -----------------------------
  // Challenge 06: Filtering
  // -----------------------------
  let filteredTasks = tasks

  if (filter === 'active') {
    filteredTasks = tasks.filter(
      (task) => !task.completed
    )
  }

  if (filter === 'completed') {
    filteredTasks = tasks.filter(
      (task) => task.completed
    )
  }

  // -----------------------------
  // Challenge 09: Search
  // Filter AFTER status filter
  // -----------------------------
  const normalizedSearch = searchText
    .trim()
    .toLowerCase()

  const searchedTasks = normalizedSearch
    ? filteredTasks.filter((task) => {
        const title = task.title.toLowerCase()
        const description =
          task.description.toLowerCase()

        return (
          title.includes(normalizedSearch) ||
          description.includes(normalizedSearch)
        )
      })
    : filteredTasks

  // -----------------------------
  // Challenge 07: Sorting
  // Search/filter happens BEFORE sort
  // -----------------------------
  const sortedTasks = [...searchedTasks].sort(
    (a, b) => {
      if (sortOrder === 'priority-high') {
        const priority: Record<string, number> = {
          High: 3,
          Medium: 2,
          Low: 1,
        }

        return (
          priority[b.priority] -
          priority[a.priority]
        )
      }

      if (sortOrder === 'priority-low') {
        const priority: Record<string, number> = {
          High: 3,
          Medium: 2,
          Low: 1,
        }

        return (
          priority[a.priority] -
          priority[b.priority]
        )
      }

      if (sortOrder === 'alphabetical') {
        return a.title.localeCompare(
          b.title,
          undefined,
          {
            sensitivity: 'base',
          }
        )
      }

      // Recently Added
      // Keep original order
      return 0
    }
  )

  // -----------------------------
  // Count
  // -----------------------------
  const countText =
    countFormat === 'completed'
      ? `${tasks.filter((task) => task.completed).length} of ${tasks.length} completed`
      : showFilterBar
        ? `Showing ${sortedTasks.length} of ${tasks.length} tasks`
        : `${tasks.length} tasks`

  // -----------------------------
  // Empty message
  // -----------------------------
  const hasSearch = normalizedSearch.length > 0

  let emptyMessage = 'No tasks match this filter'

  if (hasSearch) {
    emptyMessage = 'No tasks found'
  }

  return (
    <div>
      {/* Challenge 03 */}
      {showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      {/* Challenge 06 + 07 + 09 */}
      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          searchText={searchText}
          onSearchChange={setSearchText}
        />
      )}

      {/* Challenge 06 + 09 empty state */}
      {showFilterBar && sortedTasks.length === 0 && (
        <p id="filter-empty-message">
          {emptyMessage}
        </p>
      )}

      {/* Challenge 06 + 09 count */}
      <TaskList
        tasks={sortedTasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={onDelete}
        onUpdateTask={handleUpdateTask}
        editingId={editingId}
        onEdit={setEditingId}
        onCancelEdit={() => setEditingId(null)}
      />
    </div>
  )
}