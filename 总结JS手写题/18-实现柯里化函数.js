function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...moreArgs) {
                return curried.apply(this, args.concat(moreArgs));
            };
        }
    };
}


function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 输出 6
console.log(curriedAdd(1, 2)(3)); // 输出 6
console.log(curriedAdd(1)(2, 3)); // 输出 6
console.log(curriedAdd(1, 2, 3)); // 输出 6



// 在这个代码中，我们定义了一个curry函数，它接受一个函数fn作为参数，并返回一个新函数curried。当调用curried时，它会根据传入的参数个数来判断是否达到了需要柯里化的阈值（即fn的参数个数）。如果参数个数足够，则直接调用fn并返回结果；否则，返回一个新的函数，通过递归再次调用curried，并将已经传入的参数与新传入的参数进行拼接。