Object.prototype.clone = function() { 'use strict';
    var obj = this.constructor(), key;
    for(key in this) {
        if(this.hasOwnProperty(key)) { obj[key] = this[key]; }
    }
    return obj;
};
function ArgumentNullOrUndefinedException(name) { 'use strict';
    this.name = name;
    this.message = 'Cannot be null or undefined';
}
function ArgumentException(name, message) { 'use strict';
    this.name = name;
    this.message = message;
}
(function(array, expect) { 'use strict';
    array.each = function(selector) {
        expect.isFunction(selector, 'selector');
        var i;
        for(i = 0; i < this.length; i++) {
            selector(this[i], i);
        }
    };
    array.aggregate = function(func, seed, selector) {
        expect.isFunction(func, 'func');
        var cloned = [].concat(this), result;
        if(!seed) {
            result = cloned.splice(0, 1)[0];
            if(typeof result === 'object') { result = result.clone(); }
        }
        else {
            expect.is(typeof seed !== 'function', 'seed', 'Cannot be a function');
            result = seed;
        }
        expect.isFunction(selector, 'selector', true);
        cloned.each(function(o) { result = func(result, o); });
        return selector ? selector(result) : result;
    };
    array.all = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        return this.where(predicate).length === this.length;
    };
    array.any = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        return this.where(predicate).length !== 0;
    };
    array.average = function(selector) { return this.length === 0 ? 0 : this.sum(selector) / this.length; };
    array.contains = function(obj) {
		expect.notNullOrUndefined(obj, 'obj');
		return this.indexOf(obj) !== -1;
	};
    array.count = function() { return this.length; };
    array.distinct = function(selector) {
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
    array.first = function(predicate) {
        expect.isFunction(predicate, 'predicate', true);
        return (predicate ? this.where(predicate) : this)[0];
    };
    array.groupBy = function(key, element, result){
        expect.isFunction(key, 'key');
        expect.isFunction(element, 'element', true);
        expect.isFunction(result, 'result', true);
        var array = [], $ = {};
        this.each(function(o){
            var k = key(o), i = $[k];
            if(!i) { array.push($[k] = i = []) }
            i.key = k;
            i.push(element ? element(o) : o);
        });
        if(result){
            array.each(function(o, i){
                array[i] = result(o.key, o);
            });
        }
        return array;
    };
    array.last = function(predicate) {
        expect.isFunction(predicate, 'predicate', true);
        var array = predicate ? this.where(predicate) : this;
        return array[array.length - 1];
    };
    array.max = function(selector) {
        expect.isFunction(selector, 'selector', true);
        var max = Number.MIN_VALUE;
        (selector ? this.select(selector) : this).each(function(v) {
            if(typeof v !== 'number') { throw 'The array item is not a number'; }
            if(v > max) { max = v; }
        });
        return max;
    };
    array.min = function(selector) {
        expect.isFunction(selector, 'selector', true);
        var min = Number.MAX_VALUE;
        (selector ? this.select(selector) : this).each(function(v) {
            if(typeof v !== 'number') { throw 'The array item is not a number'; }
            if(v < min) { min = v; }
        });
        return min;
    };
    array.orderBy = function(selector) {
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
    array.orderByDescending = function(selector) {
        expect.isFunction(selector, 'selector');
        return this.orderBy(selector).reverse();
    };
    array.select = function(selector) {
        expect.isFunction(selector, 'selector');
        var array = [];
        this.each(function(o, i) { array.push(selector(o, i)); });
        return array;
    };
    array.selectMany = function(collection, result) {
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
    array.skip = function(count) {
        expect.notNullOrUndefined(count, 'count');
        expect.is(typeof count === 'number', 'count', 'Must be a number');
        return this.slice(count);
    };
    array.skipWhile = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        var array = [], skip = true, i;
        for(i = 0; i < this.length; i++) {
            if(skip && predicate(this[i], i)) { continue; }
            array.push(this[i]);
            skip = false;
        }
        return array;
    };
    array.sum = function(selector) {
        expect.isFunction(selector, 'selector', true);
        var sum = 0;
        (selector ? this.select(selector) : this).each(function(v) {
            if(typeof v !== 'number') { throw 'The array item is not a number'; }
            sum += v;
        });
        return sum;
    };
    array.take = function(count) {
        expect.notNullOrUndefined(count, 'count');
        expect.is(typeof count === 'number', 'count', 'Must be a number');
        return this.slice(0, count);
    };
    array.takeWhile = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        var array = [], i;
        for(i = 0; i < this.length; i++) {
            if(!predicate(this[i], i)) { break; }
            array.push(this[i]);
        }
        return array;
    };
    array.where = function(predicate) {
        expect.isFunction(predicate, 'predicate');
        var array = [];
        this.each(function(o, i) { if(predicate(o, i)) { array.push(o); } });
        return array;
    };
}(Array.prototype, {
    is: function(value, name, message) { 'use strict';
        if(!value) { throw new ArgumentException(name, message); }
    },
    notNullOrUndefined: function(obj, name) { 'use strict';
        if(obj === null || obj === undefined) { throw new ArgumentNullOrUndefinedException(name); }
    },
    isFunction: function(obj, name, nullable) { 'use strict';
        if(nullable) {
            if(obj === null || obj === undefined) { return; }
        } else { this.notNullOrUndefined(obj, name); }
        this.is(typeof obj === 'function', name, 'Must be a function');
    }
}));