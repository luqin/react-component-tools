'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

exports['default'] = function (gulp, config) {
  var port = config.example.port;

  gulp.task('dev:openBrowser', function () {
    (0, _open2['default'])('http://localhost:' + port + '/');
    _gulpUtil2['default'].log('open: ' + ('http://localhost:' + port + '/'));
  });

  var devTasks = ['watch:examples'];
  if (config.example.openBrowser) {
    devTasks.push('dev:openBrowser');
  }

  gulp.task('dev', devTasks);
};

module.exports = exports['default'];