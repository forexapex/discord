const fs = require('fs');

console.log('═══════════════════════════════════════════════════════════');
console.log('  🎮 SG ESPORTS Discord Bot - Setup Status Check');
console.log('═══════════════════════════════════════════════════════════\n');

let hasConfig = false;
let configComplete = false;

if (fs.existsSync('./config.json')) {
  console.log('✅ config.json found!');
  hasConfig = true;
  
  try {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    const requiredFields = ['token', 'clientId', 'guildId'];
    const allFieldsPresent = requiredFields.every(field => 
      config[field] && config[field] !== 'YOUR_BOT_TOKEN_HERE' && config[field] !== 'YOUR_CLIENT_ID_HERE' && config[field] !== 'YOUR_GUILD_ID_HERE'
    );
    
    if (allFieldsPresent) {
      console.log('✅ Essential configuration fields are filled!');
      configComplete = true;
    } else {
      console.log('⚠️  config.json exists but needs to be configured');
      console.log('   Please update the following fields:');
      requiredFields.forEach(field => {
        if (!config[field] || config[field].includes('YOUR_')) {
          console.log(`   - ${field}`);
        }
      });
    }
  } catch (error) {
    console.log('❌ config.json has invalid JSON format');
  }
} else if (process.env.DISCORD_TOKEN) {
  console.log('✅ Using environment variables for configuration');
  hasConfig = true;
  configComplete = true;
} else {
  console.log('❌ config.json not found!');
}

console.log('\n═══════════════════════════════════════════════════════════');

if (!hasConfig || !configComplete) {
  console.log('\n📋 SETUP REQUIRED:\n');
  console.log('1. Copy config.example.json to config.json:');
  console.log('   cp config.example.json config.json\n');
  console.log('2. Edit config.json with your Discord bot details\n');
  console.log('3. Deploy commands:');
  console.log('   npm run deploy\n');
  console.log('4. Start the bot:');
  console.log('   npm start\n');
  console.log('📖 For detailed setup instructions, see SETUP_GUIDE.md\n');
  console.log('═══════════════════════════════════════════════════════════');
  process.exit(0);
}

console.log('\n✨ Configuration looks good!');
console.log('\n📋 NEXT STEPS:\n');
console.log('1. Deploy slash commands (if you haven\'t already):');
console.log('   npm run deploy\n');
console.log('2. Start the bot:');
console.log('   npm start\n');
console.log('3. In Discord, use these commands:');
console.log('   /setup-ticket     - Create support ticket panel');
console.log('   /setup-gameroles  - Create game role panel');
console.log('   /stats            - View support statistics\n');
console.log('═══════════════════════════════════════════════════════════');
