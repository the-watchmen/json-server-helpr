'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pre = pre;
exports.post = post;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dbg = (0, _debug2.default)('lib:json-server-helpr:feathers');

const like = '$like';
const _like = `[${like}]`;
const sort = '$sort';
const _sort = `${sort}[`;

let skip;
let limit;

function pre(req) {
  dbg('pre: query=%o', req.query);
  // $skip=1 -> _start=1
  // $limit=1 -> _limit=1
  // foo[$like]='b%r' -> foo_like='b.+r'
  // $sort[foo]=1 -> _sort=foo&_order=asc
  // $sort[foo]=-1 -> _sort=foo&_order=desc
  req.query = _lodash2.default.transform(req.query, (result, val, key) => {
    const _key = _lodash2.default.isObject(val) && (0, _helper.getKey)(val);
    if (key === '$skip') {
      result['_start'] = val;
    } else if (key === '$limit') {
      result['_limit'] = val;
    } else if (_key === like) {
      result[`${key}_like`] = `^${val[_key].replace(/%/g, '.{1,}')}$`;
    } else if (key.endsWith(_like)) {
      result[`${key.slice(0, -_like.length)}_like`] = val.replace(/%/g, '.+');
    } else if (key === sort) {
      result._sort = _key;
      result._order = val[_key] === '1' ? 'asc' : 'desc';
    } else if (key.startsWith(_sort)) {
      result._sort = key.slice(_sort.length, -1);
      result._order = val === '1' ? 'asc' : 'desc';
    } else {
      result[key] = val;
    }
  });
  dbg('pre: after: query=%o', req.query);
  skip = parseInt(req.query._start);
  limit = parseInt(req.query._limit);
  return req;
}

function post(data, req, res) {
  const result = {
    total: res.get('x-total-count'),
    limit,
    skip,
    data
  };
  dbg('post: result=%o', result);
  return result;
}