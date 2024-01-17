import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, connection, disconnect } from 'mongoose';

let mongoDb: MongoMemoryServer;
export const conectionDbMemory = async (): Promise<void> => {
  mongoDb = await MongoMemoryServer.create();
  const uri = mongoDb.getUri();
  await connect(uri, { dbName: 'test' });
};

export const cleanData = async (): Promise<void> => {
  await connection.db.dropDatabase();
};

export const closeConectionDbMemory = async (): Promise<void> => {
  await disconnect();
  await mongoDb.stop();
};
