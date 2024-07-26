module.exports = {
    testMatch: ['**/e2e/**/*.spec.(ts|js)'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testEnvironment: 'node'
  };
  