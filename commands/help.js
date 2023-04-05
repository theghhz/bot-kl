const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Comandos disponíveis com uso do Slash Commands { / }"),
  global: true,

  async execute(interaction) {

    const member = await interaction.guild.members.fetch(interaction.user.id);

    let Latency = {
      Green: '🟢',
      Yellow: '🟡',
      Red: '🔴'
    };

    const replyEmbed = new EmbedBuilder()
      .setColor('Random')
      .setFields(
        {
            name: 'Meu commandos',
            value: 'Estes são os meus comandos!'
        },
        {
            name:'Avatar',
            value:'Mostro o avatar da pessoa mencionada.'
        },
        {
            name:'calculadora',
            value:'Calcula algumas coisas.'
        },
        {
            name:'translate',
            value:'Eu translato'
        },
        {
            name:'Regras',
            value:'Menciono todas as regras do servidor'
        },
        {
            name:'Ping',
            value:'PONG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
        },
        {
          name:'Sociais',
          value:'Mostra minhas redes sociais(bem bloguerinhaaaah)'
        },
        { name: '\u200B', value: '\u200B' },
        {
          name:'interaction.user;',
          //value: `${member == process.env.THEGHHZ ? ' 🟢 Você está autorizado a editar este comando' : ' 🔴 Você não está autorizado a editar este comando'}`
        }
        )
      .setTimestamp()
      .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
            
    await interaction.reply({ embeds: [replyEmbed] });
  },
};
