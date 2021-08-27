/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const { withEnzyme } = require('jest-expo-enzyme');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [withEnzyme(require('jest-expo/android/jest-preset'))],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/screens/*.tsx',
    '<rootDir>/components/*.tsx'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 70
    }
  }
};
