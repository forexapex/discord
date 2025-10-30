const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announcement')
    .setDescription('Post an announcement to a specific channel (Admin only)')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to post the announcement in')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Announcement title')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Announcement message')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('image')
        .setDescription('Image URL (optional)')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('color')
        .setDescription('Embed color in hex (e.g., #FF0000) - optional')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const config = interaction.client.config;
    const member = interaction.member;

    if (!member.roles.cache.has(config.adminRoleId)) {
      return interaction.reply({
        content: '❌ You do not have permission to use this command. Admin role required.',
        ephemeral: true
      });
    }

    const targetChannel = interaction.options.getChannel('channel');
    const title = interaction.options.getString('title');
    const message = interaction.options.getString('message');
    const imageUrl = interaction.options.getString('image');
    const colorHex = interaction.options.getString('color');

    try {
      const botAvatarURL = interaction.client.user.displayAvatarURL({ dynamic: true, size: 256 });
      const botName = interaction.client.user.username;

      const embed = new EmbedBuilder()
        .setAuthor({ name: botName, iconURL: botAvatarURL })
        .setTitle(title)
        .setDescription(message)
        .setColor(colorHex || '#5865F2')
        .setThumbnail(botAvatarURL)
        .setTimestamp()
        .setFooter({ text: `Posted by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

      if (imageUrl) {
        embed.setImage(imageUrl);
      }

      await targetChannel.send({ embeds: [embed] });

      await interaction.reply({
        content: `✅ Announcement posted successfully in ${targetChannel}!`,
        ephemeral: true
      });

      console.log(`📢 Announcement posted by ${interaction.user.tag} in #${targetChannel.name}`);

    } catch (error) {
      console.error('Error posting announcement:', error);
      await interaction.reply({
        content: '❌ Failed to post announcement. Please check the channel permissions and image URL.',
        ephemeral: true
      });
    }
  },
};
