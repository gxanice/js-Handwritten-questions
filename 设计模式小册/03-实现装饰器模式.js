// 使用装饰器模式对按钮点击的触发效果进行格外的封装
// 定义打开按钮
class OpenButton {
  // 点击后展示弹窗（旧逻辑）
  onClick() {
    const modal = new Modal();
    modal.style.display = "block";
  }
}

// 定义装饰器
class Decorator {
  constructor(open_click) {
    this.open_click = open_click;
  }

  // 装饰器方法
  onClick() {
    this.open_click.onClick();
    // 新增逻辑
    this.changeButtonStatus();
  }

  changeButtonStatus() {
    this.changeButtonText();
    this.disableButton();
  }

  disableButton() {
    const btn = document.getElementById("open");
    btn.setAttribute("disabled", true);
  }

  changeButtonText() {
    const btn = document.getElementById("open");
    btn.innerText = "快去登录";
  }
}

const openButton = new OpenButton();
const decorator = new Decorator(openButton);

document.getElementById("open").addEventListener("click", function () {
  // openButton.onClick()
  // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
  decorator.onClick();
});
