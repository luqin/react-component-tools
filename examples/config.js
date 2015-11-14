var path = require('path');

var taskConfig = {

  component: {
    name: 'react-component',
    lib: './lib',
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
    script: 'js/app.js',
    alias: {
      'react-component': path.resolve(__dirname, './src')
    },
    files: []
  }

};

module.exports = taskConfig;
