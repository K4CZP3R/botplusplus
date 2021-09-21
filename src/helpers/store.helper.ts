import Store from "../interfaces/store.interface";
import RedisStore from "../services/redis.store";

export function getStore(): Store {
    return new RedisStore();
}