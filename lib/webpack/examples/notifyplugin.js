'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function getLocMessage(error, loc) {
  var filePath = error.module.resource.split(_path2['default'].sep);
  return filePath[filePath.length - 1] + ' at [' + loc.line + ',' + loc.column + ']';
}

function NotifyPlugin() {
  this.plugin('done', function (stats) {
    // TODO: Handle warnings as well.
    var error = stats.compilation.errors[0];
    if (!error) {
      return;
    }

    var loc = error.error.loc;
    var msg = undefined;
    if (loc) {
      msg = getLocMessage(error, loc);
    } else if (error.message) {
      msg = error.message;
    } else {
      return;
    }

    _nodeNotifier2['default'].notify({
      title: 'Webpack Error',
      message: msg
    });
  });
}

exports['default'] = NotifyPlugin;
module.exports = exports['default'];