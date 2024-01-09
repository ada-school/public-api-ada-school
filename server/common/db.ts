import './env';
import { connect } from 'mongoose';
import l from './logger';
import { DB_NAME, MONGO_URI } from '../config';

export default async function () {
  try {
    await connect(MONGO_URI, {
      dbName: DB_NAME,
    });
    l.info('Conexión a MongoDb exitosa');
  } catch (error) {
    l.error(error);
  }
}
