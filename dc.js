const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const clientId = process.env.CLIENT_STUDY;
const guildId = process.env.GUILD_ID; // Adicione isso apenas se você estiver usando comandos de guilda
const token = process.env.TOKEN_STUDY;

const commands = [];
const commandPath = path.join(__dirname, 'commands');

fs.readdirSync(commandPath).filter(file => file.endsWith('.js')).forEach(file => {
  const command = require(path.join(commandPath, file));
  if (command.data) {
    commands.push(command.data.toJSON());
  }
});

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    } else {
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
    }

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
