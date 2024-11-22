function reverseString(str) {
  if (typeof str !== 'string') return 'Invalid input'
  let words = str.trim().split(/\s+/)
  return words.reverse().join(' ')
}

// 测试
// 测试
console.log(reverseString('hello world')); // 'world hello'
console.log(reverseString('  hello   world  ')); // 'world hello'
console.log(reverseString('')); // ''
console.log(reverseString('hello')); // 'hello'
console.log(reverseString('hello    world   !')); // '! world hello'
console.log(reverseString(123)); // 'Invalid input'