function splitByThousands(num) {
    // 判断输入是否为数字
    if (typeof num !== 'number') {
        return 'Invalid input';
    }
    // 将数字转换为字符串
    num = num.toString();
    // 判断是否为小数
    let decimal = '';
    if (num.includes('.')) {
      [num, decimal] = num.split('.');
      decimal = '.' + decimal;
    }
    // 判断是否为负数
    let sign = '';
    if (num[0] === '-') {
        sign = '-';
        num = num.slice(1);
    }
    // 从后往前每三位加一个逗号
    let result = '';
    // 先拿最后面的数字
    for(let i = num.length - 1;i >= 0;i--){
      result = num[i] + result
      // 不能使用result判断，添加的逗号也算进长度
      if((num.length - i) % 3 === 0 && i !== 0){
        result = ',' + result
      }
    }
    return sign + result + decimal;
}

// 测试
console.log(splitByThousands(1234567.89));     // "1,234,567.89"
console.log(splitByThousands(-1234567.89));    // "-1,234,567.89"
console.log(splitByThousands(1000000));        // "1,000,000"
console.log(splitByThousands(123.4567));       // "123.4567"
console.log(splitByThousands(-1000000.00));    // "-1,000,000"
console.log(splitByThousands('abc'));          // "Invalid input"