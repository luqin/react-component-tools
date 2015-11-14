import connect from 'gulp-connect';
import gutil from 'gulp-util';

export default function (gulp, config) {
  let {port} = config.devServer;

  gulp.task('dev:server:examples', function () {
    let serverConfig = {
      root: config.example.dist,
      // fallback: path.join(config.example.dist, 'index.html'),
      port: port,
      livereload: true,
    };
    connect.server(serverConfig);

    gutil.log('[gulp-connect]', '\r\n', gutil.colors.green(JSON.stringify(serverConfig, null, 2)));
  });

  gulp.task('dev:server:openBrowser', function () {
    require('child_process').exec(`start http://localhost:${port}/`);
  });

  let devTasks = ['dev:server:examples', 'watch:examples'];
  if (config.devServer.openBrowser) {
    devTasks.push('dev:server:openBrowser');
  }

  gulp.task('dev', devTasks);
}
