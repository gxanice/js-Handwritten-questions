class My {
    constructor() {
        
    }
}


// Object有隐式对象
console.log('Object.__proto__', Object.__proto__)
// Object有原型
console.log('Object.prototype', Object.prototype)
// 原型的隐式原型是null
console.log('Object.prototype.__proto__', Object.prototype.__proto__)
// constructor方法，在new时调用并把this指向新创建的对象
console.log("Object.constructor", Object.constructor)
// My.prototype指向Object.prototype
console.log("My.prototype", My.prototype)
// constructor方法，在new时调用并把this指向新创建的对象
console.log("My.constructor", My.constructor)

// 实例对象
const M = new My()
// M.__proto__指向My.prototype
console.log('M.__proto__', M.__proto__)
// 等同Object.prototype
console.log("M.__proto__.__proto__", M.__proto__.__proto__);