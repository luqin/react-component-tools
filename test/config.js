var path = require('path');

var taskConfig = {

  component: {
    name: 'ReactComponent',
    dependencies: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    scss: './scss/index.scss'
  },

  alias: {
    'react-component': path.resolve(__dirname, './src')
  },

  example: {
    dist: './examples/dist',
    entry: {
      app: './examples/src/js/app.js',
      b: './examples/src/js/app.js'
    },
    html: [
      {
        chunks: ['app'],
        template: './examples/src/index.html'
      },
      {
        title: 'b',
        filename: 'b.html',
        chunks: ['b']
      }
    ],
    files: []
  }

};

module.exports = taskConfig;
