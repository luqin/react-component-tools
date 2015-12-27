'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _defaults = require('defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _readPackageJSON = require('./readPackageJSON');

var _readPackageJSON2 = _interopRequireDefault(_readPackageJSON);

function prepareConfig(_config) {
  var pkg = (0, _readPackageJSON2['default'])();
  var name = (0, _capitalize2['default'])((0, _camelcase2['default'])(_config.component.pkgName || pkg.name));

  var config = (0, _defaults2['default'])(_config, { alias: pkg.alias });

  // component
  config.component = (0, _defaults2['default'])(config.component, {
    entry: './src/index.js',
    pkgName: pkg.name,
    name: name,
    dependencies: pkg.deps,
    src: './src',
    lib: './lib',
    dist: './dist'
  });

  config.bump = config.bump || {};
  config.bump = (0, _defaults2['default'])(config.bump, {
    npm: true,
    bower: false
  });

  // example
  if (config.example) {
    if (config.example === true) {
      config.example = {};
    }

    (0, _defaults2['default'])(config.example, {
      dist: './examples/dist',
      entry: './examples/src/app.js',
      files: [],

      port: 8888,
      openBrowser: true
    });

    var _config$example = config.example;
    var entry = _config$example.entry;
    var html = _config$example.html;

    if (typeof entry === 'string') {
      config.example.entry = {
        app: entry
      };
    }

    if (!html) {
      html = [{
        title: pkg.name
      }];
    }
    if (!_lodash2['default'].isArray(html)) {
      html = [html];
    }

    config.example.html = html.map(function (item) {
      var h = undefined;

      if (typeof item === 'string') {
        h = {
          title: pkg.name,
          template: item
        };
      } else {
        h = item;
      }

      return h;
    });
  }

  return config;
}

/**
 * This package exports a function that binds tasks to a gulp instance
 * based on the provided config.
 */
function initTasks(gulp, _config) {
  var args = _yargs2['default'].alias('p', 'production').argv;
  var config = prepareConfig(_config);

  _gulpUtil2['default'].log('[react-component-tools] init...');

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
module.exports.readPackageJSON = _readPackageJSON2['default'];