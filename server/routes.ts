import { Application } from 'express';
import toDoRouter from './todo-api/controllers/router';
export default function routes(app: Application): void {
  app.use('/api/v1/todos', toDoRouter);
}
