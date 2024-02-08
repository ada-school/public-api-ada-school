/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Types } from "mongoose";

export interface ToDoModel {
  id: string;
  title: string;
  description?: string;
  isComplete: boolean;
  ownerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
