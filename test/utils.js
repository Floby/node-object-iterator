'use strict'
const chai = require('chai')
exports.consume = function (next, filter, map) {
  filter = filter || True
  map = map || identity
  const tokens = []
  let token
  while (token = next()) { // eslint-disable-line no-cond-assign
    if (filter(token)) {
      tokens.push(map(token))
    }
  }
  return tokens
}
exports.expect = chai.expect

function identity (value) {
  return value
}

function True () {
  return true
}
