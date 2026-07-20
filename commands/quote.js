var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ApplicationCommandOptionType, ApplicationCommandType, MessageContextMenuCommandInteraction, MessageFlags, TextChannel, } from "discord.js";
import { ContextMenu, Discord, Slash, SlashOption } from "discordx";
let Quote = class Quote {
    async quote(input, author, input2, author2, input3, author3, interaction) {
        let ch = (await interaction.guild?.channels.fetch(process.env.QUOTES_CHANNEL));
        let final_quote = "";
        final_quote += `${input} - ${author}`;
        if (input2 && author2)
            final_quote += `\n${input2} - ${author2}`;
        if (input3 && author3)
            final_quote += `\n${input3} - ${author3}`;
        final_quote += `, <t:${Math.floor(interaction.createdAt.getTime() / 1000)}>`;
        await ch.send(final_quote);
        await interaction.reply({
            content: "added quote to quotes channel!",
            flags: MessageFlags.Ephemeral,
        });
    }
    async quote_message(interaction) {
        let ch = (await interaction.guild?.channels.fetch(process.env.QUOTES_CHANNEL));
        let member = await interaction.guild?.members.fetch(interaction.targetMessage.author.id);
        await ch.send(`${interaction.targetMessage.content}\n\\- ${member?.displayName}, <t:${Math.floor(interaction.targetMessage.createdTimestamp / 1000)}>`);
        await interaction.reply({
            content: `added quote to quotes channel!`,
            flags: MessageFlags.Ephemeral,
        });
    }
};
__decorate([
    Slash({ name: "quote", description: "add a quote to the quotes channel." }),
    __param(0, SlashOption({
        name: "quote",
        description: "what did they say?",
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __param(1, SlashOption({
        name: "author",
        description: "who said it?",
        required: true,
        type: ApplicationCommandOptionType.String,
    })),
    __param(2, SlashOption({
        name: "second_quote",
        description: "what did they say?",
        required: false,
        type: ApplicationCommandOptionType.String,
    })),
    __param(3, SlashOption({
        name: "second_author",
        description: "who said it?",
        required: false,
        type: ApplicationCommandOptionType.String,
    })),
    __param(4, SlashOption({
        name: "third_quote",
        description: "what did they say?",
        required: false,
        type: ApplicationCommandOptionType.String,
    })),
    __param(5, SlashOption({
        name: "third_author",
        description: "who said it?",
        required: false,
        type: ApplicationCommandOptionType.String,
    }))
], Quote.prototype, "quote", null);
__decorate([
    ContextMenu({ name: "quote", type: ApplicationCommandType.Message })
], Quote.prototype, "quote_message", null);
Quote = __decorate([
    Discord()
], Quote);
export { Quote };
//# sourceMappingURL=quote.js.map