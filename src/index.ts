import * as dotenv from 'dotenv';
import getEnv from './helpers/dotenv.helper';
import App from "./app";

dotenv.config();



let env = getEnv();

if (!env.DISCORD_TOKEN) {
    console.error('Discord token is not defined.');
    process.exit(1);
}

let app = new App(env.DISCORD_TOKEN);

app.start();