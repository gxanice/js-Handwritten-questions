function throttle(fn, delay) {
    let timer = null;
    return function () {
        const args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, delay);
        }
    };
}
