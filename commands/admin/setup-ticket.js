const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-ticket')
    .setDescription('Set up the support ticket panel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🎟️ Support Tickets')
      .setDescription(
        'Please choose the option that best matches your issue from the menu below.\n' +
        'Once you select,\n' +
        '✅ A private ticket channel will be created where our team can assist you.\n\n' +
        '✨ **How it works:**\n' +
        '• Pick a category from the menu ⬇️\n' +
        '• A new ticket will open 📂\n' +
        '• Our staff will reply as soon as possible ⏳'
      )
      .setFooter({ text: 'SG ESPORTS' })
      .setTimestamp();

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('ticket_select')
      .setPlaceholder('Select the option that best fits your problem')
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel('Billing Support')
          .setDescription('Payment and billing issues')
          .setValue('billing')
          .setEmoji('💵'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Account Issues')
          .setDescription('Problems with your account')
          .setValue('account')
          .setEmoji('📧'),
        new StringSelectMenuOptionBuilder()
          .setLabel('General Support')
          .setDescription('General questions and support')
          .setValue('general')
          .setEmoji('🔧'),
        new StringSelectMenuOptionBuilder()
          .setLabel('Report')
          .setDescription('Report users or issues')
          .setValue('report')
          .setEmoji('⚠️')
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({ content: '✅ Ticket panel created!', ephemeral: true });
    await interaction.channel.send({ embeds: [embed], components: [row] });
  },
};
