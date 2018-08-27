const expect = require('./utils').expect
const consume = require('./utils').consume
const oi = require('../')

describe('Arrays', () => {
  it('it detects native types in an array', () => {
    // Given
    const source = [1, 2, 3]
    const expected = ['array', 'number', 'number', 'number', 'end-array']
    const next = oi(source)
    // When
    const actual = consume(next, null, (v) => v.type)
    // Then
    expect(actual).to.deep.equal(expected)
  })
  it('it detects keys in an array', () => {
    // Given
    const source = [1, 2, 3]
    const expected = [0, 1, 2]
    const next = oi(source)
    // When
    const actual = consume(next,
      (v) => v.type === 'number',
      (v) => v.key)
    expect(actual).to.deep.equal(expected)
  })
})
