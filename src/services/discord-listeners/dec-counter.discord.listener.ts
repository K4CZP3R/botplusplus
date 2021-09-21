import { Message } from "discord.js";
import { CounterMeta } from "../../interfaces/counter-meta.interface";
import { DiscordListener } from "../../interfaces/discord-listener.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { CounterData } from "../counter.data";
import { CounterDiscordListener } from "./counter.discord-listener";

export class DecCounterDiscordListener extends CounterDiscordListener {

    counterType = CounterType.Decimal;

    processSpecificNumberType(message: Message): number {
        let decMatches = message.content.replace(/ /g, '').match(new RegExp(/\d+/g))
        if (decMatches === null || decMatches.length === 0) {
            throw new Error("Can't find dec here.")
        }

        return parseInt(decMatches[0], 10);
    }



}