const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder , EmbedBuilder , ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mine")
        .setDescription("Servidor de Minecraft da rapaziada."),
    global:false,

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`***ADICIONANDO CARGO***`)
            .setDescription(`O cargo de `)
            .setTimestamp()
            .setFooter({text: ' @KL - 2023 | Beba água!', iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'});

        const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('yes')
                            .setLabel('Yes')
                            .setEmoji({ name: "✅" }) 
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId('no')
                            .setLabel('No')
                            .setEmoji({ name: "⛔" })
                            .setStyle(ButtonStyle.Danger),
                    );
        
                await interaction.reply({ content: 'Do you accept?', embeds: [embed],components: [row] });
        
                const filter = i => i.customId === 'yes' || i.customId === 'no';
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        
                collector.on('collect', async i => {
                    if (i.customId === 'yes') {
                        await i.update({ content: 'Obrigado!', components: [] });
                    } else if (i.customId === 'no') {
                        await i.update({ content: 'Não obrigado.', components: [] });
                    }
                });
        
                collector.on('end', async collected => {
                    if (collected.size === 0) {
                        await interaction.editReply({ content: 'You did not make a selection.', components: [] });
                    }
                });
            }
}