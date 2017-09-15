const
    path = '../underpants',
    _ = require(path),
    expect = require('chai').expect,
    assert = require('chai').assert,
    sinon = require('sinon');

describe('Underpants', function() {

  describe('identity', function() {
    assert.strictEqual( _.identity(14), 14, "Should handle numbers.");
    assert.deepEqual( _.identity({a: "one"}), {a: "one"}, "Should handle objects.");
    assert.strictEqual(_.identity("hello there"), "hello there", "Should handle strings.");
    assert.deepEqual(_.identity([1,2,3]), [1,2,3], "Should handle arrays.");
  });

  describe('typeOf', function() {
    assert.strictEqual(_.typeOf("a"), "string", "Should handle strings");
    assert.strictEqual(_.typeOf(10), "number", "Should handle numbers");
    assert.strictEqual(_.typeOf([1,3]), "array", "Should handle arrays");
    assert.strictEqual(_.typeOf({a: "one"}), "object", "Should handle objects");
    assert.strictEqual(_.typeOf(false), "boolean", "Should handle booleans");
    assert.strictEqual(_.typeOf(undefined), "undefined", "Should handle undefined");
    assert.strictEqual(_.typeOf(null), "null", "Should handle null");
    assert.strictEqual(_.typeOf(function(){}), "function", "Should handle functions");
  });

  describe('first', function() {
    assert.deepEqual(_.first(["a","b","c"]) ,"a", "Should return the first element if no numerical argument is given.");
    assert.deepEqual(_.first(["a","b","c"],2) ,["a","b"], "Should accept an argument representing the number of items to include in the output.");
    assert.deepEqual(_.first(["a","b","c"], -1) ,[], "Should return empty list if numerical argument is not a positive number.");
    assert.deepEqual(_.first(["a","b","c"], 5) ,["a","b","c"], "Should return the whole array if numerical argument is greater than the array's length.");
    assert.deepEqual(_.first({a:"b"}, 2), [], "Should return empty array if the array param is not an array.");
  });

  describe('last', function() {
    assert.deepEqual(_.last(["a","b","c"]) ,"c", "Should return the last element if no numerical argument is given.");
    assert.deepEqual(_.last(["a","b","c"],2) ,["b","c"], "Should accept an argument representing the number of items to include in the output.");
    assert.deepEqual(_.last(["a","b","c"], -1) ,[], "Should return empty list if numerical argument is not a positive number.");
    assert.deepEqual(_.last(["a","b","c"], 5) ,["a","b","c"], "Should return the whole array if numerical argument is greater than the array's length.");
    assert.deepEqual(_.last({a:"b"}, 2), [], "Should return empty array if the array param is not an array.");
  });

  describe('each', function() {
    var inputArray = [1, 2, 3, 4, 5];
    inputArray.ignoreMe = "this shouldn't show up";
    var inputObject = { a: "1", b: "2", c: "3", d: "4" };

    _.each(inputArray, function(e, i, a) {
      inputArray[i] = e * a.length;
    });
    assert.deepEqual(inputArray, [5, 10, 15, 20, 25], "Should handle arrays.");

    _.each(inputObject, function(v, k, o) {
      inputObject[v] = k + Object.keys(o).length;
      delete inputObject[k];
    });
    assert.deepEqual(inputObject, { 1: "a4", 2: "b4", 3: "c4", 4: "d4" }, "Should handle Objects.");
  });

  describe('indexOf', function() {
    var inputData = ["a", "b", "c", "d"];
    assert.deepEqual(_.indexOf(inputData, "b"), 1, "Should return the correct index when an element is found.");
    assert.deepEqual(_.indexOf(inputData.concat("b"), "b"), 1, "Should return the index of the first occurance of a found element.");
    assert.deepEqual(_.indexOf(inputData, "e"), -1, "Should return -1 if the element is not found.");
    assert.deepEqual(inputData, ["a", "b", "c", "d"], "Should not have side effects.");
  });

  describe('filter', function() {
    beforeEach(function() {
      sinon.spy(_, 'each');
      // const each = sinon.spy(_.each);
      sinon.spy(_, 'filter');
    });

    afterEach(function() {
      _.each.restore();
      _.filter.restore();
    });

    var inputData = ["a", 1, "b", 2, "c", 4];
    assert.deepEqual(_.filter(inputData, function(e, i, a) {
        return typeof e === "string" && i < a.length / 2;
      }), ["a", "b"], "Should filter elements in an array.");
    assert.deepEqual(inputData, ["a", 1, "b", 2, "c", 4], "Should not have side effects.");

    // TODO: Incorporate test to see if each is used
    // xit('should use the _.each function', function() {
    //   var isEven = function(num) { return num % 2 === 0; };
    //   expect(_.each.calledOnce).to.be.false;
    //
    //   _.filter([1, 2, 3, 4, 5, 6], isEven);
    //
    //   console.log('each', _.each);
    //   expect(_.each.calledOnce).to.be.true;
    // });
  });

  describe('reject', function() {
    var inputData = ["a", 1, "b", 2, "c", 4];
    assert.deepEqual(_.reject(inputData, function(e, i, a) {
        return typeof e === "string" || i < a.length / 2;
      }), [2, 4], "Should reject elements in an array.");
    assert.deepEqual(inputData, ["a", 1, "b", 2, "c", 4], "Should not have side effects.");

    // TODO: Incorporate test to see if filter is used
  });

  describe('partition', function() {
    var inputData = ["a", 1, "b", 2, "c", 4];
    assert.deepEqual(_.partition(inputData, function(e, i, a) {
        return typeof e === "string";
      }), [["a", "b", "c"], [1, 2, 4]], "Should reject elements in an array.");
    assert.deepEqual(inputData, ["a", 1, "b", 2, "c", 4], "Should not have side effects.");

    // TODO: Add tests to check if filter and reject are used
    // xit('should use the _.filter function', function() {
    //   expect(_.filter.called).to.be.true;
    // });
    //
    // xit('should use the _.reject function', function() {
    //   expect(_.reject.called).to.be.true;
    // });
  });

  describe('unique', function() {
    var inputData = ["a", 1, 1, "a", "c", false, "b", 5, "c", null, false, null];
    assert.deepEqual(_.unique(inputData), ["a", 1, "c", false, "b", 5, null], "Should return an array with no duplicates.");
    assert.deepEqual(inputData, ["a", 1, 1, "a", "c", false, "b", 5, "c", null, false, null], "Should not have side effects.");
  });

  describe('map', function() {
    var inputArray = ["a", "b", "c", "d"];
    var inputObject = { a: 1, b: 2, c: 3, d: 4 };
    assert.deepEqual(_.map(inputArray, function(e, i, a) {
        return e + i * a.length;
      }), ["a0", "b4", "c8", "d12"], "Should map through arrays.");
    assert.deepEqual(_.map(inputObject, function(v, k, o) {
        return k + v * Object.keys(o).length;
      }), ["a4", "b8", "c12", "d16"], "Should map through Objects.");
    assert.deepEqual([inputArray, inputObject], [["a", "b", "c", "d"], { a: 1, b: 2, c: 3, d: 4 }], "Should not have side effects.");

    // TODO: add test to see if each is used
    // xit('should use the _.each function', function() {
    //   console.log(_.map.toString());
    //   expect(_.map.toString()).to.contain('_.each');
    // });
  });

  describe('pluck', function() {
    var inputData = [{ name: "Ralph", age: 22 }, { name: "Jimmy", age: 13 }, { name: "Carla", age: 20 }];
    assert.deepEqual(_.pluck(inputData, "name"), ["Ralph", "Jimmy", "Carla"], "Should pluck properties out of a list of objects.");
    assert.deepEqual(inputData, [{ name: "Ralph", age: 22 }, { name: "Jimmy", age: 13 }, { name: "Carla", age: 20 }], "Should not have side effects.");
  });

  describe('contains', function() {
    var inputData = [1, "3", 4, 5, "a", "4", "b"];
    assert.strictEqual(_.contains(inputData, "a"), true, "Should return true if a list contains an element.");
    assert.strictEqual(_.contains(inputData, "c"), false, "Should return false if a list doesn't contain an element.");
    assert.strictEqual(_.contains(inputData, 3), false, "Should not convert types when checking.");
    assert.deepEqual(inputData, [1, "3", 4, 5, "a", "4", "b"], "Should not have side effects.");
  });

  describe('every', function() {
    var inputData = [2, 4, 6, 7, 8];
    var inputDataTruthy = [1, [], true, "a"];
    var inputDataFalsy = ["", 0, false, null];
    var inputObject = { a: "one", b: "two", c: "three" };
    assert.deepEqual(_.every(inputData, function(v) {
        return v % 2 === 0 || v === 7;
      }), true, "Should return true when all iterations are true");
    assert.deepEqual(_.every(inputData, function(v) {
        return v % 2 === 0;
      }), false, "Should return false when not all iterations are true");
    assert.deepEqual(_.every(inputObject, function(v, k, o) {
        return ["aone3", "btwo3", "cthree3"].indexOf(k + v + Object.keys(o).length) !== -1;
      }), true, "Should handle objects");
    assert.deepEqual(_.every(inputDataTruthy), true, "Should return true for truthy results when no function is passed in.");
    assert.deepEqual(_.every(inputDataFalsy), false, "Should return false for falsy results when no function is passed in.");
    assert.deepEqual(inputData, [2, 4, 6, 7, 8], "Should not have side effects.");
  });

  describe('some', function() {
    var inputData = [2, 4, 6, 7, 8];
    var inputDataTruthy = [1, [], true, "a"];
    var inputDataFalsy = ["", 0, false, null];
    var inputObject = { a: "one", b: "two", c: "three" };
    assert.deepEqual(_.some(inputData, function(v) {
        return v === 7;
      }), true, "Should return true when at least one iteration is true");
    assert.deepEqual(_.some(inputData, function(v) {
        return v > 10;
      }), false, "Should return false when no iterations are true");
    assert.deepEqual(_.some(inputObject, function(v, k, o) {
        return ["aone3", "btwo3"].indexOf(k + v + Object.keys(o).length) !== -1;
      }), true, "Should handle objects");
    assert.deepEqual(_.some(inputDataTruthy), true, "Should return true for truthy results when no function is passed in.");
    assert.deepEqual(_.some(inputDataFalsy), false, "Should return false for falsy results when no function is passed in.");
    assert.deepEqual(inputData, [2, 4, 6, 7, 8], "Should not have side effects.");
  });

  describe('reduce', function() {
    assert.strictEqual(_.reduce(inputArray, function(memo, element, i){
        return memo + element + i;
    }, 10), 116, "Should work with an array and a seed");
    assert.strictEqual(_.reduce(inputArray, function(memo, element, i){
        return memo * element * (i+1);
    }), 5760000, "Should work without a seed");
    assert.strictEqual(_.reduce(inputArray, function(memo, element, i){
        return memo * element * (i+1);
    }, 0), 0, "Should work when seed is falsy");
  });

  describe('extend', function() {
    var inputData = { a: "one", b: "two" };
    _.extend(inputData, { c: "three", d: "four" });
    assert.deepEqual(inputData, { a: "one", b: "two", c: "three", d: "four" }, "Should extend an object.");
    inputData = { a: "one", b: "two" };
    _.extend(inputData, { a: "three", d: "four" });
    assert.deepEqual(inputData, { a: "three", b: "two", d: "four" }, "Should overwrite existing properties");
    inputData = { a: "one", b: "two" };
    _.extend(inputData);
    assert.deepEqual(_.extend(inputData, { a: "three", c: "four" }, { d: "five", c: "six" }), { a: "three", b: "two", c: "six", d: "five" }, "Should handle any number of arguments.");
  });
});
