import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import log from './logger';
import { REQUEST_LIMIT, SESSION_SECRET, NODE_ENV } from '../config';
import errorHandler from './error.handler';
// import * as OpenApiValidator from 'express-openapi-validator';

export default class ExpressServer {
  private server?: http.Server;
  private routes: (app: Application) => void;
  private app: Application;
  constructor() {
    const app = express();
    this.app = app;
    const root = path.normalize(__dirname + '/../..');
    app.use(bodyParser.json({ limit: REQUEST_LIMIT }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: REQUEST_LIMIT,
      })
    );
    app.use(bodyParser.text({ limit: REQUEST_LIMIT }));
    app.use(cookieParser(SESSION_SECRET));
    app.use(express.static(`${root}/public`));

    // const apiSpec = path.join(__dirname, 'api.yml');
    // const validateResponses = !!(
    //   OPENAPI_ENABLE_RESPONSE_VALIDATION &&
    //   OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    // );
    // app.use(OPENAPI_SPEC || '/spec', express.static(apiSpec));
    // app.use(
    //   OpenApiValidator.middleware({
    //     apiSpec,
    //     validateResponses,
    //     ignorePaths: /.*\/spec(\/|$)/,
    //   })
    // );
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(this.app);
    this.app.use(errorHandler);
    return this;
  }

  listen(port: number): void {
    const welcome = (p: number) => (): void =>
      log.info(
        `up and running in ${NODE_ENV} @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(this.app).listen(port, welcome(port));
  }
  getApp(): Application {
    return this.app;
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}
