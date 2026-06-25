import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once(Events.ClientReady, (readyClient: Client) => {
  console.log(`Bot ${readyClient.user!.tag} loggged in.`);
});

client.login(process.env.TOKEN);
