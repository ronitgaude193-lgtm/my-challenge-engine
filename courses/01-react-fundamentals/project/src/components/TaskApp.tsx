import { useEffect, useState } from 'react'
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

type FilterType =
  | 'all'
  | 'active'
  | 'completed'

type SortOrder =
  | 'recent'
  | 'priority-high'
  | 'priority-low'
  | 'alphabetical'
  | 'due-date'

const STORAGE_KEY = 'task-app-tasks'

export default function TaskApp({
  tasks = [],
  setTasks,
  showForm = false,
  countFormat = 'tasks',
  showFilterBar = false,
  onDelete,
}: TaskAppProps) {
  // Challenge 06
  const [filter, setFilter] =
    useState<FilterType>('all')

  // Challenge 07
  const [sortOrder, setSortOrder] =
    useState<SortOrder>('recent')

  // Challenge 08
  const [editingId, setEditingId] =
    useState<string | number | null>(null)

  // Challenge 09
  const [searchText, setSearchText] =
    useState('')

  // Challenge 11
  const [debouncedSearchText, setDebouncedSearchText] =
    useState('')

  // Challenge 10: Load localStorage
  useEffect(() => {
    if (!setTasks) {
      return
    }

    const storedTasks =
      localStorage.getItem(STORAGE_KEY)

    if (!storedTasks) {
      return
    }

    try {
      const parsedTasks: unknown =
        JSON.parse(storedTasks)

      if (Array.isArray(parsedTasks)) {
        setTasks(parsedTasks as Task[])
      }
    } catch {
      // Keep existing tasks if stored data is invalid.
    }
  }, [setTasks])

  // Challenge 10: Save localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    )
  }, [tasks])

  // Challenge 11: Debounced Search
  useEffect(() => {
    const timeout =
      window.setTimeout(() => {
        setDebouncedSearchText(searchText)
      }, 300)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [searchText])

  // Challenge 03: Add Task
  const handleAddTask = (task: Task) => {
    if (!setTasks) {
      return
    }

    setTasks((prev) => [
      ...prev,
      task,
    ])
  }

  // Challenge 04: Toggle
  const handleToggle = (
    id: string | number
  ) => {
    if (!setTasks) {
      return
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      )
    )
  }

  // Challenge 08 + 12 + 13: Update Task
  const handleUpdateTask = (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
      category?: string
      tags?: string[]
      dueDate?: string | number
    }
  ) => {
    if (setTasks) {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) {
            return task
          }

          return {
            ...task,
            ...updates,
          }
        })
      )
    }

    setEditingId(null)
  }

  // Challenge 06: Filtering
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

  // Challenge 09 + 11: Search
  const normalizedSearch =
    debouncedSearchText
      .trim()
      .toLowerCase()

  const searchedTasks =
    normalizedSearch
      ? filteredTasks.filter((task) => {
          const title =
            task.title.toLowerCase()

          const description =
            task.description.toLowerCase()

          const category =
            task.category
              ?.toLowerCase() ?? ''

          const tags =
            task.tags
              ?.join(' ')
              .toLowerCase() ?? ''

          return (
            title.includes(
              normalizedSearch
            ) ||
            description.includes(
              normalizedSearch
            ) ||
            category.includes(
              normalizedSearch
            ) ||
            tags.includes(
              normalizedSearch
            )
          )
        })
      : filteredTasks

  // Challenge 07 + Challenge 13: Sorting
  const sortedTasks =
    [...searchedTasks].sort(
      (a, b) => {
        // Challenge 07:
        // Priority High -> Low
        if (
          sortOrder ===
          'priority-high'
        ) {
          const priority: Record<
            string,
            number
          > = {
            High: 3,
            Medium: 2,
            Low: 1,
          }

          return (
            priority[b.priority] -
            priority[a.priority]
          )
        }

        // Challenge 07:
        // Priority Low -> High
        if (
          sortOrder ===
          'priority-low'
        ) {
          const priority: Record<
            string,
            number
          > = {
            High: 3,
            Medium: 2,
            Low: 1,
          }

          return (
            priority[a.priority] -
            priority[b.priority]
          )
        }

        // Challenge 07:
        // Alphabetical
        if (
          sortOrder ===
          'alphabetical'
        ) {
          return a.title.localeCompare(
            b.title,
            undefined,
            {
              sensitivity: 'base',
            }
          )
        }

        // Challenge 13:
        // Due Date Soonest First
        if (
          sortOrder ===
          'due-date'
        ) {
          // Tasks without due dates
          // go to the end.
          if (
            !a.dueDate &&
            !b.dueDate
          ) {
            return 0
          }

          if (!a.dueDate) {
            return 1
          }

          if (!b.dueDate) {
            return -1
          }

          return (
            new Date(
              a.dueDate
            ).getTime() -
            new Date(
              b.dueDate
            ).getTime()
          )
        }

        // Recently Added
        // Preserve original order.
        return 0
      }
    )

  // Challenge 11:
  // Searching indicator
  const isSearching =
    searchText.trim() !==
    debouncedSearchText.trim()

  // Count
  const countText =
    countFormat === 'completed'
      ? `${
          tasks.filter(
            (task) =>
              task.completed
          ).length
        } of ${
          tasks.length
        } completed`
      : showFilterBar
        ? `Showing ${sortedTasks.length} of ${tasks.length} tasks`
        : `${tasks.length} tasks`

  // Empty message
  const hasSearch =
    normalizedSearch.length > 0

  const emptyMessage = hasSearch
    ? 'No tasks found'
    : 'No tasks match this filter'

  return (
    <div>
      {/* Challenge 03 */}
      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
        />
      )}

      {/* Challenge 06 + 07 + 09 + 11 */}
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

      {/* Challenge 11 */}
      {showFilterBar &&
        isSearching && (
          <p id="searching-indicator">
            Searching...
          </p>
        )}

      {/* Challenge 06 + 09 */}
      {showFilterBar &&
        sortedTasks.length === 0 && (
          <p id="filter-empty-message">
            {emptyMessage}
          </p>
        )}

      {/* Task List */}
      <TaskList
        tasks={sortedTasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={onDelete}
        onUpdateTask={
          handleUpdateTask
        }
        editingId={editingId}
        onEdit={setEditingId}
        onCancelEdit={() =>
          setEditingId(null)
        }
      />
    </div>
  )
}