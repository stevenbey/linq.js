test = [1, 2, 3, 4, 1];

assert.throws(function() { test.first(0) }, 'first: non-function predicate', ArgumentException)

assert.equals(test.first(), 1, 'first (numeric array)');
assert.equals(test.first(function(v) { return v > 2 }), 3, 'first (numeric array): with predicate');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1}];

assert.equals(test.first().x, 1, 'first (object array)');
assert.equals(test.first(function(v) { return v.x > 2 }).x, 3, 'first (object array): with predicate');