const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addtask')
    .setDescription('Adiciona uma nova tarefa')
    .addStringOption(option =>
      option.setName('nome')
        .setDescription('Nome da tarefa')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('conteudo')
        .setDescription('Conteúdo da tarefa')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('dias')
        .setDescription('Quantidade de dias para concluir a tarefa')
        .setRequired(true)),
  global: true,

  async execute(interaction) {
    const nome = interaction.options.getString('nome');
    const conteudo = interaction.options.getString('conteudo');
    const dias = interaction.options.getInteger('dias');
    const filePath = path.join(__dirname, '../data/tasks.json');
    const channelId = process.env.channelTasks;
    const dataCriacao = new Date();
    const dataVencimento = new Date(dataCriacao.getTime() + (dias * 24 * 60 * 60 * 1000));

    fs.readFile(filePath, 'utf8', (err, data) => {
      let tasks = [];
      if (!err && data) {
        tasks = JSON.parse(data);
      }
      
      tasks.push({ nome, conteudo, dataCriacao, dataVencimento});

      fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
          console.error(err);
          return interaction.reply('Houve um erro ao salvar a tarefa.');
        }

        const embed = new EmbedBuilder()
          .setColor('Random')
          .setTitle(`**Nome:** ${nome}`)
          .setDescription(`**Conteúdo:** ${conteudo}`)
          .addFields(
            { name: 'Data de Criação', value: dataCriacao.toLocaleString(), inline: true },
            { name: 'Data de Vencimento', value: dataVencimento.toLocaleString(), inline: true },
            { name: 'Dias para Conclusão', value: `${dias} dias`, inline: true }
          )
          .setTimestamp();

        const channel = interaction.client.channels.cache.get(channelId);
        if (channel) {
          channel.send({ embeds: [embed] });
        }

        interaction.reply('Tarefa adicionada com sucesso!');
      });
    });
  },
};
