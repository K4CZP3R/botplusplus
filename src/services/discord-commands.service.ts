import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import getEnv from "../helpers/dotenv.helper";
import getAllDiscordCommands from "../helpers/discord-commands.helper";
import { DiscordCommand } from "../interfaces/discord-command.interface";
import { Interaction } from "discord.js";



export class DiscordCommands {

    commands: DiscordCommand[]
    rest: REST
    clientId: string;
    discordToken: string;
    constructor(discordToken: string, clientId: string) {
        let env = getEnv()

        this.clientId = clientId;
        this.discordToken = discordToken
        this.rest = new REST({ version: '9' }).setToken(env.DISCORD_TOKEN)

        this.commands = getAllDiscordCommands();

    }

    private generateCommandsArray(): any {
        let commandsArray: any[] = []
        this.commands.forEach((command) => {
            let slashCommand = new SlashCommandBuilder()
                .setName(command.name)
                .setDescription(command.description)

            command.inputs.forEach((input) => {
                let option: SlashCommandStringOption = new SlashCommandStringOption().setName(input.inputName).setDescription(input.inputDescription);

                input.choices.forEach((choice) => {
                    option = option.addChoice(choice.name, choice.value)
                })
                option = option.setRequired(true)
                slashCommand.addStringOption(option);
            })

            commandsArray.push(slashCommand)
        })
        commandsArray.map(command => command.toJSON());
        return commandsArray;
    }

    async registerCommands(guildId: string): Promise<boolean> {
        try {
            await this.rest.put(
                Routes.applicationGuildCommands(this.clientId, guildId),
                { body: this.generateCommandsArray() }
            );
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }

    async handleInteraction(interaction: any) {
        const { commandName } = interaction

        let command = this.getCommandByName(commandName)
        if (command)
            command.processCommand(interaction)

    }

    private getCommandByName(name: string): DiscordCommand | undefined {
        let commands = this.commands.filter((command) => command.name === name)
        return commands.length > 0 ? commands[0] : undefined;

    }

}