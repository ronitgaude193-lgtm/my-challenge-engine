import type { Dispatch, SetStateAction } from 'react'
import TaskList, { type Task } from './TaskList'
import TaskForm from './TaskForm'

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

export default function TaskApp(props: TaskAppProps) {
  const tasks = props.tasks ?? []

  const handleToggle = (id: string | number) => {
    if (props.setTasks) {
      props.setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                completed: !task.completed,
              }
            : task,
        ),
      )
    }
  }

  const handleAddTask = (task: Record<string, unknown>) => {
    if (props.setTasks) {
      props.setTasks((prev) => [
        ...prev,
        task as Task,
      ])
    }
  }

  const completedCount = tasks.filter(
    (task) => task.completed,
  ).length

  const countText =
    props.countFormat === 'completed'
      ? `${completedCount} of ${tasks.length} completed`
      : `${tasks.length} Tasks`

  return (
    <div>
      {props.showForm && (
        <TaskForm onAddTask={handleAddTask} />
      )}

      <TaskList
        tasks={tasks}
        countText={countText}
        onToggle={handleToggle}
        onDelete={props.onDelete}
        linkToTaskDetail={props.linkToTaskDetail}
      />
    </div>
  )
}