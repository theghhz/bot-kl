const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription("Adicionar um cargo a um membro.")
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
    
    const singal = {
      Green: "🟢",
      Yellow: "🟡",
      Red: "🔴",
    };

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply(
        `🔴 ${singal.Red} Você não tem permissão para executar esse comando!`
      );
    }

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.reply(
        `🔴 ${singal.Red} Você não tem permissão para executar esse comando!`
      );
    }

    if (userId !== process.env.THEGHHZ) {
      return interaction.reply(
        `🔴 ${singal.Red} Você não tem permissão para executar esse comando!`
      );
    }

    console.log("passou");

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`***ADICIONANDO CARGO***`)
      .setDescription(
        `O cargo de ${role} será adicionado ao membro ${member.displayName}.\n\nSTAFF: ${userCommand}`
      )
      .setTimestamp()
      .setFooter({
        text: ' @KL - 2023 | Beba água!',
        iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
      });

    const embedAccept = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`**🟢 Cargo adicionado com sucesso!**`)
      .setDescription(`O cargo de ${role} foi adicionado com sucesso ao membro ${member.displayName}.\n\nSTAFF: ${userCommand}`)
      .setTimestamp()
      .setFooter({
        text: ' @KL - 2023 | Beba água!',
        iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
      });

    const embedDenied = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`**🔴 O cargo não foi adicionado!**`)
      .setDescription(`O cargo não foi adicionado ao membro.\n\nAção cancelada por ${userCommand}.`)
      .setTimestamp()
      .setFooter({
        text: ' @KL - 2023 | Beba água!',
        iconURL: 'https://images-ext-2.discordapp.net/external/8PUkVSo1IcID88DRoLjNpMiE1yAbGt5xy01DRD9rkVM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/889669469696303117/8fdf5f9741f812de9d825e294821a658.webp?width=660&height=660'
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("accept")
        .setLabel("ACEITO")
        .setEmoji("✅")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("denied")
        .setLabel("NÃO ACEITO")
        .setEmoji("⛔")
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
    
    collector.on('collect', async (i) => {
      if (i.customId === 'accept') {
        member.roles.add(role);
        await i.update({
          components: [],
          embeds: [embedAccept],
          ephemeral: true
        });
      } else if (i.customId === 'denied') {
        await i.update({
          components: [],
          embeds: [embedDenied],
          ephemeral: true
        });
      }
    });
  },
};
