//comenté la linea para poder hacer el commit, debido a que .husky no me permitia realizar el commit "porque no se usa express"
// import * as express from 'express';

declare namespace Express {
  export interface Request {
    user: { id: string };
  }
}
