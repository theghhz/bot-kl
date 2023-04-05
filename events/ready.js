const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ActivityType , EmbedBuilder } = require("discord.js");
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
    ).map((m) => m.data);

    // Guild
    const guildCommands = Array.from(
      client.commands.filter((cmd) => cmd.global === false).values()
    ).map((m) => m.data);

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    // Global <- ATUALIZAR PRO 10.1
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
    ]

    setInterval(() => {
      let random  = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random])
    }, 7000);
    
    // client.user.setPresence({
    //   activities: [],
    //   status: "online",
    // });


    //console.log(`Ready! Logged in as ${client.user.tag} (${client.user.id})`);
    console.log(`${color.bold.green(`[READY]`)}` + `Logging into Discord...`.yellow);
        console.table({
            "Name": client.user.tag, 
            "Author": `@theghhz`
        })
        console.log(`${color.bold.green(`[READY]`)}` + `${client.user.tag} is online!`.yellow);

        // let embed = new EmbedBuilder()
        //   .setColor("Random")
        //   .setTitle("** ✅ ONLINE **")
        //   .setDescription(`Estou pronto para uso!`)
        //   .setTimestamp()
        //   .setFooter({ text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
       
        //   client.channels.cache.get(process.env.LOG).send({ content: '@everyone' , embeds: [embed] })
  },
};
