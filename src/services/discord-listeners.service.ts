import { Message } from "discord.js";
import getAllDiscordListeners from "../helpers/discord-listeners.helper";
import { DiscordListener } from "../interfaces/discord-listener.interface";



export class DiscordListeners {

    listeners: DiscordListener[]
    constructor() {
        this.listeners = getAllDiscordListeners();

    }

    async handleNewMessage(message: Message) {
        let filtered = this.listeners
            .filter((listener) => listener.listenForNewMessages)
        console.log(filtered.length)
        filtered.forEach(async (listener) => {
            console.log("Executing listener", listener)
            await listener.processMessage(message)
        }
        )
    }

}