
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

function * ObjectIterator (source, context = {}) {
  const type = getType(source)
  if (isSimpleValue(type)) {
    return yield { type, value: source, ...context }
  } else if (type === 'array') {
    return yield * iterateArray()
  } else if (type === 'object') {
    return yield * iterateObject()
  } else {
    throw Error('Unexpected type ' + type)
  }

  function * iterateObject () {
    yield { type: 'object', value: null, ...context }
    const entries = Object.keys(source).map((key) => ([key, source[key]]))
    for (let i = 0; i < entries.length; ++i) {
      const [ key, value ] = entries[i]
      yield * ObjectIterator(value, { key })
    }
    yield { type: 'end-object', value: null, ...context }
  }

  function * iterateArray () {
    yield { type: 'array', value: null, ...context }
    for (let i = 0; i < source.length; ++i) {
      yield * ObjectIterator(source[i], { key: i })
    }
    yield { type: 'end-array', value: null, ...context }
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
