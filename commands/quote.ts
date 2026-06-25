import { CommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("add a quote to the quotes channel!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("yoooooo");
  },
};
