/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import express from "express";
import asyncHandler from "express-async-handler";
import { checkSchema, validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";
import { AsyncHandler } from "../../AsyncHandler";
import { HTTPError } from "../../HTTPError";
import { TodoDBModel } from "./TodoDBModel";

const router = express.Router();

export const createTodo: AsyncHandler = async (req, res) => {
  if (!req.jwt?.userId) {
    throw new HTTPError({
      status: 401,
      message: "Unauthorized",
      module: "TodosAPI.createTodo",
    });
  }

  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new HTTPError({
      status: 400,
      message: "Invalid request",
      errors: result.array(),
      module: "TodosAPI.createTodo",
    });
  }

  const { title, description } = req.body;

  const createdTodo = await TodoDBModel.create({
    title,
    description,
    ownerId: req.jwt.userId,
  });

  return res.status(201).send({
    data: createdTodo,
  });
};

export const updateTodo: AsyncHandler = async (req, res) => {
  if (!req.jwt?.userId) {
    throw new HTTPError({
      status: 401,
      message: "Unauthorized",
      module: "TodosAPI.updateTodo",
    });
  }

  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new HTTPError({
      status: 400,
      message: "Invalid request",
      errors: result.array(),
      module: "TodosAPI.updateTodo",
    });
  }

  const { id } = req.params;

  const { title, description, isComplete } = req.body;

  const existingTodo = await TodoDBModel.findOne({
    _id: id,
    ownerId: req.jwt.userId,
  });

  if (!existingTodo) {
    throw new HTTPError({
      status: 404,
      message: "Todo not found",
      module: "TodosAPI.updateTodo",
    });
  }

  const completedAt =
    isComplete === true && existingTodo.isComplete !== isComplete
      ? new Date()
      : undefined;

  const updatedTodo = await existingTodo
    .set({ title, description, isComplete, completedAt })
    .save();

  return res.status(200).send({ data: updatedTodo });
};

export const getTodo: AsyncHandler = async (req, res) => {
  if (!req.jwt?.userId) {
    throw new HTTPError({
      status: 401,
      message: "Unauthorized",
      module: "TodosAPI.getTodo",
    });
  }

  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new HTTPError({
      status: 400,
      message: "Invalid request",
      errors: result.array(),
      module: "TodosAPI.getTodo",
    });
  }

  const { id } = req.params;

  const todo = await TodoDBModel.findOne({ _id: id, ownerId: req.jwt.userId });

  if (!todo) {
    throw new HTTPError({
      status: 404,
      message: "Todo not found",
      module: "TodosAPI.getTodo",
    });
  }

  return res.status(200).send({ data: todo });
};

export const listTodos: AsyncHandler = async (req, res) => {
  if (!req.jwt?.userId) {
    throw new HTTPError({
      status: 401,
      message: "Unauthorized",
      module: "TodosAPI.listTodos",
    });
  }

  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new HTTPError({
      status: 400,
      message: "Invalid request",
      errors: result.array(),
      module: "TodosAPI.listTodos",
    });
  }

  const { limit, offset } = req.query;

  const safeLimit = limit ? parseInt(limit as string) : 100;
  const safeOffset = offset ? parseInt(offset as string) : 0;

  const todos = await TodoDBModel.find({ ownerId: req.jwt.userId })
    .limit(safeLimit)
    .skip(safeOffset)
    .sort({ createdAt: 1 });

  return res.status(200).send({ data: todos });
};

const deleteTodo: AsyncHandler = async (req, res) => {
  if (!req.jwt?.userId) {
    throw new HTTPError({
      status: 401,
      message: "Unauthorized",
      module: "TodosAPI.deleteTodo",
    });
  }

  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new HTTPError({
      status: 400,
      message: "Invalid request",
      errors: result.array(),
      module: "TodosAPI.deleteTodo",
    });
  }

  const { id } = req.params;

  const todo = await TodoDBModel.findOne({ _id: id, ownerId: req.jwt.userId });

  if (!todo) {
    throw new HTTPError({
      status: 404,
      message: "Todo not found",
      module: "TodosAPI.deleteTodo",
    });
  }

  await todo.deleteOne();

  return res.status(200).send({ data: todo });
};

router.post(
  "/",
  checkSchema({
    title: {
      in: ["body"],
      isString: true,
      errorMessage: "Title must be a string and is required",
      notEmpty: true,
      trim: true,
      isLength: {
        options: { min: 1, max: 200 },
        errorMessage: "Title must be between 1 and 200 characters",
      },
    },
    description: {
      in: ["body"],
      optional: true,
      isString: true,
      errorMessage: "Description must be a string",
      isLength: {
        options: { min: 1, max: 500 },
        errorMessage: "Title must be between 1 and 500 characters",
      },
    },
  }),
  asyncHandler(createTodo)
);

router.put(
  "/:id",
  checkSchema({
    id: {
      in: ["params"],
      isString: true,
      errorMessage: "Id must be a string",
      trim: true,
      custom: {
        options: (value) => {
          return isValidObjectId(value);
        },
        errorMessage: "Invalid id",
      },
    },
    title: {
      in: ["body"],
      isString: true,
      errorMessage: "Title must be a string",
      optional: true,
      isLength: {
        options: { min: 1, max: 200 },
        errorMessage: "Title must be between 1 and 200 characters",
      },
    },
    description: {
      in: ["body"],
      optional: true,
      isString: true,
      errorMessage: "Description must be a string",
      isLength: {
        options: { min: 1, max: 500 },
        errorMessage: "Title must be between 1 and 500 characters",
      },
    },
    isComplete: {
      in: ["body"],
      optional: true,
      isBoolean: true,
      errorMessage: "isComplete must be a boolean",
    },
  }),
  asyncHandler(updateTodo)
);
router.get(
  "/:id",
  checkSchema({
    id: {
      in: ["params"],
      isString: true,
      errorMessage: "Id must be a string",
      trim: true,
      custom: {
        options: (value) => {
          return isValidObjectId(value);
        },
        errorMessage: "Invalid id",
      },
    },
  }),
  asyncHandler(getTodo)
);
router.get("/", asyncHandler(listTodos));
router.delete(
  "/:id",
  checkSchema({
    id: {
      in: ["params"],
      isString: true,
      errorMessage: "Id must be a string",
      trim: true,
      custom: {
        options: (value) => {
          return isValidObjectId(value);
        },
        errorMessage: "Invalid id",
      },
    },
  }),
  asyncHandler(deleteTodo)
);

export default router;
