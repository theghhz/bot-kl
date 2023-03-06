const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ActivityType } = require("discord.js");
const config = require("../config.json");
const color = require('colors');

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Global
    const globalCommands = Array.from(
      client.commands.filter((cmd) => cmd.global === true).values()
    ).map((m) => m.data);

    // Guild
    const guildCommands = Array.from(
      client.commands.filter((cmd) => cmd.global === false).values()
    ).map((m) => m.data);

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    // Global
    await rest
      .put(Routes.applicationCommands(client.user.id), { body: globalCommands })
      .catch(console.error);

    // Guild
    await rest
      .put(Routes.applicationGuildCommands(client.user.id, config.guildId), {
        body: guildCommands,
      })
      .catch(console.error);

    // Rich Presence
    client.user.setPresence({
      activities: [{ name: "você falar merda!", type: ActivityType.Listening }],
      status: "online",
    });

    //console.log(`Ready! Logged in as ${client.user.tag} (${client.user.id})`);
    console.log(`${color.bold.green(`[READY]`)}` + `Logging into Discord...`.yellow);
        console.table({
            "Name": client.user.tag, 
            "Author": `@theghhz#0815`
        })
        console.log(`${color.bold.green(`[READY]`)}` + `${client.user.tag} is online!`.yellow);

  },
};
