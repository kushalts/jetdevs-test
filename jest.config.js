import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 25,
      lines: 25,
      statements: 25,
    },
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts', '*.test.ts', '*/*.test.ts'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

export default config;
