arr = [2, 1, 2, 1, 1, 4, 5, 5, 5]
// 严谨一点可以先判断是否为数组
if (!Array.isArray(arr)) {
    console.log('type error!')
    return
}
// 使用过滤器，获取数组中当前item存在的index，和本身index相同则证明只存在一个，保留
const newArr = arr.filter((item,index) => {
    return arr.indexOf(item) == index
})

// 转化为set，set不允许有相同的两个属性
const newArr2 = [...new Set(arr)]

console.log(newArr)