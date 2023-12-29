const { StringSelectMenuBuilder, SelectMenuOptionBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    id: "sociais",
    builder: new StringSelectMenuBuilder()
      .setCustomId("sociais")
      .setPlaceholder("Selecione uma opção")
      //.setMinValues(1)
      //.setMaxValues(2)
      .addOptions(
        new SelectMenuOptionBuilder()
          .setLabel("Discord Oficial - KL")
          .setValue("d")
          .setDescription("Link Oficial Discord - KL")
          .setEmoji({ name: "🟦" }),
        new SelectMenuOptionBuilder()
          .setLabel("Site Oficial")
          .setValue("s")
          .setDescription("Link Oficial do site - KL")
          .setEmoji({ name: "⬜" })
      )
  },
  async execute(interaction) {

    const selected = interaction.values[0];

    if(selected === "d"){
        let embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("Discord Oficial - KL")
            .setURL('http://discord.gg/qvf7bAf6ct')
            .setDescription(`Link: http://discord.gg/qvf7bAf6ct `)
            .setTimestamp()
            .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
        
              await interaction.reply({
                embeds:[embed],
                ephemeral: true
              })
    }
    else if(selected === "s"){
        let embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("Site Oficial - KL")
            .setURL('http://theghz.dev')
            .setDescription(`Link: http://theghz.dev`)
            .setTimestamp()
            .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
        
              await interaction.reply({
                embeds:[embed],
                ephemeral: true
              })
        }
  },
};

