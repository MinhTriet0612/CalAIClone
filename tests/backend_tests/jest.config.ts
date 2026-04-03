import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Config = {
  displayName: 'backend-unit',
  rootDir: path.resolve(__dirname, '../../'),
  testMatch: ['<rootDir>/tests/backend_tests/unit/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': [path.resolve(__dirname, '../../backend/node_modules/ts-jest/dist/index.js'), {
      tsconfig: path.resolve(__dirname, '../../backend/tsconfig.json'),
    }],
  },
  transformIgnorePatterns: ['/node_modules/'],
  modulePaths: [
    path.resolve(__dirname, '../../backend'),
    path.resolve(__dirname, '../../backend/node_modules')
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  collectCoverageFrom: [
    'backend/src/**/*.ts',
    '!backend/src/main.ts',
    '!backend/src/**/*.module.ts',
    '!backend/src/**/*.dto.ts',
    '!backend/src/**/*.decorator.ts',
  ],
  coverageDirectory: 'tests/backend_tests/coverage',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
