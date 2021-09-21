import { getStore } from "../helpers/store.helper";
import { CounterType } from "../interfaces/enum/counter-type";
import Store from "../interfaces/store.interface";

export class CounterData {
    store: Store
    constructor() {
        this.store = getStore();
    }


    async setCounterPreference(guildId: string, channelId: string, counterType: CounterType): Promise<string | null> {
        return this.store.sendToCache<CounterType>(`${guildId}.${channelId}`, counterType);
    }
    async getCounterPreference(guildId: string, channelId: string): Promise<CounterType> {
        return this.store.readFromCache<CounterType>(`${guildId}.${channelId}`)
    }

}