/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import rateLimit from "express-rate-limit";
import sslRedirect from "heroku-ssl-redirect";
import mongoose from "mongoose";
import throng from "throng";
import { createApp } from "./app";
import { config } from "./config";

const isDev = config.NODE_ENV === "development";
const rateLimitWindowMs = 60 * 1000;

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

const connectMongo = () => {
  mongoose
    .set("strictQuery", false)
    .connect(config.MONGO_DB_URI)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("🗄  MongoDB connected");
      if (isDev) {
        mongoose.set("debug", true);
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("Error connecting with MongoDB", err);
      // eslint-disable-next-line no-console
      console.warn("Retrying to connect to MongoDB...");
      setTimeout(() => connectMongo(), 5000);
    });
};

const displayStartServerError = (error: any) => {
  const message: string = error.message ?? "Error starting server";
  // eslint-disable-next-line no-console
  console.error(`ADA Public API Server Error: ${message}`);
  process.exit(1);
};

const startServer = () => {
  const app = createApp();

  if (!isDev) {
    app.use(sslRedirect());
  }

  app.use(limiter);

  app.listen(config.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Ada School Public API ready at http://localhost:${config.PORT}`
    );
    // eslint-disable-next-line no-console
    console.log(`🏃 Public API server running`);
  });
};

function initServer(id: number, disconnect: () => void) {
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);

  connectMongo();

  // eslint-disable-next-line no-console
  console.log(`Starting worker: ${id}`);
  startServer();

  function shutdown() {
    // eslint-disable-next-line no-console
    console.error(`Worker ${id} shutdown`);
    disconnect();
  }
}

throng({
  count: parseInt(String(config.WORKERS)),
  worker: initServer,
}).catch(displayStartServerError);
