var path = require('path');

var config = {

  component: {
    entry: './src/index.js',
    name: 'MyComponent',
    pkgName: 'react-component',
    dependencies: {
      classnames: 'classnames',
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    sass: './scss/my-component.scss' // or `less: 'less/my-component.less'`
  },

  alias: {
    'react-component': path.resolve(__dirname, './src')
  },

  example: {
    dist: './examples/dist',
    entry: {
      app: './examples/src/app.js'
    },
    html: [{
      title: 'My Component 1',
    }, {
      title: 'My Component 2',
      template: './examples/src/index.html',
    }],
    files: [
      './README.md'
    ],

    port: 3000,
    openBrowser: true,
  }

};
