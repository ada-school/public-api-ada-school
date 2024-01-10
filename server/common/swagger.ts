import path from 'path';
import middleware from 'swagger-express-middleware';
import { Application } from 'express';
import errorHandler from '../todo-api/middlewares/error.handler';
import { SWAGGER_API_SPEC, SESSION_SECRET, REQUEST_LIMIT } from '../config';
export default function (
  app: Application,
  routes: (app: Application) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    middleware(
      path.join(__dirname, 'api.yml'),
      app,
      function (err: Error, middleware) {
        if (err) {
          return reject(err);
        }

        app.use(middleware.metadata());
        app.use(
          middleware.files(app, {
            apiPath: SWAGGER_API_SPEC,
          })
        );

        app.use(
          middleware.parseRequest({
            // Configure the cookie parser to use secure cookies
            cookie: {
              secret: SESSION_SECRET,
            },
            // Don't allow JSON content over 100kb (default is 1mb)
            json: {
              limit: REQUEST_LIMIT,
            },
          })
        );

        // These two middleware don't have any options (yet)
        app.use(middleware.CORS(), middleware.validateRequest());

        routes(app);

        // eslint-disable-next-line no-unused-vars, no-shadow
        app.use(errorHandler);

        resolve();
      }
    );
  });
}
