Assert.throws([].average, "average: empty array", "Sequence contains no elements");
Assert.equals(numbers.average, 2.2, "average (numeric array)");
Assert.equals(() => numbers.average(v => (v / 2)), 1.1, "average (numeric array): with selector");
Assert.equals(() => objects.average(v => v.x), 2.2, "average (object array): with selector");