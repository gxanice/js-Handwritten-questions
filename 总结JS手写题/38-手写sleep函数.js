function sleep(time){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    },time)
  })
}
// 测试
sleep(1000).then(() => {
  console.log('1秒后输出')
})