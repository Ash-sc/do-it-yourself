const obj = {
    name: 'origin value',
    arr: []
}

const handler = {
    get (target, key, receiver) {
        return Reflect.get(target, key, receiver)
    },

    set (target, key, value, receiver) {
        Reflect.set(target, key, value, receiver)
        if (!(target instanceof Array) || key !== 'length') {
            console.log('key :', key, 'value :', value)
        }
        return true
    }
}

const proxy = new Proxy(obj, handler)

Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Array) {
        obj[key] = new Proxy(obj[key], handler)
    }
})

proxy.arr.push(3333)
console.log(obj.arr, proxy.arr)