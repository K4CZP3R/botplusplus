import Store from "../interfaces/store.interface";
import RedisStore from "../services/redis.store";
import getEnv from "./dotenv.helper";

export function getStore(): Store {
    return new RedisStore(getEnv().REDIS_HOST);
}