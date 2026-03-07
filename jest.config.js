module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/config/migrate.js'
  ],
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 10000
};
