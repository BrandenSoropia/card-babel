/**
 * Note: Uses require/module.exports to make jest happy.
 *
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const nextJest = require("next/jest.js");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],
  setupFilesAfterEnv: ["./jest.setup.js"],
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
};

module.exports = createJestConfig(config);
