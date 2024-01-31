import { Application } from 'express';
import toDoRouter from './todo-api/controllers/router';
import authJWT from './common/middleware/authJWT';
export default function routes(app: Application): void {
  app.use('/api/v1/todos', authJWT, toDoRouter);
}
