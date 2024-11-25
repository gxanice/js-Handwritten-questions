Function.prototype.myApply = function(context, args){
    // this指向被调用的对象，只有函数对象才能调用
    if(typeof this !== 'function'){
        throw new TypeError('myApply must be called on a function');
    }
    context = context || globalThis
    const fnSymbol = Symbol('fn')
    context[fnSymbol] = this
    const result = context[fnSymbol](...Array.isArray(args) ? args : [])
    delete context[fnSymbol]
    return result
}

Function.prototype.myCall = function(context, ...args){
    if(typeof this !== 'function'){
        throw new TypeError('myCall must be called on a function');
    }
    context = context || globalThis
    const fnSymbol = Symbol('fn')
    context[fnSymbol] = this
    const result = context[fnSymbol](...args)
    delete context[fnSymbol]
    return result
}

Function.prototype.myBind = function(context, ...args){
    if(typeof this !== 'function'){
        throw new TypeError('myBind must be called on a function');
    }
    const fn = this
    return function F(){
        // 通过new调用的话直接指向新的实例
        if(this instanceof F){
            return new fn(...args, ...arguments)
        }
        return fn.apply(context, args.concat(...arguments))
    }
}

// 测试对象
const obj = {
    value: 42,
    getValue: function() {
        return this.value;
    }
};

// 测试 myApply
console.log(obj.getValue.myApply(obj)); // 42
console.log(obj.getValue.myApply({ value: 100 })); // 100
console.log(obj.getValue.myApply(obj, [])); // 42

// 测试 myCall
console.log(obj.getValue.myCall(obj)); // 42
console.log(obj.getValue.myCall({ value: 100 })); // 100
console.log(obj.getValue.myCall(obj, 1, 2)); // 42 (额外参数被忽略)

// 测试 myBind
const boundGetValueWithArgs = obj.getValue.myBind(obj, 100);
console.log(boundGetValueWithArgs()); // 42 (args 被忽略)

const newBoundFunction = obj.getValue.myBind({}, 100);
console.log(newBoundFunction()); // 42 (this 指向空对象，value 为 undefined)

// 测试 myBind 的构造函数
class Person {
    constructor(name) {
        this.name = name;
    }
}

const boundPerson = Person.myBind(null, 'Alice');
const personInstance = new boundPerson();
console.log(personInstance.name); // Alice