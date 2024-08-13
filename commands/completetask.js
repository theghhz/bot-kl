const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('completetask')
    .setDescription('Marca uma tarefa como concluída')
    .addStringOption(option =>
      option.setName('nome')
        .setDescription('Nome da tarefa a ser concluída')
        .setRequired(true)),
  global: true,

  async execute(interaction) {
    const nome = interaction.options.getString('nome');
    const filePath = path.join(__dirname, '../data/tasks.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return interaction.reply('Houve um erro ao ler as tarefas.');
      }

      let tasks;
      try {
        tasks = JSON.parse(data);
      } catch (e) {
        console.error(e);
        return interaction.reply('Houve um erro ao analisar as tarefas.');
      }

      const taskIndex = tasks.findIndex(task => task.nome === nome);

      if (taskIndex === -1) {
        return interaction.reply('Tarefa não encontrada.');
      }

      tasks.splice(taskIndex, 1);

      fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
          console.error(err);
          return interaction.reply('Houve um erro ao atualizar as tarefas.');
        }

        interaction.reply(`Tarefa \`${nome}\` foi marcada como concluída.`);
      });
    });
  },
};
