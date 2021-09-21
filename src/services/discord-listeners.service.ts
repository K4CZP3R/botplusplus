import { Message } from "discord.js";
import getAllDiscordListeners from "../helpers/discord-listeners.helper";
import { DiscordListener } from "../interfaces/discord-listener.interface";



export class DiscordListeners {

    listeners: DiscordListener[]
    constructor() {
        this.listeners = getAllDiscordListeners();

    }

    async handleNewMessage(message: Message) {
        this.listeners
            .filter((listener) => listener.listenForNewMessages)
            .forEach(async (listener) => await listener.processMessage(message))
    }

}