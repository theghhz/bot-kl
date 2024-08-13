const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculadora")
    .setDescription(
      "Calcula algumas coisas. 99% das vezes tá certo, rs..."
    )
    .addStringOption((option) =>
      option
        .setName("calculadora")
        .setDescription("Selecione o que calcular")
        .setRequired(true)
        .addChoices(
          {
            name: "Primata",
            value: "primata",
          },
          {
            name: "Gay",
            value: "gay",
          },
          {
            name: "Cringe",
            value: "cringe",
          },
          {
            name: "Gamer",
            value: "gamer",
          },
          {
            name: "Pau",
            value: "pau",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("thing")
        .setDescription("'")
        .setRequired(false)
    ),
  global: true,
  async execute(interaction) {
    const type = interaction.options.getString("calculadora");
    const target =
      interaction.options.getString("thing") || interaction.user.username;
    const rng = Math.floor(Math.random() * 101);

    const first = type.charAt(0).toUpperCase();
    const rest = type.slice(1);
    const all = first + rest;

    if (all == "Pau") {
      let ppSize = Math.floor(Math.random() * 50) + 1;
      ppSize = "=".repeat(ppSize);
      const replyEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`Calculadora de ${all}`)
        .setDescription(`${target}'s ${all} é: 8` + `${ppSize}` + "D")
        .setTimestamp();

      await interaction.reply({ embeds: [replyEmbed] });
    } else {
      const replyEmbed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`Calculadora de ${all}`)
        .setDescription(`${target} é ` + rng + `% ${all}`)
        .setTimestamp()
        .setFooter({
          text: ' @KL - 2023 | Beba água!',
          iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
        });

        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`Calculadora de ${all} com um PRESENTINHO!`)
        .setDescription(`${target} é ` + rng + `% ${all}`)
        .setImage('https://static.imgs.app/content/assetz/uploads/2017/04/meme-do-kid-bengala-quer-ficar-rasgado-pro-verao.jpg')
        .setTimestamp()
        .setFooter({
          text: ' @KL - 2023 | Beba água!',
          iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
        });
        if(all == "Gay" && rng > 80)
          await interaction.reply({ embeds: [embed]});
        else
          await interaction.reply({ embeds: [replyEmbed] });
    }
  },
};
