//Assert.throws(containsTest.contains, "contains: no value", ArgumentNullOrUndefinedException);
Assert.isTrue(numbers.contains(1), "contains (numeric array)");
Assert.isFalse(objects.contains({ x: 1 }), "contains (object array): new object");
Assert.isTrue(objects.contains(objects[0]), "contains (object array)"); 