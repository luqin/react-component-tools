var gulp = require('gulp');
var initGulpTasks = require('@ione/react-pack');

var taskConfig = {

  component: {
    name: 'react-component',
    scripts: {
      entry: './src/index.js',
      output: {
        library: 'ReactComponent'
      },
      externals: {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        }
      }
    },
    scss: {
      entry: './scss/index.scss'
    }
  },

  example: {
    src: './examples/src',
    dist: './examples/dist',
    index: 'index.html',
    files: [
      '.svnignore'
    ],
    scripts: [
      'index.js'
    ]
  }

};

initGulpTasks(gulp, taskConfig);
