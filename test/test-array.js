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
};

exports.testKeysInArray = function(test) {
    var source = [1, 2, 3];
    var expected = [0,1,2];
    var next = oi(source);
    var v;
    while(v = next()) {
        if(v.key || v.key === 0) {
            test.equal(v.key, expected.shift())
        }
        else {
            test.notEqual('number', v.type, "There should be a key for that number");
        }
    }
    test.equal(expected.length, 0, "Not everything has been traversed");
    test.done();
};
