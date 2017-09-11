import test from 'ava'
import {feathers} from '../../src/index'

test('pre', t => {
  t.deepEqual(
    feathers.pre({
      query: {
        $skip: 1
      }
    }),
    {
      query: {
        _start: 1
      }
    }
  )
})
