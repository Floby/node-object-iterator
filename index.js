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
                    return res;
                }
                break;
            default:
                throw new Error('Unknown state: '+state);
                break;
        }
    }
}

function makeGetCurrent (value) {
    if(Array.isArray(value)) {
        return arrayGetCurrent(value);
    }
    else {
    }
        return objectGetCurrent(value);
}

function arrayGetCurrent (array) {
    var getCurrent = function() {
        if(getCurrent.index >= array.length) {
            return;
        }
        return array[getCurrent.index++];
    }
    getCurrent.index = 0;
    return getCurrent;
}

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
