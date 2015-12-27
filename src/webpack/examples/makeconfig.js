import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NyanProgressPlugin from 'nyan-progress-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-plugin-notifier';

import getServerIP from '../../getServerIP';
import getWebpackCommon from '../getCommon';

const serverIP = getServerIP();

let devtools = process.env.CONTINUOUS_INTEGRATION
  ? 'inline-source-map'
  // cheap-module-eval-source-map, because we want original source, but we don't
  // care about columns, which makes this devtool faster than eval-source-map.
  // http://webpack.github.io/docs/configuration.html#devtool
  : 'cheap-module-eval-source-map';

/**
 *
 * @param {Array} configs
 * @returns {Array}
 */
function buildHtmlPlugins(configs) {
  return configs.map(item => {
    return new HtmlWebpackPlugin(item);
  });
}

export default function (isDevelopment, config) {
  let outputPath = path.resolve(config.example.dist);
  let {port} = config.example;
  let entry = {};
  let htmlPlugins = buildHtmlPlugins(config.example.html);

  Object.keys(config.example.entry).forEach(name => {
    let entryPath = config.example.entry[name];
    entry[name] = isDevelopment ? [
      `webpack-dev-server/client?http://${serverIP}:${port}`,
      // Why only-dev-server instead of dev-server:
      // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
      'webpack/hot/only-dev-server',
      entryPath
    ] : [entryPath];
  });

  return {
    entry: entry,

    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',

    output: isDevelopment ? {
      path: outputPath,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIP}:${port}/`
    } : {
      path: outputPath,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js'
    },

    resolveLoader: getWebpackCommon.getResolveLoader(),
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: isDevelopment ? ['react-hot', 'babel-loader'] : ['babel-loader']
      }].concat(getWebpackCommon.getLoaders())
        .concat(getWebpackCommon.getCssLoaders(isDevelopment))
    },

    postcss: getWebpackCommon.getPostcssConfig,

    plugins: (function () {
      let plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.$': 'jquery',
          'window.jQuery': 'jquery'
        }),
        ...htmlPlugins
      ];
      if (isDevelopment) {
        plugins.push(
          WebpackNotifierPlugin,
          new webpack.HotModuleReplacementPlugin()
        );
      } else {
        plugins.push(
          // Render styles into separate cacheable file to prevent FOUC and
          // optimize for critical rendering path.
          new ExtractTextPlugin('[name].css', {
            allChunks: true
          }),
          new NyanProgressPlugin(),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
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
          })
        );
      }
      return plugins;
    })(),
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules', 'web_modules'],
      alias: config.alias
    }
  };
}
