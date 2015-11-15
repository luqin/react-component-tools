var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');

gulp.task('lib:clean', del.bind(null, './lib'));

gulp.task('lib', ['lib:clean'], function () {
  return gulp.src('./src/**/*.js')
    .pipe(babel())// auto use .babelrc
    .pipe(gulp.dest('./lib'));
});

gulp.task('watch:lib', ['lib'], function () {
  return gulp.watch('./src/**/*.js', ['lib']);
});
