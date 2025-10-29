const { PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const { generateHTMLTranscript } = require('../utils/transcriptGenerator');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        const errorMessage = { content: '❌ There was an error executing this command!', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorMessage);
        } else {
          await interaction.reply(errorMessage);
        }
      }
    }

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'ticket_select') {
        await handleTicketCreation(interaction, client);
      } else if (interaction.customId === 'game_select') {
        await handleGameRoleSelection(interaction, client);
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === 'claim_ticket') {
        await handleTicketClaim(interaction, client);
      } else if (interaction.customId === 'close_ticket') {
        await handleTicketClose(interaction, client);
      } else if (interaction.customId.startsWith('game_')) {
        await handleGameRoleButton(interaction, client);
      }
    }
  },
};

async function handleTicketCreation(interaction, client) {
  const ticketType = interaction.values[0];
  const userId = interaction.user.id;
  const guild = interaction.guild;

  const existingTicket = Array.from(guild.channels.cache.values()).find(
    ch => ch.name === `ticket-${interaction.user.username.toLowerCase()}` && ch.type === ChannelType.GuildText
  );

  if (existingTicket) {
    return interaction.reply({ 
      content: `❌ You already have an open ticket: <#${existingTicket.id}>`, 
      ephemeral: true 
    });
  }

  await interaction.deferReply({ ephemeral: true });

  const categoryId = client.config.ticketCategoryId;
  const ticketIcons = {
    'billing': '💵',
    'account': '📧',
    'general': '🔧',
    'report': '⚠️'
  };

  const ticketDescriptions = {
    'billing': 'Payment and billing issues',
    'account': 'Problems with your account',
    'general': 'General questions and support',
    'report': 'Report users or issues'
  };

  try {
    const permissionOverwrites = [
      {
        id: guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: userId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
      },
    ];

    if (client.config.supportRoleId) {
      permissionOverwrites.push({
        id: client.config.supportRoleId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
      });
    }

    const ticketChannel = await guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      parent: categoryId,
      permissionOverwrites,
    });

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(`${ticketIcons[ticketType]} ${ticketDescriptions[ticketType]}`)
      .setDescription(`Hello <@${userId}>,\n\nThank you for opening a support ticket!\n\n**Category:** ${ticketDescriptions[ticketType]}\n\nOur support team will be with you shortly. Please describe your issue in detail.`)
      .setFooter({ text: 'SG ESPORTS Support System' })
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('claim_ticket')
          .setLabel('Claim Ticket')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('✋'),
        new ButtonBuilder()
          .setCustomId('close_ticket')
          .setLabel('Close Ticket')
          .setStyle(ButtonStyle.Danger)
          .setEmoji('🔒')
      );

    await ticketChannel.send({ content: `<@${userId}>`, embeds: [embed], components: [row] });

    const ticketData = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'));
    ticketData[ticketChannel.id] = {
      userId: userId,
      type: ticketType,
      createdAt: Date.now(),
      claimed: false,
      messages: []
    };
    fs.writeFileSync('./data/tickets.json', JSON.stringify(ticketData, null, 2));

    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    stats.totalTickets = (stats.totalTickets || 0) + 1;
    if (!stats.ticketsByType) stats.ticketsByType = {};
    stats.ticketsByType[ticketType] = (stats.ticketsByType[ticketType] || 0) + 1;
    fs.writeFileSync('./data/stats.json', JSON.stringify(stats, null, 2));

    await interaction.editReply({ content: `✅ Ticket created: <#${ticketChannel.id}>` });

    if (client.config.logChannelId) {
      const logChannel = guild.channels.cache.get(client.config.logChannelId);
      if (logChannel) {
        const logEmbed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('📂 New Ticket Created')
          .addFields(
            { name: 'User', value: `<@${userId}>`, inline: true },
            { name: 'Type', value: ticketDescriptions[ticketType], inline: true },
            { name: 'Channel', value: `<#${ticketChannel.id}>`, inline: true }
          )
          .setTimestamp();
        await logChannel.send({ embeds: [logEmbed] });
      }
    }
  } catch (error) {
    console.error('Error creating ticket:', error);
    await interaction.editReply({ content: '❌ Failed to create ticket. Please contact an administrator.' });
  }
}

async function handleGameRoleSelection(interaction, client) {
  const selectedGames = interaction.values;
  const member = interaction.member;

  const gameRoles = {
    'valorant': 'Valorant',
    'bgmi': 'BGMI',
    'csgo': 'CS:GO',
    'cod': 'Call of Duty',
    'apex': 'Apex Legends',
    'r6': 'Rainbow Six Siege',
    'lol': 'League of Legends'
  };

  await interaction.deferReply({ ephemeral: true });

  try {
    const guild = interaction.guild;
    const rolesToAdd = [];

    for (const game of selectedGames) {
      const roleName = gameRoles[game];
      let role = guild.roles.cache.find(r => r.name === roleName);

      if (!role) {
        role = await guild.roles.create({
          name: roleName,
          color: 'Random',
          reason: 'Game role for reaction roles'
        });
      }

      rolesToAdd.push(role);
    }

    const currentGameRoles = member.roles.cache.filter(r => Object.values(gameRoles).includes(r.name));
    await member.roles.remove(currentGameRoles);

    await member.roles.add(rolesToAdd);

    const addedRoles = rolesToAdd.map(r => r.name).join(', ');
    await interaction.editReply({ content: `✅ Your game roles have been updated!\n\n**Roles:** ${addedRoles}` });
  } catch (error) {
    console.error('Error assigning game roles:', error);
    await interaction.editReply({ content: '❌ Failed to assign roles. Please contact an administrator.' });
  }
}

async function handleGameRoleButton(interaction, client) {
  const gameId = interaction.customId.replace('game_', '');
  const member = interaction.member;

  const gameRoles = {
    'valorant': 'Valorant',
    'bgmi': 'BGMI',
    'csgo': 'CS:GO',
    'codm': 'Call of Duty Mobile',
    'apex': 'Apex Legends',
    'mlbb': 'Mobile Legends Bang Bang'
  };

  await interaction.deferReply({ ephemeral: true });

  try {
    const guild = interaction.guild;
    const roleName = gameRoles[gameId];
    
    let role = guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
      role = await guild.roles.create({
        name: roleName,
        color: 'Random',
        reason: 'Game role for button selection'
      });
    }

    const hasRole = member.roles.cache.has(role.id);

    if (hasRole) {
      await member.roles.remove(role);
      await interaction.editReply({ content: `✅ Removed the **${roleName}** role!` });
    } else {
      await member.roles.add(role);
      await interaction.editReply({ content: `✅ Added the **${roleName}** role!` });
    }
  } catch (error) {
    console.error('Error toggling game role:', error);
    await interaction.editReply({ content: '❌ Failed to toggle role. Please contact an administrator.' });
  }
}

async function handleTicketClaim(interaction, client) {
  const ticketData = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'));
  const channelId = interaction.channel.id;

  if (!ticketData[channelId]) {
    return interaction.reply({ content: '❌ This is not a ticket channel!', ephemeral: true });
  }

  if (ticketData[channelId].claimed) {
    return interaction.reply({ content: '❌ This ticket has already been claimed!', ephemeral: true });
  }

  ticketData[channelId].claimed = true;
  ticketData[channelId].claimedBy = interaction.user.id;
  fs.writeFileSync('./data/tickets.json', JSON.stringify(ticketData, null, 2));

  const embed = new EmbedBuilder()
    .setColor('#FFA500')
    .setTitle('✋ Ticket Claimed')
    .setDescription(`This ticket has been claimed by <@${interaction.user.id}>`)
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

async function handleTicketClose(interaction, client) {
  const ticketData = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'));
  const channelId = interaction.channel.id;

  if (!ticketData[channelId]) {
    return interaction.reply({ content: '❌ This is not a ticket channel!', ephemeral: true });
  }

  await interaction.deferReply();

  const messages = await interaction.channel.messages.fetch({ limit: 100 });
  const messagesArray = Array.from(messages.values()).reverse();
  
  const textTranscript = messagesArray.map(m => {
    return `[${new Date(m.createdTimestamp).toLocaleString()}] ${m.author.tag}: ${m.content}`;
  }).join('\n');

  const htmlTranscript = generateHTMLTranscript(messagesArray, ticketData[channelId]);

  const timestamp = Date.now();
  const textFile = `./data/transcripts/ticket-${channelId}-${timestamp}.txt`;
  const htmlFile = `./data/transcripts/ticket-${channelId}-${timestamp}.html`;
  
  fs.writeFileSync(textFile, textTranscript);
  fs.writeFileSync(htmlFile, htmlTranscript);

  const embed = new EmbedBuilder()
    .setColor('#FFD700')
    .setTitle('⭐ Rate Your Support Experience')
    .setDescription('Please rate your support experience from 1-5 stars:\n\n⭐ = 1 star\n⭐⭐ = 2 stars\n⭐⭐⭐ = 3 stars\n⭐⭐⭐⭐ = 4 stars\n⭐⭐⭐⭐⭐ = 5 stars\n\nReact with the number of stars!')
    .setFooter({ text: 'This channel will close in 30 seconds' });

  const ratingMsg = await interaction.editReply({ embeds: [embed] });

  await ratingMsg.react('1️⃣');
  await ratingMsg.react('2️⃣');
  await ratingMsg.react('3️⃣');
  await ratingMsg.react('4️⃣');
  await ratingMsg.react('5️⃣');

  const filter = (reaction, user) => {
    return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === ticketData[channelId].userId;
  };

  const collected = await ratingMsg.awaitReactions({ filter, max: 1, time: 30000 }).catch(() => null);

  const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
  stats.totalClosed = (stats.totalClosed || 0) + 1;

  if (collected && collected.size > 0) {
    const reaction = collected.first();
    const ratingMap = { '1️⃣': 1, '2️⃣': 2, '3️⃣': 3, '4️⃣': 4, '5️⃣': 5 };
    const rating = ratingMap[reaction.emoji.name];

    if (!stats.ratings) stats.ratings = [];
    stats.ratings.push({ 
      rating, 
      ticketId: channelId, 
      ticketType: ticketData[channelId].type,
      timestamp: Date.now() 
    });
  }
  
  fs.writeFileSync('./data/stats.json', JSON.stringify(stats, null, 2));

  const htmlAttachment = new AttachmentBuilder(Buffer.from(htmlTranscript, 'utf-8'), { 
    name: `ticket-transcript-${timestamp}.html` 
  });

  const transcriptEmbed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('📋 Ticket Transcript')
    .setDescription('Your support ticket has been closed. Please find the conversation transcript attached.')
    .addFields(
      { name: 'Ticket Type', value: ticketData[channelId].type, inline: true },
      { name: 'Closed At', value: new Date().toLocaleString(), inline: true }
    )
    .setFooter({ text: 'SG ESPORTS Support System' })
    .setTimestamp();

  try {
    const user = await client.users.fetch(ticketData[channelId].userId);
    await user.send({ 
      embeds: [transcriptEmbed], 
      files: [htmlAttachment] 
    }).catch(err => {
      console.log(`Could not send transcript to user ${ticketData[channelId].userId}:`, err.message);
    });
  } catch (error) {
    console.log('Error sending DM to user:', error.message);
  }

  if (client.config.transcriptChannelId) {
    const transcriptChannel = interaction.guild.channels.cache.get(client.config.transcriptChannelId);
    if (transcriptChannel) {
      const serverTranscriptEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🔒 Ticket Closed - Transcript')
        .addFields(
          { name: 'Ticket', value: interaction.channel.name, inline: true },
          { name: 'User', value: `<@${ticketData[channelId].userId}>`, inline: true },
          { name: 'Closed by', value: `<@${interaction.user.id}>`, inline: true },
          { name: 'Type', value: ticketData[channelId].type, inline: true },
          { name: 'Created', value: new Date(ticketData[channelId].createdAt).toLocaleString(), inline: true },
          { name: 'Closed', value: new Date().toLocaleString(), inline: true }
        )
        .setTimestamp();

      const htmlAttachment2 = new AttachmentBuilder(Buffer.from(htmlTranscript, 'utf-8'), { 
        name: `ticket-transcript-${timestamp}.html` 
      });

      await transcriptChannel.send({ 
        embeds: [serverTranscriptEmbed], 
        files: [htmlAttachment2] 
      }).catch(err => {
        console.log('Could not send transcript to transcript channel:', err.message);
      });
    }
  }

  if (client.config.logChannelId) {
    const logChannel = interaction.guild.channels.cache.get(client.config.logChannelId);
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('🔒 Ticket Closed')
        .addFields(
          { name: 'Ticket', value: interaction.channel.name, inline: true },
          { name: 'Closed by', value: `<@${interaction.user.id}>`, inline: true },
          { name: 'Transcript', value: `Saved locally and sent to user & transcript channel` }
        )
        .setTimestamp();
      await logChannel.send({ embeds: [logEmbed] });
    }
  }

  delete ticketData[channelId];
  fs.writeFileSync('./data/tickets.json', JSON.stringify(ticketData, null, 2));

  setTimeout(async () => {
    await interaction.channel.delete();
  }, 5000);
}
