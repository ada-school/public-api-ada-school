import { Request, Response } from 'express';
import l from '../../common/logger';
// import { ToDoModel } from '../model/todo-model';
// import errorHandler from '../middlewares/error.handler';

export class Controller {
  create(req: Request, res: Response): void {
    try {
      const data = req.body ;
      res.send(data);
    } catch (error) {
      l.info(error);
    }
  }
}
export default new Controller();
