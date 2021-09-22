import { Interaction } from "discord.js";
import { DiscordCommandInput } from "../../interfaces/discord-command-input.interface";
import { DiscordCommand } from "../../interfaces/discord-command.interface";
import { CounterType } from "../../interfaces/enum/counter-type";
import { CounterData } from "../counter.data";

export class AssignCounterDiscordCommand implements DiscordCommand {
    name = "counterhere"
    description = "Assigns specific counter for this channel."
    inputs: DiscordCommandInput[]
    counterData: CounterData

    constructor() {
        this.counterData = new CounterData();
        this.inputs = this.generateInputs();
    }

    private counterTypeInput(): DiscordCommandInput {
        let toReturn: DiscordCommandInput = {
            inputName: "counter_type",
            inputDescription: "Counter type to assign",
            choices: []
        }

        let keys = Object.keys(CounterType);
        let values = Object.values(CounterType)


        keys.forEach((key) => {
            toReturn.choices.push({
                name: values[keys.indexOf(key)],
                value: key
            })

        })

        return toReturn;
    }

    generateInputs(): DiscordCommandInput[] {
        return [this.counterTypeInput()]
    }



    async processCommand(interaction: any): Promise<boolean> {
        let counterType = interaction.options.getString("counter_type")

        let resp = await this.counterData.setCounterPreference(interaction.guildId, interaction.channelId, counterType as CounterType)
        await this.counterData.setCounterMeta(interaction.guildId, interaction.channelId, 0, "")
        interaction.reply(`From now on, this channel is a counting channel with type \`${counterType}\``)

        return true
    }
}