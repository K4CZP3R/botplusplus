import { Message } from "discord.js";
import { CounterMeta } from "../../interfaces/counter-meta.interface";
import { DiscordListener } from "../../interfaces/discord-listener.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { CounterData } from "../counter.data";
import { CounterDiscordListener } from "./counter.discord-listener";

export class HexCounterDiscordListener extends CounterDiscordListener {

    counterType = CounterType.Hexadecimal;

    processSpecificNumberType(message: Message): number {
        let hexMatches = message.content.replace(/ /g, '').match(new RegExp(/[\dABCDEF]+/g))
        if (hexMatches === null || hexMatches.length === 0) {
            throw new Error("Can't find hex here.")
        }

        return parseInt(hexMatches[0], 16);
    }



}
