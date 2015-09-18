'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports['default'] = {
    getResolveLoader: function getResolveLoader() {
        return {
            root: _path2['default'].join(__dirname, '../../node_modules')
        };
    },

    getLoaders: function getLoaders() {
        return [{ test: /\.txt/, loader: 'file-loader?name=[path][name].[ext]' }, { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' }, { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' }, { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' }, { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }, {
            test: /\.eot/,
            loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject'
        }, { test: /\.woff2/, loader: 'url-loader?limit=100000&mimetype=application/font-woff2' }, { test: /\.woff/, loader: 'url-loader?limit=100000&mimetype=application/font-woff' }, { test: /\.ttf/, loader: 'url-loader?limit=100000&mimetype=application/font-ttf' }];
    },

    getCssLoaders: function getCssLoaders(isDevelopment) {
        var cssLoaders = {
            css: '',
            less: '!less-loader',
            scss: '!sass-loader',
            sass: '!sass-loader?indentedSyntax',
            styl: '!stylus-loader'
        };

        return _Object$keys(cssLoaders).map(function (ext) {
            var prefix = 'css-loader!autoprefixer-loader?browsers=last 2 version';
            var extLoaders = prefix + cssLoaders[ext];
            var loader = isDevelopment ? 'style-loader!' + extLoaders : ExtractTextPlugin.extract('style-loader', extLoaders);
            return {
                loader: loader,
                test: new RegExp('\\.(' + ext + ')$')
            };
        });
    }
};
module.exports = exports['default'];