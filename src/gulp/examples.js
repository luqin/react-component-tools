import del from 'del';
import connect from 'gulp-connect';

import makeWebpackConfig from '../webpack/examples/makeconfig';
import webpackBuild from '../webpack/examples/build';
import webpackDevServer from '../webpack/examples/devserver';

module.exports = function (gulp, config) {
  let exampleConfig = config.example;
  let {port} = config.example;

  gulp.task('clean:examples', del.bind(null, exampleConfig.dist));

  gulp.task('build:example:files', function () {
    return gulp.src(exampleConfig.files)
      .pipe(gulp.dest(exampleConfig.dist))
      .pipe(connect.reload());
  });

  gulp.task('build:example:webpack', webpackBuild(makeWebpackConfig(false, config)));
  gulp.task('watch:example:webpackDevServer', webpackDevServer(makeWebpackConfig(true, config), {port}));

  gulp.task('build:examples', [
    'build:example:files',
    'build:example:webpack'
  ]);

  gulp.task('watch:examples', [
    'build:example:files',
    'watch:example:webpackDevServer'
  ], function () {
    gulp.watch(exampleConfig.files, ['build:example:files']);
  });
};
