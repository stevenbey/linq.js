test = [1, 2, 3, 4, 1];

assert.throws(test.where, 'where: no predicate', ArgumentNullOrUndefinedException);
assert.throws(function() { test.where(0) }, 'where: non-function predicate', ArgumentException);

assert.equals(test.where(function(v) { return v === 1 }).length, 2, 'where (numeric array): === 1');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1}];

assert.equals(test.where(function(o) { return o.x === 1 }).length, 2, 'where (object array): o.x === 1');