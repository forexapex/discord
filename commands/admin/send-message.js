const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('send-message')
    .setDescription('Send a message to any channel (Admin only)')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to send the message to')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message to send')
        .setRequired(true))
    .addUserOption(option =>
      option.setName('tag-user')
        .setDescription('Tag a user in the message (optional)')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('image')
        .setDescription('Image URL to attach (optional)')
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
    const message = interaction.options.getString('message');
    const taggedUser = interaction.options.getUser('tag-user');
    const imageUrl = interaction.options.getString('image');

    try {
      let messageContent = message;
      
      if (taggedUser) {
        messageContent = `${taggedUser} ${message}`;
      }

      const messageOptions = {
        content: messageContent
      };

      if (imageUrl) {
        messageOptions.files = [imageUrl];
      }

      await targetChannel.send(messageOptions);

      await interaction.reply({
        content: `✅ Message sent successfully to ${targetChannel}!`,
        ephemeral: true
      });

      console.log(`💬 Message sent by ${interaction.user.tag} to #${targetChannel.name}`);

    } catch (error) {
      console.error('Error sending message:', error);
      await interaction.reply({
        content: '❌ Failed to send message. Please check the channel permissions and image URL.',
        ephemeral: true
      });
    }
  },
};
