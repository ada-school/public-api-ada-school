import { Schema } from 'mongoose';

export interface Todo {
  createdBy: Schema.Types.ObjectId;
  isCompleted: boolean;
  description: string;
  priority: number;
  tittle: string;
  dueDate: Date;
}
