test = [1, 2, 3, 4, 1];

assert.throws(test.aggregate, 'aggregate: no accumulator', ArgumentNullOrUndefinedException);
assert.throws(function() { test.aggregate(0) }, 'aggregate: non-function accumulator', ArgumentException);
assert.throws(function() { test.aggregate(function() { }, function() { }) }, 'aggregate: with accumulator and function seed');
assert.throws(function() { test.aggregate(function() { }, 0, 0) }, 'aggregate: with accumulator and numeric seed and non-function selector', ArgumentException);

assert.equals(test.aggregate(function(v, n) { return v + n }), 11, 'aggregate (numeric array): with accumulator');

assert.equals(test.aggregate(function(v, n) { return v + n }, 10), 21, 'aggregate (numeric array): with accumulator and numeric seed');
assert.equals(test.aggregate(function(v, n) { return v + n }, 10, function(v) { return 'The value is: ' + v }), 'The value is: 21', 'aggregate (numeric array): with accumulator, numeric seed and selector');

assert.equals(test.aggregate(function(v, n) { v.x += n; return v; }, { x: 10 }).x, 21, 'aggregate (numeric array): with accumulator and object seed');
assert.equals(test.aggregate(function(v, n) { v.x += n; return v; }, { x: 10 }, function(v) { return v.x }), 21, 'aggregate (numeric array): with accumulator, object seed and selector');

assert.throws(function() { test.average(0) }, 'average: non-function selector', ArgumentException);

assert.equals(test.average(), 2.2, 'average (numeric array)');
assert.equals(test.average(function(v) { return v / 2; }), 1.1, 'average (numeric array): with selector');

assert.throws(function() { test.max(0) }, 'max: non-function selector', ArgumentException);

assert.equals(test.max(), 4, 'max (numeric array)');
assert.equals(test.max(function(v) { return v / 2 }), 2, 'max (numeric array): with selector');

assert.throws(function() { test.min(0) }, 'min: non-function selector', ArgumentException);

assert.equals(test.min(), 1, 'min (numeric array)');
assert.equals(test.min(function(v) { return v * 2 }), 2, 'min (numeric array): with selector');

assert.throws(function() { test.sum(0) }, 'sum: non-function selector', ArgumentException);

assert.equals(test.sum(), 11, 'sum (numeric array)');
assert.equals(test.sum(function(v) { return v / 2; }), 5.5, 'sum (numeric array): with selector');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1 }];

assert.equals(test.aggregate(function(v, n) { v.x += n.x; return v; }).x, 11, 'aggregate (object array): with accumulator');

assert.equals(test.aggregate(function(v, n) { return v + n.x }, 10), 21, 'aggregate (object array): with accumulator, numeric seed and selector');
assert.equals(test.aggregate(function(v, n) { return v + n.x }, 10, function(v) { return 'The value is: ' + v }), 'The value is: 21', 'aggregate (object array): with accumulator, numeric seed and selector');

assert.equals(test.aggregate(function(v, n) { v.x += n.x; return v; }, { x: 10 }).x, 21, 'aggregate (object array): with accumulator and object seed');
assert.equals(test.aggregate(function(v, n) { v.x += n.x; return v; }, { x: 10 }, function(v) { return v.x }), 21, 'aggregate (object array): with accumulator, object seed and selector');

assert.throws(test.average, 'average (object array): without selector');

assert.equals(test.average(function(v) { return v.x; }), 2.2, 'average (object array): with selector');

assert.throws(test.max, 'max (object array): without selector');
assert.equals(test.max(function(v) { return v.x }), 4, 'max (object array): with selector');

assert.throws(test.min, 'min (object array): without selector');
assert.equals(test.min(function(v) { return v.x }), 1, 'min (object array): with selector');

assert.throws(test.sum, 'sum (object array): without selector');

assert.equals(test.sum(function(v) { return v.x; }), 11, 'sum (object array): with selector');