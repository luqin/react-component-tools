'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

exports['default'] = function (webpackConfig, serverConfig) {
  var port = serverConfig.port;

  var serverIp = _ip2['default'].address();
  return function (callback) {
    new _webpackDevServer2['default']((0, _webpack2['default'])(webpackConfig), {
      contentBase: '../build',
      hot: true,
      publicPath: webpackConfig.output.publicPath,
      // Unfortunately quiet swallows everything even error so it can't be used.
      quiet: false,
      // No info filters only initial compilation it seems.
      noInfo: false,
      // Remove console.log mess during watch.
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
      }
      // Why '0.0.0.0' and 'localhost'? Because it works for remote machines.
      // https://github.com/webpack/webpack-dev-server/issues/151#issuecomment-104643642
    }).listen(port, '0.0.0.0', function (err) {
      // Callback is called only once, can't be used to catch compilation errors.
      if (err) {
        throw new _gulpUtil2['default'].PluginError('webpack-dev-server', err);
      }
      _gulpUtil2['default'].log('[webpack-dev-server]', serverIp + ':' + port + '/dist/app.js');

      callback();
    });
  };
};

module.exports = exports['default'];