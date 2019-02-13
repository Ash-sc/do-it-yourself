class Observer {
    constructor(data) {
        this.data = data
        this.walk(data)
    }

    walk (data) {
        Object.keys(data).forEach(key => {
            this.convert(key, data[key])
        })
    }

    convert (key, value) {
        this.defineReactive(this.data, key, value)
    }

    defineReactive(obj, key, value) {
        const dep = new Dep()

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                Dep.target && dep.depend()
                return value
            },
            set: function(newVal) {
                if (newVal === value) {
                    return
                }
                value = newVal
                // 通知订阅者
                dep.notify()
            }
        })
    }
}

let uid = 0

class Dep {
    constructor() {
        this.id = uid ++
        this.subs = []
    }

    addSub (sub) {
        this.subs.push(sub)
    }

    depend () {
        Dep.target.addDep(this)
    }

    removeSub (sub) {
        const index = this.subs.indexOf(sub)

        index >= 0 && this.subs.splice(index, 1)
    }

    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

Dep.target = null