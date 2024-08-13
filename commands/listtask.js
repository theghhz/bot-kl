const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listtasks')
    .setDescription('Lista todas as tarefas'),
  global: true,

  async execute(interaction) {
    const filePath = path.join(__dirname, '../data/tasks.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return interaction.reply('Houve um erro ao ler as tarefas.');
      }

      let tasks = JSON.parse(data);
      const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Tarefas Atuais')
        .setDescription(tasks.length ? tasks.map(task => {
          const dias = Math.ceil((new Date(task.dataVencimento) - new Date()) / (24 * 60 * 60 * 1000));
          const dataVencimentoFormatada = new Date(task.dataVencimento).toLocaleString();
          return `**Nome:** ${task.nome}\n**Conteúdo:** ${task.conteudo}\n**Data de Vencimento:** ${dataVencimentoFormatada}\n**Tempo Restante:** ${dias} dias`;
        }).join('\n\n') : 'Nenhuma tarefa encontrada.')
        .setTimestamp();

      interaction.reply({ embeds: [embed] });
    });
  },
};
