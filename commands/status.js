const { SlashCommandBuilder, codeBlock } = require("@discordjs/builders");
const { EmbedBuilder, version } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Status do Bot!"),
  global: true,

  async execute(interaction) {
    const stats = codeBlock("asciidoc", `= STATISTICS =
    • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
    • Users      :: ${interaction.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toLocaleString()}
    • Servers    :: ${interaction.client.guilds.cache.size.toLocaleString()}
    • Channels   :: ${interaction.client.channels.cache.size.toLocaleString()}
    • Discord.js :: v${version}
    • Node       :: ${process.version}`);

    const replyEmbed = new EmbedBuilder()
      .setDescription(stats)
      .setTimestamp()
      .setFooter({
        text: ' @KL - 2023 | Beba água!',
        iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
      });

    await interaction.reply({ embeds: [replyEmbed] });
  },
};
