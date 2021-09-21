import { Interaction } from "discord.js";
import { getStore } from "../../helpers/store.helper";
import { DiscordCommandInput } from "../../interfaces/discord-command-input.interface";
import { DiscordCommand } from "../../interfaces/discord-command.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import Store from "../../interfaces/store.interface";
import { CounterData } from "../counter.data";

export class RemoveCounterDiscordCommand implements DiscordCommand {
    name = "counterremove"
    description = "Assigns specific counter for this channel."
    counterData: CounterData
    inputs: DiscordCommandInput[] = []

    constructor() {
        this.counterData = new CounterData();
    }

    async processCommand(interaction: any): Promise<boolean> {

        let resp = await this.counterData.removeCounter(interaction.guildId, interaction.channelId)
        interaction.reply(`From now on, this channel is free of counting!`)

        return true
    }
}