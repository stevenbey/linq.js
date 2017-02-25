var _this = this;
var clone = function (obj) {
    if (!obj || typeof obj !== "object")
        return obj;
    var copy;
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};
var generateHash = function (obj) {
    if (obj instanceof Array)
        return obj.reduce(function (accumulator, item) { return accumulator + generateHash(item); }, "");
    if (obj instanceof Date)
        return obj.toISOString();
    if (obj instanceof Object) {
        var hash = "";
        for (var attr in obj)
            if (obj.hasOwnProperty(attr))
                hash += generateHash(obj[attr]);
        return hash;
    }
    if (typeof obj === "string")
        return obj;
    return obj ? obj.toString() : "";
};
Array.prototype.aggregate = function (func, seed, selector) {
    if (!_this.length)
        throw new Error("Sequence contains no elements");
    if (!func)
        throw new Error("Argument cannot be null. Parameter name: func");
    var result = seed || clone(_this[0]);
    for (var i = seed ? 0 : 1; i < _this.length; i++)
        result = func(result, _this[i]);
    return selector ? selector(result) : result;
};
Array.prototype.all = function (predicate) {
    return predicate ? _this.every(predicate) : true;
};
Array.prototype.any = function (predicate) {
    return predicate ? _this.some(predicate) : !!_this.length;
};
Array.prototype.average = function (selector) {
    if (!_this.length)
        throw new Error("Sequence contains no elements");
    return _this.sum(selector) / _this.length;
};
Array.prototype.contains = function (item) {
    return _this.indexOf(item) !== -1;
};
Array.prototype.distinct = function (selector) {
    var result = [], values = [];
    _this.forEach(function (item) {
        var value = selector ? selector(item) : item;
        if (!values.contains(item)) {
            values.push(value);
            result.push(item);
        }
    });
    return result;
};
Array.prototype.first = function (predicate) {
    if (!_this.length)
        throw new Error("Sequence contains no elements");
    var result = predicate ? _this.where(predicate) : _this;
    return result.length ? result[0] : null;
};
Array.prototype.groupBy = function (keySelector, elementSelector, resultSelector) {
    if (!keySelector)
        throw new Error("Argument cannot be null. Parameter name: keySelector");
    var result = [], groups = {};
    _this.forEach(function (item) {
        var key = keySelector(item), hash = generateHash(key), group = groups[hash];
        if (!group) {
            result.push(groups[hash] = group = []);
            group.key = key;
        }
        group.push(elementSelector ? elementSelector(item) : item);
    });
    if (resultSelector)
        result.forEach(function (item, index) { result[index] = resultSelector(item.key, item); });
    return result;
};
Array.prototype.last = function (predicate) {
    if (!_this.length)
        throw new Error("Sequence contains no elements");
    var result = predicate ? _this.where(predicate) : _this;
    return result.length ? result[result.length - 1] : null;
};
Array.prototype.max = function (selector) {
    if (!_this.length)
        throw new Error("Sequence contains no elements");
    var max = Number.MIN_VALUE;
    (selector ? _this.select(selector) : _this).forEach(function (value) { if (value > max)
        max = value; });
    return max;
};
Array.prototype.min = function (selector) {
    if (!_this.length)
        throw new Error("Sequence contains no elements");
    var min = Number.MAX_VALUE;
    (selector ? _this.select(selector) : _this).forEach(function (value) { if (value < min)
        min = value; });
    return min;
};
Array.prototype.orderBy = function (selector) {
    if (!selector)
        throw new Error("Argument cannot be null. Parameter name: selector");
    var result = [].concat(_this);
    result.sort(function (a, b) {
        a = generateHash(selector(a));
        b = generateHash(selector(b));
        for (var i = 0; i < a.length && i < b.length; i++) {
            var v = a.charCodeAt(i) - b.charCodeAt(i);
            if (v === 0)
                continue;
            return v;
        }
        return Number(a) - Number(b);
    });
    return result;
};
Array.prototype.orderByDescending = function (selector) {
    if (!selector)
        throw new Error("Argument cannot be null. Parameter name: selector");
    var result = [].concat(_this);
    result.sort(function (a, b) {
        a = generateHash(selector(a));
        b = generateHash(selector(b));
        for (var i = 0; i < a.length && i < b.length; i++) {
            var v = b.charCodeAt(i) - a.charCodeAt(i);
            if (v === 0)
                continue;
            return v;
        }
        return Number(b) - Number(a);
    });
    return result;
};
Array.prototype.select = function (selector) {
    if (!selector)
        throw new Error("Argument cannot be null. Parameter name: selector");
    return _this.map(selector);
};
Array.prototype.selectMany = function (collectionSelector, resultSelector) {
    if (!collectionSelector)
        throw new Error("Argument cannot be null. Parameter name: collectionSelector");
    var result = [];
    _this.forEach(function (item, index) {
        var selected = collectionSelector(item, index);
        (resultSelector ? result.push(resultSelector(item, selected)) : selected.forEach(function (subitem) { return result.push(subitem); }));
    });
    return result;
};
Array.prototype.skip = function (count) {
    return _this.slice(count);
};
Array.prototype.skipWhile = function (predicate) {
    if (!predicate)
        throw new Error("Argument cannot be null. Parameter name: predicate");
    var result = [];
    for (var i = 0; i < _this.length; i++) {
        var item = _this[i];
        if (predicate(item, i))
            continue;
        ;
        result.push(item);
    }
    return result;
};
Array.prototype.sum = function (selector) {
    if (!_this.length)
        throw new Error("Sequence contains no elements");
    return (selector ? _this.select(selector) : _this).reduce(function (accumulator, value) { return accumulator + value; }, 0);
};
Array.prototype.take = function (count) {
    return _this.slice(0, count);
};
Array.prototype.takeWhile = function (predicate) {
    if (!predicate)
        throw new Error("Argument cannot be null. Parameter name: predicate");
    var result = [];
    for (var i = 0; i < _this.length; i++) {
        var item = _this[i];
        if (!predicate(item, i))
            break;
        result.push(item);
    }
    return result;
};
Array.prototype.where = function (predicate) {
    if (!predicate)
        throw new Error("Argument cannot be null. Parameter name: predicate");
    return _this.filter(predicate);
};
