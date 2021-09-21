import { Client, Guild, Intents, Interaction } from "discord.js";
import { getStore } from "./helpers/store.helper";
import Store from "./interfaces/store.interface";
import { DiscordCommands } from "./services/discord-commands.service";



export default class App {

    private discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
    private cacheService: Store = getStore();
    private discordCommands: DiscordCommands

    private botToken: string
    constructor(discordToken: string, clientId: string) {
        this.botToken = discordToken;

        this.discordCommands = new DiscordCommands(discordToken, clientId)


        this.discordClient.once('ready', this.onReady.bind(this));
        this.discordClient.on('messageCreate', this.onMessageCreate.bind(this))
        this.discordClient.on('guildCreate', this.onGuildJoin.bind(this));
        this.discordClient.on('interactionCreate', this.onInteractionCreate.bind(this))


    }

    async onInteractionCreateCommand(interaction: Interaction) {
        this.discordCommands.handleInteraction(interaction)

    }

    async onInteractionCreate(interaction: Interaction) {
        if (interaction.isCommand())
            this.onInteractionCreateCommand(interaction)
    }

    async onGuildJoin(guild: Guild) {
        console.log("Adding commands!")
        this.discordCommands.registerCommands(guild.id)
    }
    async onMessageCreate(message: any) {
        // console.log(message)
    }
    onReady(c: any): void {
        console.log(`Ready! Logged in as ${c.user.tag}`)
        this.discordCommands.registerCommands('889870836247437362')
    }

    start(): void {
        this.discordClient.login(this.botToken)

    }
}