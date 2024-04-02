// addAll方法会对你传入的所有参数做求和操作
const addAll = function () {
  console.log("进行了一次新计算");
  let result = 0;
  const len = arguments.length;
  for (let i = 0; i < len; i++) {
    result += arguments[i];
  }
  return result;
};

// 进行结果缓存，如果缓存池里面有则不进行二次计算
const proxyAdd = (function () { 
    let resultCache = {}
    return function () { 
        let args = Array.prototype.join.call(arguments, ',')
        if (args in resultCache) {
            return resultCache[args]
        }
        return resultCache[args] = addAll(...arguments)
    }
})()