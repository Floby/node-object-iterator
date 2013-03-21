var oi = require('../');

exports.testArrayInObject = function(test) {
    var source = {array: [1]};
    var expected = ['object', 'array', 'number', 'end-array', 'end-object'];
    var next = oi(source);
    var v;
    while(v = next()) {
        test.equal(v.type, expected.shift(), "Unexpected token type");
        if(v.type == 'array') {
            test.deepEqual(v.key, 'array', 'Unexpected key for that value');
        }
        else if(v.type == 'number') {
            test.deepEqual(v.key, 0, 'Unexpected key for that value');
        }
    }
    test.equal(0, expected.length, 'Not everything has been traversed');
    test.done();
}

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
