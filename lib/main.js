'use strict'
export function promisify(callback){
  const promisified = function(){
    const args = arguments
    return new Promise((resolve, reject) =>{
      Array.prototype.push.call(args, function(err, data) {
        if(err) reject(err)
        else resolve(data)
      })
      callback.apply(this, args)
    })
  }
  promisified.prototype = callback.prototype
  return promisified
}
