'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pre = pre;
exports.replace = replace;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dbg = (0, _debug2.default)('lib:json-server-helpr:standard');
/*
api/patients?offset={offset}&limit={limit}&sort=[-|+]{sort}
&firstName={firstName}&lastName={lastName}&mrn={mrn}&dob={dob}
*/
function pre(req) {
  replace(req.query, 'offset', '_start');
  replace(req.query, 'limit', '_limit');
  let sort = req.query.sort;
  if (sort) {
    if (_lodash2.default.startsWith(sort, '+')) {
      sort = sort.substring(1);
    } else if (_lodash2.default.startsWith(sort, '-')) {
      sort = sort.substring(1);
      req.query._order = 'DESC';
    }
    req.query.sort = sort;
    replace(req.query, 'sort', '_sort');
  }
  req.query = _lodash2.default.transform(req.query, (result, val, key) => {
    // disallow regex and "or" operators...?
    dbg('key=%o, val=%o', key, val);
    if (_lodash2.default.startsWith(val, '/')) {
      result[`${key}_like`] = val.replace('/', '');
    } else {
      result[key] = val;
    }
  });
  dbg('shared-pre: query=%o', req.query);
  return req;
}

// replace({a: 'a'}, 'a', 'b') -> {b: 'a'}
function replace(o, old, nu) {
  if (o[old]) {
    o[nu] = o[old];
    delete o[old];
  }
  return o;
}