function newCreate(fn,...args) {
    // 创建空对象
    let obj = new Object()
    // 构造函数
    let con
    if (!fn) {
        con = [].shift.call(...args)
    }
    con = fn
    // 绑定
    obj.__proto__ = con.prototype
    let result = con.call(obj, ...args)
    
    return obj instanceof Object ? result : obj
}

function Person(name) {
  this.name = name;
  this.sayName = function () {
    console.log("name", this.name);
  };
  return {
    name: "maomao",
    sayName: function () {
      console.log("name", this.name);
    }
  };
}
const person = newCreate(Person, "ayetongzhi");
console.log("person", person);
person.sayName();  // maomao