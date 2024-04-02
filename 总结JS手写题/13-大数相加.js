function bigNumberAdd(num1, num2) {
    const isNegative1 = num1.startsWith("-");
    const isNegative2 = num2.startsWith("-");
    const isDecimal1 = num1.includes(".");
    const isDecimal2 = num2.includes(".");

    // 移除负号和小数点
    num1 = num1.replace("-", "").replace(".", "");
    num2 = num2.replace("-", "").replace(".", "");

    let len1 = num1.length;
    let len2 = num2.length;
    let carry = 0;
    let result = "";
    let decimalPoint = "";

    while (len1 || len2) {
        let n1 = len1 ? parseInt(num1[len1 - 1]) : 0;
        let n2 = len2 ? parseInt(num2[len2 - 1]) : 0;
        let sum = n1 + n2 + carry;
        carry = Math.floor(sum / 10);
        result = (sum % 10) + result;
        len1--;
        len2--;
    }

    if (carry > 0) {
        result = carry + result;
    }

    // 处理小数点
    if (isDecimal1 || isDecimal2) {
        result =
            result.slice(0, result.length - (isDecimal1 ? len1 : len2)) +
            "." +
            result.slice(result.length - (isDecimal1 ? len1 : len2));
    }

    // 处理负号
    if ((isNegative1 && !isNegative2) || (!isNegative1 && isNegative2)) {
        result = "-" + result;
    }

    return result;
}

// 首先，定义变量len1和len2分别表示num1和num2的长度；
// 然后，定义变量carry表示进位，初始值为0，定义变量result表示存放结果的字符串，初始值为空字符串；
// 接下来，我们使用while循环遍历num1和num2，每次取出当前位置的数字，并把它们相加加上进位carry；
// 如果两个数字之和超过了10，那么就需要进位，将carry设置为1，否则carry为0；
// 将两个数字之和对10取余数，并将结果拼接到result字符串的左边；
// 遍历完后，如果最高位有进位，将进位加到result字符串的左边；
// 最后，返回result字符串作为结果。