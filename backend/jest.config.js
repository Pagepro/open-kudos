module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  globals: {
    "__DEV__": true,
  },
  globalSetup: "./src/test/globalSetup.ts",
  globalTeardown: "./src/test/globalTeardown.ts",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  setupFiles: [
    'ts-node/register',
    './src/common/extensions/index.ts',
    './src/common/definitions/index.ts',
    './src/common/definitions/mongose-aggregate-paginate-v2/index.ts'
  ],
  "coverageDirectory": "./coverage/",
  "collectCoverage": true
};
