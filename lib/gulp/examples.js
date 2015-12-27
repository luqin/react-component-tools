'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _gulpConnect = require('gulp-connect');

var _gulpConnect2 = _interopRequireDefault(_gulpConnect);

var _webpackExamplesMakeconfig = require('../webpack/examples/makeconfig');

var _webpackExamplesMakeconfig2 = _interopRequireDefault(_webpackExamplesMakeconfig);

var _webpackExamplesBuild = require('../webpack/examples/build');

var _webpackExamplesBuild2 = _interopRequireDefault(_webpackExamplesBuild);

var _webpackExamplesDevserver = require('../webpack/examples/devserver');

var _webpackExamplesDevserver2 = _interopRequireDefault(_webpackExamplesDevserver);

module.exports = function (gulp, config) {
  var exampleConfig = config.example;
  var port = config.example.port;

  gulp.task('clean:examples', _del2['default'].bind(null, exampleConfig.dist));

  gulp.task('build:example:files', function () {
    return gulp.src(exampleConfig.files).pipe(gulp.dest(exampleConfig.dist)).pipe(_gulpConnect2['default'].reload());
  });

  gulp.task('build:example:webpack', (0, _webpackExamplesBuild2['default'])((0, _webpackExamplesMakeconfig2['default'])(false, config)));
  gulp.task('watch:example:webpackDevServer', (0, _webpackExamplesDevserver2['default'])((0, _webpackExamplesMakeconfig2['default'])(true, config), { port: port }));

  gulp.task('build:examples', ['build:example:files', 'build:example:webpack']);

  gulp.task('watch:examples', ['build:example:files', 'watch:example:webpackDevServer'], function () {
    gulp.watch(exampleConfig.files, ['build:example:files']);
  });
};