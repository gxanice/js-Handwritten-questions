function mySetInterval(fn, delay){
    let timer = null
    let isCleared = false
    function interval(){
      // 如果已清除，则不再继续
      if(isCleared) return
      fn()
      timer = setTimeout(interval,delay)
    }
    interval()

    return {
      clear(){
        isCleared = true
        clearTimeout(timer)
      }
    }
}

// 测试代码
function test() {
  let count = 0;
  const timer = mySetInterval(() => {
    console.log(count++);
    if (count > 3) {
      console.log('清除定时器');
      timer.clear();
    }
  }, 1000);
}

// 运行测试
test();