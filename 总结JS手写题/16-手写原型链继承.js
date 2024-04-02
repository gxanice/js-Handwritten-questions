// 父类
function Animal(name) {
    this.name = name;
}

Animal.prototype.sayName = function () {
    console.log('My name is ' + this.name);
};

// 子类
function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// 创建一个父类实例作为子类的原型
Dog.prototype = Object.create(Animal.prototype);

// 修复子类的构造函数指向
Dog.prototype.constructor = Dog;

// 子类方法
Dog.prototype.bark = function () {
    console.log('Woof!');
};

// 使用示例
const myDog = new Dog('Max', 'Bulldog');
myDog.sayName(); // 输出 "My name is Max"
myDog.bark(); // 输出 "Woof!"


// 我们定义了一个父类 Animal，它有一个 name 属性和一个 sayName 方法。然后我们定义了一个子类 Dog，它继承自父类 Animal。在子类的构造函数中，我们使用 call 方法调用父类的构造函数，以便在子类实例中设置正确的 name 属性。接着，我们通过 Object.create 方法创建一个父类实例，并将其赋值给子类的原型，从而建立起原型链关系。最后，我们修复了子类的构造函数指向，确保它指向正确的 Dog 构造函数。