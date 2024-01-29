import { Response, NextFunction, Request } from 'express';
import { ToDoDBModel } from '../schemas/to-do-schema';
import { Types } from 'mongoose';
import { HTTPError } from '../types';
import validator from 'validator';

const isObjectId = (
  createdBy: string | Types.ObjectId
): createdBy is Types.ObjectId => {
  return Types.ObjectId.isValid(createdBy);
};

const isBoolean = (isCompleted: unknown): isCompleted is boolean => {
  return typeof isCompleted === 'boolean';
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

const isDate = (value: unknown): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

const haveMinRequiredValues = (valuesInBodyRequest: Array<string>): boolean => {
  return (
    valuesInBodyRequest.includes('title') &&
    valuesInBodyRequest.includes('isCompleted') &&
    valuesInBodyRequest.includes('createdBy')
  );
};

export class Controller {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    let bodyErrors: HTTPError = {
      status: 400,
      name: 'Bad request',
      message: 'The values provided through the request body are not correct',
    };
    const valuesInBodyRequest = Object.keys(req.body);

    if (haveMinRequiredValues(valuesInBodyRequest)) {
      const errors: Array<string> = [];

      const { createdBy, isCompleted, description, priority, title, dueDate } =
        req.body;
      if (createdBy && !isObjectId(createdBy)) {
        errors.push('created by must by a objectId value');
      }
      if (isCompleted && !isBoolean(isCompleted)) {
        errors.push('isCompleted by must by a boolean value');
      }

      if (isString(title) && !validator.isLength(title, { min: 3, max: 15 })) {
        errors.push(
          'title by must by a string value and with a length greater than 3 or less than or equal to 15'
        );
      }
      if (
        isString(description) &&
        !validator.isLength(description, { min: 3, max: 250 })
      ) {
        errors.push(
          'description by must by a string value and with a length greater than 3 or less than or equal to 250'
        );
      }

      if (
        isNumber(priority) &&
        !validator.isInt(priority.toString(), { min: 0, max: 10 })
      ) {
        errors.push(
          'priority by must by a number value less than 0 or equal to 10 or greater than or equal to 0'
        );
      }

      if (
        dueDate &&
        !isDate(dueDate) &&
        !validator.isISO8601(dueDate.toString())
      ) {
        errors.push('dueDate must be a Date value');
      }

      if (errors.length) {
        bodyErrors = {
          ...bodyErrors,
          errors: errors.map((message) => ({ message })),
        };
        next(bodyErrors);
      } else if (haveMinRequiredValues(valuesInBodyRequest)) {
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
    } else {
      bodyErrors = {
        ...bodyErrors,
        errors: [
          {
            message:
              'None of the properties provided in the body of the application are valid',
          },
        ],
      };
      next(bodyErrors);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { createdBy } = req.body;

    if (!isObjectId(createdBy)) {
      const error: HTTPError = {
        status: 400,
        name: 'Bad request',
        message: `createdBy must by a ObjectId value but recived a ${typeof createdBy}`,
      };
      return next(error);
    }

    const studentTodos = await ToDoDBModel.find({
      createdBy: createdBy,
    });

    if (studentTodos.length) {
      res.status(200).json({ studentTodos });
    } else {
      res.status(200).json({
        message: `There is no student task with ID '${createdBy}'`,
      });
    }
  }
}
export default new Controller();
