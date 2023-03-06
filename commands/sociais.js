const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder } = require("discord.js");

const interactionMenu = require("../interactions/interactionMenu");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sociais")
        .setDescription("Sociais Links"),
    global:true,

  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      interactionMenu.data.builder
    );
    await interaction.reply({
      components: [row],
      ephemeral: true,
    });
  }
};

