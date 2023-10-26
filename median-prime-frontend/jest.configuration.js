
module.exports = {
  presets: [
    'ts-jest',
    '@babel/preset-env',
    '@babel/preset-react',
  ],

  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ['median-prime-frontend/src/setupTests.ts'],
};

