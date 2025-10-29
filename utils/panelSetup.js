const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

async function setupTicketPanel(channel) {
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

  await channel.send({ embeds: [embed], components: [row] });
}

async function setupGameRolesPanel(channel) {
  const embed = new EmbedBuilder()
    .setColor('#FF6B6B')
    .setTitle('🎮 Game Roles')
    .setDescription(
      'Select the games you play to get assigned roles!\n\n' +
      '**Available Games:**\n' +
      '🔥 Valorant\n' +
      '🎯 Battleground Mobile India\n' +
      '💣 Counter Strike: Global Offensive\n' +
      '🎖️ Call of Duty: Modern Warfare\n' +
      '🏆 Apex Legends\n' +
      '🎭 Rainbow Six Siege\n' +
      '⚔️ League of Legends\n\n' +
      'Choose your games from the menu below!'
    )
    .setFooter({ text: 'SG ESPORTS' })
    .setTimestamp();

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('game_select')
    .setPlaceholder('Select your games')
    .setMinValues(1)
    .setMaxValues(7)
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel('VALORANT')
        .setValue('valorant')
        .setEmoji('🔥'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Battleground Mobile India')
        .setValue('bgmi')
        .setEmoji('🎯'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Counter Strike - Global Offensive')
        .setValue('csgo')
        .setEmoji('💣'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Call Of Duty: Modern Warfare')
        .setValue('cod')
        .setEmoji('🎖️'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Apex Legends')
        .setValue('apex')
        .setEmoji('🏆'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Rainbow Six Siege')
        .setValue('r6')
        .setEmoji('🎭'),
      new StringSelectMenuOptionBuilder()
        .setLabel('League Of Legends')
        .setValue('lol')
        .setEmoji('⚔️')
    );

  const row = new ActionRowBuilder().addComponents(selectMenu);

  await channel.send({ embeds: [embed], components: [row] });
}

async function cleanOldBotMessages(channel, botId) {
  try {
    const messages = await channel.messages.fetch({ limit: 50 });
    const botMessages = messages.filter(msg => msg.author.id === botId);
    
    for (const msg of botMessages.values()) {
      await msg.delete().catch(err => console.log('Could not delete message:', err.message));
    }
  } catch (error) {
    console.log('Error cleaning old messages:', error.message);
  }
}

module.exports = {
  setupTicketPanel,
  setupGameRolesPanel,
  cleanOldBotMessages
};
