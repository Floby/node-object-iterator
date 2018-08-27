const { expect, consume } = require('./utils')
var oi = require('../');

describe('Arrays', () => {
  it('it detects native types in an array', () => {
    // Given
    var source = [1, 2, 3];
    var expected = ['array', 'number', 'number', 'number', 'end-array'];
    var next = oi(source);
    // When
    const actual = consume(next)
    // Then
  })
  it('it detects keys in an array', () => {
    // Given
    var source = [1, 2, 3];
    var expected = [0,1,2];
    var next = oi(source);
    // When
    const actual = consume(next,
                           ({ type }) => type === 'number',
                           ({ key }) => key)
    expect(actual).to.deep.equal(expected)
  })
})
