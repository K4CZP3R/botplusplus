export default interface Store {
    removeKey(key: string): Promise<number>;
    sendToCache<T>(key: string, value: T): Promise<string | null>;
    readFromCache<T>(key: string): Promise<T>;
}