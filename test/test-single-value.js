var oi = require('../');

exports.testNull = function(test) {
    var source = null;
    var next = oi(source);
    test.equal(next().type, 'null', 'Type should be "null"');
    test.done();
};
