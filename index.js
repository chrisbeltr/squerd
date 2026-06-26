import "dotenv/config";
import { Client } from "discordx";
import { importx, dirname } from "@discordx/importer";
import { Collection, Events, GatewayIntentBits } from "discord.js";
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
    botGuilds: process.env.NODE_ENV == "DEV"
        ? ["377921394631114753", "895723035624095795"]
        : [],
});
client.once(Events.ClientReady, async () => {
    console.log(`Client "${client.user?.tag}" is connected.`);
    await client.clearApplicationCommands();
    await client.initApplicationCommands();
});
client.on(Events.InteractionCreate, (interaction) => {
    client.executeInteraction(interaction);
});
client.on(Events.VoiceStateUpdate, (oldState, newState) => { });
importx(`${dirname(import.meta.url)}/commands/**.js`).then(() => {
    console.log("All commands imported");
    client.login(process.env.TOKEN);
});
//# sourceMappingURL=index.js.map