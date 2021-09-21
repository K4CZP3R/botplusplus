import { Interaction } from "discord.js";
import { DiscordCommandInput } from "./discord-command-input.interface";

export interface DiscordCommand {
    name: string;
    description: string;
    inputs: DiscordCommandInput[];
    processCommand(interaction: Interaction): Promise<boolean>
}