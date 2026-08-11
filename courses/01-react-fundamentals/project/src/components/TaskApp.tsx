import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import TaskList, { type Task } from './TaskList'
import TaskForm from './TaskForm'
import FilterBar from './FilterBar'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

type Filter = 'all' | 'active' | 'completed'

export default function TaskApp(props: TaskAppProps) {
  const tasks = props.tasks ?? []

  const [filter, setFilter] = useState<Filter>('all')

  const handleAddTask = (task: Task) => {
    if (props.setTasks) {
      props.setTasks((prev) => [...prev, task])
    }
  }

  const handleToggle = (id: string | number) => {
    if (props.setTasks) {
      props.setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      )
    }
  }

  const filteredTasks =
    filter === 'active'
      ? tasks.filter((task) => !task.completed)
      : filter === 'completed'
        ? tasks.filter((task) => task.completed)
        : tasks

  const completedCount = tasks.filter((task) => task.completed).length

  const countText =
    props.showFilterBar
      ? `Showing ${filteredTasks.length} of ${tasks.length} tasks`
      : props.countFormat === 'completed'
        ? `${completedCount} of ${tasks.length} completed`
        : `${tasks.length} Tasks`

  return (
    <div>
      {props.showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      {props.showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
        />
      )}

      {props.showFilterBar && filteredTasks.length === 0 && (
        <p id="filter-empty-message">
          No tasks match this filter
        </p>
      )}

      <TaskList
        tasks={filteredTasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={props.onDelete}
        linkToTaskDetail={props.linkToTaskDetail}
      />
    </div>
  )
}