import del from 'del';
import gutil from 'gulp-util';
import less from 'gulp-less';
import sass from 'gulp-sass';
import minifyCSS from 'gulp-minify-css';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import gsize from 'gulp-size';
import runSequence from 'run-sequence';
import webpack from 'webpack';

import baseConfig from '../webpack/dist.config';

export default function (gulp, config) {
  gulp.task('clean:dist', del.bind(null, config.component.dist));

  gulp.task('build:dist:scripts', function (cb) {
    let webpackConfig = Object.assign({}, baseConfig, {
      entry: {
        [config.component.pkgName]: config.component.entry
      },

      output: {
        path: config.component.dist,
        filename: '[name].js',
        library: config.component.name,
        libraryTarget: 'umd'
      },

      devtool: 'source-map',

      externals: config.component.dependencies
    });

    webpack(webpackConfig, function (err, stats) {
      if (err) {
        throw new gutil.PluginError('build:dist:scripts', err);
      }
      gutil.log('[build:dist:scripts]', stats.toString({
        colors: true
      }));

      cb();
    });
  });

  let buildTasks = ['build:dist:scripts'];

  if (config.component.less) {
    gulp.task('build:dist:less', function () {
      let dist = config.component.dist;
      return gulp.src(config.component.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(rename(config.component.pkgName + '.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dist))
        .pipe(rename(config.component.pkgName + '.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(dist));
    });
    buildTasks.push('build:dist:less');
  }

  function buildScss(src, dist, title) {
    return gulp.src(src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(rename(config.component.pkgName + '.css'))
      .pipe(sourcemaps.write('./'))
      .on('error', console.error.bind(console)) // eslint-disable-line no-console
      .pipe(gulp.dest(dist))
      .pipe(rename(config.component.pkgName + '.min.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest(dist))
      .pipe(gsize({ title: title }));
  }

  if (config.component.scss) {
    gulp.task('build:dist:scss', function () {
      return buildScss(config.component.scss, config.component.dist, 'build:dist:scss');
    });
    buildTasks.push('build:dist:scss');
  }

  gulp.task('build:dist', ['clean:dist'], function (cb) {
    runSequence(buildTasks, cb);
  });
}

