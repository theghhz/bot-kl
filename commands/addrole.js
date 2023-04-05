const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder , SelectMenuBuilder, SelectMenuOptionBuilder, ActionRowBuilder } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adicione o cargo ao membro escolhido')
        .addUserOption(option => option.setName('user').setDescription('Cargo'))
        .addUserOption(role => role.setName('role').setDescription('Membro')),
        
    global:true,

  async execute(interaction) {

    const mod = interaction.user;
    const user = interaction.options.getUser('user');
    const member = await interaction.guild.members.fetch(user);

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`***ADICIONANDO CARGO***`)
            .setDescription(`O cargo de `)
            .setTimestamp()
            .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});

    let singal = {
      Green: '🟢',
      Yellow: '🟡',
      Red: '🔴'
    };

    await interaction.reply({embeds: [embed], components: [row]});

  },
};
