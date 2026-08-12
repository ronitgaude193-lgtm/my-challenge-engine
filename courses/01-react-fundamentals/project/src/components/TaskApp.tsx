import { useMemo } from 'react'
import type { Task } from './TaskList'

interface TaskStats {
  total: number
  completed: number
  completedPercentage: number
  active: number
  overdue: number
  categoryBreakdown?: Record<string, number>
  priorityBreakdown?: Record<string, number>
}

interface StatsPanelProps {
  tasks?: Task[]

  // Used by TaskApp
  stats?: TaskStats

  // Used by Challenge 14 tests
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completedPercentage?: number

  categoryBreakdown?: Record<string, number>
  priorityBreakdown?: Record<string, number>
}

export default function StatsPanel({
  tasks = [],
  stats,
  total,
  completed,
  active,
  overdue,
  completedPercentage,
  categoryBreakdown,
  priorityBreakdown,
}: StatsPanelProps) {
  /*
   * Calculate statistics from tasks.
   * useMemo prevents recalculation unless tasks change.
   */
  const calculatedStats = useMemo<TaskStats>(() => {
    const totalTasks = tasks.length

    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length

    const activeTasks = tasks.filter(
      (task) => !task.completed
    ).length

    const percentage =
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks / totalTasks) * 100
          )

    // Find incomplete tasks whose due date has passed.
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const overdueTasks = tasks.filter((task) => {
      if (task.completed || !task.dueDate) {
        return false
      }

      const dueDate = new Date(task.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      return dueDate < today
    }).length

    // Category breakdown
    const categories =
      tasks.reduce<Record<string, number>>(
        (result, task) => {
          const category =
            task.category || 'General'

          result[category] =
            (result[category] || 0) + 1

          return result
        },
        {}
      )

    // Priority breakdown
    const priorities =
      tasks.reduce<Record<string, number>>(
        (result, task) => {
          const priority =
            task.priority || 'Medium'

          result[priority] =
            (result[priority] || 0) + 1

          return result
        },
        {}
      )

    return {
      total: totalTasks,
      completed: completedTasks,
      completedPercentage: percentage,
      active: activeTasks,
      overdue: overdueTasks,
      categoryBreakdown: categories,
      priorityBreakdown: priorities,
    }
  }, [tasks])

  /*
   * If TaskApp passes a memoized stats object,
   * use it. Otherwise use calculatedStats.
   */
  const displayStats = stats ?? calculatedStats

  const displayTotal =
    total ?? displayStats.total

  const displayCompleted =
    completed ?? displayStats.completed

  const displayActive =
    active ?? displayStats.active

  const displayOverdue =
    overdue ?? displayStats.overdue

  const displayPercentage =
    completedPercentage ??
    displayStats.completedPercentage

  const displayCategories =
    categoryBreakdown ??
    displayStats.categoryBreakdown ??
    {}

  const displayPriorities =
    priorityBreakdown ??
    displayStats.priorityBreakdown ??
    {}

  return (
    <section id="stats-panel">
      <h2>Task Statistics</h2>

      {/* Total Tasks */}
      <div>
        <h3>Total: {displayTotal}</h3>
      </div>

      {/* Completed Tasks */}
      <div>
        <h3>
          Completed: {displayCompleted}
        </h3>

        <p>
          {displayPercentage}%
        </p>

        <div
          role="progressbar"
          aria-label="Task completion progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={displayPercentage}
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#e5e7eb',
          }}
        >
          <div
            style={{
              width: `${displayPercentage}%`,
              height: '100%',
              backgroundColor: '#22c55e',
            }}
          />
        </div>
      </div>

      {/* Active Tasks */}
      <div>
        <h3>Active: {displayActive}</h3>
      </div>

      {/* Overdue Tasks */}
      <div>
        <h3>Overdue: {displayOverdue}</h3>
      </div>

      {/* Category Breakdown */}
      {Object.keys(displayCategories).length > 0 && (
        <div>
          <h3>By Category</h3>

          {Object.entries(displayCategories).map(
            ([category, count]) => (
              <p key={category}>
                {category}: {count}
              </p>
            )
          )}
        </div>
      )}

      {/* Priority Breakdown */}
      {Object.keys(displayPriorities).length > 0 && (
        <div>
          <h3>By Priority</h3>

          {Object.entries(displayPriorities).map(
            ([priority, count]) => (
              <p key={priority}>
                {priority}: {count}
              </p>
            )
          )}
        </div>
      )}
    </section>
  )
}