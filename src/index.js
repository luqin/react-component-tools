import defaults from 'defaults';
import capitalize from 'capitalize';
import camelCase from 'camelcase';
import _ from 'lodash';
import yargs from 'yargs';
import gutil from 'gulp-util';

import readPackageJSON from './readPackageJSON';

function prepareConfig(_config) {
  const pkg = readPackageJSON();
  const name = capitalize(camelCase(_config.component.pkgName || pkg.name));

  let config = defaults(_config, { alias: pkg.alias });

  // component
  config.component = defaults(config.component, {
    entry: './src/index.js',
    pkgName: pkg.name,
    name: name,
    dependencies: pkg.deps,
    src: './src',
    lib: './lib',
    dist: './dist',
  });

  config.bump = config.bump || {};
  config.bump = defaults(config.bump, {
    npm: true,
    bower: false,
  });

  // example
  if (config.example) {
    if (config.example === true) {
      config.example = {};
    }

    defaults(config.example, {
      dist: './examples/dist',
      entry: './examples/src/app.js',
      files: [],

      port: 8888,
      openBrowser: true,
    });

    let { entry, html } = config.example;

    if (typeof entry === 'string') {
      config.example.entry = {
        app: entry
      };
    }

    if (!html) {
      html = [{
        title: pkg.name,
      }];
    }
    if (!_.isArray(html)) {
      html = [html];
    }

    config.example.html = html.map(item => {
      let h;

      if (typeof item === 'string') {
        h = {
          title: pkg.name,
          template: item,
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
  const args = yargs
    .alias('p', 'production')
    .argv;
  let config = prepareConfig(_config);

  gutil.log('[react-pack] init...');

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
