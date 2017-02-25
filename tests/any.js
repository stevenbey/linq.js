//Assert.throws(numbers.any, "any: no predicate", ArgumentNullOrUndefinedException);
//Assert.throws(() => { numbers.any(0) }, "any: non-function predicate", ArgumentException);
Assert.isFalse(numbers.any(function (v) { return v === 0; }), "any: === 0");
Assert.isTrue(numbers.any(function (v) { return v === 1; }), "any: === 1");
Assert.isFalse(objects.any(function (o) { return o.x === 0; }), "any: o.x === 0");
Assert.isTrue(objects.any(function (o) { return o.x === 1; }), "any: o.x === 1");
