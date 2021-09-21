import { Interaction } from "discord.js";
import { DiscordCommand } from "../../interfaces/discord-command.interface";

export class AssignCounterDiscordCommand implements DiscordCommand {
    name = "counterhere"
    description = "Assigns specific counter for this channel."
    inputs = [
        {
            inputName: "counter_type",
            inputDescription: "Counter type to assign",
            choices: [{ name: "Hexadecimaal", value: "hex" }]
        }
    ]

    async processCommand(interaction: any): Promise<boolean> {
        let counterType = interaction.options.getString("counter_type")

        interaction.reply(`Counter ${counterType} in channel ${interaction.channel.id}`)
        return true

    }

}