const { setupTicketPanel, setupGameRolesPanel, cleanOldBotMessages } = require('../utils/panelSetup');
const fs = require('fs');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`✅ Bot is online as ${client.user.tag}`);
    console.log(`🎮 Serving ${client.guilds.cache.size} server(s)`);
    client.user.setActivity('SG ESPORTS Support', { type: 'WATCHING' });

    const guild = client.guilds.cache.get(client.config.guildId);
    if (!guild) {
      console.log('⚠️  Could not find guild');
      return;
    }

    if (client.config.ticketChannelId) {
      const ticketChannel = guild.channels.cache.get(client.config.ticketChannelId);
      if (ticketChannel) {
        console.log('🎫 Setting up ticket panel...');
        await cleanOldBotMessages(ticketChannel, client.user.id);
        await setupTicketPanel(ticketChannel);
        console.log('✅ Ticket panel created in', ticketChannel.name);
      } else {
        console.log('⚠️  Ticket channel not found');
      }
    }

    if (client.config.reactionRoleChannelId) {
      const gameRoleChannel = guild.channels.cache.get(client.config.reactionRoleChannelId);
      if (gameRoleChannel) {
        console.log('🎮 Setting up game roles panel...');
        await cleanOldBotMessages(gameRoleChannel, client.user.id);
        await setupGameRolesPanel(gameRoleChannel);
        console.log('✅ Game roles panel created in', gameRoleChannel.name);
      } else {
        console.log('⚠️  Game role channel not found');
      }
    }

    const ticketData = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'));
    const ticketChannels = Object.keys(ticketData);
    
    if (ticketChannels.length > 0) {
      console.log(`🔄 Restoring ${ticketChannels.length} open ticket(s)...`);
      
      for (const channelId of ticketChannels) {
        const channel = guild.channels.cache.get(channelId);
        
        if (!channel) {
          console.log(`⚠️  Ticket channel ${channelId} not found, removing from data...`);
          delete ticketData[channelId];
          continue;
        }

        const ticket = ticketData[channelId];
        console.log(`✅ Restored ticket: ${channel.name} (User: ${ticket.userId})`);
      }

      fs.writeFileSync('./data/tickets.json', JSON.stringify(ticketData, null, 2));
      console.log(`✅ All tickets restored and validated`);
    } else {
      console.log('📭 No open tickets to restore');
    }

    console.log('🚀 Bot fully initialized and ready!');
  },
};
