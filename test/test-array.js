var oi = require('../');

exports.testTypesInArray = function(test) {
    var source = [1, 2, 3];
    var expected = ['array', 'number', 'number', 'number', 'end-array'];
    var next = oi(source);
    var v;
    while(v = next()) {
        test.equal(v.type, expected.shift(), 'Unexpected token type');
    }
    test.equal(expected.length, 0, 'not everything has been traversed ('+expected.length+')');
    test.done();
}
