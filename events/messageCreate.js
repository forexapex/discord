const fs = require('fs');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;

    const ticketData = JSON.parse(fs.readFileSync('./data/tickets.json', 'utf8'));
    
    if (ticketData[message.channel.id]) {
      if (!ticketData[message.channel.id].messages) {
        ticketData[message.channel.id].messages = [];
      }
      
      ticketData[message.channel.id].messages.push({
        author: message.author.tag,
        content: message.content,
        timestamp: Date.now()
      });
      
      fs.writeFileSync('./data/tickets.json', JSON.stringify(ticketData, null, 2));
    }
  },
};
