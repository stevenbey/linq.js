//Assert.throws(numbers.all, "all: no predicate", ArgumentNullOrUndefinedException);
//Assert.throws(() => { numbers.all(0) }, "all: non-function predicate", ArgumentException);
Assert.isFalse(numbers.all(v => v === 1), "all: === 1");
Assert.isTrue(numbers.all(v => v < 5), "all: < 5");
Assert.isFalse(objects.all(o => o.x === 1), "all: o.x === 1");
Assert.isTrue(objects.all(o => o.x < 5), "all: o.x < 5");