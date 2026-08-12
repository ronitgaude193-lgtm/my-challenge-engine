import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import TaskList, { type Task } from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'
import StatsPanel from './StatsPanel'
import { useTheme } from '../contexts/ThemeContext'

// ----------------------------------------
// Challenge 18: Task action type
// ----------------------------------------

type TaskAction =
  | {
      type: 'ADD_TASK'
      payload: Task
    }
  | {
      type: 'UPDATE_TASK'
      payload: {
        id: string | number
        title: string
        description: string
        priority: string
        category?: string
        tags?: string[]
        dueDate?: string | number
      }
    }
  | {
      type: 'DELETE_TASK'
      payload: string | number
    }
  | {
      type: 'TOGGLE_TASK'
      payload: string | number
    }
  | {
      type: 'SET_TASKS'
      payload: Task[]
    }

// ----------------------------------------
// Challenge 18: Props
// ----------------------------------------

interface TaskAppProps {
  tasks?: Task[]

  dispatch?: (
    action: TaskAction
  ) => void

  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (
    id: string | number
  ) => void
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

export default function TaskApp({
  tasks = [],
  dispatch,
  showForm = false,
  countFormat = 'tasks',
  showFilterBar = false,
  showStatsPanel = false,
  onDelete,
  linkToTaskDetail = false,
}: TaskAppProps) {
  // ----------------------------------------
  // Challenge 16: Theme Context
  // ----------------------------------------

  const {
    theme,
    toggleTheme,
  } = useTheme()

  // ----------------------------------------
  // Challenge 06: Filtering
  // ----------------------------------------

  const [filter, setFilter] =
    useState<FilterType>('all')

  // ----------------------------------------
  // Challenge 07: Sorting
  // ----------------------------------------

  const [sortOrder, setSortOrder] =
    useState<SortOrder>('recent')

  // ----------------------------------------
  // Challenge 08: Editing
  // ----------------------------------------

  const [editingId, setEditingId] =
    useState<
      string | number | null
    >(null)

  // ----------------------------------------
  // Challenge 09: Search
  // ----------------------------------------

  const [searchText, setSearchText] =
    useState('')

  // ----------------------------------------
  // Challenge 11: Debounced Search
  // ----------------------------------------

  const [
    debouncedSearchText,
    setDebouncedSearchText,
  ] = useState('')

  useEffect(() => {
    const timeout =
      window.setTimeout(() => {
        setDebouncedSearchText(
          searchText
        )
      }, 300)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [searchText])

  // ----------------------------------------
  // Challenge 03 + 18:
  // Add task
  // ----------------------------------------

  const handleAddTask = (
    task: Task
  ) => {
    dispatch?.({
      type: 'ADD_TASK',
      payload: task,
    })
  }

  // ----------------------------------------
  // Challenge 04 + 18:
  // Toggle task
  // ----------------------------------------

  const handleToggle = (
    id: string | number
  ) => {
    dispatch?.({
      type: 'TOGGLE_TASK',
      payload: id,
    })
  }

  // ----------------------------------------
  // Challenge 05 + 18:
  // Delete task
  // ----------------------------------------

  const handleDeleteTask = (
    id: string | number
  ) => {
    dispatch?.({
      type: 'DELETE_TASK',
      payload: id,
    })

    onDelete?.(id)
  }

  // ----------------------------------------
  // Challenge 08 + 12 + 13 + 18:
  // Update task
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
    dispatch?.({
      type: 'UPDATE_TASK',
      payload: {
        id,
        ...updates,
      },
    })

    setEditingId(null)
  }

  // ----------------------------------------
  // Challenge 14:
  // Statistics
  // ----------------------------------------

  const taskStats = useMemo(() => {
    const total = tasks.length

    const completed =
      tasks.filter(
        (task) => task.completed
      ).length

    const active =
      tasks.filter(
        (task) => !task.completed
      ).length

    const now = new Date()

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    )

    const overdue =
      tasks.filter((task) => {
        if (
          task.completed ||
          !task.dueDate
        ) {
          return false
        }

        const dueDate =
          new Date(task.dueDate)

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
      >(
        (result, task) => {
          const category =
            task.category ||
            'General'

          result[category] =
            (result[category] || 0) + 1

          return result
        },
        {}
      )

    const priorityBreakdown =
      tasks.reduce<
        Record<string, number>
      >(
        (result, task) => {
          result[task.priority] =
            (result[task.priority] || 0) + 1

          return result
        },
        {}
      )

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
  // Challenge 06:
  // Filtering
  // ----------------------------------------

  let filteredTasks = tasks

  if (filter === 'active') {
    filteredTasks =
      tasks.filter(
        (task) => !task.completed
      )
  }

  if (filter === 'completed') {
    filteredTasks =
      tasks.filter(
        (task) => task.completed
      )
  }

  // ----------------------------------------
  // Challenge 09 + 11:
  // Search
  // ----------------------------------------

  const normalizedSearch =
    debouncedSearchText
      .trim()
      .toLowerCase()

  const searchedTasks =
    normalizedSearch
      ? filteredTasks.filter(
          (task) => {
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
          }
        )
      : filteredTasks

  // ----------------------------------------
  // Challenge 07 + 13:
  // Sorting
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

        if (
          sortOrder ===
          'priority-high'
        ) {
          return (
            priority[b.priority] -
            priority[a.priority]
          )
        }

        if (
          sortOrder ===
          'priority-low'
        ) {
          return (
            priority[a.priority] -
            priority[b.priority]
          )
        }

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

        if (
          sortOrder === 'due-date'
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

        return 0
      }
    )

  // ----------------------------------------
  // Challenge 11:
  // Searching indicator
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

  // ----------------------------------------
  // Render
  // ----------------------------------------

  return (
    <div
      id="task-app"
      data-theme={theme}
    >
      {/* Challenge 16 */}
      <header id="app-header">
        <button
          id="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${
            theme === 'light'
              ? 'dark'
              : 'light'
          } theme`}
        >
          {theme === 'light'
            ? 'Dark Mode'
            : 'Light Mode'}
        </button>
      </header>

      {/* Challenge 14 */}
      {showStatsPanel && (
        <StatsPanel
          stats={taskStats}
        />
      )}

      {/* Challenge 03 */}
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