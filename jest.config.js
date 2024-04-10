/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  transform: {
    ...tsjPreset.transform,
    "^.+\\.jsx?$": "babel-jest",
  },
};

module.exports = config;
