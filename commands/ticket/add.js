const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add a user to the ticket')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to add')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction, client) {
    const ticketData = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'));
    
    if (!ticketData[interaction.channel.id]) {
      return interaction.reply({ content: '❌ This command can only be used in ticket channels!', ephemeral: true });
    }

    const user = interaction.options.getUser('user');
    
    await interaction.channel.permissionOverwrites.create(user, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true
    });

    await interaction.reply({ content: `✅ Added <@${user.id}> to this ticket.` });
  },
};
