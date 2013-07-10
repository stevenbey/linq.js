test = [1, 2, 3, 4, 1];

assert.throws(test.skip, 'skip: no count', ArgumentNullOrUndefinedException);
assert.throws(function() { test.skip('0') }, 'skip: non-number count', ArgumentException);

skipped = test.skip(1);

assert.equals(skipped.length, 4, 'skip (numeric array): length');
assert.equals(skipped[0], 2, 'skip (numeric array): first item');

assert.throws(test.skipWhile, 'skipWhile: no predicate', ArgumentNullOrUndefinedException);

skipped = test.skipWhile(function(v) { return v < 3 });

assert.equals(skipped.length, 3, 'skipWhile (numeric array): length');
assert.equals(skipped[0], 3, 'skipWhile (numeric array): first item');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1}];

skipped = test.skip(1);

assert.equals(skipped.length, 4, 'skip (object array): length');
assert.equals(skipped[0].x, 2, 'skip (object array): first item');

skipped = test.skipWhile(function(v) { return v.x < 3 });

assert.equals(skipped.length, 3, 'skipWhile (object array): length');
assert.equals(skipped[0].x, 3, 'skipWhile (object array): first item');