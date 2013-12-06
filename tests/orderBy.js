test = [1, 2, 3, 4, 1];

assert.throws(test.orderBy, 'orderBy: no predicate', ArgumentNullOrUndefinedException);

ordered = test.orderBy(function(v) { return v; });

assert.equals(ordered[0], 1, 'orderBy (numeric array): [0] === 1');
assert.equals(ordered[4], 4, 'orderBy (numeric array): [4] === 4');

assert.throws(test.orderByDescending, 'orderByDescending: no predicate', ArgumentNullOrUndefinedException);

ordered = test.orderByDescending(function(v) { return v; });

assert.equals(ordered[0], 4, 'orderByDescending (numeric array): [0] === 4');
assert.equals(ordered[4], 1, 'orderByDescending (numeric array): [4] === 1');

test = [{ x: 1, z: 5, b: 2 }, { x: 2, z: 6, b: 3 }, { x: 3, z: 7, b: 4 }, { x: 4, z: 3, b: 2 }, { x: 1, z: 2, b: 1 }];

ordered = test.orderBy(function(v) { return v.x; });

assert.equals(ordered[0].x, 1, 'orderBy (object array): [0].x === 1');
assert.equals(ordered[4].x, 4, 'orderBy (object array): [4].x === 4');

ordered = test.orderByDescending(function(v) { return v.x; });

assert.equals(ordered[0].x, 4, 'orderByDescending (object array): [0].x === 4');
assert.equals(ordered[4].x, 1, 'orderByDescending (object array): [4].x === 1');

assert.equals(test.orderBy(function(v) { return { z: v.z, b: v.b } })[0].x, 1, 'orderBy: with object')