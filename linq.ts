var clone = (obj: any) => {
    if (!obj || typeof obj !== "object") return obj;
    var copy: any;
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
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
};
var generateHash = (obj: any) => {
    if (obj instanceof Array) return obj.reduce((accumulator, item) => accumulator + generateHash(item), "");
    if (obj instanceof Date) return obj.toISOString();
    if (obj instanceof Object) {
        var hash = "";
        for (var attr in obj) if (obj.hasOwnProperty(attr)) hash += generateHash(obj[attr]);
        return hash;
    }
    if (typeof obj === "string") return obj;
    return obj ? obj.toString() : "";
};
Array.prototype.aggregate = function (func: (accumulator: any, value: any) => any, seed: any, selector: (result: any) => any) {
    if (!this.length) throw new Error("Sequence contains no elements");
    if (!func) throw new Error("Argument cannot be null. Parameter name: func");
    var result = seed || clone(this[0]);
    for (var i = seed ? 0 : 1; i < this.length; i++) result = func(result, this[i]);
    return selector ? selector(result) : result;
};
Array.prototype.all = function (predicate: (item: any) => boolean) {
    return predicate ? this.every(predicate) : true;
};
Array.prototype.any = function (predicate: (item: any) => boolean) {
    return predicate ? this.some(predicate) : !!this.length;
};
Array.prototype.average = function (selector: (item: any) => number) {
    if (!this.length) throw new Error("Sequence contains no elements");
    return this.sum(selector) / this.length;
};
Array.prototype.contains = function (item: any) {
    return this.indexOf(item) !== -1;
};
Array.prototype.distinct = function (selector: (item: any) => any) {
    var result = [], values = [];
    this.forEach(item => {
        var value = selector ? selector(item) : item;
        if (!values.contains(item)) {
            values.push(value);
            result.push(item);
        }
    });
    return result;
};
Array.prototype.first = function (predicate: (item: any) => boolean) {
    if (!this.length) throw new Error("Sequence contains no elements");
    var result = predicate ? this.where(predicate) : this;
    return result.length ? result[0] : null;
};
Array.prototype.groupBy = function (keySelector: (item: any) => any, elementSelector: (item: any) => any, resultSelector: (key: any, array: any[]) => any) {
    if (!keySelector) throw new Error("Argument cannot be null. Parameter name: keySelector");
    var result = [], groups = {};
    this.forEach(item => {
        var key = keySelector(item), hash = generateHash(key), group = groups[hash];
        if (!group) {
             result.push(groups[hash] = group = []);
             group.key = key;
        }
        group.push(elementSelector ? elementSelector(item) : item);
    });
    if (resultSelector) result.forEach((item, index) => { result[index] = resultSelector(item.key, item); });
    return result;
};
Array.prototype.last = function (predicate: (item: any) => boolean) {
    if (!this.length) throw new Error("Sequence contains no elements");
    var result = predicate ? this.where(predicate) : this;
    return result.length ? result[result.length - 1] : null;
};
Array.prototype.max = function (selector: (item: any) => number) {
    if (!this.length) throw new Error("Sequence contains no elements");
    var max = Number.MIN_VALUE;
    (selector ? this.select(selector) : this).forEach(value => { if (value > max) max = value; });
    return max;
};
Array.prototype.min = function (selector: (item: any) => number) {
    if (!this.length) throw new Error("Sequence contains no elements");
    var min = Number.MAX_VALUE;
    (selector ? this.select(selector) : this).forEach(value => { if (value < min) min = value; });
    return min;
};
Array.prototype.orderBy = function(selector: (item: any) => any) {
    if (!selector) throw new Error("Argument cannot be null. Parameter name: selector");
    var result = [].concat(this);
    result.sort((a, b) => {
        a = generateHash(selector(a));
        b = generateHash(selector(b));
        for (var i = 0; i < a.length && i < b.length; i++) {
            var v = a.charCodeAt(i) - b.charCodeAt(i);
            if (v === 0) continue;
            return v;
        }
        return Number(a) - Number(b);
    });
    return result;
};
Array.prototype.orderByDescending = function (selector: (item: any) => any) {
    if (!selector) throw new Error("Argument cannot be null. Parameter name: selector");
    var result = [].concat(this);
    result.sort((a, b) => {
        a = generateHash(selector(a));
        b = generateHash(selector(b));
        for (var i = 0; i < a.length && i < b.length; i++) {
            var v = b.charCodeAt(i) - a.charCodeAt(i);
            if (v === 0) continue;
            return v;
        }
        return Number(b) - Number(a);
    });
    return result;
};
Array.prototype.select = function(selector: (item: any, index: number) => any) {
    if (!selector) throw new Error("Argument cannot be null. Parameter name: selector");
    var result = [];
    this.forEach((item, index) => result.push(selector(item, index)));
    return result;
};
Array.prototype.selectMany = function(collectionSelector: (item: any, index: number) => any[], resultSelector: (item: any, array: any[]) => any) {
    if (!collectionSelector) throw new Error("Argument cannot be null. Parameter name: collectionSelector");
    var result = [];
    this.forEach((item, index) => {
        var selected = collectionSelector(item, index);
        if (resultSelector) result.push(resultSelector(item, selected));
        else selected.forEach(subitem => result.push(subitem));
    });
    return result;
};
Array.prototype.skip = function (count: number) {
    return this.slice(count);
};
Array.prototype.skipWhile = function (predicate: (item: any, index: number) => boolean) {
    if (!predicate) throw new Error("Argument cannot be null. Parameter name: predicate");
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (predicate(item, i)) continue;;
        result.push(item);
    }
    return result;
};
Array.prototype.sum = function (selector: (item: any) => number) {
    if (!this.length) throw new Error("Sequence contains no elements");
    return (selector ? this.select(selector) : this).reduce((accumulator, value) => accumulator + value, 0);
};
Array.prototype.take = function(count: number) {
    return this.slice(0, count);
};
Array.prototype.takeWhile = function(predicate: (item: any, index: number) => boolean) {
    if (!predicate) throw new Error("Argument cannot be null. Parameter name: predicate");
    var result = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (!predicate(item, i)) break;
        result.push(item);
    }
    return result;
};
Array.prototype.where = function(predicate: (item: any, index: number) => boolean) {
    if (!predicate) throw new Error("Argument cannot be null. Parameter name: predicate");
    var result = [];
    this.forEach((item, index) => { if (predicate(item, index)) result.push(item); });
    return result;
};