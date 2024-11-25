function debounce(fn, delay, immediate = false) {
    let timer = null;
    // 是否第一次
    let isFirst = true;

    return function () {
        if (immediate && isFirst) {
            fn.apply(this, ...arguments)
            isFirst = false
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, ...arguments)
            }, delay)
        }
    }
}

// 测试
function handleInput() {
    console.log(`Input handled at ${new Date().toISOString()}`);
}
const debouncedHandleInput = debounce(handleInput, 2000, true);
debouncedHandleInput(); // 立即执行
setTimeout(debouncedHandleInput, 500);  // 不执行，处于防抖期
setTimeout(debouncedHandleInput, 3000); // 2000ms后执行
setTimeout(debouncedHandleInput, 5000); // 立即执行，因为上一次已经过了防抖期
