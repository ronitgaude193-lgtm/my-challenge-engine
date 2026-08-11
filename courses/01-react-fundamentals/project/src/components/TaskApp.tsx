import type { Dispatch, SetStateAction } from 'react'
import TaskForm from './TaskForm'
import TaskList, { type Task } from './TaskList'

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

  const handleAddTask = (task: Task) => {
    props.setTasks?.((previousTasks) => [...previousTasks, task])
  }

  return (
    <div>
      {props.showForm && <TaskForm onAddTask={handleAddTask} />}

      <h2 id="task-count">{tasks.length} Tasks</h2>

      <TaskList
        tasks={tasks}
        countText={`${tasks.length} Tasks`}
      />
    </div>
  )
}