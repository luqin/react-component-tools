'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _gulpConnect = require('gulp-connect');

var _gulpConnect2 = _interopRequireDefault(_gulpConnect);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

exports['default'] = function (gulp, config) {
  var port = config.devServer.port;

  gulp.task('dev:server:examples', function () {
    var serverConfig = {
      root: config.example.dist,
      // fallback: path.join(config.example.dist, 'index.html'),
      port: port,
      livereload: true
    };
    _gulpConnect2['default'].server(serverConfig);

    _gulpUtil2['default'].log('[gulp-connect]', '\r\n', _gulpUtil2['default'].colors.green(JSON.stringify(serverConfig, null, 2)));
  });

  gulp.task('dev:server:openBrowser', function () {
    require('child_process').exec('start http://localhost:' + port + '/');
  });

  var devTasks = ['dev:server:examples', 'watch:examples'];
  if (config.devServer.openBrowser) {
    devTasks.push('dev:server:openBrowser');
  }

  gulp.task('dev', devTasks);
};

module.exports = exports['default'];