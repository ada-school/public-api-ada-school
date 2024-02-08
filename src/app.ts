import express from "express";
import { HTTPError } from "./HTTPError";
import todosAPI from "./apis/todos/todosAPI";
import { authorize } from "./middlewares/authorize";

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

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/api/v1/todos", authorize, todosAPI);

  app.use("*", () => {
    throw new HTTPError({
      status: 404,
      message: "Not Found",
    });
  });

  app.use(jsonErrorHandler);

  return app;
};
