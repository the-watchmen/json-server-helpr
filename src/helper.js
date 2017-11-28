import assert from 'assert'

export function getKey(o) {
  const keys = Object.keys(o)
  assert(keys.length === 1, `expected single property object=${o}`)
  return keys[0]
}
