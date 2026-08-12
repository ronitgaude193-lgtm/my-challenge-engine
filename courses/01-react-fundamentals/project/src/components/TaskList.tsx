import TaskCard from './TaskCard'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category?: string
  tags?: string[]
  dueDate?: string | number
}

interface TaskListProps {
  tasks?: Task[]
  countText?: string
  onToggle?: (id: string | number) => void
  onDelete?: (id: string | number) => void

  // Challenge 08
  onUpdateTask?: (
    id: string | number,
    updates: {
      title: string
      description: string
      priority: string
    }
  ) => void
  editingId?: string | number | null
  onStartEdit?: (id: string | number) => void
  onCancelEdit?: () => void

  linkToTaskDetail?: boolean
}

const HARDCODED_TASKS: Task[] = [
  {
    id: 1,
    title: 'Task One',
    description: 'First hardcoded task',
    priority: 'High',
    completed: false,
  },
  {
    id: 2,
    title: 'Task Two',
    description: 'Second hardcoded task',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Task Three',
    description: 'Third hardcoded task',
    priority: 'Low',
    completed: false,
  },
]

export default function TaskList({
  tasks,
  countText,
  onToggle,
  onDelete,
  onUpdateTask,
  editingId,
  onStartEdit,
  onCancelEdit,
}: TaskListProps) {
  const list = tasks ?? HARDCODED_TASKS

  return (
    <section id="task-list">
      {countText && (
        <div id="task-count">
          {countText}
        </div>
      )}

      {list.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          completed={task.completed}
          onToggle={onToggle}
          onDelete={onDelete}

          // Challenge 08
          onUpdateTask={onUpdateTask}
          isEditing={editingId === task.id}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </section>
  )
}