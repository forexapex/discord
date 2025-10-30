const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-gameroles')
    .setDescription('Set up the game role selection panel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const getEmoji = (name, fallback) => {
      const emoji = interaction.guild.emojis.cache.find(e => e.name === name);
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

    await interaction.reply({ content: '✅ Game role panel created!', ephemeral: true });
    await interaction.channel.send({ embeds: [embed], components: [row1, row2] });
  },
};
