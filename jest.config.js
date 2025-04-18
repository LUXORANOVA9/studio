/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  // moduleNameMapper: {
  //   // Handle CSS imports (if you use them)
  //   '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  //
  //   // Handle CSS imports (without CSS modules)
  //   '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  //
  //   // Handle image imports
  //   // https://jestjs.io/docs/webpack#handling-static-assets
  //   '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,
  //
  //   // Handle module aliases (if you have them in tsconfig.json)
  //   '^@/(.*)$': '<rootDir>/src/$1',
  //   '^@/components/(.*)$': '<rootDir>/src/components/$1', // Adjust if your components path is different
  // },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: for setup files
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\.module\.(css|sass|scss)$',
  ],
};
