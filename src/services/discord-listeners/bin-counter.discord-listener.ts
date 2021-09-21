import { Message } from "discord.js";
import { DiscordListener } from "../../interfaces/discord-listener.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { CounterData } from "../counter.data";

export class BinCounterDiscordListener implements DiscordListener {
    listenForNewMessages = true;
    counterData: CounterData
    counterType: CounterType = CounterType.Binary;

    constructor() {
        this.counterData = new CounterData();
    }

    private async inValidChannel(message: Message): Promise<boolean> {
        if (!message.guildId)
            return false;

        let counterType = await this.counterData.getCounterPreference(message.guildId, message.channelId)
        if (counterType === null) {
            return false;
        }

        console.log(counterType, this.counterType)
        return counterType === this.counterType
    }

    async processMessage(message: Message): Promise<boolean> {
        if (!await this.inValidChannel(message)) {
            console.log("Not for me!")
            return false;
        }

        console.log(message.content.match(new RegExp(/\d+/g)))
        return true;

    }

}