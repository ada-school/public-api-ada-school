import './common/env';

export const OPENAPI_SPEC: string = process.env.OPENAPI_SPEC || '/api/v1/spec';
export const SESSION_SECRET: string = process.env.SESSION_SECRET || 'mySecret';
export const APP_ID: string = process.env.APP_ID || 'public-api-ada-school';
export const REQUEST_LIMIT: string = process.env.REQUEST_LIMIT || '100kb';
export const SWAGGER_API_SPEC: string = './server/common/api.yaml'; //temporal
export const LOG_LEVEL: string = process.env.LOG_LEVEL || 'debug';
export const OPENAPI_ENABLE_RESPONSE_VALIDATION: string = 'TRUE';
export const DB_NAME: string = process.env.DB_NAME || 'api-ada';
export const PORT: string = process.env.PORT || '3000';
export const NODE_ENV: string = 'development';
export const MONGO_URI: string =
  process.env.MONGO_URI || 'mongodb://localhost:27017';
export const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';
