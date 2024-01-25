import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  detectOpenHandles: true,
};

export default config;
