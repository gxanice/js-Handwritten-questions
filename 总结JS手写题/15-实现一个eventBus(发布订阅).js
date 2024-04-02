class EventBus {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    unsubscribe(eventName, listener) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter((existingListener) => existingListener !== listener);
        }
    }

    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((listener) => {
                listener(data);
            });
        }
    }
}

// 使用示例
const eventBus = new EventBus();

function handleEvent1(data) {
    console.log('Event 1 handled with data:', data);
}

function handleEvent2(data) {
    console.log('Event 2 handled with data:', data);
}

eventBus.subscribe('event1', handleEvent1);
eventBus.subscribe('event2', handleEvent2);

eventBus.publish('event1', 'Hello, event 1 subscribers!');
eventBus.publish('event2', 'Hi, event 2 subscribers!');

eventBus.unsubscribe('event1', handleEvent1);

eventBus.publish('event1', 'This message should not be received by event 1 subscribers');


// 我们定义了一个EventBus类，其中包含了subscribe、unsubscribe和publish方法。通过subscribe方法，我们可以订阅特定的事件名称，并指定事件发生时要执行的回调函数。通过publish方法，我们可以触发特定事件名称的所有订阅者的回调函数。而通过unsubscribe方法，我们可以取消订阅指定事件名称的回调函数。