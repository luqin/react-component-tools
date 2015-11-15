import gulp from 'gulp';
import '../gulpfile';

process.env.NODE_ENV = 'production';
gulp.start('build', function () {
  gulp.start('build:examples', function () {
    console.info('success');
  });
});

