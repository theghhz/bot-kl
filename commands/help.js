const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Comandos compativeis com o bot {/}"),
  global: true,

  async execute(interaction) {

  const userId = interaction.user.id;
  
  const embed = new EmbedBuilder()
    .setColor('Random')
    .setTitle('***COMANDOS***')
    .setDescription('Aqui estão todos os comandos que eu posso fazer!')
    .addFields(
      { name: '**Avatar**', value: 'Mostro o avatar da pessoa mencionada.' },
      { name: '**Calculadora**', value: 'Calcula algumas coisas ai, rs.' },
      { name: '**Translate**', value: 'Eu translato o que eu quiser!' },
      { name: '**Regras**', value: 'Menciono todas as regras do servidor.' },
      { name: '**Sociais**', value: 'Mostra minhas redes sociais(bem bloguerinhaaaah)'},
      { name: '\n\n**[AVISO]**' , value: `${userId === process.env.THEGHHZ ? '🟢 Você está autorizado a editar este comando' : '🔴 Você não está autorizado a editar este comando'}`},
      )
    .setTimestamp()
    .setFooter({
      text: ' @KL - 2023 | Beba água!',
      iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
    });

  await interaction.reply({ embeds: [embed] , ephemeral: true});
  },
};