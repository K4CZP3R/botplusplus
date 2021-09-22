import { DiscordCommandInput } from "../../interfaces/discord-command-input.interface";
import { DiscordCommand } from "../../interfaces/discord-command.interface";
import { CounterData } from "../counter.data";

export class ReadCounterDiscordCommand implements DiscordCommand {
    name = "counterinfo"
    description = "Reads info about counter in this channel"
    inputs: DiscordCommandInput[] = []
    counterData: CounterData

    constructor() {
        this.counterData = new CounterData();
    }

    async processCommand(interaction: any): Promise<boolean> {

        try {
            let counterType = await this.counterData.getCounterPreference(interaction.guildId, interaction.channelId)
            if (!counterType)
                interaction.reply("Type not set!")
            else
                interaction.reply(`Type of the counter here is \`${counterType.counterType}\``)
            return true
        }
        catch (e) {
            console.error(e)
            interaction.reply("Counter type not set!");
            return false;
        }
    }
}