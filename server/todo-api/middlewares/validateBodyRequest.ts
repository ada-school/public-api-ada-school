import { NextFunction, Request, Response } from 'express';
import { ToDoModel } from '../model/todo-model';
import { Types } from 'mongoose';
import { CustomError } from '../types';
import errorHandler from './error.handler';

function isDateValid(fecha: Date): boolean {
  const date = new Date(fecha);
  return date instanceof Date && !isNaN(date.getTime());
}

const validateBodyRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const bodyErrors: CustomError = {
    status: 400,
    name: '',
    message: '',
    errors: [],
  };

  const { createdBy, isCompleted, description, priority, title, dueDate } =
    req.body as ToDoModel;

  if (!(createdBy && Types.ObjectId.isValid(createdBy.toString()))) {
    bodyErrors.errors?.push({ message: 'created by must by a objectid value' });
  }
  if (isCompleted && typeof isCompleted !== 'boolean') {
    bodyErrors.errors?.push({
      message: 'isCompleted by must by a boolean value',
    });
  }

  if (
    !(
      typeof description === 'string' &&
      description.length > 3 &&
      description.length <= 250
    )
  ) {
    bodyErrors.errors?.push({
      message:
        'description by must by a string value and with a length greater than 3 or less than or equal to 250',
    });
  }

  if (!(typeof priority === 'number' && (priority < 0 || priority <= 10))) {
    bodyErrors.errors?.push({
      message:
        'priority by must by a number value less than or equal to 10 or greater than or equal to 0',
    });
  }

  if (!(typeof title === 'string' && title.length >= 3 && title.length <= 15)) {
    bodyErrors.errors?.push({
      message:
        'description by must by a string value and with a length greater than 3 or less than or equal to 15',
    });
  }

  if (!(dueDate && isDateValid(dueDate))) {
    bodyErrors.errors?.push({
      message: 'dueDate must be a Date value',
    });
  }
  if (!bodyErrors.errors?.length) {
    next();
  } else {
    errorHandler(bodyErrors, req, _res, next);
  }
};

export default validateBodyRequest;
