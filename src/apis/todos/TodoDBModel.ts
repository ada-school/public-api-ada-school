/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { ToDoModel } from "./TodoModel";
import { Schema, model } from "mongoose";

const todosSchema = new Schema<ToDoModel>(
  {
    title: { type: String, required: true },
    description: { type: String },
    isComplete: { type: Boolean, default: false, required: true },
    ownerId: { type: Schema.Types.ObjectId, required: true, select: false },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.ownerId;
        delete ret.__v;
      },
    },
  }
);

todosSchema.index({ ownerId: 1, createdAt: 1 });

export const TodoDBModel = model<ToDoModel>("todos", todosSchema);
