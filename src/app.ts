import { Client, Guild, Intents, Interaction, Message } from "discord.js";
import { connect } from "mongoose";
import { connectToMongoDb } from "./helpers/data.helper";
import { DiscordCommands } from "./services/discord-commands.service";
import { DiscordListeners } from "./services/discord-listeners.service";



export default class App {

    private discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
    private discordCommands: DiscordCommands
    private discordListeners: DiscordListeners;

    private botToken: string
    constructor(discordToken: string, clientId: string) {
        this.botToken = discordToken;

        this.discordCommands = new DiscordCommands(discordToken, clientId)
        this.discordListeners = new DiscordListeners();


        connectToMongoDb().then(() => {
            console.log("Connected to the db!")
        })




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
        console.log("Adding commands to a new guild!")
        this.discordCommands.registerCommands(guild.id)
    }
    async onMessageCreate(message: Message) {
        if (message.author.bot) return;
        this.discordListeners.handleNewMessage(message);
    }
    onReady(c: any): void {
        console.log(`Ready! Logged in as ${c.user.tag}`)
        this.discordClient.guilds.cache.map(guild => guild.id).forEach((gId) => {
            this.discordCommands.registerCommands(gId)
        })
    }

    start(): void {
        this.discordClient.login(this.botToken)

    }
}