const obj = {
    name: "张三",
    age: 20
};

const handler = {
    get(obj, property) {
        console.log(`访问 ${property}`);
        return obj[property];
    },
    set(obj, property, value) {
        console.log(`设置 ${property} 为 ${value}`);
        obj[property] = value;
    }
};

const proxy = new Proxy(obj, handler);

console.log(proxy.name); // 输出 "访问 name" 和 "张三"
proxy.age = 21; // 输出 "设置 age 为 21"
