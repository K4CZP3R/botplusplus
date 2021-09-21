import KeyValue from "../interfaces/key-value.interface";
import Store from "../interfaces/store.interface";


export default class InMemoryStore implements Store {

    memory: KeyValue[] = []
    constructor() {
    }

    removeKey(key: string): Promise<number> {
        return new Promise((resolve, reject) => {
            let idx = this.getIdxIfExists(key);
            if (idx === -1) {
                resolve(0);
            }

            this.memory.splice(idx, 1);
            resolve(1);
        })


    }

    private getIdxIfExists(key: string): number {
        let found = this.memory.filter((kv) => kv.key === key);
        if (found.length == 0) {
            return -1;
        }

        let idx = this.memory.indexOf(found[0])
        return idx;
    }

    sendToCache<T>(key: string, value: T): Promise<string | null> {
        return new Promise((resolve, reject) => {
            let idx = this.getIdxIfExists(key);
            if (idx !== -1) {
                this.memory[idx].value = JSON.stringify(value)
            }
            else {
                this.memory.push({ key: key, value: JSON.stringify(value) })
            }
            resolve(JSON.stringify(value))
        })
    }

    async readFromCache<T>(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            let idx = this.getIdxIfExists(key);
            if (idx === -1) {
                reject("User not found");
            }

            resolve(JSON.parse(this.memory[idx].value))
        })
    }
}