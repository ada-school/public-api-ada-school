import { Schema } from 'mongoose';

export interface ToDo {
  createdBy: Schema.Types.ObjectId;
  isCompleted: boolean;
  description?: string;
  priority?: number;
  title: string;
  dueDate?: Date;
}
