export interface DiscordCommandInput {
    inputName: string;
    inputDescription: string;
    choices: DiscordCommandInputChoice[];
}
export interface DiscordCommandInputChoice {
    name: string;
    value: string;
}