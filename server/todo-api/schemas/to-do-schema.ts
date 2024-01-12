import { model, Schema } from 'mongoose';
import { ToDo } from '../model/todo-model';

const ToDoSchema = new Schema<ToDo>({
  createdBy: { type: Schema.ObjectId },
  isCompleted: { type: Boolean, default: false },
  description: { type: String },
  priority: { type: Number, max: 10, min: 0 },
  title: { type: String, required: true },
  dueDate: { type: Date },
});

const ToDoModel = model('ToDo', ToDoSchema);

export default ToDoModel;
