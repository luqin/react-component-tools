import webpack from 'webpack';
import yargs from 'yargs';

import getCommon from './getCommon';

export const options = yargs
    .alias('p', 'optimize-minimize')
    .alias('d', 'debug')
    // .option('port', {
    //    default: '8080',
    //    type: 'string'
    // })
    .argv;

export const jsLoader = 'babel?cacheDirectory';

const baseConfig = {
    entry: undefined,

    output: undefined,

    externals: undefined,

    resolveLoader: getCommon.getResolveLoader(),

    module: {
        loaders: [
            { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
            }
        })
    ]
};

if (options.optimizeMinimize) {
    baseConfig.devtool = 'source-map';
}

export default baseConfig;