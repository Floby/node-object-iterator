const { expect } = require('./utils')
var oi = require('../');

describe('Single value', () => {
  it('generates a token', () => {
    var source = null;
    var next = oi(source);
    expect(next()).to.deep.equal({
      type: 'null',
      value: null
    })
  })
})
