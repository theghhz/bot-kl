const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder , EmbedBuilder , ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("regras")
        .setDescription("Regras?"),
    global:true,

    async execute(interaction) {
            
          let embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("**REGRAS**")
            .setDescription(`-> Regras do servidor`)
            .addFields(
                { name: "1º Regra", value: "Primeira regra..." },
                { name: "2º Regra", value: "Segunda regra..." },
                { name: "3º Regra", value: "Terceira regra..." },
            )
            .setTimestamp()
            .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
              
        const row = new ActionRowBuilder().addComponents(
     
              new ButtonBuilder()
                  .setCustomId("accept")
                  .setLabel("ACEITO")
                  .setEmoji({ name: "✅" }) 
                  .setStyle(ButtonStyle.Success),
        
              new ButtonBuilder()
                .setCustomId("denied")
                .setLabel("NÃO ACEITO")
                .setEmoji({ name: "⛔" }) 
                .setStyle(ButtonStyle.Danger)
            ); 
            
          await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true,
          });
    }
}