import { getStore } from "../helpers/store.helper";
import { CounterMeta } from "../interfaces/counter-meta.interface";
import { CounterType } from "../interfaces/enum/counter-type";
import Store from "../interfaces/store.interface";

export class CounterData {
    store: Store
    constructor() {
        this.store = getStore();
    }


    async setCounterPreference(guildId: string, channelId: string, counterType: CounterType): Promise<string | null> {
        return this.store.sendToCache<CounterType>(`pref-${guildId}.${channelId}`, counterType);
    }
    async getCounterPreference(guildId: string, channelId: string): Promise<CounterType> {
        return this.store.readFromCache<CounterType>(`pref-${guildId}.${channelId}`)
    }

    async setCounterMeta(guildId: string, channelId: string, counterValue: number, byUser: string): Promise<string | null> {
        let counterMeta: CounterMeta = {
            value: counterValue,
            byUser: byUser
        }
        return this.store.sendToCache<CounterMeta>(`meta-${guildId}.${channelId}`, counterMeta);
    }

    async getCounterMeta(guildId: string, channelId: string): Promise<CounterMeta> {
        return this.store.readFromCache<CounterMeta>(`meta-${guildId}.${channelId}`)
    }

}