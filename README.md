# SG ESPORTS Discord Bot

A comprehensive Discord bot for managing support tickets, reaction roles, and game role assignments.

## Features

### 🚀 Auto-Setup on Startup
- **Automatic Panel Deployment**: Ticket and game role panels are automatically posted to their designated channels when the bot starts
- **Smart Cleanup**: Old bot messages are automatically removed before posting new panels
- **Ticket Restoration**: Open tickets are automatically restored and validated when the bot comes back online
- **Zero Manual Setup**: Just configure channel IDs and start the bot - panels appear automatically!

### 🎟️ Support Ticket System
- **Dropdown Select Menu**: Users can choose from multiple support categories
  - 💵 Billing Support
  - 📧 Account Issues
  - 🔧 General Support
  - ⚠️ Report
- **Private Ticket Channels**: Automatically creates private channels for support
- **Ticket Claiming**: Support staff can claim tickets for professional handling
- **HTML Transcripts**: Beautiful HTML-formatted transcripts sent to:
  - User via DM when ticket closes
  - Designated transcript channel in server
  - Also saved locally as text backup
- **User Feedback**: Collects ratings (1-5 stars) after ticket closure
- **Statistics**: View support performance metrics

### 🎮 Game Role System
- **Dropdown Menu**: Multi-select game roles
- **Available Games**:
  - 🔥 VALORANT
  - 🎯 Battleground Mobile India
  - 💣 Counter Strike: Global Offensive
  - 🎖️ Call Of Duty: Modern Warfare
  - 🏆 Apex Legends
  - 🎭 Rainbow Six Siege
  - ⚔️ League Of Legends
- **Auto Role Assignment**: Automatically assigns/removes roles based on selection

### 🛠️ Admin Commands
- `/setup-ticket` - Create the support ticket panel
- `/setup-gameroles` - Create the game role selection panel
- `/stats` - View support ticket statistics
- `/add` - Add a user to a ticket
- `/remove` - Remove a user from a ticket

## Setup Instructions

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give your bot a name (e.g., "SG ESPORTS Bot")
4. Go to the "Bot" tab
5. Click "Add Bot"
6. Enable these **Privileged Gateway Intents**:
   - ✅ PRESENCE INTENT
   - ✅ SERVER MEMBERS INTENT
   - ✅ MESSAGE CONTENT INTENT
7. Copy your bot token (you'll need this later)

### 2. Invite the Bot to Your Server

1. Go to the "OAuth2" > "URL Generator" tab
2. Select scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Select bot permissions:
   - ✅ Administrator (or specific permissions: Manage Channels, Manage Roles, Send Messages, etc.)
4. Copy the generated URL and open it in your browser
5. Select your server and authorize

### 3. Configure the Bot

1. Copy `config.example.json` to `config.json`:
   ```bash
   cp config.example.json config.json
   ```

2. Edit `config.json` with your details:
   ```json
   {
     "token": "YOUR_BOT_TOKEN",
     "clientId": "YOUR_BOT_CLIENT_ID",
     "guildId": "YOUR_SERVER_ID",
     "ticketCategoryId": "CATEGORY_ID_FOR_TICKETS",
     "logChannelId": "CHANNEL_ID_FOR_LOGS",
     "transcriptChannelId": "CHANNEL_ID_FOR_TRANSCRIPTS",
     "supportRoleId": "ROLE_ID_FOR_SUPPORT_TEAM",
     "adminRoleId": "ROLE_ID_FOR_ADMINS",
     "ticketChannelId": "CHANNEL_FOR_TICKET_PANEL",
     "reactionRoleChannelId": "CHANNEL_FOR_GAME_ROLES"
   }
   ```

### How to Get IDs in Discord:

1. Enable Developer Mode: Settings > Advanced > Developer Mode
2. Right-click on any server/channel/role/user and click "Copy ID"

### 4. Install Dependencies

```bash
npm install
```

### 5. Deploy Slash Commands

```bash
node deploy-commands.js
```

### 6. Start the Bot

```bash
node index.js
```

**That's it!** The bot will automatically:
- ✅ Post the ticket panel to your ticket channel
- ✅ Post the game roles panel to your game roles channel
- ✅ Clean up any old bot messages
- ✅ Restore any open tickets

No manual setup commands needed!

## Usage

### Auto-Setup (Recommended)

The bot automatically sets up panels on startup! Just make sure you have:
- `ticketChannelId` set in config.json
- `reactionRoleChannelId` set in config.json

When the bot starts, it will:
1. Clean old bot messages from those channels
2. Post fresh panels automatically
3. Restore any open tickets

### Manual Setup (Optional)

You can also manually create panels anywhere using slash commands:

**For Ticket Panel:**
1. Go to any channel
2. Run `/setup-ticket`
3. The bot will create an embed with a dropdown menu

**For Game Roles:**
1. Go to any channel
2. Run `/setup-gameroles`
3. The bot will create an embed with a dropdown menu for game selection

### Managing Tickets

- **Users**: Select a category from the dropdown to create a ticket
- **Support Staff**: 
  - Click "Claim Ticket" to claim a ticket
  - Click "Close Ticket" to close and get user feedback
  - Use `/add @user` to add someone to a ticket
  - Use `/remove @user` to remove someone from a ticket

### Viewing Statistics

- Run `/stats` to see:
  - Open tickets count
  - Total ratings received
  - Average rating
  - Rating distribution

## File Structure

```
.
├── commands/
│   ├── admin/          # Admin commands
│   └── ticket/         # Ticket management commands
├── events/             # Event handlers
├── utils/             # Utility functions
│   └── transcriptGenerator.js  # HTML transcript generator
├── data/              # Data storage
│   ├── tickets.json   # Active tickets
│   ├── stats.json     # Statistics
│   └── transcripts/   # Saved transcripts (HTML & TXT)
├── index.js           # Main bot file
├── deploy-commands.js # Command deployment
└── config.json        # Configuration
```

## 🌐 AWS Deployment Guide

### Deploy on AWS EC2 (Amazon Linux 2 / Ubuntu)

#### Prerequisites
- AWS EC2 instance (t2.micro or larger)
- Security group with SSH (port 22) access
- SSH key pair for accessing your instance

#### Step 1: Connect to Your EC2 Instance

```bash
ssh -i your-key.pem ec2-user@your-instance-ip  # For Amazon Linux
# OR
ssh -i your-key.pem ubuntu@your-instance-ip     # For Ubuntu
```

#### Step 2: Install Node.js

**For Amazon Linux 2:**
```bash
# Update system
sudo yum update -y

# Install Node.js 20.x
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

**For Ubuntu:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

#### Step 3: Install Git

**Amazon Linux:**
```bash
sudo yum install git -y
```

**Ubuntu:**
```bash
sudo apt install git -y
```

#### Step 4: Clone or Upload Your Bot

**Option A: Upload files using SCP**
```bash
# From your local machine
scp -i your-key.pem -r /path/to/bot ec2-user@your-instance-ip:~/sg-bot
```

**Option B: Clone from repository (if you have one)**
```bash
git clone your-repository-url sg-bot
cd sg-bot
```

**Option C: Create manually**
```bash
mkdir sg-bot
cd sg-bot
# Then upload files individually
```

#### Step 5: Install Dependencies

```bash
cd sg-bot
npm install
```

#### Step 6: Configure the Bot

```bash
# Copy example config
cp config.example.json config.json

# Edit configuration
nano config.json
# OR
vi config.json
```

Add your Discord bot credentials and IDs, then save (Ctrl+X, Y, Enter for nano).

#### Step 7: Deploy Commands

```bash
node deploy-commands.js
```

#### Step 8: Run Bot with PM2 (Process Manager)

PM2 keeps your bot running even after you disconnect from SSH.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start bot with PM2
pm2 start index.js --name "sg-esports-bot"

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
# Follow the command it outputs

# View bot status
pm2 status

# View logs
pm2 logs sg-esports-bot

# Restart bot
pm2 restart sg-esports-bot

# Stop bot
pm2 stop sg-esports-bot
```

#### Step 9: Configure Firewall (Optional but Recommended)

**Amazon Linux:**
```bash
# Firewall is usually managed through AWS Security Groups
# No additional configuration needed
```

**Ubuntu with UFW:**
```bash
sudo ufw allow 22/tcp     # SSH
sudo ufw enable
sudo ufw status
```

#### Useful PM2 Commands

```bash
pm2 list                    # List all processes
pm2 logs                    # View all logs
pm2 logs sg-esports-bot     # View specific bot logs
pm2 restart sg-esports-bot  # Restart bot
pm2 stop sg-esports-bot     # Stop bot
pm2 delete sg-esports-bot   # Remove from PM2
pm2 monit                   # Monitor in real-time
```

#### Updating Your Bot

```bash
# Navigate to bot directory
cd ~/sg-bot

# Pull latest changes (if using git)
git pull

# Or upload new files via SCP

# Install any new dependencies
npm install

# Deploy new commands if you added any
node deploy-commands.js

# Restart the bot
pm2 restart sg-esports-bot
```

#### Troubleshooting on AWS

**Bot not starting:**
```bash
# Check logs
pm2 logs sg-esports-bot

# Check if Node.js is installed
node --version

# Check if dependencies are installed
npm list
```

**Can't connect to EC2:**
- Verify security group allows SSH (port 22)
- Check if you're using the correct key file
- Ensure instance is running in AWS Console

**Bot crashes:**
```bash
# View error logs
pm2 logs sg-esports-bot --err

# Restart bot
pm2 restart sg-esports-bot
```

### Environment Variables (Alternative to config.json)

For better security on AWS, use environment variables:

```bash
# Create .env file
nano .env
```

Add your configuration:
```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_server_id
TICKET_CATEGORY_ID=category_id
LOG_CHANNEL_ID=log_channel_id
TRANSCRIPT_CHANNEL_ID=transcript_channel_id
SUPPORT_ROLE_ID=support_role_id
ADMIN_ROLE_ID=admin_role_id
TICKET_CHANNEL_ID=ticket_channel_id
REACTION_ROLE_CHANNEL_ID=reaction_role_channel_id
```

Install dotenv:
```bash
npm install dotenv
```

The bot already supports environment variables through `config.js`.

## Support

For issues or questions about this bot, please contact the SG ESPORTS team.

## Credits

Created for **SG ESPORTS** 🎮
