function deepCopy(obj) {
  // 如果是值类型或null，则直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    let copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // 处理对象
  if (obj instanceof Object) {
    let copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepCopy(obj[attr]);
      }
    }
    return copy;
  }

  // 如果是其他类型，则直接返回
  throw new Error("Unable to copy obj! Its type isn't supported.");
}

let obj = deepCopy([1, 2, [3, 4, [5, 6, [null, {}, [undefined, null]]]]]);
// 使用 JSON.stringify 打印对象，注意 undefined 会被忽略
console.log(JSON.stringify(obj, null, 2));



// function deepCopy2(obj) {
//     return new Promise((resolve) => {
//         const { port1, port2 } = new MessageChannel()
//         port1.postMessage(obj)
//         port2.onmessage = (msg) => {
//             resolve(msg.data)
//         }
//     })
// }
// var obj = { a: 1, b: 2 }
// obj.c = obj
// deepCopy2(obj).then(obj => console.log(obj))
// let obj2 = deepCopy2([1, 2, [3, 4, [5, 6, [null, {}, [undefined, null]]]]]);
// console.log(obj2);



// 解决深拷贝爆栈问题
function cloneLoop(x) {
  let root = {};

  // 栈
  let loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    },
  ];

  while (loopList.length) {
    // 深度优先
    let node = loopList.pop();
    let parent = node.parent;
    let key = node.key;
    let data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[key] === "object") {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

var b = 1;
var a = { a1: b, a2: b };

a.a1 === a.a2; // true

var c = clone(a);
c.a1 === c.a2; // false



// 破解循环引用
function cloneForce(x) {
  // =============
  const uniqueList = []; // 用来去重
  // =============

  let root = {};

  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    },
  ];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    // =============
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      break; // 中断本次循环
    }

    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res,
    });
    // =============

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }

  return null;
}
var a = {};
a.a = a;
cloneForce(a);
