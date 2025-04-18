const config = require('../jest.config');

describe('jest.config.js', () => {
  it('should export a configuration object', () => {
    expect(config).toBeInstanceOf(Object);
  });

  it('should have the "preset" property', () => {
    expect(config).toHaveProperty('preset');
    expect(config.preset).not.toBeNull();
    expect(config.preset).not.toBeUndefined();
  });

  it('should have the "testEnvironment" property', () => {
    expect(config).toHaveProperty('testEnvironment');
    expect(config.testEnvironment).not.toBeNull();
    expect(config.testEnvironment).not.toBeUndefined();
  });

  it('should have the "moduleDirectories" property', () => {
    expect(config).toHaveProperty('moduleDirectories');
    expect(config.moduleDirectories).not.toBeNull();
    expect(config.moduleDirectories).not.toBeUndefined();
  });

  it('should have the "setupFilesAfterEnv" property', () => {
    expect(config).toHaveProperty('setupFilesAfterEnv');
    expect(config.setupFilesAfterEnv).not.toBeNull();
    expect(config.setupFilesAfterEnv).not.toBeUndefined();
  });

  it('should have the "transform" property', () => {
    expect(config).toHaveProperty('transform');
    expect(config.transform).not.toBeNull();
    expect(config.transform).not.toBeUndefined();
  });

  it('should have the "transformIgnorePatterns" property', () => {
    expect(config).toHaveProperty('transformIgnorePatterns');
    expect(config.transformIgnorePatterns).not.toBeNull();
    expect(config.transformIgnorePatterns).not.toBeUndefined();
  });
});