# Quick Setup Guide for SG ESPORTS Discord Bot

## Step 1: Create Your Discord Bot

1. Visit https://discord.com/developers/applications
2. Click **"New Application"** and name it (e.g., "SG ESPORTS Bot")
3. Go to **"Bot"** tab → Click **"Add Bot"**
4. Scroll down to **"Privileged Gateway Intents"** and enable:
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent
5. Click **"Reset Token"** and copy your bot token (save it somewhere safe!)

## Step 2: Get Your Bot's Client ID

1. Still in Developer Portal, go to **"OAuth2"** tab
2. Copy your **"Client ID"** (save this too!)

## Step 3: Invite Bot to Your Server

1. Go to **"OAuth2"** → **"URL Generator"**
2. Select Scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Select Bot Permissions:
   - ✅ Administrator (easiest)
   - OR these specific permissions: Manage Channels, Manage Roles, Send Messages, Manage Messages, Read Message History, Add Reactions, View Channels
4. Copy the generated URL at the bottom
5. Paste it in your browser and invite the bot to your server

## Step 4: Get Server and Channel IDs

### Enable Developer Mode:
1. Discord Settings → Advanced → Enable **Developer Mode**

### Get the IDs you need:
1. **Guild ID (Server ID)**: Right-click your server icon → Copy Server ID
2. Create a category called "Support Tickets" → Right-click it → Copy Category ID
3. Create a channel called "logs" → Right-click it → Copy Channel ID
4. Create a role called "Support Team" → Server Settings → Roles → Right-click role → Copy Role ID
5. Create a role called "Admin" (or use existing) → Copy Role ID

## Step 5: Configure the Bot

1. Copy `config.example.json` to `config.json`
2. Fill in all the values you copied:

```json
{
  "token": "YOUR_BOT_TOKEN_FROM_STEP_1",
  "clientId": "YOUR_CLIENT_ID_FROM_STEP_2",
  "guildId": "YOUR_SERVER_ID",
  "ticketCategoryId": "SUPPORT_TICKETS_CATEGORY_ID",
  "logChannelId": "LOGS_CHANNEL_ID",
  "supportRoleId": "SUPPORT_TEAM_ROLE_ID",
  "adminRoleId": "ADMIN_ROLE_ID",
  "ticketChannelId": "CHANNEL_WHERE_YOU_WANT_TICKET_PANEL",
  "reactionRoleChannelId": "CHANNEL_WHERE_YOU_WANT_GAME_ROLES"
}
```

## Step 6: Deploy Commands

Run this command to register slash commands:
```bash
npm run deploy
```

You should see: `✅ Successfully reloaded X application (/) commands.`

## Step 7: Start the Bot

```bash
npm start
```

You should see: `✅ Bot is online as [Your Bot Name]`

## Step 8: Set Up Your Panels

### In Discord:

1. Go to the channel where you want the ticket panel
2. Type and send: `/setup-ticket`
3. The bot will create a beautiful embed with dropdown menu

4. Go to the channel where you want game roles
5. Type and send: `/setup-gameroles`
6. The bot will create the game selection panel

## That's It! 🎉

Your bot is now ready! Users can:
- Select support categories from the dropdown to create tickets
- Choose their game roles from the game panel
- Support staff can claim and close tickets
- You can view statistics with `/stats`

## Troubleshooting

**Bot not responding?**
- Make sure the bot is online (green dot next to name)
- Check if you enabled all 3 Privileged Intents
- Verify the bot has proper permissions in your server

**Commands not showing?**
- Make sure you ran `npm run deploy`
- Wait a few minutes for Discord to sync
- Try kicking and re-inviting the bot

**Can't create tickets?**
- Verify the category ID in config.json is correct
- Make sure the bot has "Manage Channels" permission
- Check that the support role ID is correct

## Need Help?

Check the full README.md for detailed documentation!
