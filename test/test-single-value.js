const expect = require('./utils').expect
const oi = require('../')

describe('Single value', () => {
  it('generates a token', () => {
    const source = null
    const next = oi(source)
    expect(next()).to.deep.equal({
      type: 'null',
      value: null
    })
  })
})
