function foo(name, age) {
    console.log(this, name, age)
}

Function.prototype.hyapply = function (thisArg, otherArgs) {
    // console.log(this)
    //确保获取的是一个对象类型
    thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg)

    // thisArg.fn = this
    Object.defineProperty(thisArg, 'fn', {
        configurable: true,
        value: this
    })
    thisArg.fn(...otherArgs)

    delete thisArg.fn
}

Function.prototype.myCall = function (thisArg, ...args) {
    thisArg.fn = this
    return thisArg.fn(...args)
}

// foo.hyapply({name:'xm'})
foo.hyapply(123, ['why', 18])
