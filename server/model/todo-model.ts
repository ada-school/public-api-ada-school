export interface Todo {
  title: string
  description: string
  createdBy: Schema.Types.ObjectId
  dueDate?: Date
  priority?: number
  isCompleted: boolean
}
