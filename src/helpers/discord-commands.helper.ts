import { DiscordCommand } from "../interfaces/discord-command.interface";
import { AssignCounterDiscordCommand } from "../services/discord-commands/assign-counter.discord-command";
import { ReadCounterDiscordCommand } from "../services/discord-commands/read-counter.discord-command";


export default function getAllDiscordCommands(): DiscordCommand[] {

    return [
        new AssignCounterDiscordCommand(),
        new ReadCounterDiscordCommand()
    ]

}