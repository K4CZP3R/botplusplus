import { Message } from "discord.js";
import removeIdsFromString from "../../helpers/discord-messages.helper";
import { streakTime } from "../../helpers/streak.helper";
import { CounterMeta } from "../../interfaces/counter-meta.interface";
import { DiscordListener } from "../../interfaces/discord-listener.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { CounterData } from "../counter.data";

export class CounterDiscordListener implements DiscordListener {
    listenForNewMessages = true;
    counterData: CounterData
    counterType: undefined | CounterType = undefined

    constructor() {
        this.counterData = new CounterData();
    }

    private async inValidChannel(guildId: string, channelId: string): Promise<boolean> {
        let counterType = await this.counterData.getCounterPreference(guildId, channelId)
        if (counterType === null) {
            throw new Error("Counter type not set.")
        }

        console.log("from redis", counterType, "from class", this.counterType)
        return counterType === this.counterType
    }
    private async getMeta(guildId: string, channelId: string): Promise<CounterMeta> {
        let meta = await this.counterData.getCounterMeta(guildId, channelId)
        if (meta === null)
            throw new Error("meta does not exist!");
        return meta;
    }

    processSpecificNumberType(message: Message): number {
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
            // let validUser = counterMeta.byUser !== message.author.id
            let validUser = true;
            let validValue = counterMeta.value + 1 === decValue
            // let validValue = true;



            if (!validUser || !validValue) {
                await this.counterData.setCounterMeta(message.guildId, message.channelId, 0, "");
                await message.react('❌')
                if (!validValue)
                    await message.reply(`Failed, reason: \`Invalid value, should be: ${counterMeta.value + 1} and it was ${decValue}\``)
                if (!validUser)
                    await message.reply(`Failed because you did the last count`)
            }
            else {
                await this.counterData.setCounterMeta(message.guildId, message.channelId, decValue, message.author.id);
                await message.react('✅')
                let streakEmoji = streakTime(decValue)
                if (streakEmoji.length > 0) {
                    streakEmoji.forEach(async (emoji) => await message.react(emoji))
                }
            }
            return true;
        }
        catch (e: any) {

            console.warn(e.message)
            return false;
        }
    }






}
