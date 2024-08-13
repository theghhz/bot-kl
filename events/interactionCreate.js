const { InteractionType } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    try {
      console.log(`Interaction received: ${interaction.type}`);
      if (interaction.type === InteractionType.ApplicationCommand) {
        console.log(`Command: ${interaction.commandName}`);
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
          console.error(`Comando não encontrado: ${interaction.commandName}`);
          return;
        }
        await command.execute(interaction);
      } else if (interaction.type === InteractionType.MessageComponent) {
        console.log(`Component: ${interaction.customId}`);
        const component = interaction.client.interactions.get(interaction.customId);
        if (!component) {
          console.error(`Componente não encontrado: ${interaction.customId}`);
          return;
        }
        await component.execute(interaction);
      } else if (interaction.type === InteractionType.ModalSubmit) {
        console.log(`Modal: ${interaction.customId}`);
        const modal = interaction.client.interactions.get(interaction.customId);
        if (!modal) {
          console.error(`Modal não encontrado: ${interaction.customId}`);
          return;
        }
        await modal.execute(interaction);
      } else {
        console.error(`Tipo de interação não suportado: ${interaction.type}`);
      }
    } catch (error) {
      console.error(`Erro ao processar interação: ${error}`);
      const errorMsg = interaction.type === InteractionType.ApplicationCommand
        ? '```[#]ERR -> O COMANDO NÃO PODE SER EXECUTADO!```'
        : interaction.type === InteractionType.MessageComponent
        ? '```[#]ERR2 -> O COMANDO NÃO PODE SER EXECUTADO!```'
        : '```[#]ERR3 -> O COMANDO NÃO PODE SER EXECUTADO!```';
      await interaction.reply({
        content: errorMsg,
        ephemeral: true,
      });
    }
  },
};
//
