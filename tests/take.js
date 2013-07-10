test = [1, 2, 3, 4, 1];

assert.throws(test.take, 'take: no count', ArgumentNullOrUndefinedException);
assert.throws(function() { test.take('0') }, 'take: non-number count', ArgumentException);

taken = test.take(1);

assert.equals(taken.length, 1, 'take (numeric array): length');
assert.equals(taken[0], 1, 'take (numeric array): first item');

assert.throws(test.takeWhile, 'takeWhile: no predicate', ArgumentNullOrUndefinedException);

taken = test.takeWhile(function(v) { return v < 3 });

assert.equals(taken.length, 2, 'takeWhile (numeric array): length');
assert.equals(taken[1], 2, 'takeWhile (numeric array): first item');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1}];

taken = test.take(1);

assert.equals(taken.length, 1, 'take (object array): length');
assert.equals(taken[0].x, 1, 'take (object array): first item');

taken = test.takeWhile(function(v) { return v.x < 3 });

assert.equals(taken.length, 2, 'takeWhile (object array): length');
assert.equals(taken[1].x, 2, 'takeWhile (object array): first item');