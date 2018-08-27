const expect = require('./utils').expect
const consume = require('./utils').consume
const oi = require('../')

describe('Objects', () => {
  it('finds types in object', () => {
    const source = {one: 1, two: 2, three: 3}
    const next = oi(source)
    const actual = consume(next)
    expect(actual).to.deep.equal([
      {type: 'object', value: null},
      {type: 'number', value: 1, key: 'one'},
      {type: 'number', value: 2, key: 'two'},
      {type: 'number', value: 3, key: 'three'},
      {type: 'end-object', value: null}
    ])
  })
})
