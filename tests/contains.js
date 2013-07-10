test = [1, 2, 3, 4, 1];

assert.throws(test.contains, 'contains: no value', ArgumentNullOrUndefinedException);

assert.isTrue(test.contains(1), 'contains (numeric array)');

test = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1}];

assert.isFalse(test.contains({ x: 1 }), 'contains (object array): new object');
assert.isTrue(test.contains(test[0]), 'contains (object array)');