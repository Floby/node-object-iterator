[![Build Status](https://travis-ci.org/Floby/node-object-iterator.png)](https://travis-ci.org/Floby/node-object-iterator)

node-object-iterator
====================

> A module to walk through an object with an iterator

Installation
------------

    npm install --save object-iterator

Usage
-----

An iterator is a function you can call several times and of which you should expect a different value
every time. In this case, the iterator iterates over the given object and returns this kind of object
every time
    
    {
        type: 'array|object|number|boolean|string|null|end-array|end-object'
        value: 8 // actual value
        key: 0 // the key (number or string) on which this value was found
    }

* `type` is the current state of the iterator. It mostly indicates the type of the current value
* `value` (optional) present when the current value is a simple value (as opposed to an array or object)
* `key` is the key this value was found on. String for objects, numbers for arrays


```javascript
var ObjectIterator = require('object-iterator');
var source = [8, {one: 1, yes: true}, null];
var next = ObjectIterator(source);
var v;
while(v = next()) {
    console.log(v.type);
}

// array
// number
// object
// number
// boolean
// end-object
// null
// end-array
```

An `ObjectIterator()` is itself an [iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators)
an can be used as such

```javascript
var ObjectIterator = require('object-iterator');
var source = [8, {one: 1, yes: true}, null];
for (let v of ObjectIterator(source)) {
  console.log(v)
}

// array
// number
// object
// number
// boolean
// end-object
// null
// end-array
```


Reference
---------

#### ObjectIterator(source)

Returns an iterator over the given source value.



License
-------

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Florent Jaby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
