import { DiscordCommand } from "../interfaces/discord-command.interface";
import { AssignCounterDiscordCommand } from "../services/discord-commands/assign-counter.discord-command";


export default function getAllDiscordCommands(): DiscordCommand[] {

    return [
        new AssignCounterDiscordCommand()
    ]

}