import { useEffect, useMemo, useState } from 'react'
import TaskList, { type Task } from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'

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
  showStatsPanel = false,
  onDelete,
  linkToTaskDetail = false,
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
  const [
    debouncedSearchText,
    setDebouncedSearchText,
  ] = useState('')

  // ----------------------------------------
  // Challenge 10: Load tasks from localStorage
  // ----------------------------------------
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

  // ----------------------------------------
  // Challenge 10: Save tasks to localStorage
  // ----------------------------------------
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    )
  }, [tasks])

  // ----------------------------------------
  // Challenge 11: Debounced search
  // ----------------------------------------
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearchText(searchText)
    }, 300)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [searchText])

  // ----------------------------------------
  // Challenge 03: Add task
  // ----------------------------------------
  const handleAddTask = (task: Task) => {
    if (!setTasks) {
      return
    }

    setTasks((prev) => [
      ...prev,
      task,
    ])
  }

  // ----------------------------------------
  // Challenge 04: Toggle completion
  // ----------------------------------------
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

  // ----------------------------------------
  // Challenge 05 + 14: Delete task
  // ----------------------------------------
  const handleDeleteTask = (
    id: string | number
  ) => {
    if (setTasks) {
      setTasks((prev) =>
        prev.filter(
          (task) => task.id !== id
        )
      )
    }

    onDelete?.(id)
  }

  // ----------------------------------------
  // Challenge 08 + 12 + 13: Update task
  // ----------------------------------------
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

  // ----------------------------------------
  // Challenge 14: Statistics
  // ----------------------------------------
  const taskStats = useMemo(() => {
    const total = tasks.length

    const completed = tasks.filter(
      (task) => task.completed
    ).length

    const active = tasks.filter(
      (task) => !task.completed
    ).length

    const now = new Date()

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    )

    const overdue = tasks.filter((task) => {
      if (
        task.completed ||
        !task.dueDate
      ) {
        return false
      }

      const dueDate = new Date(
        task.dueDate
      )

      const dueDay = new Date(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        dueDate.getDate()
      )

      return dueDay < today
    }).length

    const completedPercentage =
      total > 0
        ? Math.round(
            (completed / total) * 100
          )
        : 0

    const categoryBreakdown =
      tasks.reduce<
        Record<string, number>
      >((result, task) => {
        const category =
          task.category || 'General'

        result[category] =
          (result[category] || 0) + 1

        return result
      }, {})

    const priorityBreakdown =
      tasks.reduce<
        Record<string, number>
      >((result, task) => {
        result[task.priority] =
          (result[task.priority] || 0) + 1

        return result
      }, {})

    return {
      total,
      completed,
      completedPercentage,
      active,
      overdue,
      categoryBreakdown,
      priorityBreakdown,
    }
  }, [tasks])

  // ----------------------------------------
  // Challenge 06: Filtering
  // ----------------------------------------
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

  // ----------------------------------------
  // Challenge 09 + 11: Search
  // ----------------------------------------
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

  // ----------------------------------------
  // Challenge 07 + 13: Sorting
  // ----------------------------------------
  const sortedTasks =
    [...searchedTasks].sort(
      (a, b) => {
        const priority: Record<
          string,
          number
        > = {
          High: 3,
          Medium: 2,
          Low: 1,
        }

        // High -> Low
        if (
          sortOrder ===
          'priority-high'
        ) {
          return (
            priority[b.priority] -
            priority[a.priority]
          )
        }

        // Low -> High
        if (
          sortOrder ===
          'priority-low'
        ) {
          return (
            priority[a.priority] -
            priority[b.priority]
          )
        }

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

        // Due date
        if (
          sortOrder ===
          'due-date'
        ) {
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

        // Recently added
        return 0
      }
    )

  // ----------------------------------------
  // Challenge 11: Searching indicator
  // ----------------------------------------
  const isSearching =
    searchText.trim() !==
    debouncedSearchText.trim()

  // ----------------------------------------
  // Count text
  // ----------------------------------------
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

  // ----------------------------------------
  // Empty message
  // ----------------------------------------
  const hasSearch =
    normalizedSearch.length > 0

  const emptyMessage = hasSearch
    ? 'No tasks found'
    : 'No tasks match this filter'

  return (
    <div>
      {/* Challenge 14: Statistics Dashboard */}
      {showStatsPanel && (
        <StatsPanel
          stats={taskStats}
        />
      )}

      {/* Challenge 03: Task Form */}
      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
        />
      )}

      {/* Challenge 06 + 07 + 09 + 11 + 13 */}
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
        onDelete={handleDeleteTask}
        onUpdateTask={
          handleUpdateTask
        }
        editingId={editingId}
        onEdit={setEditingId}
        onCancelEdit={() =>
          setEditingId(null)
        }
        linkToTaskDetail={
          linkToTaskDetail
        }
      />
    </div>
  )
}