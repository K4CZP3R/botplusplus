import { createClient } from "redis";
import { RedisClientType } from "redis/dist/lib/client";
import { RedisModules } from "redis/dist/lib/commands";
import { RedisLuaScripts } from "redis/dist/lib/lua-script";
import Store from "../interfaces/store.interface";

export default class RedisStore implements Store {
    client: RedisClientType<RedisModules, RedisLuaScripts>

    constructor(redisHost?: string) {
        this.client = redisHost ? createClient({
            socket: {
                url: redisHost
            }
        }) : createClient()

        this.client.connect();
    }

    removeKey(key: string): Promise<number> {
        return this.client.del(key);
    }
    sendToCache<T>(key: string, value: T): Promise<string | null> {
        return this.client.set(key, JSON.stringify(value)).then((resp) => {
            this.client.expire(key, 60 * 60)
            return resp
        })
    }

    async readFromCache<T>(key: string): Promise<T> {
        return JSON.parse(await this.client.get(key)) as T
    }
}