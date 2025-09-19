#!/bin/bash

# VOA Development Server Startup Script
# This script ensures the server starts from the correct directory and stays running

echo "🚀 Starting VOA Development Server..."

# Navigate to the correct directory
cd /Users/faizan/Desktop/VOA/voa-website

# Verify we're in the right place
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are we in the right directory?"
    pwd
    exit 1
fi

echo "✅ Found package.json in: $(pwd)"

# Kill any existing Node processes on port 3000
echo "🔄 Checking for existing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Start the development server
echo "🌟 Starting Next.js development server..."
npm run dev
