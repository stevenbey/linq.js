function clone(obj) { 'use strict';
    if(!obj || typeof obj !== 'object') return obj;
    var copy;
    if(obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if(obj instanceof Array) {
        copy = [];
        for(var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if(obj instanceof Object) {
        copy = { };
        for(var attr in obj) {
            if(obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};
function generateKey(obj) {
    var key = '';
    for(var attr in obj) {
        if(obj.hasOwnProperty(attr)) key += obj[attr];
    }
    return key;
}
function ArgumentNullOrUndefinedException(name) { 'use strict';
    this.name = name;
    this.message = 'Cannot be null or undefined';
}
function ArgumentException(name, message) { 'use strict';
    this.name = name;
    this.message = message;
}
(function(expect) {
    'use strict';
    var p = Array.prototype;
    p.each = function(selector) {
        expect.isFunction(selector, 'selector');
        var i;
        for(i = 0; i < this.length; i++) {
            selector(this[i], i);
        }
    };
    p.aggregate = function(func, seed, selector) {
        expect.isFunction(func, 'func');
        var cloned = [].concat(this), result;
        if(!seed) {
            result = cloned.splice(0, 1)[0];
            if(typeof result === 'object') { result = clone(result); }
        }
        else {
            expect.is(typeof seed !== 'function', 'seed', 'Cannot be a function');
            result = seed;
        }
        expect.isFunction(selector, 'selector', true);
        cloned.each(function(o) { result = func(result, o); });
        return selector ? selector(result) : result;
    };
    p.all = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        return this.where(predicate).length === this.length;
    };
    p.any = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        return this.where(predicate).length !== 0;
    };
    p.average = function(selector) { return this.length === 0 ? 0 : this.sum(selector) / this.length; };
    p.contains = function(obj) {
        expect.notNullOrUndefined(obj, 'obj');
        return this.indexOf(obj) !== -1;
    };
    p.count = function() { return this.length; };
    p.distinct = function(selector) {
        expect.isFunction(selector, 'selector', true);
        var array = [], values = [];
        this.each(function(o) {
            var v = selector ? selector(o) : o;
            if(!values.contains(v)) {
                values.push(v);
                array.push(o);
            }
        });
        return array;
    };
    p.first = function(predicate) {
        expect.isFunction(predicate, 'predicate', true);
        return (predicate ? this.where(predicate) : this)[0];
    };
    p.groupBy = function(key, element, result) {
        expect.isFunction(key, 'key');
        expect.isFunction(element, 'element', true);
        expect.isFunction(result, 'result', true);
        var array = [], $ = {};
        this.each(function(o) {
            var k = key(o), g = generateKey(k), i = $[g || k];
            if(!i) { array.push($[g || k] = i = []); }
            i.key = k;
            i.push(element ? element(o) : o);
        });
        if(result) {
            array.each(function(o, i) {
                array[i] = result(o.key, o);
            });
        }
        return array;
    };
    p.last = function(predicate) {
        expect.isFunction(predicate, 'predicate', true);
        var array = predicate ? this.where(predicate) : this;
        return array[array.length - 1];
    };
    p.max = function(selector) {
        expect.isFunction(selector, 'selector', true);
        var max = Number.MIN_VALUE;
        (selector ? this.select(selector) : this).each(function(v) {
            if(typeof v !== 'number') { throw 'The array item is not a number'; }
            if(v > max) { max = v; }
        });
        return max;
    };
    p.min = function(selector) {
        expect.isFunction(selector, 'selector', true);
        var min = Number.MAX_VALUE;
        (selector ? this.select(selector) : this).each(function(v) {
            if(typeof v !== 'number') { throw 'The array item is not a number'; }
            if(v < min) { min = v; }
        });
        return min;
    };
    p.orderBy = function(selector) {
        expect.isFunction(selector, 'selector');
        var array = [].concat(this), i, v;
        array.sort(function(a, b) {
            a = selector(a);
            b = selector(b);
            if(typeof a === 'string') {
                for(i = 0; i < a.length; i++) {
                    v = a.charCodeAt(i) - b.charCodeAt(i);
                    if(v === 0) { continue; }
                    return v;
                }
            }
            return Number(a) - Number(b);
        });
        return array;
    };
    p.orderByDescending = function(selector) {
        expect.isFunction(selector, 'selector');
        return this.orderBy(selector).reverse();
    };
    p.select = function(selector) {
        expect.isFunction(selector, 'selector');
        var array = [];
        this.each(function(o, i) { array.push(selector(o, i)); });
        return array;
    };
    p.selectMany = function(collection, result) {
        expect.isFunction(collection, 'collection');
        expect.isFunction(result, 'result', true);
        var array = [];
        this.select(collection).each(function(o) {
            if(o instanceof Array) {
                o.each(function(v) {
                    array.push(result ? result(v) : v);
                });
            } else { throw 'The selected property must be an array'; }

        });
        return array;
    };
    p.skip = function(count) {
        expect.notNullOrUndefined(count, 'count');
        expect.is(typeof count === 'number', 'count', 'Must be a number');
        return this.slice(count);
    };
    p.skipWhile = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        var array = [], skip = true, i;
        for(i = 0; i < this.length; i++) {
            if(skip && predicate(this[i], i)) { continue; }
            array.push(this[i]);
            skip = false;
        }
        return array;
    };
    p.sum = function(selector) {
        expect.isFunction(selector, 'selector', true);
        var sum = 0;
        (selector ? this.select(selector) : this).each(function(v) {
            if(typeof v !== 'number') { throw 'The array item is not a number'; }
            sum += v;
        });
        return sum;
    };
    p.take = function(count) {
        expect.notNullOrUndefined(count, 'count');
        expect.is(typeof count === 'number', 'count', 'Must be a number');
        return this.slice(0, count);
    };
    p.takeWhile = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        var array = [], i;
        for(i = 0; i < this.length; i++) {
            if(!predicate(this[i], i)) { break; }
            array.push(this[i]);
        }
        return array;
    };
    p.where = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        var array = [];
        this.each(function(o, i) { if(predicate(o, i)) { array.push(o); } });
        return array;
    };
}({
    is: function(value, name, message) {
        'use strict';
        if(!value) { throw new ArgumentException(name, message); }
    },
    notNullOrUndefined: function(obj, name) {
        'use strict';
        if(obj === null || obj === undefined) { throw new ArgumentNullOrUndefinedException(name); }
    },
    isFunction: function(obj, name, nullable) {
        'use strict';
        if(nullable) {
            if(obj === null || obj === undefined) { return; }
        } else { this.notNullOrUndefined(obj, name); }
        this.is(typeof obj === 'function', name, 'Must be a function');
    }
}));