/**
 * zad.js v1.0.0
 * author: zadzbw
 * homepage: https://github.com/zadzbw/rollup-start-kit#readme
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _head = _interopDefault(require('lodash/head'));
var _tail = _interopDefault(require('lodash/tail'));

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
  return _head([this.name, 1, 2, 3]);
};

Zad.prototype.tail = function tail () {
  return _tail([this.name, 1, 2, 3]);
};

Zad.version = '1.0.0';

module.exports = Zad;
