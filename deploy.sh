#!/bin/bash

echo "🚀 Happy Event Management - Deployment Script"
echo "=============================================="

# Check if we're in the right directory
if [ ! -d "public" ]; then
    echo "❌ Error: public folder not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project structure verified"

# Create deployment package
echo "📦 Creating deployment package..."
mkdir -p deploy
cp -r public/* deploy/

echo "✅ Deployment package created in 'deploy/' folder"

echo ""
echo "🌐 DEPLOYMENT OPTIONS:"
echo ""
echo "1. NETLIFY (Easiest):"
echo "   - Go to https://netlify.com"
echo "   - Sign up for free account"
echo "   - Drag and drop the 'deploy' folder"
echo "   - Site goes live instantly!"
echo ""
echo "2. GITHUB PAGES:"
echo "   - Create new repository on GitHub.com"
echo "   - Upload all files from this project"
echo "   - Go to Settings → Pages"
echo "   - Set source to main branch, /public folder"
echo "   - Wait for deployment"
echo ""
echo "3. VERCEL:"
echo "   - Go to https://vercel.com"
echo "   - Import project from GitHub or upload 'deploy' folder"
echo "   - Deploy automatically"
echo ""

echo "📧 IMPORTANT: Before deploying, edit public/index.html and replace:"
echo "   YOUR_EMAIL_HERE with your actual email address"
echo ""

echo "🎉 Ready to deploy! Your website will be live in minutes."