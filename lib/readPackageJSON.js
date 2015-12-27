/**
 * Extract package.json metadata
 *
 * @returns {{name: string, deps: Array}}
 */
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
function readPackageJSON() {
  var pkg = JSON.parse(require('fs').readFileSync('./package.json'));
  var o = {};
  if (pkg) {
    _extends(o, pkg.dependencies);
  }
  if (pkg.peerDependencies) {
    _extends(o, pkg.peerDependencies);
  }
  var dependencies = _Object$keys(o);

  return {
    name: pkg.name,
    deps: dependencies
  };
}

exports['default'] = readPackageJSON;
module.exports = exports['default'];