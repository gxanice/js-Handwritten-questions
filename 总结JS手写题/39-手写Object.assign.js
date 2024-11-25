Object.myAssign = function(target,...args){
  if(target === null || target === undefined){
    throw new TypeError('Cannot convert undefined or null to object')
  }
  // 将目标对象转换为对象
  let result = Object(target)
  args.forEach(arg => {
    if(arg === null || arg === undefined){
      return
    }
    Reflect.ownKeys(arg).forEach(key => {
      result[key] = arg[key]
    })
  })
  return result
}

// 测试
const target = { a: 1 }
const source1 = { a: 2, b: 2 }
const source2 = { b: 4, c: 3 }
const result = Object.myAssign(target, source1, source2)
console.log(result) // { a: 2, b: 4, c: 3 }