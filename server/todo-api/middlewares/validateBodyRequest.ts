import { NextFunction, Response } from 'express';
import { ToDoModel } from '../model/todo-model';
import { Types } from 'mongoose';
import { CustomError, CustomRequest } from '../types';
import errorHandler from './error.handler';

const isDateValid = (reqDate: Date): boolean => {
  const date = new Date(reqDate);
  return date instanceof Date && !isNaN(date.getTime());
};

const validateBodyRequest = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];

  const { createdBy, isCompleted, description, priority, title, dueDate } =
    req.body as ToDoModel;

  if (!(createdBy && Types.ObjectId.isValid(createdBy.toString()))) {
    errors.push('created by must by a objectId value');
  }
  if (isCompleted && typeof isCompleted !== 'boolean') {
    errors.push('isCompleted by must by a boolean value');
  }

  if (
    description &&
    !(
      typeof description === 'string' &&
      description.length > 3 &&
      description.length <= 250
    )
  ) {
    errors.push(
      'description by must by a string value and with a length greater than 3 or less than or equal to 250'
    );
  }

  if (
    priority &&
    !(typeof priority === 'number' && (priority < 0 || priority <= 10))
  ) {
    errors.push(
      'priority by must by a number value less than or equal to 10 or greater than or equal to 0'
    );
  }

  if (!(typeof title === 'string' && title.length >= 3 && title.length <= 15)) {
    errors.push(
      'title by must by a string value and with a length greater than 3 or less than or equal to 15'
    );
  }

  if (dueDate && !(dueDate && isDateValid(dueDate))) {
    errors.push('dueDate must be a Date value');
  }
  if (errors.length) {
    const bodyErrors: CustomError = {
      status: 400,
      name: 'information in the body wrong',
      message: 'The values provided through the request body are not correct',
      errors: errors.map((message) => ({ message })),
    };
    errorHandler(bodyErrors, req, _res, next);
  } else {
    req.todo = {
      createdBy,
      isCompleted,
      description,
      priority,
      title,
      dueDate,
    };
    next();
  }
};

export default validateBodyRequest;
