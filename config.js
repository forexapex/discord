const fs = require('fs');

function loadConfig() {
  if (process.env.DISCORD_TOKEN) {
    return {
      token: process.env.DISCORD_TOKEN,
      clientId: process.env.CLIENT_ID || '',
      guildId: process.env.GUILD_ID || '',
      ticketCategoryId: process.env.TICKET_CATEGORY_ID || '',
      logChannelId: process.env.LOG_CHANNEL_ID || '',
      supportRoleId: process.env.SUPPORT_ROLE_ID || '',
      adminRoleId: process.env.ADMIN_ROLE_ID || '',
      ticketChannelId: process.env.TICKET_CHANNEL_ID || '',
      reactionRoleChannelId: process.env.REACTION_ROLE_CHANNEL_ID || ''
    };
  }

  if (fs.existsSync('./config.json')) {
    return JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  }

  throw new Error('No configuration found! Please create config.json or set environment variables.');
}

module.exports = loadConfig();
