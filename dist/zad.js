/**
 * zad.js v1.0.0
 * author: zadzbw
 * homepage: https://github.com/zadzbw/rollup-start-kit#readme
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Zad = factory());
}(this, (function () { 'use strict';

  /**
   * Gets the first element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias first
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the first element of `array`.
   * @example
   *
   * _.head([1, 2, 3]);
   * // => 1
   *
   * _.head([]);
   * // => undefined
   */
  function head(array) {
    return (array && array.length) ? array[0] : undefined;
  }

  var head_1 = head;

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  var _baseSlice = baseSlice;

  /**
   * Gets all but the first element of `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.tail([1, 2, 3]);
   * // => [2, 3]
   */
  function tail(array) {
    var length = array == null ? 0 : array.length;
    return length ? _baseSlice(array, 1, length) : [];
  }

  var tail_1 = tail;

  function getQueryString(url, params) {
    if ( params === void 0 ) params = {};

    var arr = [];
    Object.keys(params).forEach(function (key) {
      arr.push((key + "=" + (encodeURIComponent(params[key]))));
    });
    return arr.length > 0 ? ("" + url + (/\?/.test(url) ? '&' : '?') + (arr.join('&'))) : url;
  }

  var Zad = function Zad(name) {
    if ( name === void 0 ) name = 'zad';

    this.name = name;
  };

  Zad.prototype.sayName = function sayName () {
    console.log(this.name);
  };

  Zad.prototype.getPath = function getPath () {
    return getQueryString('host', { name: this.name });
  };

  Zad.prototype.head = function head () {
    return head_1([this.name, 1, 2, 3]);
  };

  Zad.prototype.tail = function tail () {
    return tail_1([this.name, 1, 2, 3]);
  };

  Zad.version = '1.0.0';

  return Zad;

})));
