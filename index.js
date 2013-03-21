/**
 * Creates an iterator for the given object
 * @param source The object to iterate on
 * @param checkRecursive not used for now
 */
module.exports = function ObjectIterator(source, checkRecursive) {
    var _sent = []; // not used for now
    if(checkRecursive && typeof checkRecursive == 'array') {
        _sent = checkRecursive;
    }

    // determine type. Sometimes array come up as object with typeof
    var type = Array.isArray(source) ? 'array' : typeof source;
    var type = getType(source);

    // if it's just a single value, things are easy
    if(isSimpleValue(type)) {
        var sent = false;
        return function () {
            if(sent) return;
            sent = true;
            return {
                type: type,
                value: source
            }
        }
    }
    // prepare for the battle
    else {
        var getCurrent = makeGetCurrent(source);
    }
    
    var state = 'start';
    var childIterator;

    /**
     * Each call to this iterator will emit an object like this
     *  - type: a string describing the state of the iterator.
     *      usually the type of the current value or end-<type> for 
     *      composed values
     *  - value: the actual value. This field is not always set
     */
    return function iterator() {
        switch(state) {
            case 'ending':
                state = 'ended';
                return {
                    type: 'end-'+type,
                    value: null
                }
            case 'ended':
                return;
                break;

            case 'start':
                state = 'traversing';
                return {
                    type: type,
                    value: null
                }
                break;
            case 'traversing':
                // if there's no current iterator to read from
                if(!childIterator) {
                    // try and the current child value to iterate on
                    var c = getCurrent();
                    if(c) {
                        childIterator = ObjectIterator(c);
                    }
                    else {
                        // if no current child value, just end it all
                        state = 'ending';
                    }
                    // here we go again
                    return iterator();
                }
                else {
                    // iterate on children if they exist
                    var res = childIterator();
                    if(!res) {
                        // if end of iterator
                        // forget about it and have another try
                        childIterator = null;
                        return iterator();
                    }
                    if(!res.key && res.key !== 0) {
                        res.key = getCurrent.key;
                    }
                    return res;
                }
                break;
            default:
                throw new Error('Unknown state: '+state);
                break;
        }
    }
}

/**
 * Returns a function that will iterate over the values
 * of the given composed value (array/object)
 * @param value [Object|Array] the value on which to iterate
 */
function makeGetCurrent (value) {
    if(Array.isArray(value)) {
        return arrayGetCurrent(value);
    }
    else {
    }
        return objectGetCurrent(value);
}

/**
 * iterate over an array
 */
function arrayGetCurrent (array) {
    var getCurrent = function() {
        if(getCurrent.key >= array.length) {
            return;
        }
        return array[++getCurrent.key];
    }
    getCurrent.key = -1;
    return getCurrent;
}

/**
 * iterate over an object
 */
function objectGetCurrent (object) {
    var keys = Object.keys(object);
    var getCurrent = function() {
        if(!keys.length) return;
        getCurrent.key = keys.shift();
        return object[getCurrent.key];
    }
    return getCurrent;
}

/**
 * test if the given type of value is a composed or simple
 * value
 * @param type [String] the type of value
 */
function isSimpleValue (type) {
    switch(type) {
        case 'array':
        case 'object':
            return false;
            break;
        default:
            return true;
            break;
    }
}

function getType (source) {
    var type = Array.isArray(source) ? 'array' : typeof source;
    if(source === null) type = 'null';
    return type;
}
