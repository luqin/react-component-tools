'use strict';

require('colors');

var path = require('path');
var program = require('commander');

program.on('--help', function help() {
  console.log('  Usage:'.bold.blue); // eslint-disable-line
  console.log(); // eslint-disable-line
  console.log('    $', 'react-pack run start'.magenta, ''); // eslint-disable-line
  console.log('    $', 'react-pack run build'.magenta, ''); // eslint-disable-line
  console.log('    $', 'react-pack run tag'.magenta, ''); // eslint-disable-line
  console.log('    $', 'react-pack run gh-pages'.magenta, ''); // eslint-disable-line
  console.log(); // eslint-disable-line
});

program.parse(process.argv);

var task = program.args[0];

if (!task) {
  program.help();
} else {
  var gulp = require('gulp');
  require('../../gulpfile');
  var initGulpTasks = require('../../lib');
  var taskConfig = require(path.join(process.cwd(), './config'));
  initGulpTasks(gulp, taskConfig);

  switch (task) {
    case 'start':
      task = 'dev';
      break;
    case 'gh-pages':
      task = 'publish:examples';
      break;
    default:
      break;
  }

  gulp.start(task);
}