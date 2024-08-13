const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { ActivityType } = require("discord.js");
const config = require("../config.json");
const color = require('colors');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Global
    const globalCommands = Array.from(
      client.commands.filter((cmd) => cmd.global === true).values()
    ).map((m) => m.data.toJSON());  // Adicionado .toJSON()

    // Guild
    const guildCommands = Array.from(
      client.commands.filter((cmd) => cmd.global === false).values()
    ).map((m) => m.data.toJSON());  // Adicionado .toJSON()

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN_STUDY);

    // Global
    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: globalCommands,
      });
      console.log(`${color.bold.green(`[READY]`)} Global commands registered successfully!`.yellow);
    } catch (error) {
      console.error("Failed to register global commands:", error);
    }

    // Guild
    try {
      await rest.put(Routes.applicationGuildCommands(client.user.id, config.guildId), {
        body: guildCommands,
      });
      console.log(`${color.bold.green(`[READY]`)} Guild commands registered successfully!`.yellow);
    } catch (error) {
      console.error("Failed to register guild commands:", error);
    }

    // Rich Presence
    let status = [
      { 
        name: "você falar merda!",
        type: ActivityType.Listening 
      },
      {
        name:'PIPOKINHA PRINCESA DA PUTARIA',
        type: ActivityType.Watching,
        url: 'https://youtu.be/zAmHQk-OW3k?t=18'
      },
      {
        name:'o bundão por ar!',
        type: ActivityType.Playing
      },
      {
        name:'/help no chat!',
        type: ActivityType.Playing
      },
      {
        name:'ser o mais bonito',
        type: ActivityType.Competing
      }
    ];
    
    setInterval(() => {
      let random  = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random])
    }, 7000);
    
    console.log(`${color.bold.green(`[READY]`)} Logging into Discord...`.yellow);
    console.table({
        "Name": client.user.tag, 
        "Author": `@theghhz`
    });
    console.log(`${color.bold.green(`[READY]`)} ${client.user.tag} is online!`.yellow);
  },
};
