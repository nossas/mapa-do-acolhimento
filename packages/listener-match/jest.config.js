module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
  setupFiles: ["<rootDir>/src/beforeEachTest.ts"],
  setupFilesAfterEnv: ["jest-extended"],
  modulePathIgnorePatterns: ["dist/"],
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      packageJson: "package.json"
    }
  }
};
