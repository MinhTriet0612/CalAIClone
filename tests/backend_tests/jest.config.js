const path = require('path');

const backendDir = path.resolve(__dirname, '../../backend');

/** @type {import('jest').Config} */
module.exports = {
  displayName: 'backend-unit',
  rootDir: path.resolve(__dirname, '../../'),
  testMatch: ['<rootDir>/tests/backend_tests/unit/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': [require.resolve(path.join(backendDir, 'node_modules/ts-jest')), {
      tsconfig: path.join(backendDir, 'tsconfig.json'),
    }],
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', path.join(backendDir, 'node_modules')],
  collectCoverageFrom: [
    'backend/src/**/*.ts',
    '!backend/src/main.ts',
    '!backend/src/**/*.module.ts',
    '!backend/src/**/*.dto.ts',
    '!backend/src/**/*.decorator.ts',
  ],
  coverageDirectory: 'tests/backend_tests/coverage',
};
