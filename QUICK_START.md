# 🚀 Quick Start - SG ESPORTS Discord Bot

## What You Need

1. **Discord Bot Token** - Get it from https://discord.com/developers/applications
2. **Your Server (Guild) ID** - Right-click your server → Copy Server ID
3. **Bot's Client ID** - From the Discord Developer Portal
4. **Category ID** - Create a "Support Tickets" category in Discord → Copy ID
5. **Role IDs** - For Support Team and Admin roles

## 3-Step Setup

### Step 1: Configure
```bash
cp config.example.json config.json
```
Then edit `config.json` with your Discord bot details.

### Step 2: Deploy Commands
```bash
npm run deploy
```

### Step 3: Start Bot
```bash
npm start
```

## In Discord

Once your bot is online:

1. `/setup-ticket` - Creates the support ticket panel
2. `/setup-gameroles` - Creates the game role selection panel
3. `/stats` - View support statistics

## Features Included

✅ Support ticket system with dropdown (Billing, Account, General, Report)  
✅ Ticket claiming by support staff  
✅ Automatic transcripts saved on ticket close  
✅ User feedback collection (1-5 star ratings)  
✅ Statistics tracking (total tickets, ratings, etc.)  
✅ Game role selection (7 games: Valorant, BGMI, CS:GO, COD, Apex, R6, LoL)  
✅ Auto role assignment when users select games  

## Need Help?

- **Full guide**: See `SETUP_GUIDE.md`
- **Detailed docs**: See `README.md`
