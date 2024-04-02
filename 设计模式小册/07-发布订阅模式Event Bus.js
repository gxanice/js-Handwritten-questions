class EventBus {
  constructor() {
    // 一个map,用于存储事件与回调之间的对应关系
    this.events = {};
  }

  on(event, callback) {
    // 如果事件没有被创建过，则初始化一个空数组
    if (!this.events[event]) {
      this.events[event] = [];
    }
    // 把回调函数推入目标事件的监听函数队列里去
    this.events[event].push(callback);
  }

  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(event, ...args) {
    // 如果事件没有被创建过，则直接返回
    if (!this.events[event]) return;
    // 这里需要对 this.events[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
    const handlers = this.events[event].slice();
    // 遍历目标事件的监听函数队列，并执行它们
    handlers.forEach((callback) => {
      callback(...args);
    });
  }

  // 移除某个事件回调队列里的指定回调函数
  off(event, callback) {
    if (!this.events[event]) return;
    // 遍历目标事件的监听函数队列，找到指定回调函数的索引并移除
    let index = this.events[event].indexOf(callback);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
  }

  // 为事件注册单次监听器
  once(event, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args);
      // 移除事件监听器
      this.off(event, wrapper);
    }
    // 将 wrapper 函数注册为指定事件的监听器。由于 wrapper 函数在执行后会自动移除自己，这样就实现了 cb 只执行一次的效果。
    this.on(event, wrapper);
  }
}

// 创建 EventBus 实例
const bus = new EventBus();

// 定义一些回调函数以供测试
function callback1(arg) {
  console.log(`callback1 received: ${arg}`);
}

function callback2(arg) {
  console.log(`callback2 received: ${arg}`);
}

function callbackOnce(arg) {
  console.log(`callbackOnce (should only fire once) received: ${arg}`);
}

// 注册事件监听器
bus.on("event1", callback1);
bus.on("event1", callback2);

// 注册只执行一次的事件监听器
bus.once("event1", callbackOnce);

// 触发事件 'event1'，应该看到 callback1, callback2 和 callbackOnce 的输出
console.log("First emit 'event1'");
bus.emit("event1", "first call");

// 再次触发事件 'event1'，这次不应该看到 callbackOnce 的输出，因为它只触发一次
console.log("Second emit 'event1'");
bus.emit("event1", "second call");

// 移除 callback1 的监听器
bus.off("event1", callback1);

// 再次触发事件 'event1'，这次只应该看到 callback2 的输出
console.log("Third emit 'event1'");
bus.emit("event1", "third call");
