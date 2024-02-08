/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov"],
  testMatch: ["**/?(*.)+(test).ts"],
  testTimeout: 15 * 1000,
  reporters: [
    ["github-actions", { silent: false }],
    "jest-silent-reporter",
    "summary",
  ],
};

module.exports = config;
