class Observer {
    constructor(data) {
        this.data = data;
        this.observe(this.data);
    }

    observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }

        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);

            this.observe(data[key]);
        });
    }

    defineReactive(obj, key, value) {
        const dep = new Dep();

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }

                return value;
            },
            set(newValue) {
                if (value === newValue) {
                    return;
                }

                value = newValue;

                dep.notify();
            }
        });
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}

Dep.target = null;

class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;

        this.value = this.get();
    }

    get() {
        Dep.target = this;
        const value = this.vm[this.exp];
        Dep.target = null;
        return value;
    }

    update() {
        const newValue = this.vm[this.exp];

        if (this.value !== newValue) {
            this.value = newValue;
            this.cb.call(this.vm, newValue);
        }
    }
}
