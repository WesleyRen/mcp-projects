#!/bin/bash

# Demo Environment Setup Script
# This script sets up your personal API keys for demo/POC purposes

echo "🚀 Setting up demo environment with personal API keys..."

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "📁 Found existing .env.local file"
    source .env.local
else
    echo "⚠️  No .env.local file found"
    echo "💡 Create one with your personal API keys:"
    echo "   BRAVE_API_KEY=your-actual-key"
    echo "   OPENWEATHER_API_KEY=your-actual-key"
fi

# Export any existing environment variables
if [ -n "$BRAVE_API_KEY" ]; then
    export BRAVE_API_KEY
    echo "✅ BRAVE_API_KEY is set"
else
    echo "⚠️  BRAVE_API_KEY not set"
fi

if [ -n "$OPENWEATHER_API_KEY" ]; then
    export OPENWEATHER_API_KEY
    echo "✅ OPENWEATHER_API_KEY is set"
else
    echo "⚠️  OPENWEATHER_API_KEY not set"
fi

echo ""
echo "🎉 Demo environment ready!"
echo "💡 Run 'node test-mcp.js' to test your configuration"
echo "💡 Run 'npm run start-brave' to start the Brave Search server"
echo ""
echo "🔒 Remember: These are your personal API keys for demo purposes only"
