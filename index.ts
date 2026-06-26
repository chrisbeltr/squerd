import "dotenv/config";
import { Client } from "discordx";
import { importx, dirname } from "@discordx/importer";
import { Events, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
  botGuilds:
    process.env.NODE_ENV == "DEV"
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

importx(`${dirname(import.meta.url)}/commands/**.js`).then(() => {
  console.log("All commands imported");

  client.login(process.env.TOKEN!);
});
