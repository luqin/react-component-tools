'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _gulpBump = require('gulp-bump');

var _gulpBump2 = _interopRequireDefault(_gulpBump);

exports['default'] = function (gulp, config) {
    // eslint-disable-line no-unused-vars
    function getBumpTask(type) {
        return function () {
            return gulp.src(['./package.json', './bower.json']).pipe((0, _gulpBump2['default'])({ type: type })).pipe(gulp.dest('./'));
        };
    }

    gulp.task('bump', getBumpTask('patch'));
    gulp.task('bump:minor', getBumpTask('minor'));
    gulp.task('bump:major', getBumpTask('major'));
};

module.exports = exports['default'];