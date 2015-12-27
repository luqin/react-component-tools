import gutil from 'gulp-util';
import open from 'open';

export default function (gulp, config) {
  let {port} = config.example;

  gulp.task('dev:openBrowser', function () {
    open(`http://localhost:${port}/`);
    gutil.log('open: ' + `http://localhost:${port}/`);
  });

  let devTasks = ['watch:examples'];
  if (config.example.openBrowser) {
    devTasks.push('dev:openBrowser');
  }

  gulp.task('dev', devTasks);
}
