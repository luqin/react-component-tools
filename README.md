# React Component Tools

[![NPM version][npm-badge]][npm] [![Build Status][travis-ci-image]][travis-ci-url]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]
[![peerDependency Status][peer-deps-badge]][peer-deps]

> Common Gulp tasks I use across my React Component projects. Base on [react-component-gulp-tasks][react-component-gulp-tasks]

This package provides common gulp tasks for building react components with:

* [Webpack][Webpack] for transforming ES2015+/JSX and creating distribution builds
* Hot reload for automatic, efficient rebundling on file changes
* Connect for serving examples during development, with live-reload integration
* SASS/LESS/PostCSS/stylus... stylesheets for examples
* Publishing examples to Github Pages
* Publishing packages to npm and bower

You control the settings for the tasks by providing a `config` object, as described below.


## Project setup

The tasks assume you are following the following conventions for your project:

* Package source has a single entry point in a source folder
* The package will be published to both npm and bower
* A transpiled version will be published to a lib folder (for Node.js, Browserify and Webpack)
* A standalone package will be published to a dist folder (for Bower)
* Examples consist of
  * Static file(s) (e.g. html, images, etc)
  * One or more stylesheets to be generated with SASS/LESS/PostCSS/stylus...
  * One or more scripts to be bundled with Webpack
* Examples will be packaged into an examples dist folder, and published to github pages

### Example project structure

```
bower.json
package.json
gulpfile.js
src
  MyComponent.js
sass // or less
  my-component.scss
lib
  // contains transpiled source
  MyComponent.js
dist
  // contains packaged component
  my-component.js
  my-component.min.js
  my-component.css
  my-component.min.css
example
  dist
    // contains built examples
  src
    app.js
    app.scss
    index.html
```

For a complete example see [react-component-starter](https://github.com/luqin/react-component-tools/tree/master/examples)

## Usage

```
npm install --save-dev gulp react-component-tools
```

In your gulpfile, call this package with your `gulp` instance and `config`. It will add the tasks to gulp for you. You can also add your own tasks if you want.

```js
var gulp = require('gulp');
var initGulpTasks = require('react-component-tools');
var taskConfig = require('./config');

initGulpTasks(gulp, taskConfig);
```

### Task Config

You can customise the tasks to match your project structure by changing the config.

Required config keys are:

**`Component`**

* `component.entry` - the path of source (entry) file for the component
* `component.name` - controls the standalone module name
* `component.dist` - the directory to build the distribution to
* `component.pkgName` - the name of the package that will be exported by the component (**must match the name of your package on npm**)
* `component.dependencies[]` - webpack externals, array of common dependencies that will be excluded from the build
* `component.less` - the entrypoint for the component stylesheet, if you're using less to provide one
* `component.sass` - the entrypoint for the component stylesheet, if you're using sass to provide one

**`Example`**

* `example.src` - the directory to load the source files from
* `example.dist` - the directory to build the distribution to
* `example.entry[]` - scripts will be transpiled with babel and bundled by webpack
* `example.alias{}` - webpack alias
* `example.port` - port to serve examples on, defaults to `3000`
* `example.files[]` - files will be copied as-is into the `example.dist` folder

## Example

```js
var gulp = require('gulp');
var initGulpTasks = require('react-component-tools');

var taskConfig = {

  component: {
    name: 'MyComponent',
    dependencies: {
      classnames: 'classnames',
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    sass: 'scss/my-component.scss' // or `less: 'less/my-component.less'`
  },

  example: {
    entry: 'examples/src/app.js',
    dist: 'examples/dist',
    html: 'examples/src/index.html',
    files: [
      'README.md'
    ]
  }

};

initGulpTasks(gulp, taskConfig);

```

### Gulp Tasks

* dev
  * `gulp dev`
* lib
  * `gulp build:lib`
  * `gulp watch:lib`
* dist
  * `gulp build:dist`
* examples
  * `gulp build:examples`
  * `gulp watch:examples`
* build
  * `gulp build`
* bump
  * `gulp bump`
  * `gulp bump:minor`
  * `gulp bump:major`
* release
  * `gulp publish:tag`
  * `gulp publish:npm`
  * `gulp publish:cnpm`
  * `gulp publish:examples` publish to gh-pages
  * `gulp release`

## Contributing

I wrote this package because maintaining my build process across multiple packages became a repetitive chore with large margin for error.

Although its quite opinionated, hopefully it will be a useful resource for other package authors. It's got all the nice things I found to component development easy and fun, like a lightning-quick rebuild process with gulp-reload, consolidated publishing, and automated deployment to github pages.

Please let me know if you think anything could be done better or you'd like to see a feature added. Issues and PR's welcome.


[npm-badge]: http://badge.fury.io/js/react-component-tools.svg
[npm]: https://www.npmjs.com/package/react-component-tools

[deps-badge]: https://david-dm.org/luqin/react-component-tools.svg
[deps]: https://david-dm.org/luqin/react-component-tools

[dev-deps-badge]: https://david-dm.org/luqin/react-component-tools/dev-status.svg
[dev-deps]: https://david-dm.org/luqin/react-component-tools#info=devDependencies

[peer-deps-badge]: https://david-dm.org/luqin/react-component-tools/peer-status.svg
[peer-deps]: https://david-dm.org/luqin/react-component-tools#info=peerDependencies 

[travis-ci-image]: https://travis-ci.org/luqin/react-component-tools.svg
[travis-ci-url]: https://travis-ci.org/luqin/react-component-tools

[react-component-gulp-tasks]: https://github.com/JedWatson/react-component-gulp-tasks

[Webpack]: https://github.com/webpack/webpack
