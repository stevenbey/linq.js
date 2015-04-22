class Assert {
    static equals(v, e, m) {
        if (v === e) Assert.passed(m);
        else Assert.failed(m, e, v);
    }
    static contains(a, i, m) {
        Assert.isFalse(a.indexOf(i) === -1, m);
    }
    static isFalse(v, m) {
        Assert.equals(v, false, m);
    }
    static isTrue(v, m) {
        Assert.equals(v, true, m);
    }
    static "throws"(fun, m, e) {
        try {
            fun();
            Assert.failed(m, "an exception to be throw", "completed");
        } catch (ex) {
            if (e && ex !== e) {
                Assert.failed(m, e, ex);
                return;
            }
            Assert.passed(m);
        }
    }
    static failed(m, e, v) {
        document.writeln(`<span class="error">Failed</span>: ${m}; expected ${e} but was ${v}`);
    }
    static passed(m) {
        document.writeln(`<span>Passed</span>: ${m}`);
    }
}
var numbers = [1, 2, 3, 4, 1];
var objects = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }, { x: 1 }];