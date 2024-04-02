// 类似科学上网的代理服务器一样进行代理
// 婚介所例子

// 普通私密信息
const baseInfo = ["age", "career"];
// 保密信息
const privateInfo = ["avator", "phone"];

// 用户实例
const user = {
  isValidated: true,
  isVip: false,
};

// 规定礼物的数据结构由type和value组成
const present = {
  type: "巧克力",
  value: 60,
};

// 为用户增开presents字段存储礼物
const girl = {
  // 姓名
  name: "小美",
  // 自我介绍
  aboutMe: "",
  // 年龄
  age: 24,
  // 职业
  career: "teacher",
  // 假头像
  fakeAvatar: "xxxx",
  // 真实头像
  avatar: "xxxx",
  // 手机号
  phone: 123456,
  // 礼物数组
  presents: [],
  // 拒收50块以下的礼物
  bottomValue: 50,
  // 记录最近一次收到的礼物
  lastPresent: present,
};

// 代理婚介所
const Lovers = new Proxy(girl, {
  get: function (girl, key) {
    if (baseInfo.indexOf(key) !== -1 && !user.isValidated) {
      alert("您还没有完成验证哦");
      return;
    }

    // 其他校验

    if (user.isValidated && privateInfo.indexOf(key) && !user.isVip) {
      alert("只有VIP才可以查看该信息哦");
      return;
    }
  },

  set: function (girl, key, value) {
    if (key == "presents") {
      if (val.value < girl.bottomValue) {
        alert("sorry，您的礼物被拒收了");
        return;
      }

      // 如果没有拒收，则赋值成功，同时并入presents数组
      girl.lastPresent = val;
      girl.presents = [...girl.presents, val];
    }
  },
});
