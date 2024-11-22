function myPromiseAllSettled(promises){
  return new Promise((resolve, reject) => {
    let result = []
    let count = 0
    let len = promises.length
    for(let i = 0;i < len;i++){
      Promise.resolve(promises[i]).then(res => {
        result[i] = {status: 'fulfilled', value: res}
        count++
      }).catch(err => {
        result[i] = {status: 'rejected', value: err}
        count++
      }).finally(() => {
        if(count === len){
          resolve(result)
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

myPromiseAllSettled(promises1).then(console.log);
myPromiseAllSettled(promises2).then(console.log); 