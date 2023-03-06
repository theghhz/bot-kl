const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    id: "accept",
  },
  async execute(interaction) {

  const member = await interaction.guild.members.fetch(interaction.user.id);

  const role = interaction.guild.roles.cache.find(role => role.name === 'Membro');
  
  member.roles.add(role);

    let embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("**😀 BEM VINDO!**")
      .setDescription(` O cargo de ${role} foi adicionado e seu acesso ao servidor foi liberado. Aproveite e não seja um chato!`)
      .setTimestamp()
      .setFooter({ text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
      
    await interaction.reply({
      embeds:[embed],
      ephemeral:true
    });

  }
};

