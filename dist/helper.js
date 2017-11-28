'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKey = getKey;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getKey(o) {
  const keys = Object.keys(o);
  (0, _assert2.default)(keys.length === 1, `expected single property object=${o}`);
  return keys[0];
}