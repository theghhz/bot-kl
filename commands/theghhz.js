const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
  InteractionType,
} = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('theghhz')
    .setDescription('Cria uma embed a partir de um modal'),

  global: true,

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('embedModal')
      .setTitle('Criar Embed');

    const titleInput = new TextInputBuilder()
      .setCustomId('embedTitle')
      .setLabel('Nome da Embed')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const contentInput = new TextInputBuilder()
      .setCustomId('embedContent')
      .setLabel('Conteúdo da Embed')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(titleInput);
    const secondActionRow = new ActionRowBuilder().addComponents(contentInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);

    const filter = (i) => i.customId === 'embedModal' && i.user.id === interaction.user.id;

    // Utilize await interaction.awaitModalSubmit para capturar a submissão do modal
    try {
      const modalSubmit = await interaction.awaitModalSubmit({ filter, time: 15000 });
      
      const embedTitle = modalSubmit.fields.getTextInputValue('embedTitle');
      const embedContent = modalSubmit.fields.getTextInputValue('embedContent');

      const embed = new EmbedBuilder()
        .setTitle(embedTitle)
        .setDescription(embedContent)
        .setColor('Random')
        .setTimestamp();

      const channel = interaction.guild.channels.cache.get('1267892373875331233'); // Substitua pelo ID da sala

      await channel.send({ embeds: [embed] });
      await modalSubmit.reply({ content: 'Embed enviada com sucesso!', ephemeral: true });

    } catch (error) {
      console.error('Erro ao processar a submissão do modal:', error);
      if (error.code !== 'INTERACTION_COLLECTOR_ERROR') {
        await interaction.followUp({ content: 'Houve um erro ao enviar a embed.', ephemeral: true });
      }
    }
  },
};
