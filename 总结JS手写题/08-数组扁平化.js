let arr = [1, 2, [3, 4, [5, 6]]]
// arr = arr.flat(Infinity)

// while (arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr)
// }

const flatten = arr => arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
},[])

arr = flatten(arr)

console.log(arr)
