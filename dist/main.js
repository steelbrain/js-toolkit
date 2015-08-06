'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.promisify = promisify;

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