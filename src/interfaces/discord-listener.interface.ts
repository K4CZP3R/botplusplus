import { Message } from "discord.js";

export interface DiscordListener {
    listenForNewMessages: boolean;

    processMessage(message: Message): Promise<boolean>
}