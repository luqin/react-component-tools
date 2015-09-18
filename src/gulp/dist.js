import del from 'del';
import gutil from 'gulp-util';
import less from 'gulp-less';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import gsize from 'gulp-size';
import runSequence from 'run-sequence';
import webpack from 'webpack';

import baseConfig from '../webpack/dist.config';

export default function (gulp, config) {
    gulp.task('clean:dist', del.bind(null, config.component.dist));

    gulp.task('build:dist:scripts', function (cb) {
        let webpackConfig = Object.assign({}, baseConfig, {
            entry: {
                [config.component.name]: config.component.scripts.entry
            },

            output: {
                path: config.component.dist,
                filename: '[name].js',
                library: config.component.scripts.output.library,
                libraryTarget: 'umd'
            },

            devtool: 'source-map',

            externals: config.component.scripts.externals
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

    if (config.component.less && config.component.less.entry) {
        gulp.task('build:dist:less', function () {
            return gulp.src(config.component.less.entry)
                .pipe(less())
                .pipe(gulp.dest('dist'));
        });
        buildTasks.push('build:dist:less');
    }

    function buildScss(src, dest, title) {
        return gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(rename(config.component.name + '.css'))
            .pipe(sourcemaps.write('./'))
            .on('error', console.error.bind(console))
            // .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
            .pipe(gulp.dest(dest))
            .pipe(gsize({ title: title }));
    }

    if (config.component.scss && config.component.scss.entry) {
        gulp.task('build:dist:scss', function () {
            return buildScss(config.component.scss.entry, config.component.dist, 'build:dist:scss');
        });
        buildTasks.push('build:dist:scss');
    }

    gulp.task('build:dist', ['clean:dist'], function (cb) {
        runSequence(buildTasks, cb);
    });
}

