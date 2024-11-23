function myPromiseAny(promises){
  return new Promise((resolve,reject) => {
    let count = 0
    let errors = []
    for(let i = 0;i < promises.length;i++){
      Promise.resolve(promises[i]).then(res => {
        resolve(res)
      }).catch(err => {
        errors[i] = err
        count++
        if(count === promises.length){
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      })
    }
  })
}

// 测试用例
const p1 = Promise.reject(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 1000));
const p3 = Promise.reject(3);
const promises1 = [p1, p2, p3];
const promises2 = [p1, p3];

myPromiseAny(promises1).then(console.log); // 2
myPromiseAny(promises2).catch(err => console.log(err)); // [errors]: [ 1, 3 ]