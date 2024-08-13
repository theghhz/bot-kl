const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sociais")
    .setDescription("Sociais Links"),
  global: true,

  async execute(interaction) {
    const sociais = new StringSelectMenuBuilder()
      .setCustomId("sociais")
      .setPlaceholder("Selecione uma opção")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Discord Oficial - KL")
          .setValue("discord")
          .setDescription("Link Oficial Discord - KL")
          .setEmoji({ name: "🟦" }),
        new StringSelectMenuOptionBuilder()
          .setLabel("Site Oficial")
          .setValue("site")
          .setDescription("Link Oficial do site - KL")
          .setEmoji({ name: "⬜" })
      );

    const row = new ActionRowBuilder().addComponents(sociais);

    await interaction.reply({
      components: [row],
      ephemeral: true,
    });

    const filter = (i) => i.customId === 'sociais' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (i) => {
      const selected = i.values[0];
      let embed;

      if (selected === "discord") {
        embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("Discord Oficial - KL")
          .setURL('http://discord.gg/qvf7bAf6ct')
          .setDescription(`Link: http://discord.gg/qvf7bAf6ct`)
          .setTimestamp()
          .setFooter({
            text: ' @KL - 2023 | Beba água!',
            iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
          });
      } else if (selected === "site") {
        embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("Site Oficial - KL")
          .setURL('http://theghz.dev')
          .setDescription(`Link: http://theghz.dev`)
          .setTimestamp()
          .setFooter({
            text: ' @KL - 2023 | Beba água!',
            iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
          });
      }

      await i.update({
        embeds: [embed],
        components: [],
        ephemeral: true,
      });
    });
  }
};
