// This makes the arguments variable behave the way we want it to and a few
// other things. For more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

var _ = {};


/**
* START OF OUR LIBRARY!
* Implement each function below its instructions
*/

/** _.identity
* Arguments:
*   1) Any value
* Objectives:
*   1) Returns <value> unchanged
* Examples:
*   _.identity(5) === 5
*   _.identity({a: "b"}) === {a: "b"}
*/

// define the function, it should take in the value
// return the value

_.identity = (val) => val;

/** _.typeOf
* Arguments:
*   1) Any value
* Objectives:
*   1) Return the type of <value> as a string
*       Types are one of:
*          - "string"
*          - "array"
*          - "object"
*          - "undefined"
*          - "number"
*          - "boolean"
*          - "null"
*          - "function"
* Examples:
* _.typeOf(134) -> "number"
* _.typeOf("javascript") -> "string"
* _.typeOf([1,2,3]) -> "array"
*/

// store value in function declaration
// if it is an array, return "array"
// if it is null, return "null"
// otherwise, return typeof value

_.typeOf = (val) => {
    if (Array.isArray(val) === true) {
        return "array";
    }
    return val === null ? "null" : typeof val;
};

/** _.first
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the first element in <array>.
*   3) Otherwise, return the first <number> items of <array>
* Edge Cases:
*   1) What if <number> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.first("ponies", 1) -> []
*   _.first(["a", "b", "c"], "ponies") -> "a"
*   _.first(["a", "b", "c"], 1) -> "a"
*   _.first(["a", "b", "c"], 2) -> ["a", "b"]
*/

// declare function, take an array and a number
// check if it is an array
// if its not, return []
// if number is not a number
//return first element in an array
// if number is a number...
// if it's negative, return []
// return the first _ elements in the array. if it's bigger, return the full array.

_.first = (arr, num) => {
    if (!(Array.isArray(arr)) || num < 0 || isNaN(num)) {
        return isNaN(num) ? arr[0] : [];
    }
    if (num > arr.length) {
        return arr;
    }
    return arr.slice(0, num);
};

/** _.last
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the last element in <array>.
*   3) Otherwise, return the last <number> items of <array>
* Edge Cases:
*   1) What if <number> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.last("ponies", 2) -> []
*   _.last(["a", "b", "c"], "ponies") -> "c"
*   _.last(["a", "b", "c"], 1) -> "c"
*   _.last(["a", "b", "c"], 2) -> ["b", "c"]
*/

// last should accept an array and a number
// if arr is not an array or num is negative, return []
// if num is not a number, return last element
// if num > arr.length, return whole array
// return last {number} amount of items in the array otherwise

_.last = (arr, num) => {
    if (!(Array.isArray(arr)) || num < 0 || isNaN(num)) {
        return isNaN(num) ? arr[arr.length - 1] : [];
    }
    if (num > arr.length) {
        return arr;
    }
    return arr.slice(arr.length - num, arr.length);
};


/** _.indexOf
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return the index of <array> that is the first occurrence of <value>
*   2) Return -1 if <value> is not in <array>
*   3) Do not use [].indexOf()!
* Edge Cases:
*   1) What if <array> has multiple occurrences of val?
*   2) What if <val> isn't in <array>?
* Examples:
*   _.indexOf(["a","b","c"], "c") -> 2
*   _.indexOf(["a","b","c"], "d") -> -1
*/

// takes in an array and a value
// return index of arr that is FIRST occurrence of val
// return -1 if val is not present
// don't use [].indexOf()

_.indexOf = (arr, val) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
    return -1;
};

/** _.contains
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
*   3) You must use the ternary operator in your implementation.
* Edge Cases:
*   1) did you use === ?
*   2) what if no <value> is given?
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
*/

// accepts array and a value
// return true if arr contains val, otherwise false
// must use ternary

_.contains = (arr, val) => (arr.includes(val)) ? true : false;

/** _.each
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) if <collection> is an array, call <function> once for each element
*      with the arguments:
*         the element, its index, <collection>
*   2) if <collection> is an object, call <function> once for each property
*      with the arguments:
*         the property's value, its key, <collection>
* Examples:
*   _.each(["a","b","c"], function(e,i,a){ console.log(e)});
*      -> should log "a" "b" "c" to the console
*/

// accepts a collection of values and a function
// if collection is array, call function once per element
// w/ arguments of element, its index, <collection>
// if collection is an object, call function once per property
// w/ arguments of property value, its key, <collection>

_.each = (col, func) => {
    if (Array.isArray(col)) {
        for (let i = 0; i < col.length; i++) {
            func(col[i], i, col);
        }
    } else {
        for (let property in col) {
            func(col[property], property, col);
        }
    }
};

/** _.unique
* Arguments:
*   1) An array
* Objectives:
*   1) Return a new array of all elements from <array> with duplicates removed
*   2) Use _.indexOf() from above
* Examples:
*   _.unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
*/

// accepts an array
// return a new array of all elems with duplicates removed
// use _.indexOf()

_.unique = (arr) => {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (_.indexOf(arr, arr[i]) === i) {
            newArr.push(arr[i]);
        }
    }

    return newArr;
};

/** _.filter
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, its index, <array>
*   2) return a new array of elements for which calling <function> returned true
* Edge Cases:
*   1) What if <function> returns something other than true or false?
* Examples:
*   _.filter([1,2,3,4,5], function(x){return x%2 === 0}) -> [2,4]
* Extra Credit:
*   use _.each in your implementation
*/

// accepts an array and a function
// call func for each elem in array
// w/ arguments of element, its index, <array>
// return new array for which calling function returned true

_.filter = (arr, func) => {
    const newArr = [];
    _.each(arr, function (elem, index, arr2) {
        if (func(elem, index, arr2)) {
            newArr.push(elem);
        }
    });
    return newArr;
};

/** _.reject
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, its index, <array>
*   2) return a new array of elements for which calling <function> returned false
*   3) This is the logical inverse if _.filter()
* Examples:
*   _.reject([1,2,3,4,5], function(e){return e%2 === 0}) -> [1,3,5]
*/

// accepts an array and a function
// call func for each elem
// w/ arguments of element, index, array
// return new array of elems for which calling function returned false
// opposite of _.filter()

_.reject = (arr, func) => {
    const newArr = [];
    _.each(arr, function (elem, index, arr2) {
        if (!(func(elem, index, arr2))) {
            newArr.push(elem);
        }
    });
    return newArr;
};

/** _.partition
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) Call <function> for each element in <array> passing it the arguments:
*       element, key, <array>
*   2) Return an array that is made up of 2 sub arrays:
*       0) An array that contains all the values for which <function> returned something truthy
*       1) An array that contains all the values for which <function> returned something falsy
* Edge Cases:
*   1) This is going to return an array of arrays.
* Examples:
*   _.partition([1,2,3,4,5], function(element,index,arr){
*     return element % 2 === 0;
*   }); -> [[2,4],[1,3,5]]
}
*/

// accepts array and a function
// call function for for each elem
// w/ arguments of elem, key, arr
// return arr of 2 sub arrs:
//    array that contains all values for truthy
//    array that contains all values for falsy

_.partition = (arr, func) => {
    const newArr = [[], []];
    _.each(arr, function (elem, index, arr2) {
        if (func(elem, index, arr2)) {
            newArr[0].push(elem);
        } else {
            newArr[1].push(elem);
        }
    });
    return newArr;
};

/** _.map
* Arguments:
*   1) A collection
*   2) a function
* Objectives:
*   1) call <function> for each element in <collection> passing the arguments:
*        if <collection> is an array:
*            the element, its index, <collection>
*        if <collection> is an object:
*            the value, its key, <collection>
*   2) save the return value of each <function> call in a new array
*   3) return the new array
* Examples:
*   _.map([1,2,3,4], function(e){return e * 2}) -> [2,4,6,8]
*/

// accepts a collection and a function
// call func for each elem in collection passing arguments:
//     if coll is an array: elem, its index, and the collection
//     if coll is an object: its value, its key, and the collection
// save and return value of each function call in a new array
// return new array

_.map = (col, func) => {
    const newArr = [];
    _.each(col, function (elem, index, collection) {
        newArr.push(func(elem, index, collection));
    });
    return newArr;
};

/** _.pluck
* Arguments:
*   1) An array of objects
*   2) A property
* Objectives:
*   1) Return an array containing the value of <property> for every element in <array>
*   2) You must use _.map() in your implementation.
* Examples:
*   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/

// accepts array of objects and a property
// return array containing property for every elem
// must use _.map()

_.pluck = (objArr, property) => {
    return _.map(objArr, function (elem, index, col) {
        return elem[property];
    });
};

/** _.every
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the parameters:
*      if <collection> is an array:
*          current element, its index, <collection>
*      if <collection> is an object:
*          current value, current key, <collection>
*   2) If the return value of calling <function> for every element is true, return true
*   3) If even one of them returns false, return false
*   4) If <function> is not provided, return true if every element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.every([2,4,6], function(e){return e % 2 === 0}) -> true
*   _.every([1,2,3], function(e){return e % 2 === 0}) -> false
*/

// accepts a collection and a func
// call function for every elem of collection with following parameters:
//      if array, current elem, its index, collection
//      if object, current val, its key, collection
// if all elements are true, return true
// if any are false, return false
// if no function, return true if all truthy, otherwise false

_.every = (col, func) => {
    let allTrue  = true;
    if (_.typeOf(func) !== "function") {
        _.each(col, function (elem, index, collection) {
            if (!(elem)) {
                allTrue = false;
            }
        })
    } else {
        _.each(col, function (elem, index, collection) {
            if (!(func(elem, index, collection))) {
                allTrue = false;
            }
        });
    }
    return allTrue;
};

/** _.some
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the parameters:
*       if <collection> is an array:
*        current element, it's index, <collection>
*       if <collection> is an object:
*        current value, current key, <collection>
*   2) If the return value of calling <function> is true for at least one element, return true
*   3) If it is false for all elements, return false
*   4) If <function> is not provided return true if at least one element is truthy, otherwise return false
* Edge Cases:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.some([1,3,5], function(e){return e % 2 === 0}) -> false
*   _.some([1,2,3], function(e){return e % 2 === 0}) -> true
*/

// accepts a collection and a func
// call function for every elem of collection with following parameters:
//      if array, current elem, its index, collection
//      if object, current val, its key, collection
// if all elements are false, return false
// if any are true, return true
// if no function, return false if all falsy, otherwise true

_.some = (col, func) => {
    let hasTrue = false;
    if (_.typeOf(func) !== "function") {
        _.each(col, function (elem, index, collection) {
            if (elem) {
                hasTrue = true;
            }
        })
    } else {
        _.each(col, function (elem, index, collection) {
            if (func(elem, index, collection)) {
                hasTrue = true;
            }
        });
    }
    return hasTrue;
};

/** _.reduce
* Arguments:
*   1) An array
*   2) A function
*   3) A seed
* Objectives:
*   1) Call <function> for every element in <collection> passing the arguments:
*         previous result, element, index
*   2) Use the return value of <function> as the "previous result"
*      for the next iteration
*   3) On the very first iteration, use <seed> as the "previous result"
*   4) If no <seed> was given, use the first element/value of <collection> as <seed> and continue to the next element
*   5) After the last iteration, return the return value of the final <function> call
* Edge Cases:
*   1) What if <seed> is not given?
* Examples:
*   _.reduce([1,2,3], function(previousSum, currentValue, currentIndex){ return previousSum + currentValue }, 0) -> 6
*/

// Create the reduce function, it takes array, function, and seed
// call the function for every element, passing prev, element, index.
    // if there is no seed, use the first element
    // otherwise, use seed as prev.
    // when you call the function next, prev is whatever the function returns
// return the result of the final function call.

_.reduce = (arr, func, seed) => {
    let prev = seed
    let counter = 0;
    if (prev === undefined) {
      prev = arr[0];  
      counter = 1;
    }
    while (counter < arr.length) {
        prev = func(prev, arr[counter], counter);
        counter++;
    }
    return prev;
}

/** _.extend
* Arguments:
*   1) An Object
*   2) An Object
*   ...Possibly more objects
* Objectives:
*   1) Copy properties from <object 2> to <object 1>
*   2) If more objects are passed in, copy their properties to <object 1> as well, in the order they are passed in.
*   3) Return the update <object 1>
* Examples:
*   var data = {a:"one"};
*   _.extend(data, {b:"two"}); -> data now equals {a:"one",b:"two"}
*   _.extend(data, {a:"two"}); -> data now equals {a:"two"}
*/

// create the function, take in theoretically infinite arguments, all of which should be objects.
// iterate over every other object, modifying object 1.
    // put each property as a property of the object 1 copy.
// return the copy.

_.extend = (...objs) => {
    for (let i = 1; i < objs.length; i++) {
        for (let key in objs[i]) {
            objs[0][key] = objs[i][key];
        }
    }
    return objs[0]
}



//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = _;
}
