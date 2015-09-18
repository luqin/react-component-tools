let git = require('gulp-git');
let deploy = require('gulp-gh-pages');

module.exports = function (gulp, config) {
    gulp.task('publish:tag', function (done) {
        let pkg = JSON.parse(require('fs').readFileSync('./package.json'));
        let v = 'v' + pkg.version;
        let message = 'Release ' + v;

        git.tag(v, message, function (err) {
            if (err) throw err;

            git.push('origin', v, function (err) {
                if (err) throw err;
                done();
            });
        });
    });

    gulp.task('publish:npm', function (done) {
        require('child_process')
            .spawn('npm', ['publish'], { stdio: 'inherit' })
            .on('close', done);
    });

    gulp.task('publish:cnpm', function (done) {
        require('child_process')
            .spawn('cnpm', ['publish'], { stdio: 'inherit' })
            .on('close', done);
    });

    let releaseTasks = ['publish:tag', 'publish:npm'];

    if (config.example) {
        gulp.task('publish:examples', ['build:examples'], function () {
            return gulp.src(config.example.dist + '/**/*').pipe(deploy());
        });

        releaseTasks.push('publish:examples');
    }

    gulp.task('release', releaseTasks);
};
