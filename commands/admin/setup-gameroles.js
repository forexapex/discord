const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-gameroles')
    .setDescription('Set up the game role selection panel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
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

    await interaction.reply({ content: '✅ Game role panel created!', ephemeral: true });
    await interaction.channel.send({ embeds: [embed], components: [row] });
  },
};
