import express from "express";
import asyncHandler from "express-async-handler";
import { AsyncHandler } from "./AsyncHandler";
import { TodoDBModel } from "./apis/todos/TodoDBModel";
import { DateTime } from "luxon";
import { HTTPError } from "./HTTPError";

const router = express.Router();

const executeCron: AsyncHandler = async (req, res) => {
  const old = DateTime.now().minus({ days: 10 });

  try {
    await TodoDBModel.deleteMany({ createdAt: { $lt: old.toJSDate() } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error executing cronjob", err);
    throw new HTTPError({
      status: 500,
      message: "Error executing cronjob",
      module: "System.cronjob",
    });
  }

  return res.status(200).send({
    message: "Cron job executed successfully",
    data: null,
  });
};

router.post("/", asyncHandler(executeCron));

export default router;
