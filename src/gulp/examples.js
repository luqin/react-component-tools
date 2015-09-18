import del from 'del';
import gutil from 'gulp-util';
import connect from 'gulp-connect';
import replace from 'gulp-replace';
import path from 'path';
let cwd = process.cwd();

import makeWebpackConfig from '../webpack/examples/makeconfig';
import webpackBuild from '../webpack/examples/build';
import webpackDevServer from '../webpack/examples/devserver';

module.exports = function (gulp, config) {
    const exampleConfig = config.example;
    const port = config.devServer.webpackDevServerPort;

    gulp.task('clean:examples', del.bind(null, exampleConfig.dist));

    function replaceHTMLResource(config) {
        return gulp.src(config.src)
            .pipe(replace('<%= js %>', config.js))
            .pipe(replace('<%= links %>', config.links))
            .pipe(gulp.dest(config.dist))
            .pipe(connect.reload());
    }

    gulp.task('build:example:index', function () {
        return replaceHTMLResource({
            src: exampleConfig.src + '/' + exampleConfig.index,
            dist: exampleConfig.dist,
            js: './app.js',
            links: '<link href="./app.css" rel="stylesheet" type="text/css"/>'
        }).pipe(connect.reload());
    });

    gulp.task('watch:example:index', function () {
        return replaceHTMLResource({
            src: exampleConfig.src + '/' + exampleConfig.index,
            dist: exampleConfig.dist,
            js: `http://localhost:${port}/dist/app.js`,
            links: ''
        }).pipe(connect.reload());
    });

    gulp.task('build:example:files', function () {
        return gulp.src(exampleConfig.files, { cwd: exampleConfig.src, base: exampleConfig.src })
            .pipe(gulp.dest(exampleConfig.dist))
            .pipe(connect.reload());
    });

    gulp.task('build:example:scripts', webpackBuild(makeWebpackConfig(false, config)));
    gulp.task('watch:example:scripts', webpackDevServer(makeWebpackConfig(true, config), { port }));

    gulp.task('build:examples', [
        'build:example:index',
        'build:example:files',
        'build:example:scripts'
    ]);

    gulp.task('watch:examples', [
        'watch:example:index',
        'build:example:files',
        'watch:example:scripts'
    ], function () {
        // files
        gulp.watch(exampleConfig.files.map(i=> exampleConfig.src + '/' + i), ['build:example:files']);
        // index
        gulp.watch(exampleConfig.src + '/' + exampleConfig.index, ['watch:example:index']);
    });
};
