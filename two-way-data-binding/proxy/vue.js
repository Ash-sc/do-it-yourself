function Vue (options) {
    this.$options = options || {}
    const data = this._data = Observer(this.$options.data)

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(key => {
        this._proxyData(key)
    });

    this._initComputed()

    this.$compile = new Compile(options.el || document.body, this)
}

Vue.prototype = {
    $watch: function(key, cb) {
        new Watcher(this, key, cb)
    },

    _proxyData (key, setter) {
        setter = setter || Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: () => {
                return this._data[key]
            },
            set: (newVal) => {
                this._data[key] = newVal
            }
        })
    },

    _initComputed () {
        const computed = this.$options.computed
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(key => {
                Object.defineProperty(this, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set () {
                        console.error('can not set value for computed')
                    }
                })
            })
        }
    }
}
