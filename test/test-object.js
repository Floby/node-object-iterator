var oi = require('../');

exports.testTypesInObject = function(test) {
    var source = {one: 1, two: 2, three: 3};
    var expected = ['object', 'number', 'number', 'number', 'end-object'];
    var next = oi(source);
    var v;
    while(v = next()) {
        test.equal(v.type, expected.shift(), 'Unexpected token type');
    }
    test.equal(expected.length, 0, 'Not everything has been traversed ('+expected.length+')');
    test.done();
};

exports.testKeysInObject = function(test) {
    var source = {one: 1, two: 2, three: 3};
    var expected = Object.keys(source);
    var next = oi(source);
    var v;
    while(v = next()) {
        if(v.key) {
            test.equal(v.key, expected.shift());
        }
        else {
            test.notEqual('number', v.type, "There should be a key for that number");
        }
    }
    test.equal(expected.length, 0, "Not everything has been traversed");
    test.done();
};
