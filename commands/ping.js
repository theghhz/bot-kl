const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Latency Bot!"),
  global: true,

  async execute(interaction) {

    let Latency = {
      Green: '🟢',
      Yellow: '🟡',
      Red: '🔴'
    };
    let totalLatency = Date.now() - interaction.createdTimestamp
    const replyEmbed = new EmbedBuilder()
      .setColor(totalLatency < 200 ? "Green": totalLatency < 500 ? "Yellow" : "Red")
      .setFields({
        name: 'Bot Latency',
        value: `\`${totalLatency <= 200 ? Latency.Green : totalLatency <=400 ? Latency.Yellow : Latency.Red}\` \`${totalLatency}\`ms`
   
      })
      .setTimestamp()
      .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
            
    await interaction.reply({ embeds: [replyEmbed] });
  },
};
