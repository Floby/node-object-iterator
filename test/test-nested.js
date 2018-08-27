const { expect, consume } = require('./utils')
var oi = require('../');

describe('Nested values', () => {
  it('finds arrays in objects', () => {
    var source = {array: [1]};
    var expected = ['object', 'array', 'number', 'end-array', 'end-object'];
    var next = oi(source);
    const actual = consume(next)
    actual
      .filter(({ type }) => type === 'array')
      .forEach(({ key }) => expect(key).to.equal('array'))
    actual
      .filter(({ type }) => type === 'number')
      .forEach(({ key }) => expect(key).to.equal(0))
  })

  it('finds objects in long array', () => {
    var source = {one: 1, array: [1, null, true, null]};
    var expected = ['object', 'number', 'array', 'number', 'null', 'boolean', 'null', 'end-array', 'end-object'];
    var next = oi(source);
    const actual = consume(next, null, ({ type }) => type)
    expect(actual).to.deep.equal(expected)
  })

  it('finds object in array', () => {
    var source = [{one:1}];
    var next = oi(source);
    const actual = consume(next)
    expect(actual).to.deep.equal([
      {type: 'array', value: null},
      {type: 'object', value: null, key: 0},
      {type: 'number', value: 1, key: 'one'},
      {type: 'end-object', value: null, key: 0},
      {type: 'end-array', value: null},
    ])
  })
})

exports.testObjectInArray = function(test) {
    var source = [{one:1}];
    var expected = ['array', 'object', 'number', 'end-object', 'end-array'];
    var next = oi(source);
    var v;
    while(v = next()) {
        test.equal(v.type, expected.shift(), "Unexpected token type");
        if(v.type == 'object') {
            test.deepEqual(v.key, 0, 'Unexpected key for that value');
        }
        else if(v.type == 'number') {
            test.deepEqual(v.key, 'one', 'Unexpected key for that value');
        }
    }
    test.equal(0, expected.length, 'Not everything has been traversed');
    test.done();
}
