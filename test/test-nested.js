const { expect, consume } = require('./utils')
const oi = require('../')

describe.only('Nested values', () => {
  it('finds array in objects', () => {
    const source = {array: [1]}
    const next = oi(source)
    const actual = consume(next)

    expect(actual).to.deep.equal([
      { type: 'object', value: null },
      { type: 'array', value: null, key: 'array' },
      { type: 'number', value: 1, key: 0 },
      { type: 'end-array', value: null, key: 'array' },
      { type: 'end-object', value: null }
    ])
  })

  it('finds objects in long array', () => {
    const source = {one: 1, array: [1, null, true, null]}
    const expected = ['object', 'number', 'array', 'number', 'null', 'boolean', 'null', 'end-array', 'end-object']
    const next = oi(source)
    const actual = consume(next, null, ({ type }) => type)
    expect(actual).to.deep.equal(expected)
  })

  it('finds object in array', () => {
    const source = [{one: 1}]
    const next = oi(source)
    const actual = consume(next)
    expect(actual).to.deep.equal([
      {type: 'array', value: null},
      {type: 'object', value: null, key: 0},
      {type: 'number', value: 1, key: 'one'},
      {type: 'end-object', value: null, key: 0},
      {type: 'end-array', value: null}
    ])
  })
})
