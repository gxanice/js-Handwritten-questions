function myInstanceof(left, right){
  if(left === null || typeof left !== 'object') return false
  if (typeof right !== 'function') return false
  
  // 获取对象的原型链
  let proto = Object.getPrototypeOf(left)
  while(proto){
    if(proto === right.prototype){
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

// 测试
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true
console.log(myInstanceof([], Function)); // false
console.log(myInstanceof([], Date)); // false
console.log(myInstanceof([], Number)); // false