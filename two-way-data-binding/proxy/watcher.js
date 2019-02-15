class Watcher {
    constructor(vm, expOrFn, cb, node) {
        this.cb = cb
        this.vm = vm
        this.node = node
        this.expOrFn = expOrFn
        this.depIds = {}
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        }
        else {
            this.getter = this.parseGetter(expOrFn)
        }
        this.value = this.get()
    }

    update () {
        this.run()
    }

    run () {
        const value = this.get()
        const oldVal = this.value
        if (value !== oldVal) {
            this.value = value
            this.cb(value)
        }
    }

    addDep (dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this)
            this.depIds[dep.id] = dep
        }
    }

    get () {
        Dep.target = this
        var value = this.getter.call(this.vm, this.vm)
        Dep.target = null
        return value
    }

    parseGetter (exp) {
        if (/[^\w.$]/.test(exp)) return

        const expArr = exp.split('.')

        return function(obj) {
            for (var i = 0, len = expArr.length; i < len; i++) {
                if (!obj) return
                obj = obj[expArr[i]]
            }
            return obj
        }
    }
}