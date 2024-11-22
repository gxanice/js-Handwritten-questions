myPromiseAll = (promises) =>{
  return new Promise((resolve, reject) => {
    let result = []
    let count = 0
    let len = promises.length
    for(let i = 0;i < len;i++){
      Promise.resolve(promises[i].then(res => {
        result[i] = res
        count++
        if(count === len){
          resolve(result)
        }
      })).catch(err => {
        reject(err)
      })
    }
  })
}


// 测试用例
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 1000));
const p3 = Promise.resolve(3);
const promises = [p1, p2, p3];

myPromiseAll(promises).then(console.log); // [1, 2, 3]
myPromiseAll([]).then(console.log); // []
myPromiseAll([Promise.reject('error')]).catch(console.log); // 'error'