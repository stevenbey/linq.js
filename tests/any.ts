//Assert.throws(numbers.any, "any: no predicate", ArgumentNullOrUndefinedException);
//Assert.throws(() => { numbers.any(0) }, "any: non-function predicate", ArgumentException);
Assert.isFalse(numbers.any(v => v === 0), "any: === 0");
Assert.isTrue(numbers.any(v => v === 1), "any: === 1");
Assert.isFalse(objects.any(o => o.x === 0), "any: o.x === 0");
Assert.isTrue(objects.any(o => o.x === 1), "any: o.x === 1"); 