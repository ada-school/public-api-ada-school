import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  // collectCoverage: true,
  // coverageDirectory: 'coverage',
  // coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  // silent: true,
  verbose: true,
  detectOpenHandles: true,
};

export default config;
