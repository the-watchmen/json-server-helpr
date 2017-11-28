'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.standard = exports.feathers = undefined;

var _standard = require('./standard');

var standard = _interopRequireWildcard(_standard);

var _feathers = require('./feathers');

var feathers = _interopRequireWildcard(_feathers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.feathers = feathers;
exports.standard = standard;