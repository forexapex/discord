const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();
client.tickets = new Map();

let config;
try {
  config = require('./config.js');
  client.config = config;
} catch (error) {
  console.error('❌ Configuration error!');
  console.error('Please create config.json from config.example.json');
  console.error('OR set environment variables (DISCORD_TOKEN, CLIENT_ID, GUILD_ID, etc.)');
  console.error('\n📖 See SETUP_GUIDE.md for detailed instructions!\n');
  process.exit(1);
}

if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data');
}

if (!fs.existsSync('./data/tickets.json')) {
  fs.writeFileSync('./data/tickets.json', JSON.stringify({}));
}

if (!fs.existsSync('./data/transcripts')) {
  fs.mkdirSync('./data/transcripts');
}

if (!fs.existsSync('./data/stats.json')) {
  fs.writeFileSync('./data/stats.json', JSON.stringify({ totalTickets: 0, ratings: [] }));
}

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
  }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(config.token).catch(err => {
  console.error('❌ Failed to login! Please check your bot token in config.json');
  console.error(err.message);
  process.exit(1);
});
