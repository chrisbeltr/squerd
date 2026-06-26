import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  MessageContextMenuCommandInteraction,
  MessageFlags,
  TextChannel,
  type CommandInteraction,
} from "discord.js";
import { ContextMenu, Discord, Slash, SlashOption } from "discordx";

@Discord()
export class Quote {
  @Slash({ name: "quote", description: "add a quote to the quotes channel." })
  async quote(
    @SlashOption({
      name: "quote",
      description: "what did they say?",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    input: string,

    @SlashOption({
      name: "author",
      description: "who said it?",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    author: string,

    interaction: CommandInteraction,
  ): Promise<void> {
    let ch = (await interaction.guild?.channels.fetch(
      process.env.QUOTES_CHANNEL!,
    )) as TextChannel;
    await ch.send(
      `${input}\n\\- ${author}, <t:${Math.floor(interaction.createdAt.getTime() / 1000)}>`,
    );
    await interaction.reply({
      content: "added quote to quotes channel!",
      flags: MessageFlags.Ephemeral,
    });
  }

  @ContextMenu({ name: "quote", type: ApplicationCommandType.Message })
  async quote_message(interaction: MessageContextMenuCommandInteraction) {
    let ch = (await interaction.guild?.channels.fetch(
      process.env.QUOTES_CHANNEL!,
    )) as TextChannel;
    let member = await interaction.guild?.members.fetch(
      interaction.targetMessage.author.id,
    );
    await ch.send(
      `${interaction.targetMessage.content}\n\\- ${member?.displayName}, <t:${Math.floor(interaction.targetMessage.createdTimestamp / 1000)}>`,
    );
    await interaction.reply({
      content: `added quote to quotes channel!`,
      flags: MessageFlags.Ephemeral,
    });
  }
}
