function shallowCopy(obj) {
  if(typeof obj !== 'object' || obj === null) return obj;

  let result = Array.isArray(obj) ? [] : {}
  Reflect.ownKeys(obj).forEach(key => {
    result[key] = obj[key]
  })
  return result
}

// 测试
const obj = { info: { school: '大学' } };
const copy = shallowCopy(obj);
copy.info.school = '高中';
console.log(obj.info.school); // 输出 '高中'