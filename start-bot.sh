#!/bin/bash

if [ ! -f "config.json" ]; then
    echo "❌ Error: config.json not found!"
    echo ""
    echo "📋 Please follow these steps:"
    echo "1. Copy config.example.json to config.json"
    echo "2. Fill in your bot token and other details"
    echo "3. Run 'npm run deploy' to register commands"
    echo "4. Run 'npm start' to start the bot"
    echo ""
    echo "📖 See SETUP_GUIDE.md for detailed instructions!"
    exit 1
fi

echo "🚀 Starting SG ESPORTS Discord Bot..."
node index.js
