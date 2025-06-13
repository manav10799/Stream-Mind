module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
