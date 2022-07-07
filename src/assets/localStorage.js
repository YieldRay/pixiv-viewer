class Storage {
    constructor(key = "history", init = [], listener) {
        this._key = key;
        this._init = init;
        this._listener = listener;
    }

    set(obj) {
        localStorage.setItem(this._key, JSON.stringify(obj));
        typeof this._listener === "function" && this._listener();
    }
    get() {
        const stored = localStorage.getItem(this._key);
        if (stored === null) this.set(this._init);
        let data;
        try {
            data = JSON.parse(stored);
        } catch {
            data = this._init;
        }
        return data;
    }
    push(value) {
        try {
            const data = this.get();
            data.push(value);
            this.set(data);
        } catch {
            this.set([]);
        }
    }
    clear() {
        localStorage.setItem(this._key, "[]");
    }
    noRepeat() {
        this.set([...new Set(this.get())]);
    }
}

const storage = new Storage();

export { Storage, storage };
