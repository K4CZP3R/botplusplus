import { Message } from "discord.js";
import removeIdsFromString from "../../helpers/discord-messages.helper";
import { streakTime } from "../../helpers/streak.helper";
import { DiscordListener } from "../../interfaces/discord-listener.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { ICounterMeta } from "../../interfaces/models/counter-meta.model";
import { CounterData } from "../counter.data";

export class CounterDiscordListener implements DiscordListener {
    listenForNewMessages = true;
    counterData: CounterData
    counterType: undefined | CounterType = undefined

    constructor() {
        this.counterData = new CounterData();
    }

    private async inValidChannel(guildId: string, channelId: string): Promise<boolean> {
        let counterPreferences = await this.counterData.getCounterPreference(guildId, channelId)
        if (counterPreferences === null) {
            throw new Error("Counter type not set.")
        }

        return counterPreferences.counterType === this.counterType
    }
    private async getMeta(guildId: string, channelId: string): Promise<ICounterMeta> {
        let meta = await this.counterData.getCounterMeta(guildId, channelId)
        if (meta === null)
            throw new Error("meta does not exist!");
        return meta;
    }

    processSpecificNumberType(message: Message,): number {
        return 0;
    }

    async processMessage(message: Message): Promise<boolean> {

        try {
            if (!message.guildId)
                throw new Error("Can't get guild id!");
            let guildId = message.guildId;
            let channelId = message.channelId;

            if (!await this.inValidChannel(guildId, channelId)) {
                return false;
            }

            message.content = removeIdsFromString(message.content);




            let decValue = this.processSpecificNumberType(message);


            let counterMeta = await this.getMeta(guildId, channelId);
            let validUser = counterMeta.countedByUserId !== message.author.id
            // let validUser = true;
            let validValue = counterMeta.counterValue + 1 === decValue





            if (!validUser || !validValue) {
                await this.counterData.setCounterMeta(message.guildId, message.channelId, 0, "");


                let promises: Promise<any>[] = []

                promises.push(message.react('❌'));
                if (!validValue)
                    promises.push(message.reply(`Failed, reason: \`Invalid value, should be: ${counterMeta.counterValue + 1} and it was ${decValue}\``))
                if (!validUser)
                    promises.push(message.reply(`Failed because you did the last count`))
                await Promise.all(promises)

            }
            else {
                await this.counterData.setCounterMeta(message.guildId, message.channelId, decValue, message.author.id);
                let promises: Promise<any>[] = []
                promises.push(message.react('✅'))
                streakTime(decValue).forEach((emoji) => {
                    promises.push(message.react(emoji))
                })

                await Promise.all(promises)

            }
            return true;
        }
        catch (e: any) {

            console.warn(e.message)
            return false;
        }
    }






}
