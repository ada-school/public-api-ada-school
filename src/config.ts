/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export const config = {
  ADA_PUBLIC_API_KEY: process.env.ADA_PUBLIC_API_KEY || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 7000,
  ADA_LXP_URL: process.env.ADA_LXP_URL || "https://localhost:4000/graphql",
  MONGO_DB_URI:
    process.env.MONGO_DB_URI ||
    "mongodb://localhost:27017/public-api-ada-school",
  WORKERS: process.env.WEB_CONCURRENCY || 1,
  JWT_SECRET: process.env.JWT_SECRET || "test-secret",
  CRON_JOB_API_KEY: process.env.CRON_JOB_API_KEY || "cron-job-secret",
};
