#!/bin/bash

# TownKit Deployment Script
# This script prepares and deploys the TownKit application to Vercel

set -e

echo "🚀 Starting TownKit deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if we're logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

# Environment check
echo "🔍 Checking environment variables..."

# Create .env.local template if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local template..."
    cat > .env.local << EOF
# Production Environment Variables
# Copy this file to .env.local and fill in your actual values

# Database (use a production PostgreSQL database)
DATABASE_URL="postgresql://username:password@host:5432/townkit_prod?schema=public"

# NextAuth (generate a secure secret)
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Email Configuration
EMAIL_FROM="noreply@townkit.com"
EMAIL_PROVIDER="sendgrid"

# Email API Keys (use only one based on EMAIL_PROVIDER)
SENDGRID_API_KEY=""
POSTMARK_API_KEY=""
RESEND_API_KEY=""

# Optional: Analytics and Monitoring
GOOGLE_ANALYTICS_ID=""
SENTRY_DSN=""
EOF
    echo "⚠️  Please edit .env.local with your production values before deploying."
    exit 1
fi

# Build and test locally first
echo "🔨 Building project locally..."
npm run build

echo "✅ Local build successful!"

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

# Database setup reminder
echo "📋 Database Setup Checklist:"
echo "   1. Ensure your production database is running"
echo "   2. Run 'npx prisma migrate deploy' to apply migrations"
echo "   3. Run 'npx prisma db seed' to populate initial data"
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."

# First deployment (will create the project)
if [ "$1" = "--production" ]; then
    echo "🌟 Deploying to production..."
    vercel --prod
else
    echo "🧪 Deploying to preview..."
    vercel
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Post-deployment checklist:"
echo "   1. Set up your custom domain in Vercel dashboard"
echo "   2. Configure environment variables in Vercel dashboard"
echo "   3. Run database migrations: npx prisma migrate deploy"
echo "   4. Seed the database: npx prisma db seed"
echo "   5. Test the email service with a sample lead"
echo "   6. Set up monitoring and analytics"
echo ""
echo "🔗 Useful commands:"
echo "   vercel --prod              # Deploy to production"
echo "   vercel logs                # View deployment logs"
echo "   vercel env ls              # List environment variables"
echo "   vercel domains ls          # List custom domains"
echo ""
echo "📖 For more help, visit: https://vercel.com/docs"