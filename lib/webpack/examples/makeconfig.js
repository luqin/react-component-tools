'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _nyanProgressWebpackPlugin = require('nyan-progress-webpack-plugin');

var _nyanProgressWebpackPlugin2 = _interopRequireDefault(_nyanProgressWebpackPlugin);

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

var _webpackPluginNotifier = require('webpack-plugin-notifier');

var _webpackPluginNotifier2 = _interopRequireDefault(_webpackPluginNotifier);

var _getCommon = require('../getCommon');

var _getCommon2 = _interopRequireDefault(_getCommon);

var serverIp = _ip2['default'].address();

var devtools = process.env.CONTINUOUS_INTEGRATION ? 'inline-source-map'
// cheap-module-eval-source-map, because we want original source, but we don't
// care about columns, which makes this devtool faster than eval-source-map.
// http://webpack.github.io/docs/configuration.html#devtool
: 'cheap-module-eval-source-map';

exports['default'] = function (isDevelopment, config) {
  var entryPath = config.example.src + '/' + config.example.script;
  var outputPath = _path2['default'].resolve(config.example.dist);

  var port = config.devServer.webpackDevServerPort;
  return {
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',

    entry: {
      app: isDevelopment ? ['webpack-dev-server/client?http://' + serverIp + ':' + port,
      // Why only-dev-server instead of dev-server:
      // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
      'webpack/hot/only-dev-server', entryPath] : [entryPath]
    },

    output: isDevelopment ? {
      path: outputPath,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: 'http://localhost:' + port + '/dist/'
    } : {
      path: outputPath,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js'
    },

    resolveLoader: _getCommon2['default'].getResolveLoader(),
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: isDevelopment ? ['react-hot', 'babel-loader'] : ['babel-loader']
      }].concat(_getCommon2['default'].getLoaders()).concat(_getCommon2['default'].getCssLoaders(isDevelopment))
    },

    postcss: _getCommon2['default'].getPostcssConfig,

    plugins: (function () {
      var plugins = [new _webpack2['default'].DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
          IS_BROWSER: true
        }
      }), new _webpack2['default'].ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      })];
      if (isDevelopment) {
        plugins.push(_webpackPluginNotifier2['default'], new _webpack2['default'].HotModuleReplacementPlugin());
      } else {
        plugins.push(
        // Render styles into separate cacheable file to prevent FOUC and
        // optimize for critical rendering path.
        new _extractTextWebpackPlugin2['default']('app.css', {
          allChunks: true
        }), new _nyanProgressWebpackPlugin2['default'](), new _webpack2['default'].optimize.DedupePlugin(), new _webpack2['default'].optimize.OccurenceOrderPlugin(), new _webpack2['default'].optimize.UglifyJsPlugin({
          // keep_fnames prevents function name mangling.
          // Function names are useful. Seeing a readable error stack while
          // being able to programmatically analyse it is priceless. And yes,
          // we don't need infamous FLUX_ACTION_CONSTANTS with function name.
          // It's ES6 standard polyfilled by Babel.
          /* eslint-disable camelcase */
          compress: {
            keep_fnames: true,
            screw_ie8: true,
            warnings: false // Because uglify reports irrelevant warnings.
          },
          mangle: {
            keep_fnames: true
          }
          /* eslint-enable camelcase */
        }));
      }
      return plugins;
    })(),
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules', 'web_modules'],
      alias: config.example.alias
    }
  };
};

module.exports = exports['default'];