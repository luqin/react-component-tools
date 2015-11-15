# React Component Tools

[![NPM version][npm-badge]][npm] [![Build Status][travis-ci-image]][travis-ci-url]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]
[![peerDependency Status][peer-deps-badge]][peer-deps]

This package provides common gulp tasks for building react components with:

* Webpack for transforming ES2015+/JSX and creating distribution builds
* BrowserSync for automatic, efficient rebundling on file changes
* Connect for serving examples during development, with live-reload integration
* SASS stylesheets for examples
* Publishing examples to Github Pages
* Publishing packages to npm and bower

You control the settings for the tasks by providing a `config` object, as described below.


## Project setup

The tasks assume you are following the following conventions for your project:

* Package source has a single entry point in a source folder./
* The package will be published to both npm and bower
* A transpiled version will be published to a lib folder (for Node.js, Browserify and Webpack)
* A standalone package will be published to a dist folder (for Bower)
* Examples consist of
	* Static file(s) (e.g. html, images, etc)
	* One or more stylesheets to be generated with SASS
	* One or more scripts to be bundled with Webpack
* Examples will be packaged into an examples dist folder, and published to github pages

### Example project structure

```
bower.json
package.json
gulpfile.js
src
	MyComponent.js
sass
	my-component.scss
lib
	// contains transpiled source
	MyComponent.js
dist
	// contains packaged component
    my-component.js
    my-component.min.js
    my-component.css
example
	dist
		// contains built examples
	src
		app.js
		app.scss
		index.html
```

## Usage

```
npm install --save-dev gulp react-pack
```

In your gulpfile, call this package with your `gulp` instance and `config`. It will add the tasks to gulp for you. You can also add your own tasks if you want.

```js
var gulp = require('gulp'),
	initGulpTasks = require('react-pack'),
	taskConfig = require('./config');

initGulpTasks(gulp, taskConfig);
```

### Task Config

You can customise the tasks to match your project structure by changing the config.

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


[npm-badge]: http://badge.fury.io/js/react-pack.svg
[npm]: http://badge.fury.io/js/react-pack

[deps-badge]: https://david-dm.org/luqin/react-pack.svg
[deps]: https://david-dm.org/luqin/react-pack

[dev-deps-badge]: https://david-dm.org/luqin/react-pack/dev-status.svg
[dev-deps]: https://david-dm.org/luqin/react-pack#info=devDependencies

[peer-deps-badge]: https://david-dm.org/luqin/react-pack/peer-status.svg
[peer-deps]: https://david-dm.org/luqin/react-pack#info=peerDependencies 

[travis-ci-image]: https://travis-ci.org/luqin/react-pack.svg
[travis-ci-url]: https://travis-ci.org/luqin/react-pack
