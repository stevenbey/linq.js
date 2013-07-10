test = [1, 2, 3, 4];

assert.throws(function() { test.last(0) }, 'last: non-function predicate', ArgumentException)

assert.equals(test.last(), 4, 'last (numeric array)');
assert.equals(test.last(function(v) { return v < 3 }), 2, 'last (numeric array): with predicate');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }];

assert.equals(test.last().x, 4, 'last (object array)');
assert.equals(test.last(function(v) { return v.x < 3 }).x, 2, 'last (object array): with predicate');