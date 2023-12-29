const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const config = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Pegue o avatar do membro selecionado')
        .addUserOption(option => option.setName('user').setDescription('avatar')),
    
        async execute(interaction) {
    
        const user = interaction.options.getUser('user');

            const embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`${user} Avatar`)
                .setImage(`${user.displayAvatarURL({dynamic:true,size:1024})}`)
                .setTimestamp()
                .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
             
                  const config = require("../config.json");
                  return interaction.reply({embeds:[embed]})
    },
}