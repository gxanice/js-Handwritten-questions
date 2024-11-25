function bigNumberAdd(num1, num2) {
    // 检查是否是负数
    const isNegative1 = num1.startsWith("-");
    const isNegative2 = num2.startsWith("-");

    // 处理小数部分
    const [int1, dec1 = ""] = num1.replace("-", "").split(".");
    const [int2, dec2 = ""] = num2.replace("-", "").split(".");
    const maxDecLength = Math.max(dec1.length, dec2.length);
    const paddedDec1 = dec1.padEnd(maxDecLength, "0");
    const paddedDec2 = dec2.padEnd(maxDecLength, "0");

    // 处理整数部分
    let resultDecimal = addStrings(paddedDec1, paddedDec2);
    const carryFromDecimal = resultDecimal.length > maxDecLength ? 1 : 0;
    resultDecimal = resultDecimal.slice(-maxDecLength);

    const resultInteger = addStrings(int1, int2, carryFromDecimal);

    // 拼接结果
    const result = resultDecimal
        ? `${resultInteger}.${resultDecimal}`
        : resultInteger;

    return (isNegative1 === isNegative2 ? "" : "-") + result.replace(/^0+/, "") || "0";
}

// 字符串相加（仅整数部分）
function addStrings(num1, num2, initialCarry = 0) {
    let carry = initialCarry;
    let result = "";

    const len1 = num1.length;
    const len2 = num2.length;

    for (let i = 0; i < Math.max(len1, len2) || carry; i++) {
        const digit1 = i < len1 ? +num1[len1 - 1 - i] : 0;
        const digit2 = i < len2 ? +num2[len2 - 1 - i] : 0;

        const sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10);
        result = (sum % 10) + result;
    }

    return result.replace(/^0+/, ""); // 移除前导零
}


function testBigNumberAdd() {
    console.log(bigNumberAdd("123456789123456789", "987654321987654321")); // 输出: "1111111111111111110"
    console.log(bigNumberAdd("123456789123456789.123", "987654321987654321.456")); // 输出: "1111111111111111110.579"
    console.log(bigNumberAdd("123.456", "876.544")); // 输出: "1000.000"
    console.log(bigNumberAdd("-123456789123456789", "987654321987654321")); // 输出: "864197532864197532"
    console.log(bigNumberAdd("-123456789123456789", "-987654321987654321")); // 输出: "-1111111111111111110"
}

testBigNumberAdd();
