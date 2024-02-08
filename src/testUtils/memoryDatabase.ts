/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer | null = null;

const connect = async (): Promise<typeof mongoose> => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // eslint-disable-next-line no-console
  console.log(`🧠 Memory Database URI: ${uri}`);

  return mongoose.connect(uri);
};

const close = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongod) {
    await mongod.stop();
  }
};

const clear = async (): Promise<void> => {
  const models = mongoose.connection.models;

  for (const key in models) {
    const model = models[key];
    await model.deleteMany({});
  }
};

export const memoryDatabase = { close, clear, connect };
