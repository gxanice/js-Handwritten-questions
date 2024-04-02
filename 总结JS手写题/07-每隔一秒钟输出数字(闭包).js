// 不使用var定义，使用let定义
for (let i = 0; i < 6; i++){
    setTimeout(() => {
        console.log(i)
    },1000)
}

// 使用闭包
for (var i = 0; i < 6; i++){
    (function (j) {
        setTimeout(() => {
            console.log(j)
        })
    })(i)
}