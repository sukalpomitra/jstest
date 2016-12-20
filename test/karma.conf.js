// Karma configuration
// Generated on Tue Apr 15 2014 14:22:19 GMT+0800 (SGT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'public/js/kernel-ui/app/static/sys-param.json', included: false},
      {pattern: 'public/libs/plugins-eyeota/jquery/dist/jquery.min.js', watched: false },
      {pattern: 'public/libs/plugins-eyeota/angular/angular.js', watched: false },
      'test/test-main.js',
      {pattern: 'test/**/*spec.js', included: false},
      {pattern: 'public/js/kernel-ui/app/**/*.js', included: false},
      {pattern: 'public/js/clock-ui/app/**/*.js', included: false},
      {pattern: 'public/libs/**/*.js', included: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    proxies: {
        '/js/kernel-ui/app/static/sys-param.json': '/base/public/js/kernel-ui/app/static/sys-param.json'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
