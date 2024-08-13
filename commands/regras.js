const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder , EmbedBuilder , ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../config.json");

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
            .setFooter({
              text: ' @KL - 2023 | Beba água!',
              iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
            });

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

          const filter = i => i.customId === 'accept' || i.customId === 'denied';
          const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

          const member = await interaction.guild.members.fetch(interaction.user.id);

          const role = interaction.guild.roles.cache.get(process.env.VERIFIED);

          let embedAccept = new EmbedBuilder()
            .setColor("Random")
            .setTitle("**😀 BEM VINDA(O)!**")
            .setDescription(` O cargo de ${role} foi adicionado e seu acesso ao servidor foi liberado. Aproveite e não seja um chato!`)
            .setTimestamp()
            .setFooter({
              text: ' @KL - 2023 | Beba água!',
              iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
            });

          let embedDenied = new EmbedBuilder()
            .setColor("Random")
            .setTitle("**😭 Que pena...**")
            .setDescription(`Infelizmente você não aceitou as regras do servidor. Não posso liberar o acesso...`)
            .addFields(
                { name: "Enquanto isso se divirta no site da Barbie", 
                  value: "https://www.barbie.com", 
                  inline: true },
            )
            .setTimestamp()
            .setFooter({
              text: ' @KL - 2023 | Beba água!',
              iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
            });
            
          collector.on('collect', async i => {
            if (i.customId === 'accept') {
              member.roles.add(role);
              
              await i.update({
                embeds:[embedAccept],
                components: [],
                ephemeral:true
              });
            } else if (i.customId === 'denied') {
              await i.update({
                embeds:[embedDenied],
                components: [],
                ephemeral:true
              });
            }
        });

        collector.on('end', async collected => {
            if (collected.size === 0) {
                await interaction.editReply({ content: '``Não foi selecionado nenhuma opção.``', embed: [] ,components: [] });
            }
        });
    }
}