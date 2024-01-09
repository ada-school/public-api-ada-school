import './env';
import { connect } from 'mongoose';
import l from './logger';

const dbName = process.env.DbName || 'api-ada';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

export default async function () {
  try {
    await connect(MONGO_URI, {
      dbName,
    });
    l.info('Conexión a MongoDb exitosa');
  } catch (error) {
    l.error(error);
  }
}
