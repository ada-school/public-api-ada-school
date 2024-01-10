import pino from 'pino';
import { APP_ID, LOG_LEVEL } from '../config';
const l = pino({
  name: APP_ID,
  level: LOG_LEVEL,
});

export default l;
