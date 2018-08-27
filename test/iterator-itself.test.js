'use strict'
const expect = require('./utils').expect
const consume = require('./utils').consume

const oi = require('../')

describe('as Iterator', () => {
  it('consumes all the tokens', () => {
    // Given
    const source = [8, { some: 'object' }]
    const expected = consume(oi(source))
    // When
    const tokens = []
    for (const token of oi(source)) {
      tokens.push(token)
    }
    // Then
    expect(tokens).to.deep.equal(expected)
  })
})
