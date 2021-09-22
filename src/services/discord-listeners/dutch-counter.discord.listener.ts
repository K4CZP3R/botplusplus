import { Message } from "discord.js";
import { CounterMeta } from "../../interfaces/counter-meta.interface";
import { DiscordListener } from "../../interfaces/discord-listener.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { CounterData } from "../counter.data";
import { CounterDiscordListener } from "./counter.discord-listener";
import n2words from 'n2words'



export class DutchCounterDiscordListener extends CounterDiscordListener {

    counterType = CounterType.Dutch;


    whatAmI(message: string): number | undefined {
        let iAm: number | undefined = undefined
        for (let i = 0; i < 10000; i++) {
            let word = (n2words(i, { lang: 'nl' }) as string).normalize('NFC').replace('ë', 'e')


            if (word === message) {
                iAm = i;
                break;
            }
        }

        return iAm
    }

    processSpecificNumberType(message: Message): number {
        let nlMatches = message.content.replace(/ /g, '').normalize('NFC').replace('ë', 'e')
        if (nlMatches === null || nlMatches.length === 0) {
            throw new Error("Can't find dutch here.")
        }

        let typed = this.whatAmI(nlMatches);
        if (!typed) {
            throw new Error("Can't recognize it!");
        }

        return typed;
    }



}