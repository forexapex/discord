const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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
  const getEmoji = (name, fallback) => {
    const emoji = channel.guild.emojis.cache.find(e => e.name === name);
    return emoji ? `<:${emoji.name}:${emoji.id}>` : fallback;
  };

  const embed = new EmbedBuilder()
    .setColor('#FF6B6B')
    .setTitle('🎮 Game Roles')
    .setDescription(
      'Click the buttons below to toggle your game roles!\n\n' +
      '**Available Games:**\n' +
      `${getEmoji('valorant', '🔥')} Valorant\n` +
      `${getEmoji('bgmi', '🎯')} Battleground Mobile India\n` +
      `${getEmoji('csgo', '💣')} Counter Strike: Global Offensive\n` +
      `${getEmoji('codm', '🎖️')} Call of Duty Mobile\n` +
      `${getEmoji('ApexLegends', '🏆')} Apex Legends\n` +
      `${getEmoji('mlbb', '⚔️')} Mobile Legends Bang Bang\n\n` +
      'Click a button to add or remove that game role!'
    )
    .setFooter({ text: 'SG ESPORTS' })
    .setTimestamp();

  const row1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('game_valorant')
        .setStyle(ButtonStyle.Primary)
        .setEmoji(getEmoji('valorant', '🔥')),
      new ButtonBuilder()
        .setCustomId('game_bgmi')
        .setStyle(ButtonStyle.Primary)
        .setEmoji(getEmoji('bgmi', '🎯')),
      new ButtonBuilder()
        .setCustomId('game_csgo')
        .setStyle(ButtonStyle.Primary)
        .setEmoji(getEmoji('csgo', '💣'))
    );

  const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('game_codm')
        .setStyle(ButtonStyle.Primary)
        .setEmoji(getEmoji('codm', '🎖️')),
      new ButtonBuilder()
        .setCustomId('game_apex')
        .setStyle(ButtonStyle.Primary)
        .setEmoji(getEmoji('ApexLegends', '🏆')),
      new ButtonBuilder()
        .setCustomId('game_mlbb')
        .setStyle(ButtonStyle.Primary)
        .setEmoji(getEmoji('mlbb', '⚔️'))
    );

  await channel.send({ embeds: [embed], components: [row1, row2] });
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
