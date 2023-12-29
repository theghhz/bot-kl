const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder , EmbedBuilder , ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculadora2")
    .setDescription(
      "Calcula algumas coisas. 99% das vezes tá certo, rs..."
    ),
  global: true,
  async execute(interaction) {

    let embedCalculator = new EmbedBuilder()
            .setColor("Random")
            .setTitle("***CALCULADORA***")
            .setDescription(`Escolha um dos modos abaixo da calculadora`)
            .setTimestamp()
            .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
    
    const row = new ActionRowBuilder().addComponents(
     
        new ButtonBuilder()
            .setCustomId("gayButton")
            .setLabel("GAY")
            .setStyle(ButtonStyle.Primary),
        
        new ButtonBuilder()
            .setCustomId("pauButton")
            .setLabel("PAU")
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId("gamerButton")
            .setLabel("GAMER")
            .setStyle(ButtonStyle.Primary),
          );

        await interaction.reply({
            embeds: [embedCalculator],
            components: [row],
            ephemeral: true,
          });

          const filter = (i) => i.customId === 'gayButton' || i.customId === 'pauButton'  || i.customId === 'gamerButton';
          const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

          const member = await interaction.guild.members.fetch(interaction.user.id);

          const rng = Math.floor(Math.random() * 101);

          console.log(filter.customId);

          collector.on('collect', async i => {
            if (i.customId === 'pauButton') {

              let ppSize = Math.floor(Math.random() * 50) + 1;
              ppSize = "=".repeat(ppSize);

              const replyEmbed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`Calculadora de tamanho de PAU!`)
                .setDescription(`O pau do ${member}'s é DESSE TAMANHÃO: 8` + "=".repeat(ppSize) + "D")
                .setTimestamp()
                .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
    
              await i.update({
                embeds:[replyEmbed],
                components: []
              });
            }

            if (i.customId === 'gayButton') {
              const replyEmbed = new EmbedBuilder()
              .setColor("Random")
              .setTitle(`Calculadora de Gayzisse`)
              .setDescription(`${member} é ` + rng + `% GAYYYYYYYYY!`)
              .setTimestamp()
              .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
    
              const replyEmded2 = new EmbedBuilder()
              .setColor("Random")
              .setTitle(`Calculadora de GAY com um PRESENTINHO!`)
              .setDescription(`${member} é ` + rng + `% GAYYYYYYYYYYYYYYYYYYYYZÃO!`)
              .setImage('https://static.imgs.app/content/assetz/uploads/2017/04/meme-do-kid-bengala-quer-ficar-rasgado-pro-verao.jpg')
              .setTimestamp()
              .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
    
              try{
                if(rng > 80){
                  await i.update({
                    embeds:[replyEmded2],
                    components: []
                  });
                }else{
                  await i.update({
                    embeds:[replyEmbed],
                    components: []
                  });
                }
              } catch (error) {
                console.error("Erro ao tentar atualizar a interação:", error);
              }

              try {
                await i.update({
                  embeds: [replyEmbed],
                  components: []
                });
              } catch (error) {
                console.error("Erro ao tentar atualizar a interação:", error);
              }
            }

          if(i.customId === 'gamerButton'){

            const replyEmbed = new EmbedBuilder()
              .setColor("Random")
              .setTitle(`Calculadora de Gamer`)
              .setDescription(`${member} é ` + rng + `% GAMER!!`)
              .setTimestamp()
              .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});
    
              try {
                await i.update({
                  embeds: [replyEmbed],
                  components: []
                });
              } catch (error) {
                console.error("Erro ao tentar atualizar a interação:", error);
              }
          }
        });

        collector.on('end', async collected => {
          if (collected.size === 0) {
              await interaction.editReply({ content: '``Não foi selecionado nenhuma opção.``', embed: [] ,components: [] });
          }

      });
  }
};
