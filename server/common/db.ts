import './env';
import { connect } from 'mongoose';
import log from './logger';
import { DB_NAME, MONGO_URI } from '../config';

export default async function () {
  try {
    await connect(MONGO_URI, {
      dbName: DB_NAME,
    });
    log.info('Conexión a MongoDb exitosa');
  } catch (error) {
    log.error(error);
  }
}
