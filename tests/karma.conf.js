// Karma configuration.
module.exports = function (config) {
  config.set({
    basePath: '../',
    browserConsoleLogOptions: {
      level: 'log',
      terminal: true
    },
    browserify: {
      debug: true,
      paths: ['./']
    },
    browsers: ['ChromeDebugging'],
    client: {
      captureConsole: true,
      mocha: {
        ui: 'tdd',
        bail: true
      }
    },
    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9222']
      }
    },
    envPreprocessor: ['TEST_ENV'],
    files: [
      // Define test files.
      { pattern: 'tests/**/*.test.js' },
    ],
    frameworks: ['mocha', 'sinon-chai', 'chai-shallow-deep-equal', 'browserify'],
    preprocessors: { 'tests/**/*.js': ['browserify', 'env'] },
    reporters: ['mocha']
  });
};