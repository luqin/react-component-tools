'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpLess = require('gulp-less');

var _gulpLess2 = _interopRequireDefault(_gulpLess);

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _gulpMinifyCss = require('gulp-minify-css');

var _gulpMinifyCss2 = _interopRequireDefault(_gulpMinifyCss);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpSize = require('gulp-size');

var _gulpSize2 = _interopRequireDefault(_gulpSize);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDistConfig = require('../webpack/dist.config');

var _webpackDistConfig2 = _interopRequireDefault(_webpackDistConfig);

exports['default'] = function (gulp, config) {
  gulp.task('clean:dist', _del2['default'].bind(null, config.component.dist));

  gulp.task('build:dist:scripts', function (cb) {
    var webpackConfig = _extends({}, _webpackDistConfig2['default'], {
      entry: _defineProperty({}, config.component.pkgName, config.component.entry),

      output: {
        path: config.component.dist,
        filename: '[name].js',
        library: config.component.name,
        libraryTarget: 'umd'
      },

      devtool: 'source-map',

      externals: config.component.dependencies
    });

    (0, _webpack2['default'])(webpackConfig, function (err, stats) {
      if (err) {
        throw new _gulpUtil2['default'].PluginError('build:dist:scripts', err);
      }
      _gulpUtil2['default'].log('[build:dist:scripts]', stats.toString({
        colors: true
      }));

      cb();
    });
  });

  var buildTasks = ['build:dist:scripts'];

  if (config.component.less) {
    gulp.task('build:dist:less', function () {
      var dist = config.component.dist;
      return gulp.src(config.component.less).pipe(_gulpSourcemaps2['default'].init()).pipe((0, _gulpLess2['default'])()).pipe((0, _gulpRename2['default'])(config.component.pkgName + '.css')).pipe(_gulpSourcemaps2['default'].write('./')).pipe(gulp.dest(dist)).pipe((0, _gulpRename2['default'])(config.component.pkgName + '.min.css')).pipe((0, _gulpMinifyCss2['default'])()).pipe(gulp.dest(dist)).pipe((0, _gulpSize2['default'])({ title: 'build:dist:less' }));
    });
    buildTasks.push('build:dist:less');
  }

  function buildScss(src, dist, title) {
    return gulp.src(src).pipe(_gulpSourcemaps2['default'].init()).pipe((0, _gulpSass2['default'])()).pipe((0, _gulpRename2['default'])(config.component.pkgName + '.css')).pipe(_gulpSourcemaps2['default'].write('./')).on('error', console.error.bind(console)) // eslint-disable-line no-console
    .pipe(gulp.dest(dist)).pipe((0, _gulpRename2['default'])(config.component.pkgName + '.min.css')).pipe((0, _gulpMinifyCss2['default'])()).pipe(gulp.dest(dist)).pipe((0, _gulpSize2['default'])({ title: title }));
  }

  if (config.component.scss) {
    gulp.task('build:dist:scss', function () {
      return buildScss(config.component.scss, config.component.dist, 'build:dist:scss');
    });
    buildTasks.push('build:dist:scss');
  }

  gulp.task('build:dist', ['clean:dist'], function (cb) {
    (0, _runSequence2['default'])(buildTasks, cb);
  });
};

module.exports = exports['default'];