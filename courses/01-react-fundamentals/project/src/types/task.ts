export type Priority =
  | 'Low'
  | 'Medium'
  | 'High'

export interface Task {
  id: string | number
  title: string
  description: string
  priority: Priority
  completed: boolean

  category?: string
  tags?: string[]
  dueDate?: string | number
}