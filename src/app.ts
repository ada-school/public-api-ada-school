import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { HTTPError } from "./HTTPError";
import todoDocs from "./apis/todos/todos.swagger.json";
import todosAPI from "./apis/todos/todosAPI";
import cronjob from "./cronjob";
import { authorize } from "./middlewares/authorize";
import { swaggerHandler } from "./swaggerHandler";
import { authorizeAPIKey } from "./middlewares/authorizeApiKey";

const rateLimitWindowMs = 60 * 1000;
const numberOfProxies = 3;

const limiter = rateLimit({
  windowMs: rateLimitWindowMs,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    // eslint-disable-next-line no-console
    console.error("API rate limit exceeded");
    res.status(429).send({
      error: "Too many requests, please try again later.",
      data: null,
    });
  },
});

const jsonErrorHandler = (
  err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  // eslint-disable-next-line no-console
  console.error("Server error:", err);

  if (err instanceof HTTPError) {
    res.status(err.status).send({
      error: err.message,
      status: err.status,
      errors: err.errors,
    });
  } else {
    res.status(500).send({ error: err.message, status: 500 });
  }
};

export const createApp = () => {
  const app = express();

  app.set("trust proxy", numberOfProxies);

  app.use(helmet());
  app.use(limiter);
  app.use(cors({ origin: "*" }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/api/v1/todos", authorize, todosAPI);
  app.use("/system/cronjob", authorizeAPIKey, cronjob);
  app.use("/docs/v1/todos", swaggerHandler(todoDocs));

  app.use("*", () => {
    throw new HTTPError({
      status: 404,
      message: "Not Found",
    });
  });

  app.use(jsonErrorHandler);

  return app;
};
