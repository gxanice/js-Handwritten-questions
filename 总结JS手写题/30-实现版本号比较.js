function compareVersion(v1, v2) {
  // 预发布版本权重
  const preReleaseWeight = {
    'alpha': 1,
    'beta': 2,
    'cr': 3,
    '': 4  // 正式版本权重最大
  };

  function parseVersion(v){
    v = v.replace('v','')
    const [version, preRelease = ''] = v.split('-');
    const numbers = version.split('.').map(Number);
    const type = preRelease.split('.')[0]
    return {numbers,type}
  }

  let v1Parts = parseVersion(v1);
  let v2Parts = parseVersion(v2);
  let v1Number = v1Parts.numbers
  let v2Number = v2Parts.numbers
  // 比较数字部分
  const maxLength = Math.max(v1Number.length, v2Number.length);
  for (let i = 0; i < maxLength; i++) {
    const num1 = v1Number[i] || 0;
    const num2 = v2Number[i] || 0;
    if (num1 !== num2) {
      return num1 > num2 ? v1 : v2;
    }
  }
  // 数字相等则比较版本权重
  let weight1 = preReleaseWeight[v1Parts.type] || 4
  let weight2 = preReleaseWeight[v2Parts.type] || 4

  if (weight1 > weight2) return v1;
  if (weight1 < weight2) return v2;

  return v1 // 完全相同时返回第一个版本
}

// 测试
console.log(compareVersion('v1.0.1-beta.1.1', 'v1.0.1-cr.0.1'));
console.log(compareVersion('v1.1.01-alpha.1', 'v1.1.01'));
console.log(compareVersion('v1.1.0', 'v1.1.01-alpha.1'));