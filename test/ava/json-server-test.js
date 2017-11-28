import test from 'ava'
import {feathers, standard} from '../../src/index'

test('feathers', t => {
  t.deepEqual(
    feathers.pre({
      query: {
        $skip: 1,
        $limit: 1
      }
    }),
    {
      query: {
        _start: 1,
        _limit: 1
      }
    }
  )
})

test('standard', t => {
  t.deepEqual(
    standard.pre({
      query: {
        offset: 1,
        limit: 1
      }
    }),
    {
      query: {
        _start: 1,
        _limit: 1
      }
    }
  )
})
