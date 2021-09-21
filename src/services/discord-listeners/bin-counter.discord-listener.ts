import { Message } from "discord.js";
import { CounterMeta } from "../../interfaces/counter-meta.interface";
import { DiscordListener } from "../../interfaces/discord-listener.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { CounterData } from "../counter.data";
import { CounterDiscordListener } from "./counter.discord-listener";

export class BinCounterDiscordListener extends CounterDiscordListener {

    counterType = CounterType.Binary;

    processSpecificNumberType(message: Message): number {
        let binaryMatches = message.content.replace(/ /g, '').match(new RegExp(/[0-1]+/g))
        if (binaryMatches === null || binaryMatches.length === 0) {
            throw new Error("Can't find binary here.")
        }
        return parseInt(binaryMatches[0], 2)
    }



}