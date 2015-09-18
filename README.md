# React Component Tools

[![NPM version][npm-badge]][npm] [![Build Status][travis-ci-image]][travis-ci-url] [![Gitter][gitter-badge]][gitter]

[![Dependency Status][deps-badge]][deps]
[![devDependency Status][dev-deps-badge]][dev-deps]
[![peerDependency Status][peer-deps-badge]][peer-deps]

[npm-badge]: https://img.shields.io/npm/v/react-component-tools.svg?style=flat-square
[npm]: http://badge.fury.io/js/react-component-tools

[deps-badge]: https://david-dm.org/uooo/react-component-tools.svg
[deps]: https://david-dm.org/uooo/react-component-tools

[dev-deps-badge]: https://david-dm.org/uooo/react-component-tools/dev-status.svg
[dev-deps]: https://david-dm.org/uooo/react-component-tools#info=devDependencies

[peer-deps-badge]: https://david-dm.org/uooo/react-component-tools/peer-status.svg
[peer-deps]: https://david-dm.org/uooo/react-component-tools#info=peerDependencies 

[travis-ci-image]: https://travis-ci.org/uooo/react-component-tools.svg
[travis-ci-url]: https://travis-ci.org/uooo/react-component-tools

[gitter-badge]: https://img.shields.io/badge/gitter-join%20chat-f81a65.svg?style=flat-square
[gitter]: https://gitter.im/uooo/react-component-tools?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge


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
npm install --save-dev gulp react-component-tools
```

In your gulpfile, call this package with your `gulp` instance and `config`. It will add the tasks to gulp for you. You can also add your own tasks if you want.

```js
var gulp = require('gulp'),
	initGulpTasks = require('react-component-tools'),
	taskConfig = require('./config');

initGulpTasks(gulp, taskConfig);
```

### Task Config

You can customise the tasks to match your project structure by changing the config.
