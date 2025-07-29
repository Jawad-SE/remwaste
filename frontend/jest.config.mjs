import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/src/SetupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
    testPathIgnorePatterns: [
    "/node_modules/",
    "/e2e/",
    "/src/tests/e2e/",
  ],
};

export default createJestConfig(customJestConfig);
