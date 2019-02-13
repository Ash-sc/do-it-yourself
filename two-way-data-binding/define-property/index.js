const data = {
    name: 'origin'
}

observer(data)

data.name = 'new value'

function observer (obj = {}) {
    if (!(obj instanceof Object)) return

    Object.keys(obj).forEach(key => {
        addListener(obj, key, obj[key])
    })
}

function addListener (obj = {}, key, value) {
    // observer(value)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: false,
        get: () => value,
        set (val) {
            console.log(`value changed, new value : "${val}"`)
            value = val
        }
    })
}