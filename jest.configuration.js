module.exports = {
    testEnvironment: 'node', // Or 'jsdom' for browser-like environment
    testMatch: ['**/main.test.js'], // Pattern to match test files
    setupFilesAfterEnv: ['./setupTests.js'], // Additional setup files
  };