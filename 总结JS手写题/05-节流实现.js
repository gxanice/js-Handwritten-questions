function throttle(fn, delay, immediate = false) {
    let timer = null;
    let isFirst = true;
    return function () {
        if (immediate && isFirst) {
            fn.apply(this, arguments);
            isFirst = false;
        } else {
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(this, arguments);
                    timer = null;
                }, delay);
            }
        }
    }
}

function onScroll() {
    console.log(`Triggered at ${new Date().toISOString()}`);
}
const throttledOnScroll = throttle(onScroll, 2000, true);
throttledOnScroll(); // 立即执行
setTimeout(throttledOnScroll, 500);  // 不执行，处于节流期
setTimeout(throttledOnScroll, 2500); // 执行，因为节流期已过
setTimeout(throttledOnScroll, 3000); // 执行，立即进入下一个节流周期