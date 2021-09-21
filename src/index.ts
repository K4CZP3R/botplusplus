import * as dotenv from 'dotenv';
import getEnv from './helpers/dotenv.helper';
import App from "./app";
import InMemoryStore from './services/in-memory.store';

dotenv.config();



let env = getEnv();

if (!env.DISCORD_TOKEN) {
    console.error('Discord token is not defined.');
    process.exit(1);
}

let app = new App(env.DISCORD_TOKEN, new InMemoryStore(), env.DISCORD_CLIENT_ID);

app.start();