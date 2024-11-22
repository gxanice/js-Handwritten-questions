// 防止循环引用的深拷贝
function deepClone(obj){
  let map = new WeakMap()
  if(obj instanceof RegExp) return new RegExp(obj)
  if(obj instanceof Date) return new Date(obj)
  if(obj === null || typeof obj !== 'object') return obj
  // 循环引用直接返回
  if(map.has(obj)) return map.get(obj)
  let result = Array.isArray(obj) ? [] : {}

  Reflect.ownKeys(obj).forEach(key => {
    result[key] = deepClone(obj[key])
  })
  return result
}

const obj = {
  name: '张三',
  age: null,
  hobbies: ['读书', '游戏'],
  info: {
    school: '大学',
    grade: 2
  },
  specialObj: {
    date: new Date(),
    reg: /hello/g,
    func: function() { console.log('test') },
    [Symbol('key')]: 'symbol value'
  }
};

const cloneObj = deepClone(obj);
console.log(cloneObj);