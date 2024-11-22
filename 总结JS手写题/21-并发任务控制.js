async function limitgetData(urls, limit) {
  let result = []
  // 正在进行的任务队列
  let taskQueue = new Set()

  for (const url of urls) {
    let promise = mockRequset(url)
      .then(res => {
        console.log(res)
        return res
      })    
      result.push(promise);  // 保存请求结果的 promise

      // 将正在执行的 promise 添加到 taskQueue 中
      taskQueue.add(promise);
      
      // 请求完成后从 taskQueue 中移除
      promise.then(() => taskQueue.delete(promise));

    if(taskQueue.size >= limit){
      await Promise.race(taskQueue)
    }
  }
  return Promise.all(result)
}

function mockRequset(url) {
  return new Promise((resolve,reject) => {
    let time = Math.random() * 1000
    setTimeout(() => {
      // 模拟偶尔失败的情况
      if (Math.random() > 0.99) {
        reject(new Error(`请求 ${url} 失败`));
      } else {
        resolve(`请求 ${url} 完成`);
      }
    }, time);
  })
}

async function test() {
  const urls = Array.from({ length: 10 }, (_, i) => `任务${i + 1}`)
  try {
    const results = await limitgetData(urls, 3);
    console.log('所有请求完成！');
    console.log('最终结果:', results);
  } catch (err) {
    console.error('发生错误:', err);
  }
}

test()