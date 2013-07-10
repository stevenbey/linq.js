test = [1];

assert.throws(test.select, 'select: no selector', ArgumentNullOrUndefinedException);
assert.throws(function() { test.select(0) }, 'select: non-function selector', ArgumentException);

assert.equals(test.select(function(v) { return v / 2 })[0], 0.5, 'select (numeric array): with selector');
assert.equals(test.select(function(v, i) { return v * i })[0], 0, 'select (numeric array): with selector (using index)');

test = [{ x: 1 }];

assert.equals(test.select(function(v) { return v.x / 2 })[0], 0.5, 'select (object array): with selector');
assert.equals(test.select(function(v, i) { return v.x * i })[0], 0, 'select (object array): with selector (using index)');

test = [
	{
        x: [
            { x: 1, y: "a", z: false, a: "abd", b: [1, 2, 3] },
            { x: 2, y: "b", z: false, a: "bce", b: [1, 2, 3] },
            { x: 3, y: "c", z: false, a: "abc", b: [1, 2, 3] },
            { x: 4, y: "b", z: true, a: "cde", b: [1, 2, 3] },
            { x: 1, y: "c", z: true, a: "bcd", b: [1, 2, 3] }
        ]
    }
];

assert.throws(test.selectMany, 'selectMany: no collection selector', ArgumentNullOrUndefinedException);
assert.throws(function() { test.selectMany(function() { }, 0) }, 'selectMany: non-function result selector', ArgumentException);

assert.equals(test.selectMany(function(o) { return o.x }).length, 5, 'selectMany: with collection selector');
assert.equals(test.selectMany(function(o) { return o.x }, function(o) { return o.x })[0], 1, 'selectMany: with collection selector and result selector');
assert.equals(test.selectMany(function(o) { return o.x }).selectMany(function(o) { return o.b }).length, 15, 'selectMany: chained');