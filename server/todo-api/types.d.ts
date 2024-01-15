import { Request } from 'express';
import { ToDoModel } from './model/todo-model';

export interface CustomError extends Error {
  status?: number;
  errors?: { message: string }[];
}

export interface CustomRequest extends Request {
  todo?: ToDoModel;
}
