// 自己想的双指针法，有点问题也有点长
// function merge(arr1, arr2) {
//     let m = arr1.length
//     let n = arr2.length
//     let total = m + n - 1
//     let pre = 0
//     let last = 0
//     let newArr = []

//     while (pre + last < total) {
//         if (arr1[pre] < arr2[last]) {
//             newArr.push(arr1[pre])
//             ++pre
//         } else {
//             newArr.push(arr2[last])
//             ++last
//         }
//         // 判断边界，即其中一个数组已经遍历结束
//         if (pre == m) {
//             for (let i = last; i <= n - 1; i++) {
//                 newArr.push(arr2[i])
//             }
//         }
//         if (last == n) {
//             for (let i = pre; i <= m - 1; i++) {
//                 newArr.push(arr1[i])
//             }
//         }
//     }

//     return newArr
// }



/**
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
 * @param nums1
 * @param m
 * @param nums2
 * @param n
 */
function merge(nums1, m, nums2, n) {
    // 初始化两个指针的指向，初始化 nums1 尾部索引k
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (i >= 0 && j >= 0) {
        // 取较大的值，从末尾往前填补
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i];
            i--;
            k--;
        } else {
            nums1[k] = nums2[j];
            j--;
            k--;
        }
    }

    // nums2 留下的情况，特殊处理一下
    while (j >= 0) {
        nums1[k] = nums2[j];
        j--;
        k--;
    }
}


let arr1 = [1, 3, 5, 7, 9]
let arr2 = [2, 3, 5, 6]
merge(arr1, 5, arr2, 4)
console.log(arr1)