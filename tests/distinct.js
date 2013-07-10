test = [1, 2, 3, 4, 1];

assert.throws(function() { test.distinct(0) }, 'distinct: non-function selector', ArgumentException)

assert.equals(test.distinct().length, 4, 'distinct (numeric array)');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1}];

assert.equals(test.distinct(function(o) { return o.x }).length, 4, 'distinct (object array)');