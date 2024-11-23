function myPromiseRace(promises){
  return new Promise((resolve,reject) => {
    for(let i = 0;i < promises.length;i++){
      Promise.resolve(promises[i]).then(res => {
        resolve(res)
      }).catch(err => {
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

myPromiseRace(promises).then(console.log); // 1
myPromiseRace([]).then(console.log); // undefined
myPromiseRace([Promise.reject('error')]).catch(console.log); // 'error'