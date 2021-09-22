import { connect } from "mongoose";
import { CounterType } from "../interfaces/enum/counter-type";
import CounterMeta, { ICounterMeta } from "../interfaces/models/counter-meta.model";
import CounterPreference, { ICounterPreference } from "../interfaces/models/counter-preference.model";

export class CounterData {

    async removeCounter(guildId: string, channelId: string): Promise<void> {
        await CounterMeta.findOneAndRemove({ guildId: guildId, channelId: channelId })
        await CounterPreference.findOneAndRemove({ guildId: guildId, channelId: channelId })
    }


    async setCounterPreference(guildId: string, channelId: string, counterType: CounterType): Promise<ICounterPreference> {
        let currentCounterPref: ICounterPreference | null = await CounterPreference.findOne({ guildId: guildId, channelId: channelId })

        if (currentCounterPref !== null) {
            currentCounterPref.counterType = counterType;
            return await currentCounterPref.save();

        }
        else {
            let newPreference: ICounterPreference = new CounterPreference({
                guildId: guildId,
                channelId: channelId,
                counterType: counterType
            })

            return await newPreference.save();
        }
    }
    async getCounterPreference(guildId: string, channelId: string): Promise<ICounterPreference | null> {
        return await CounterPreference.findOne({ guildId: guildId, channelId: channelId })
    }

    async setCounterMeta(guildId: string, channelId: string, counterValue: number, byUser: string): Promise<ICounterMeta | null> {
        let currentMeta: ICounterMeta | null = await CounterMeta.findOne({ guildId: guildId, channelId: channelId })
        if (currentMeta !== null) {
            currentMeta.counterValue = counterValue;
            currentMeta.countedByUserId = byUser;
            return await currentMeta.save();
        }
        else {
            let newMeta: ICounterMeta = new CounterMeta({
                guildId: guildId,
                channelId: channelId,
                counterValue: counterValue,
                countedByUserId: byUser
            })

            return await newMeta.save();
        }
    }

    async getCounterMeta(guildId: string, channelId: string): Promise<ICounterMeta | null> {
        return await CounterMeta.findOne({ guildId: guildId, channelId: channelId });
    }

}