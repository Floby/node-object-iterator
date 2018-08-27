const expect = require('./utils').expect
const consume = require('./utils').consume
const oi = require('../')
describe('With Circular References', () => {
  it('throws when it finds a circular reference in arrays', () => {
    // Given
    const circular = []
    const source = [circular]
    circular.push(circular)
    expect(() => {
      consume(oi(source))
    }).to.throw(/circular reference/i)
  })
  it('throws when it finds a circular reference in objects', () => {
    // Given
    const circular = {a: 1}
    const source = { circular }
    source.circular.circular = circular
    expect(() => {
      consume(oi(source))
    }).to.throw(/circular reference/i)
  })
})
