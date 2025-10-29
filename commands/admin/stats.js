const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('View support ticket statistics')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    const ticketData = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'));

    const openTickets = Object.keys(ticketData).length;
    const totalTickets = stats.totalTickets || 0;
    const totalClosed = stats.totalClosed || 0;
    const totalRatings = stats.ratings ? stats.ratings.length : 0;
    const averageRating = totalRatings > 0 
      ? (stats.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(2)
      : 'N/A';

    const ratingDistribution = {
      1: stats.ratings ? stats.ratings.filter(r => r.rating === 1).length : 0,
      2: stats.ratings ? stats.ratings.filter(r => r.rating === 2).length : 0,
      3: stats.ratings ? stats.ratings.filter(r => r.rating === 3).length : 0,
      4: stats.ratings ? stats.ratings.filter(r => r.rating === 4).length : 0,
      5: stats.ratings ? stats.ratings.filter(r => r.rating === 5).length : 0,
    };

    const ticketsByType = stats.ticketsByType || {};
    const typeBreakdown = Object.entries(ticketsByType)
      .map(([type, count]) => `${type}: ${count}`)
      .join('\n') || 'No data yet';

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('📊 Support Statistics')
      .addFields(
        { name: '🎫 Total Tickets Created', value: totalTickets.toString(), inline: true },
        { name: '🔒 Total Tickets Closed', value: totalClosed.toString(), inline: true },
        { name: '📂 Currently Open', value: openTickets.toString(), inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: '📋 Tickets by Type', value: typeBreakdown, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
        { name: '📈 Total Ratings Received', value: totalRatings.toString(), inline: true },
        { name: '⭐ Average Rating', value: averageRating.toString(), inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
        { name: '📊 Rating Distribution', value: 
          `⭐ (1): ${ratingDistribution[1]}\n` +
          `⭐⭐ (2): ${ratingDistribution[2]}\n` +
          `⭐⭐⭐ (3): ${ratingDistribution[3]}\n` +
          `⭐⭐⭐⭐ (4): ${ratingDistribution[4]}\n` +
          `⭐⭐⭐⭐⭐ (5): ${ratingDistribution[5]}`
        }
      )
      .setFooter({ text: 'SG ESPORTS Support System' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
