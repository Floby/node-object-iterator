const { expect } = require('./utils')
const oi = require('../')

describe.only('Single value', () => {
  it('generates a token', () => {
    const source = null
    const next = oi(source)
    expect(next()).to.deep.equal({
      type: 'null',
      value: null
    })
  })
})
