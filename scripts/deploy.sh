#!/bin/bash

# Legacy Architect RVA Portal - Production Deployment Script
# This script automates the production deployment process

set -e

echo "=========================================="
echo "Legacy Architect RVA Portal Deployment"
echo "=========================================="
echo ""

# Check if we're on main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Error: Deployment must be from main branch"
    echo "   Current branch: $CURRENT_BRANCH"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes"
    git status --short
    read -p "Continue deployment anyway? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build the project
echo "🔨 Building project..."
bun run build
echo "✅ Build complete"
echo ""

# Check for setup.ts (should be removed for production)
if [ -f "convex/setup.ts" ]; then
    echo "❌ Error: setup.ts file exists - must be removed before production"
    exit 1
fi

echo "✅ Pre-deployment checks passed"
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod --confirm
echo ""

echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Set up custom domain if needed"
echo "3. Test all admin features"
echo "4. Notify Craig for final approval"
