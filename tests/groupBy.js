var test = [
    { x: 1, y: "a", z: false, a: "abd", b: [1, 2, 3] },
    { x: 2, y: "b", z: false, a: "bce", b: [1, 2, 3] },
    { x: 3, y: "c", z: false, a: "abc", b: [1, 2, 3] },
    { x: 4, y: "b", z: true, a: "cde", b: [1, 2, 3] },
    { x: 1, y: "c", z: true, a: "bcd", b: [1, 2, 3] }
];

assert.throws(test.groupBy, 'groupBy: no key selector', ArgumentNullOrUndefinedException);
assert.throws(function() { test.groupBy(function() { }, 0) }, 'groupBy: non-function element selector', ArgumentException);
assert.throws(function() { test.groupBy(function() { }, function() { }, 0) }, 'groupBy: non-function result selector', ArgumentException);

grouped = test.groupBy(function(v) { return v.x; });

assert.equals(grouped.length, 4, 'groupBy: with key selector (length)');
assert.equals(grouped[0].key, 1, 'groupBy: with key selector (key)');

assert.equals(test.groupBy(function(v) { return v.x; }, function(v) { return v.a; })[0][0], "abd", 'groupBy: with key selector and element selector')

assert.equals(test.groupBy(function(v) { return v.x; }, function(v) { return v.a; }, function(k, a) { return { value: k * a.length }; })[0].value, 2, 'groupBy: with key selector, element selector and result selector')

assert.equals(test.groupBy(function(v) { return { z: v.z, b: v.b } }).length, 2, 'groupBy: with complex key')