'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

exports['default'] = function (webpackConfig) {
    return function (callback) {
        (0, _webpack2['default'])(webpackConfig, function (fatalError, stats) {
            var jsonStats = stats.toJson();

            // We can save jsonStats to be analyzed with
            // http://webpack.github.io/analyse or
            // https://github.com/robertknight/webpack-bundle-size-analyzer.
            // let fs = require('fs');
            // fs.writeFileSync('./bundle-stats.json', JSON.stringify(jsonStats));

            var buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

            if (buildError) {
                throw new _gulpUtil2['default'].PluginError('webpack', buildError);
            }

            _gulpUtil2['default'].log('[webpack]', stats.toString({
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            }));

            callback();
        });
    };
};

module.exports = exports['default'];