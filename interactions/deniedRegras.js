const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    id: "denied",
  },
  async execute(interaction) {

      let embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle("**😭 Que pena...**")
                .setDescription(`Infelizmente você não aceitou as regras do servidor. Não posso liberar o acesso...`)
                .addFields(
                    { name: "Enquanto isso se divirta no site da Barbie", 
                      value: "https://www.barbie.com", 
                      inline: true },
                )
                .setTimestamp()
                .setFooter({ text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
                  
              await interaction.reply({
                embeds:[embed],
                ephemeral:true
              });
    }
};
