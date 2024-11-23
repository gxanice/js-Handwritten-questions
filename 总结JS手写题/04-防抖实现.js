function debounce(fn, delay) {
    let timer = null;
    return function () {
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 第一次使用时能够直接执行的防抖
