var groupByTest = [
    { x: 1, y: "a", z: false, a: "abd", b: [1, 2, 3] },
    { x: 2, y: "b", z: false, a: "bce", b: [1, 2, 3] },
    { x: 3, y: "c", z: false, a: "abc", b: [1, 2, 3] },
    { x: 4, y: "b", z: true, a: "cde", b: [1, 2, 3] },
    { x: 1, y: "c", z: true, a: "bcd", b: [1, 2, 3] }
];
Assert.throws(groupByTest.groupBy, "groupBy: no key selector", "Argument cannot be null. Parameter name: keySelector");
//assert.throws(function() { groupByTest.groupBy(function() { }, 0) }, "groupBy: non-function element selector", ArgumentException);
//assert.throws(function() { groupByTest.groupBy(function() { }, function() { }, 0) }, "groupBy: non-function result selector", ArgumentException);
var grouped = groupByTest.groupBy(function (v) { return v.x; });
Assert.equals(grouped.length, 4, "groupBy: with key selector (length)");
Assert.equals(grouped[0].key, 1, "groupBy: with key selector (key)");
Assert.equals(groupByTest.groupBy(function (v) { return v.x; }, function (v) { return v.a; })[0][0], "abd", "groupBy: with key selector and element selector");
Assert.equals(groupByTest.groupBy(function (v) { return v.x; }, function (v) { return v.a; }, function (k, a) { return ({ value: k * a.length }); })[0].value, 2, "groupBy: with key selector, element selector and result selector");
Assert.equals(groupByTest.groupBy(function (v) { return ({ z: v.z, b: v.b }); }).length, 2, "groupBy: with complex key");
