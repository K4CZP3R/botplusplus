import { DiscordListener } from "../interfaces/discord-listener.interface";
import { BinCounterDiscordListener } from "../services/discord-listeners/bin-counter.discord-listener";


export default function getAllDiscordListeners(): DiscordListener[] {

    return [
        new BinCounterDiscordListener()
    ]

}