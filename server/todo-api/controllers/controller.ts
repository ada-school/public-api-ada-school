import { Response } from 'express';
import l from '../../common/logger';
import { CustomRequest } from '../types';
import { ToDoDBModel } from '../schemas/to-do-schema';
// import { ToDoModel } from '../model/todo-model';
// import errorHandler from '../middlewares/error.handler';

export class Controller {
  async create(req: CustomRequest, res: Response): Promise<void> {
    try {
      const newToDo = new ToDoDBModel(req.todo);
      await newToDo.save();
      res.json(newToDo);
    } catch (error) {
      l.info(error);
    }
  }
}
export default new Controller();
