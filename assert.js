var Assert = (function () {
    function Assert() {
    }
    Assert.equals = function (v, e, m) {
        if (v === e)
            Assert.passed(m);
        else
            Assert.failed(m, e, v);
    };
    Assert.contains = function (a, i, m) {
        Assert.isFalse(a.indexOf(i) === -1, m);
    };
    Assert.isFalse = function (v, m) {
        Assert.equals(v, false, m);
    };
    Assert.isTrue = function (v, m) {
        Assert.equals(v, true, m);
    };
    Assert["throws"] = function (fun, m, e) {
        try {
            fun();
            Assert.failed(m, "an exception to be throw", "completed");
        }
        catch (ex) {
            if (e && ex !== e) {
                Assert.failed(m, e, ex);
                return;
            }
            Assert.passed(m);
        }
    };
    Assert.failed = function (m, e, v) {
        document.writeln("<span class=\"error\">Failed</span>: " + m + "; expected " + e + " but was " + v);
    };
    Assert.passed = function (m) {
        document.writeln("<span>Passed</span>: " + m);
    };
    return Assert;
}());
var numbers = [1, 2, 3, 4, 1];
var objects = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1 }];
