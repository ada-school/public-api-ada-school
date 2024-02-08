import express from "express";
import swaggerUi from "swagger-ui-express";

const router = express.Router();

export const swaggerHandler = (specs: any) =>
  router.use(swaggerUi.serve, swaggerUi.setup(specs as swaggerUi.JsonObject));
