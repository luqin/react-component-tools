import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NyanProgressPlugin from 'nyan-progress-webpack-plugin';
import path from 'path';
let cwd = process.cwd();

import NotifyPlugin from './NotifyPlugin';
import getWebpackCommon from '../getCommon';

let devtools = process.env.CONTINUOUS_INTEGRATION
    ? 'inline-source-map'
    // cheap-module-eval-source-map, because we want original source, but we don't
    // care about columns, which makes this devtool faster than eval-source-map.
    // http://webpack.github.io/docs/configuration.html#devtool
    : 'cheap-module-eval-source-map';

export default function (isDevelopment, config) {
    let entryPath = config.example.src + '/' + config.example.script;
    let outputPath = path.resolve(config.example.dist);

    let port = config.devServer.webpackDevServerPort;
    return {
        cache: isDevelopment,
        debug: isDevelopment,
        devtool: isDevelopment ? devtools : '',

        entry: {
            app: isDevelopment ? [
                `webpack-dev-server/client?http://localhost:${port}`,
                // Why only-dev-server instead of dev-server:
                // https://github.com/webpack/webpack/issues/418#issuecomment-54288041
                'webpack/hot/only-dev-server',
                entryPath
            ] : [entryPath]
        },

        output: isDevelopment ? {
            path: outputPath,
            filename: '[name].js',
            chunkFilename: '[name]-[chunkhash].js',
            publicPath: `http://localhost:${port}/dist/`
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
            }].concat(getWebpackCommon.getLoaders()).concat(getWebpackCommon.getCssLoaders(isDevelopment))
        },
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
                })
            ];
            if (isDevelopment) {
                plugins.push(
                    NotifyPlugin,
                    new webpack.HotModuleReplacementPlugin()
                );
            } else {
                plugins.push(
                    // Render styles into separate cacheable file to prevent FOUC and
                    // optimize for critical rendering path.
                    new ExtractTextPlugin('app.css', {
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
            modulesDirectories: ['node_modules', 'web_modules']
        }
    };
}
