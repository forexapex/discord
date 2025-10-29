const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove a user from the ticket')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to remove')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction, client) {
    const ticketData = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'));
    
    if (!ticketData[interaction.channel.id]) {
      return interaction.reply({ content: '❌ This command can only be used in ticket channels!', ephemeral: true });
    }

    const user = interaction.options.getUser('user');
    
    await interaction.channel.permissionOverwrites.delete(user);

    await interaction.reply({ content: `✅ Removed <@${user.id}> from this ticket.` });
  },
};
