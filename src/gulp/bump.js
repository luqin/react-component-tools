import bump from 'gulp-bump';

export default function (gulp, config) { // eslint-disable-line no-unused-vars
  function getBumpTask(type) {
    let src = ['./package.json'];
    if (config.bump.bower) {
      src.push('./bower.json');
    }

    return function () {
      return gulp.src(src)
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
    };
  }

  gulp.task('bump', getBumpTask('patch'));
  gulp.task('bump:minor', getBumpTask('minor'));
  gulp.task('bump:major', getBumpTask('major'));
}
