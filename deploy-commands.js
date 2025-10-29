const { REST, Routes } = require('discord.js');
const fs = require('fs');

let config;
try {
  config = require('./config.js');
} catch (error) {
  console.error('❌ Configuration error!');
  console.error('Please create config.json from config.example.json');
  console.error('OR set environment variables (DISCORD_TOKEN, CLIENT_ID, GUILD_ID, etc.)');
  console.error('\n📖 See SETUP_GUIDE.md for detailed instructions!\n');
  process.exit(1);
}

const commands = [];
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log(`🔄 Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );

    console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
