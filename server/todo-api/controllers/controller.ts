import { Response, NextFunction, Request } from 'express';
import { ToDoDBModel } from '../schemas/to-do-schema';
import { ToDoModel } from '../model/todo-model';
import { Types } from 'mongoose';
import { HTTPError } from '../types';
import validator from 'validator';

export class Controller {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const errors: string[] = [];

    const { createdBy, isCompleted, description, priority, title, dueDate } =
      req.body as ToDoModel;

    if (createdBy && !Types.ObjectId.isValid(createdBy.toString())) {
      errors.push('created by must by a objectId value');
    }
    if (isCompleted && !validator.isBoolean(isCompleted.toString())) {
      errors.push('isCompleted by must by a boolean value');
    }

    if (!validator.isLength(title, { min: 3, max: 15 })) {
      errors.push(
        'title by must by a string value and with a length greater than 3 or less than or equal to 15'
      );
    }
    if (description && !validator.isLength(description, { min: 3, max: 250 })) {
      errors.push(
        'description by must by a string value and with a length greater than 3 or less than or equal to 250'
      );
    }

    if (
      priority &&
      !validator.isInt(priority.toString(), { min: 0, max: 10 })
    ) {
      errors.push(
        'priority by must by a number value less than 0 or equal to 10 or greater than or equal to 0'
      );
    }

    if (dueDate && !validator.isISO8601(dueDate.toString())) {
      errors.push('dueDate must be a Date value');
    }

    if (errors.length) {
      const bodyErrors: HTTPError = {
        status: 400,
        name: 'information in the body wrong',
        message: 'The values provided through the request body are not correct',
        errors: errors.map((message) => ({ message })),
      };
      next(bodyErrors);
    } else {
      try {
        const newToDo = new ToDoDBModel({
          createdBy,
          isCompleted,
          description,
          priority,
          title,
          dueDate,
        });
        await newToDo.save();
        res.sendStatus(201);
      } catch (error) {
        next(error);
      }
    }
  }
}
export default new Controller();
