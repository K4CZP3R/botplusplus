import { getStore } from "../helpers/store.helper";
import Store from "../interfaces/store.interface";

export class CounterData {
    store: Store
    constructor() {
        this.store = getStore();
    }


    setCounterPreference(guildId: string, channelId: string, counterType: string) {
        this.store.sendToCache
    }

}