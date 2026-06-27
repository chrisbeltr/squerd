import "dotenv/config";
import { RE2 } from "re2";
import { Client } from "discordx";
import { importx, dirname } from "@discordx/importer";
import {
  Events,
  GatewayIntentBits,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";

let link = new RE2(
  "https?:\/\/(((www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,})|([0-9]{1,3}(\.[0-9]{1,3}){3}))(:[0-9]{1,5})?(\/[-a-zA-Z0-9@%_+~#?&\/= ]*)*",
  "im",
);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  botGuilds:
    process.env.NODE_ENV == "DEV"
      ? ["377921394631114753", "895723035624095795"]
      : ["728488981825847308"],
});

client.once(Events.ClientReady, async () => {
  console.log(`Client "${client.user?.tag}" is connected.`);

  await client.clearApplicationCommands();

  await client.initApplicationCommands();
  console.log("All commands initialized.");
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  let logChannel = (await oldState.guild.channels.fetch(
    process.env.LOG_CHANNEL!,
  )) as TextChannel;
  let pingRole = await oldState.guild.roles.fetch(process.env.PING_ROLE!);
  let vcRole = await oldState.guild.roles.fetch(process.env.VC_ROLE!);
  if (
    newState.channel != null &&
    (oldState.channel == null ||
      !oldState.channel
        .permissionsFor(oldState.guild.roles.everyone)
        .has(PermissionFlagsBits.ViewChannel)) &&
    newState.channel
      .permissionsFor(newState.guild.roles.everyone)
      .has(PermissionFlagsBits.ViewChannel)
  ) {
    logChannel.send(
      `${pingRole} - \`${newState.member?.displayName}\` has joined \`${newState.channel.name}\`!`,
    );
    oldState.member?.roles.add(vcRole!);
  } else if (
    oldState.channel != null &&
    (newState.channel == null ||
      !newState.channel
        .permissionsFor(newState.guild.roles.everyone)
        .has(PermissionFlagsBits.ViewChannel)) &&
    oldState.channel
      .permissionsFor(oldState.guild.roles.everyone)
      .has(PermissionFlagsBits.ViewChannel)
  ) {
    logChannel.send(`\`${oldState.member?.displayName}\` has disconnected.`);
    oldState.member?.roles.remove(vcRole!);
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (!message.author.bot) {
    if (message.channel.id == process.env.MOOD_CHANNEL) {
      if (
        !(
          link.test(message.content) ||
          message.attachments.size > 0 ||
          message.author.id == process.env.ME
        )
      ) {
        let logChannel = (await message.guild?.channels.fetch(
          process.env.MOOD_LOG_CHANNEL!,
        )) as TextChannel;
        await logChannel.send(
          `${message.member?.displayName} tried to send this: ${message.content}`,
        );
        await message.delete();
        let warning = await message.channel.send(
          "no typing in the mood asshole",
        );
        setTimeout(() => warning.delete(), 5000);
      }
    }
  }
});

client.on(Events.InteractionCreate, (interaction) => {
  client.executeInteraction(interaction);
});

importx(`${dirname(import.meta.url)}/commands/**.js`).then(() => {
  client.login(process.env.TOKEN!);
});
