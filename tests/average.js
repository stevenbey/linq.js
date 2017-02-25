Assert.throws([].average, "average: empty array", "Sequence contains no elements");
Assert.equals(numbers.average, 2.2, "average (numeric array)");
Assert.equals(function () { return numbers.average(function (v) { return (v / 2); }); }, 1.1, "average (numeric array): with selector");
Assert.equals(function () { return objects.average(function (v) { return v.x; }); }, 2.2, "average (object array): with selector");
