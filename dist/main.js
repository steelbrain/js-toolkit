'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.promisify = promisify;
exports.promisifyAll = promisifyAll;

function promisify(callback) {
  var promisified = function promisified() {
    var _this = this;

    var args = arguments;
    return new Promise(function (resolve, reject) {
      Array.prototype.push.call(args, function (err, data) {
        if (err) reject(err);else resolve(data);
      });
      callback.apply(_this, args);
    });
  };
  promisified.prototype = callback.prototype;
  return promisified;
}

function promisifyAll(object) {
  var toReturn = {};
  for (var _name in object) {
    if (typeof object[_name] === 'function') {
      toReturn[_name] = promisify(object[_name]);
    } else if (typeof object[_name] === 'object') {
      toReturn[_name] = promisifyAll(object[_name]);
    } else {
      toReturn[_name] = object[_name];
    }
  }
  return toReturn;
}