let arr = [1, 2, [3, 4, [5, 6]]]
// arr = arr.flat(Infinity)

while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
}
console.log(arr)