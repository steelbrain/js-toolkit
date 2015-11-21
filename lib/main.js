'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisify = promisify;
exports.promisifyAll = promisifyAll;
exports.extend = extend;
function promisify(callback) {
  const promisified = function () {
    const args = arguments;
    return new Promise((resolve, reject) => {
      Array.prototype.push.call(args, function (err, data) {
        if (err) reject(err);else resolve(data);
      });
      callback.apply(this, args);
    });
  };
  promisified.prototype = callback.prototype;
  return promisified;
}

function promisifyAll(object) {
  const toReturn = {};
  for (let name in object) {
    if (typeof object[name] === 'function') {
      toReturn[name] = promisify(object[name]);
    } else if (typeof object[name] === 'object') {
      toReturn[name] = promisifyAll(object[name]);
    } else {
      toReturn[name] = object[name];
    }
  }
  return toReturn;
}

function extend() {
  let toReturn = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  for (let i = 1; i <= arguments.length; ++i) {
    const argument = arguments[i];
    for (let prop in argument) {
      if (Object.prototype.hasOwnProperty.call(argument, prop)) {
        toReturn[prop] = argument[prop];
      }
    }
  }
  return toReturn;
}

