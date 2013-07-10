function failed(m, e, v) {
    document.writeln('<span class="error">Failed</span>: ' + m + '; expected ' + e + ' but was ' + v)
}
function passed(m) {
    document.writeln("<span>Passed</span>: " + m)
}
var assert = {
    equals: function(v, e, m) {
        if(v === e) passed(m)
        else failed(m, e, v)
    },
    contains: function(a, i, m) { this.isFalse(a.indexOf(i) === -1, m) },
    isFalse: function(v, m) { this.equals(v, false, m) },
    isTrue: function(v, m) { this.equals(v, true, m) },
    throws: function(fun, m, e) {
        try {
            fun();
            failed(m, 'an exception to be throw', 'completed')
        } catch(ex) {
            if(e && ex.constructor !== e) {
                failed(m, e.name, ex.name);
                return
            }
            passed(m)
        }
    }
}