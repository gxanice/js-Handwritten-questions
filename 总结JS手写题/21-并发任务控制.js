// 优先级队列会因为直接执行而不等待全部任务加载会无法排序
class TaskController {
  constructor(maxConcurrent) {
    // 任务列表
    this.taskList = [];
    // 正在执行的任务
    this.executingTask = 0;
    // 最大并发数
    this.maxConcurrent = maxConcurrent;
  }

  // 添加任务
  addTask(task, priority = 0) {
    return new Promise((resolve, reject) => {
      this.taskList.push({ task, resolve, reject, priority });
    //   console.log('排序前',this.taskList);
    //   // 根据优先级进行排序(数字越小，优先级越大，从小到大排序)
    //   this.taskList.sort((a, b) => a.priority - b.priority);
    //   console.log("排序后", this.taskList);
      this._run();
    });
  }

  // 执行任务
  _run() {
    while (this.taskList.length > 0 && this.executingTask < this.maxConcurrent) {
      // 取出第一个任务
      let { task, resolve, reject } = this.taskList.shift();
      this.executingTask++;
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.executingTask--;
          this._run(); // 递归执行下一个任务
        });
    }
  }
}

// 示例任务（返回Promise的函数）
function createTask(duration, shouldFail = false) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          console.log(`Task failed after ${duration}ms`);
          reject(`Failed after ${duration}ms`);
        } else {
          console.log(`Task completed in ${duration}ms`);
          resolve(`Completed in ${duration}ms`);
        }
      }, duration);
    }).catch((error) => {
      // 处理Promise拒绝的情况
      console.error("Promise was rejected:", error);
    });
}

// 创建一个最多同时运行3个任务的执行器
const executor = new TaskController(3);

// 添加任务到执行器
executor.addTask(createTask(1000)); // 优先级1
executor.addTask(createTask(2000, true)); // 优先级2，将失败
executor.addTask(createTask(500)); // 优先级3
executor.addTask(createTask(1500)); // 优先级4