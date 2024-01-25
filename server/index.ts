import MongoDbConnection from './common/db';
import Server from './common/server';
import routes from './routes';
import log from './common/logger';
import { PORT } from './config';


const startServer = (async () => {
  try {
    await MongoDbConnection();
    const port = parseInt(PORT ?? '3000');
    new Server().router(routes).listen(port);
  } catch (error) {
    log.error(error);
  }
})();
export default startServer;
