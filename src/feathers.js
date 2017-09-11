import assert from 'assert'
import debug from 'debug'
import _ from 'lodash'

const dbg = debug('app:json-server-helpr:feathers')

const like = '$like'
const _like = `[${like}]`
const sort = '$sort'
const _sort = `${sort}[`

let skip
let limit

export const feathers = {
  pre: req => {
    dbg('pre: query=%o', req.query)
    // $skip=1 -> _start=1
    // $limit=1 -> _limit=1
    // foo[$like]='b%r' -> foo_like='b.+r'
    // $sort[foo]=1 -> _sort=foo&_order=asc
    // $sort[foo]=-1 -> _sort=foo&_order=desc
    req.query = _.transform(req.query, (result, val, key) => {
      const _key = _.isObject(val) && getKey(val)
      if (key === '$skip') {
        result['_start'] = val
      } else if (key === '$limit') {
        result['_limit'] = val
      } else if (_key === like) {
        result[`${key}_like`] = `^${val[_key].replace(/%/g, '.{1,}')}$`
      } else if (key.endsWith(_like)) {
        result[`${key.slice(0, -_like.length)}_like`] = val.replace(/%/g, '.+')
      } else if (key === sort) {
        result._sort = _key
        result._order = val[_key] === '1' ? 'asc' : 'desc'
      } else if (key.startsWith(_sort)) {
        result._sort = key.slice(_sort.length, -1)
        result._order = val === '1' ? 'asc' : 'desc'
      } else {
        result[key] = val
      }
    })
    dbg('pre: after: query=%o', req.query)
    skip = parseInt(req.query._start)
    limit = parseInt(req.query._limit)
    return req
  },

  post: (data, req, res) => {
    const result = {
      total: res.get('x-total-count'),
      limit,
      skip,
      data
    }
    dbg('post: result=%o', result)
    return result
  }
}

function getKey(o) {
  const keys = Object.keys(o)
  assert(keys.length === 1, `expected single property object=${o}`)
  return keys[0]
}
