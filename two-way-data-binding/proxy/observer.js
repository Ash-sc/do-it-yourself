function Observer (data = {}) {
    const dep = new Dep()

    const handler = {
        get (target, key, receiver) {
            Dep.target && dep.depend()
            return Reflect.get(target, key, receiver)
        },
        set (target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            if (!(target instanceof Array) || key !== 'length') {
                // 通知订阅者
                dep.notify()
            }
            return true
        }
    }

    Object.keys(data).forEach(key => {
        if (data[key] instanceof Array) {
            data[key] = new Proxy(data[key], handler)
        }
    })

    return new Proxy(data, handler)
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