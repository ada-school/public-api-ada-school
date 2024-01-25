import { model, Schema } from 'mongoose';
import { ToDoModel } from '../model/todo-model';

const ToDoSchema = new Schema<ToDoModel>({

  createdBy: { type: Schema.ObjectId },
  isCompleted: { type: Boolean, default: false },
  description: { type: String },
  priority: { type: Number, max: 10, min: 0 },
  title: { type: String, required: true },
  dueDate: { type: Date },
});

export const ToDoDBModel = model('todo', ToDoSchema);
