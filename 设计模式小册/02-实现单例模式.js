// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。

// 实现方式：
// 1. 首先判断 localStorage 是否存在，不存在则创建。
// 2. 实现 setItem 方法，将 key-value 存入 localStorage。
// 3. 实现 getItem 方法，根据 key 从 localStorage 中获取对应的值。

class Storage {
  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  getItem(key) {
    return localStorage.getItem(key);
  }

  setItem(key, value) {
    return localStorage.setItem(key, value);
  }
}

// 闭包版本
function MyStorage() {}
MyStorage.prototype.getItem = function (key) {
  return localStorage.getItem(key);
};
MyStorage.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value);
};

const storageNew = function () {
  let instance = null;
  return function () {
    if (!instance) {
      instance = new MyStorage();
    }
    return instance;
  };
};

const storage1 = Storage.getInstance();
const storage2 = Storage.getInstance();

storage1.setItem("name", "李雷");
// 李雷
storage1.getItem("name");
// 也是李雷
storage2.getItem("name");

// 返回true
console.log(storage1 === storage2);
