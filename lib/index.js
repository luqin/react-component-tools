'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _defaults = require('defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fbjsLibInvariant = require('fbjs/lib/invariant');

var _fbjsLibInvariant2 = _interopRequireDefault(_fbjsLibInvariant);

// Extract package.json metadata
function readPackageJSON() {
    var pkg = JSON.parse(require('fs').readFileSync('./package.json'));
    var dependencies = [];
    pkg.dependencies && dependencies.push(_Object$keys(pkg.dependencies));
    pkg.peerDependencies && dependencies.push(_Object$keys(pkg.peerDependencies));

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
    var args = _yargs2['default'].alias('p', 'production').argv;

    var pkg = readPackageJSON();
    var name = (0, _capitalize2['default'])((0, _camelcase2['default'])(config.component.pkgName || pkg.name));

    // component
    config.component = _extends({
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
    var defaultDevServer = {
        port: 3000,
        webpackDevServerPort: 8888,
        openBrowser: true
    };
    if (config.devServer) {
        config.devServer = _extends({}, defaultDevServer, config.devServer);
    } else {
        config.devServer = defaultDevServer;
    }

    // example
    if (config.example) {
        if (config.example === true) {
            config.example = {};
        }

        config.example = _extends({
            src: './examples/src',
            dist: './examples/dist',
            index: 'index.html',
            files: [],
            script: 'index.js'
        }, config.example);

        var scripts = config.example.scripts;

        if (_lodash2['default'].isArray(scripts) && scripts.length === 1) {
            config.example.script = scripts[0];
        }
    }

    _gulpUtil2['default'].log('[react-component-tools]', '\r\n', _gulpUtil2['default'].colors.green(JSON.stringify(config, null, 2)));

    gulp.task('env', function () {
        process.env.NODE_ENV = args.production ? 'production' : 'development'; // eslint-disable-line no-undef
    });

    require('./gulp/bump')(gulp, config);
    require('./gulp/dev')(gulp, config);
    require('./gulp/dist')(gulp, config);
    require('./gulp/release')(gulp, config);

    var buildTasks = ['build:dist'];
    var cleanTasks = ['clean:dist'];

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