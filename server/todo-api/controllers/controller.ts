import { Response, NextFunction } from 'express';
import l from '../../common/logger';
import { CustomRequest } from '../types';
import { ToDoDBModel } from '../schemas/to-do-schema';
import errorHandler from '../middlewares/error.handler';

export class Controller {
  //metodo de creación de una nueva todo
  async create(req: CustomRequest, res: Response, next:NextFunction):Promise<void> {
    try {
      const newToDo = new ToDoDBModel(req.todo);
      await newToDo.save();
      res.status(201).json(newToDo);
    } catch (error) {
      l.error(error);
      errorHandler(error, req, res, next);
    }
  }
}
export default new Controller();
