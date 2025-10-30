# SG ESPORTS Discord Bot - Project Documentation

## Overview
A feature-rich Discord bot built for SG ESPORTS with support ticket management, reaction roles, and game role assignment systems. Built with Discord.js v14.

## Purpose
- Provide professional support ticket system with dropdown menus
- Enable automatic role assignment for game communities
- Track support performance with ratings and statistics
- Streamline community management for SG ESPORTS

## Current State
- ✅ Bot structure created with command handler
- ✅ Event system implemented
- ✅ Support ticket system with dropdown select menus
- ✅ Ticket claiming and closing features
- ✅ Automatic transcript generation
- ✅ User feedback collection (1-5 star ratings)
- ✅ Game role selection system with 7 games
- ✅ Admin commands for panel setup
- ✅ Statistics tracking

## Recent Changes (October 30, 2025)
- Created complete Discord bot infrastructure
- Implemented support ticket system matching user's design requirements
- Added game role selection with dropdown menu
- Created admin commands for setup and management
- Added data persistence for tickets and statistics
- Enhanced statistics tracking: total tickets, closed tickets, tickets by type
- Implemented user feedback collection with 1-5 star ratings
- Fixed stats.json updates to track all ticket lifecycle events
- Added HTML transcript generation sent to users via DM and transcript channel
- Implemented AWS deployment guide for Amazon Linux and Ubuntu
- **NEW: Auto-setup on startup** - Panels automatically post to designated channels
- **NEW: Ticket restoration** - Open tickets reconnect when bot restarts
- **NEW: Smart cleanup** - Old bot messages removed before posting new panels
- **UPDATED: Game role system** - Changed from dropdown to interactive buttons with custom emoji support
- **UPDATED: Game list** - Added Mobile Legends Bang Bang, updated to 6 games with custom server emojis
- **NEW: Announcement Command** - Added `/announcement` command for admins to post announcements with title, message, optional image, and custom color
- **NEW: Simplified Ubuntu Deployment** - Added quick start deployment guide for Ubuntu/Debian systems
- **CONFIGURED: Replit Setup** - Bot now runs successfully on Replit with proper configuration

## Project Architecture

### Structure
```
├── commands/
│   ├── admin/         - Administrative commands
│   └── ticket/        - Ticket management commands
├── events/            - Discord event handlers
├── data/             - JSON data storage
│   ├── tickets.json  - Active ticket tracking
│   ├── stats.json    - Support statistics
│   └── transcripts/  - Saved ticket transcripts
├── index.js          - Main bot entry point
├── deploy-commands.js - Slash command registration
└── config.json       - Bot configuration (not in repo)
```

### Key Features
1. **Support Tickets**: Dropdown menu with 4 categories (Billing, Account, General, Report)
2. **Game Roles**: Toggle buttons with custom emojis for 6 games (Valorant, BGMI, CS:GO, CODM, Apex Legends, Mobile Legends Bang Bang)
3. **Ticket Management**: Claim, close, transcripts, feedback
4. **Statistics**: Rating tracking and performance metrics
5. **Announcements**: Admin-only command to post formatted announcements to any channel

### Custom Emoji Requirements
The game role buttons use custom Discord emojis that must be uploaded to your server:
- `valorant` - Valorant game logo
- `bgmi` - Battleground Mobile India logo
- `csgo` - Counter Strike: Global Offensive logo
- `codm` - Call of Duty Mobile logo
- `ApexLegends` - Apex Legends logo
- `mlbb` - Mobile Legends Bang Bang logo

## Dependencies
- discord.js ^14.24.1
- Node.js 20

## Configuration Required
The bot uses `config.json` for configuration (or environment variables). Required settings:
- `DISCORD_TOKEN` - Bot token from Discord Developer Portal
- `CLIENT_ID` - Bot's application/client ID
- `GUILD_ID` - Discord server ID
- `TICKET_CATEGORY_ID` - Category for ticket channels
- `LOG_CHANNEL_ID` - Channel for logging
- `TRANSCRIPT_CHANNEL_ID` - Channel for ticket transcripts
- `SUPPORT_ROLE_ID` - Support team role ID
- `ADMIN_ROLE_ID` - Administrator role ID
- `TICKET_CHANNEL_ID` - Channel for ticket panel
- `REACTION_ROLE_CHANNEL_ID` - Channel for game roles panel

## Commands Available
1. `/setup-ticket` - Create ticket panel (auto-runs on startup)
2. `/setup-gameroles` - Create game roles panel (auto-runs on startup)
3. `/stats` - View support statistics
4. `/add` - Add user to ticket
5. `/remove` - Remove user from ticket
6. `/announcement` - Post announcement (Admin only)
7. `/send-message` - Send message to any channel with optional user tag and image (Admin only)

## Setup Notes
- Bot requires privileged intents (Server Members, Message Content)
- Slash commands must be deployed with deploy-commands.js
- Data directory auto-created on first run
