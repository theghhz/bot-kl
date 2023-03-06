const { SelectMenuBuilder, SelectMenuOptionBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    id: "mySelectMenu",
    builder: new SelectMenuBuilder()
      .setCustomId("mySelectMenu")
      .setPlaceholder("Nothing selected")
      //.setMinValues(1)
      //.setMaxValues(2)
      .addOptions(
        new SelectMenuOptionBuilder()
          .setLabel("Option A")
          .setValue("a")
          .setDescription("Description"),
        new SelectMenuOptionBuilder()
          .setLabel("Option B")
          .setValue("b")
          .setDescription("Description"),
        new SelectMenuOptionBuilder()
          .setLabel("Option C")
          .setValue("c")
          .setDescription("Description")
          .setEmoji({ name: "😎" })
      ),
  },
  async execute(interaction) {
    const selected = interaction.values[0];

    if(selected === 'c'){
      
    let embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Discord Oficial - KL")
      .setURL('http://discord.gg/qvf7bAf6ct')
      .setDescription(`Link: http://discord.gg/qvf7bAf6ct `)
      .setTimestamp()
      .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});

      await interaction.reply({
        content: `You selected option ${selected}!`,
        embeds: [embed],
        ephemeral: true,
      });

    } else{

    await interaction.reply({
      content: `You selected option ${selected}!`,
      ephemeral: true,
    });
  }
  },
};
