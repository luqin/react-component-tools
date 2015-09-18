import defaults from 'defaults';
import capitalize from  'capitalize';
import camelCase from 'camelcase';
import yargs from 'yargs';
import gutil from 'gulp-util';
import _ from 'lodash';
import invariant from 'fbjs/lib/invariant';

// Extract package.json metadata
function readPackageJSON() {
    let pkg = JSON.parse(require('fs').readFileSync('./package.json'));
    let dependencies = [];
    pkg.dependencies && dependencies.push(Object.keys(pkg.dependencies));
    pkg.peerDependencies && dependencies.push(Object.keys(pkg.peerDependencies));

    return {
        name: pkg.name,
        deps: dependencies
    };
}

/**
 * This package exports a function that binds tasks to a gulp instance
 * based on the provided config.
 */
function initTasks(gulp, config) {
    const args = yargs
        .alias('p', 'production')
        .argv;


    let pkg = readPackageJSON();
    let name = capitalize(camelCase(config.component.pkgName || pkg.name));

    // component
    config.component = Object.assign({
        pkgName: pkg.name,
        dependencies: pkg.deps,
        name: name,
        dist: './dist',
        scripts: {
            entry: './src/index.js',
            output: {
                library: name
            }
        }
    }, config.component);

    // devServer
    let defaultDevServer = {
        port: 3000,
        webpackDevServerPort: 8888,
        openBrowser: true
    };
    if (config.devServer) {
        config.devServer = Object.assign({}, defaultDevServer, config.devServer);
    } else {
        config.devServer = defaultDevServer;
    }

    // example
    if (config.example) {
        if (config.example === true) {
            config.example = {};
        }

        config.example = Object.assign({
            src: './examples/src',
            dist: './examples/dist',
            index: 'index.html',
            files: [],
            script: 'index.js'
        }, config.example);

        let {scripts} = config.example;
        if (_.isArray(scripts) && scripts.length === 1) {
            config.example.script = scripts[0];
        }
    }

    gutil.log('[react-component-tools]', '\r\n', gutil.colors.green(JSON.stringify(config, null, 2)));

    gulp.task('env', () => {
        process.env.NODE_ENV = args.production ? 'production' : 'development'; // eslint-disable-line no-undef
    });

    require('./gulp/bump')(gulp, config);
    require('./gulp/dev')(gulp, config);
    require('./gulp/dist')(gulp, config);
    require('./gulp/release')(gulp, config);

    let buildTasks = ['build:dist'];
    let cleanTasks = ['clean:dist'];

    if (config.component.lib) {
        require('./gulp/lib')(gulp, config);
        buildTasks.push('build:lib');
        cleanTasks.push('clean:lib');
    }

    if (config.example) {
        require('./gulp/examples')(gulp, config);
        buildTasks.push('build:examples');
        cleanTasks.push('clean:examples');
    }

    gulp.task('build', buildTasks);
    gulp.task('clean', cleanTasks);
}

module.exports = initTasks;
module.exports.readPackageJSON = readPackageJSON;
