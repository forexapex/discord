const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

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
        'Click the buttons below to toggle your game roles!\n\n' +
        '**Available Games:**\n' +
        '• Valorant\n' +
        '• Battleground Mobile India\n' +
        '• Counter Strike: Global Offensive\n' +
        '• Call of Duty Mobile\n' +
        '• Apex Legends\n' +
        '• Mobile Legends Bang Bang\n\n' +
        'Click a button to add or remove that game role!'
      )
      .setFooter({ text: 'SG ESPORTS' })
      .setTimestamp();

    const getEmoji = (name, fallback) => {
      const emoji = interaction.guild.emojis.cache.find(e => e.name === name);
      return emoji ? emoji.identifier : fallback;
    };

    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('game_valorant')
          .setLabel('VALORANT')
          .setStyle(ButtonStyle.Primary)
          .setEmoji(getEmoji('valorant', '🔥')),
        new ButtonBuilder()
          .setCustomId('game_bgmi')
          .setLabel('BGMI')
          .setStyle(ButtonStyle.Primary)
          .setEmoji(getEmoji('bgmi', '🎯')),
        new ButtonBuilder()
          .setCustomId('game_csgo')
          .setLabel('CS:GO')
          .setStyle(ButtonStyle.Primary)
          .setEmoji(getEmoji('csgo', '💣'))
      );

    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('game_codm')
          .setLabel('Call of Duty Mobile')
          .setStyle(ButtonStyle.Primary)
          .setEmoji(getEmoji('codm', '🎖️')),
        new ButtonBuilder()
          .setCustomId('game_apex')
          .setLabel('Apex Legends')
          .setStyle(ButtonStyle.Primary)
          .setEmoji(getEmoji('ApexLegends', '🏆')),
        new ButtonBuilder()
          .setCustomId('game_mlbb')
          .setLabel('Mobile Legends')
          .setStyle(ButtonStyle.Primary)
          .setEmoji(getEmoji('mlbb', '⚔️'))
      );

    await interaction.reply({ content: '✅ Game role panel created!', ephemeral: true });
    await interaction.channel.send({ embeds: [embed], components: [row1, row2] });
  },
};
