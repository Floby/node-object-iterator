'use strict'

module.exports = function (source) {
  const iterator = ObjectIterator(source)
  let current = iterator.next()
  return function next () {
    if (current.done) {

    } else {
      const value = current.value
      current = iterator.next()
      return value
    }
  }
}

function * ObjectIterator (source, context) {
  context = context || {}
  const type = getType(source)
  if (isSimpleValue(type)) {
    return yield Object.assign({ type, value: source }, context)
  } else if (type === 'array') {
    return yield * iterateArray()
  } else if (type === 'object') {
    return yield * iterateObject()
  } else {
    throw Error('Unexpected type ' + type)
  }

  function * iterateObject () {
    yield Object.assign({ type: 'object', value: null }, context)
    const entries = objectEntries(source)
    for (let i = 0; i < entries.length; ++i) {
      const key = entries[i][0]
      const value = entries[i][1]
      yield * ObjectIterator(value, { key })
    }
    yield Object.assign({ type: 'end-object', value: null }, context)
  }

  function * iterateArray () {
    yield Object.assign({ type: 'array', value: null }, context)
    for (let i = 0; i < source.length; ++i) {
      yield * ObjectIterator(source[i], { key: i })
    }
    yield Object.assign({ type: 'end-array', value: null }, context)
  }
}

function isSimpleValue (type) {
  switch (type) {
    case 'array':
    case 'object':
      return false
    default:
      return true
  }
}

function getType (source) {
  let type = Array.isArray(source) ? 'array' : typeof source
  if (source === null) type = 'null'
  return type
}

function objectEntries (object) {
  const entries = Object.keys(object).map((key) => ([key, object[key]]))
  return entries
}
