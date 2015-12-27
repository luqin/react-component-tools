'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getServerIP;

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

var serverIp = _ip2['default'].address();

function getServerIP() {
  return serverIp;
}

module.exports = exports['default'];