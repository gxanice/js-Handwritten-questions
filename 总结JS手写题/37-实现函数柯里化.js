function curry(fn, ...args){
  // fn是原函数，所以bind传入null，fn.length是指函数的参数个数
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}

// 测试
function sum(a, b, c) {
  return a + b + c
}
const currySum = curry(sum)
console.log(currySum(1)(2)(3)); // 6
console.log(currySum(1, 2, 3)); // 6

// 参数传递测试
const partialSum = currySum(1); // 返回一个新的函数
console.log(partialSum(2, 3)); // 6
console.log(partialSum(2)(3)); // 6

// 边界条件测试
console.log(currySum(1)(2)); // 返回一个函数，未调用 sum
console.log(currySum()); // 返回一个函数，未调用 sum