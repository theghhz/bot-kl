const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();

const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription("Adicione o cargo ao membro escolhido")
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription("O cargo que será adicionado")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription("O usuário que receberá o cargo")
        .setRequired(true)
    ),
  global: true,

  async execute(interaction) {

    const userCommand = interaction.member.displayName;
    const role = interaction.options.getRole("role");
    const member = interaction.options.getMember("user");
    const userId = interaction.user.id;
    
    let singal = {
      Green: "🟢",
      Yellow: "🟡",
      Red: "🔴",
    };

    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply(
        ```🔴 Você não tem permissão para executar esse comando!```
      );
    }

    if(!interaction.member.permissions.has("MANAGE_ROLES")){
      return interaction.reply(
        ```🔴 Você não tem permissão para executar esse comando!```
      );
    }

    if (userId === '252263786931683330'){
      return interaction.reply(`Hoje não João.`);
    }

    if (userId === '298548145774919690'){
      return interaction.reply(`Hoje não Lucas.`);
    }

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`***ADICIONANDO CARGO***`)
      .setDescription(
        `O cargo de ${role} será adicionado ao membro ${member.displayName}.\n\nSTAFF: ${userCommand}`
      )
      .setTimestamp()
      .setFooter({
        text: config.text-footer,
        iconURL: config.iconURL-footer
      });

    let embedAccept = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`**🟢 Cargo adicionado com sucesso!**`)
            .setDescription(` O cargo de ${role} foi adicionado com sucesso ao membro ${member.displayName}.\n\nSTAFF: ${userCommand}`)
            .setTimestamp()
            .setFooter({
              text: config.text-footer,
              iconURL: config.iconURL-footer
            });
    let embedDenied = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`**🔴 O cargo não foi adicionado!**`)
            .setDescription(`O cargo não foi adicionado ao membro.\n\nAção cancelada por ${userCommand}.`)
            .setTimestamp()
            .setFooter({
              text: config.text-footer,
              iconURL: config.iconURL-footer
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

    const filter = (i) => i.customId === "accept" || i.customId === "denied";
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });
    
    collector.on('collect', async i => {
      if (i.customId === 'accept') {
        member.roles.add(role)
        await i.update({
          components: [],
          embeds: [embedAccept],
          ephemeral:true
        });
      } else if (i.customId === 'denied') {
        await i.update({
          components: [],
          embeds: [embedDenied],
          ephemeral:true
        });
      }
  });

  },
};
