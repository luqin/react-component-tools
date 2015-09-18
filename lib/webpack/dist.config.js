'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _getCommon = require('./getCommon');

var _getCommon2 = _interopRequireDefault(_getCommon);

var options = _yargs2['default'].alias('p', 'optimize-minimize').alias('d', 'debug')
// .option('port', {
//    default: '8080',
//    type: 'string'
// })
.argv;

exports.options = options;
var jsLoader = 'babel?cacheDirectory';

exports.jsLoader = jsLoader;
var baseConfig = {
    entry: undefined,

    output: undefined,

    externals: undefined,

    resolveLoader: _getCommon2['default'].getResolveLoader(),

    module: {
        loaders: [{ test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }]
    },

    plugins: [new _webpack2['default'].DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
        }
    })]
};

if (options.optimizeMinimize) {
    baseConfig.devtool = 'source-map';
}

exports['default'] = baseConfig;