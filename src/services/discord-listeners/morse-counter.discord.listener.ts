import { Message } from "discord.js";
import { CounterMeta } from "../../interfaces/counter-meta.interface";
import { DiscordListener } from "../../interfaces/discord-listener.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { CounterData } from "../counter.data";
import { CounterDiscordListener } from "./counter.discord-listener";

export class MorseCounterDiscordListener extends CounterDiscordListener {

    counterType = CounterType.Morse;


    private splitEvery(toSplit: string, n: number): string[] {
        let lastSplit = 0
        let splitted: string[] = []
        for (let i = 0; i < toSplit.length; i++) {
            if (i % n === n - 1) {
                splitted.push(toSplit.substring(lastSplit, i + 1))
                lastSplit = i + 1;
            }
        }
        return splitted
    }


    convertManyMorseToDec(morse: string[]): number {
        morse.reverse();
        let endNumber = 0;

        for (let i = 0; i < morse.length; i++) {

            let codeValue = 0;
            switch (morse[i]) {
                case '-----':
                    codeValue = 0;
                    break;
                case '.----':
                    codeValue = 1;
                    break;
                case '..---':
                    codeValue = 2;
                    break;
                case '...--':
                    codeValue = 3;
                    break;
                case '....-':
                    codeValue = 4;
                    break;
                case '.....':
                    codeValue = 5;
                    break;
                case '-....':
                    codeValue = 6;
                    break;
                case '--...':
                    codeValue = 7;
                    break;
                case '---..':
                    codeValue = 8;
                    break;
                case '----.':
                    codeValue = 9;
                    break;

            }

            codeValue = parseInt(codeValue.toString() + "0".repeat(i))
            endNumber += (codeValue)
        }

        return endNumber;
    }

    processSpecificNumberType(message: Message): number {
        let decMatches = message.content.replace(/ /g, '').match(new RegExp(/[.-]+/g))
        if (decMatches === null || decMatches.length === 0) {
            throw new Error("Can't find morse here.")
        }

        let morseString = decMatches[0]

        if (morseString.length % 5 !== 0) {
            throw new Error("Invalid morse string.")
        }

        return this.convertManyMorseToDec(this.splitEvery(morseString, 5))
    }



}