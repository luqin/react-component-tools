'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpConnect = require('gulp-connect');

var _gulpConnect2 = _interopRequireDefault(_gulpConnect);

var _gulpReplace = require('gulp-replace');

var _gulpReplace2 = _interopRequireDefault(_gulpReplace);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackExamplesMakeconfig = require('../webpack/examples/makeconfig');

var _webpackExamplesMakeconfig2 = _interopRequireDefault(_webpackExamplesMakeconfig);

var _webpackExamplesBuild = require('../webpack/examples/build');

var _webpackExamplesBuild2 = _interopRequireDefault(_webpackExamplesBuild);

var _webpackExamplesDevserver = require('../webpack/examples/devserver');

var _webpackExamplesDevserver2 = _interopRequireDefault(_webpackExamplesDevserver);

var cwd = process.cwd();

module.exports = function (gulp, config) {
    var exampleConfig = config.example;
    var port = config.devServer.webpackDevServerPort;

    gulp.task('clean:examples', _del2['default'].bind(null, exampleConfig.dist));

    function replaceHTMLResource(config) {
        return gulp.src(config.src).pipe((0, _gulpReplace2['default'])('<%= js %>', config.js)).pipe((0, _gulpReplace2['default'])('<%= links %>', config.links)).pipe(gulp.dest(config.dist)).pipe(_gulpConnect2['default'].reload());
    }

    gulp.task('build:example:index', function () {
        return replaceHTMLResource({
            src: exampleConfig.src + '/' + exampleConfig.index,
            dist: exampleConfig.dist,
            js: './app.js',
            links: '<link href="./app.css" rel="stylesheet" type="text/css"/>'
        }).pipe(_gulpConnect2['default'].reload());
    });

    gulp.task('watch:example:index', function () {
        return replaceHTMLResource({
            src: exampleConfig.src + '/' + exampleConfig.index,
            dist: exampleConfig.dist,
            js: 'http://localhost:' + port + '/dist/app.js',
            links: ''
        }).pipe(_gulpConnect2['default'].reload());
    });

    gulp.task('build:example:files', function () {
        return gulp.src(exampleConfig.files, { cwd: exampleConfig.src, base: exampleConfig.src }).pipe(gulp.dest(exampleConfig.dist)).pipe(_gulpConnect2['default'].reload());
    });

    gulp.task('build:example:scripts', (0, _webpackExamplesBuild2['default'])((0, _webpackExamplesMakeconfig2['default'])(false, config)));
    gulp.task('watch:example:scripts', (0, _webpackExamplesDevserver2['default'])((0, _webpackExamplesMakeconfig2['default'])(true, config), { port: port }));

    gulp.task('build:examples', ['build:example:index', 'build:example:files', 'build:example:scripts']);

    gulp.task('watch:examples', ['watch:example:index', 'build:example:files', 'watch:example:scripts'], function () {
        // files
        gulp.watch(exampleConfig.files.map(function (i) {
            return exampleConfig.src + '/' + i;
        }), ['build:example:files']);
        // index
        gulp.watch(exampleConfig.src + '/' + exampleConfig.index, ['watch:example:index']);
    });
};