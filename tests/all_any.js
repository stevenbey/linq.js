test = [1, 2, 3, 4, 1];

assert.throws(test.all, 'all: no predicate', ArgumentNullOrUndefinedException);
assert.throws(function() { test.all(0) }, 'all: non-function predicate', ArgumentException);

assert.isFalse(test.all(function(v) { return v === 1 }), 'all: === 1');
assert.isTrue(test.all(function(v) { return v < 5 }), 'all: < 5');

assert.throws(test.any, 'any: no predicate', ArgumentNullOrUndefinedException);
assert.throws(function() { test.any(0) }, 'any: non-function predicate', ArgumentException);

assert.isFalse(test.any(function(v) { return v === 0 }), 'any: === 0');
assert.isTrue(test.any(function(v) { return v === 1 }), 'any: === 1');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1}];

assert.isFalse(test.all(function(o) { return o.x === 1 }), 'all: o.x === 1');
assert.isTrue(test.all(function(o) { return o.x < 5 }), 'all: o.x < 5');
assert.isFalse(test.any(function(o) { return o.x === 0 }), 'any: o.x === 0');
assert.isTrue(test.any(function(o) { return o.x === 1 }), 'any: o.x === 1');