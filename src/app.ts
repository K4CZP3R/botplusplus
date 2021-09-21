import { Client, Intents } from "discord.js";


export default class App {

    private discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
    private botToken: string
    constructor(discordToken: string) {
        this.botToken = discordToken;


        this.discordClient.once('ready', this.onReady.bind(this));
        this.discordClient.on('messageCreate', this.onMessageCreate.bind(this))

    }

    async onMessageCreate(message: any) {
        console.log(message)
    }
    onReady(c: any): void {
        console.log(`Ready! Logged in as ${c.user.tag}`)
    }

    start(): void {
        this.discordClient.login(this.botToken)

    }
}