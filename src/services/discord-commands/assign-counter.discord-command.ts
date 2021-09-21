import { Interaction } from "discord.js";
import { DiscordCommand } from "../../interfaces/discord-command.interface";

export class AssignCounterDiscordCommand implements DiscordCommand {
    name = "counterhere"
    description = "Assigns specific counter for this channel."
    inputs = [
        {
            inputName: "counter_type",
            inputDescription: "Counter type to assign"
        }
    ]

    async processCommand(interaction: any): Promise<boolean> {
        interaction.reply("Yeah in channel id " + interaction.channelId)
        return true

    }

}