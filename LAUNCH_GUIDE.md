# 🚀 TownKit Launch Guide - Zero Budget Setup

## Phase 1: Set Up Free Production Database (Supabase)

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up with GitHub (recommended) or email
4. Create a new project:
   - **Project name**: `townkit-production`
   - **Database password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users (US East for US audience)
   - **Pricing plan**: Free tier (no credit card required)

### Step 2: Get Database Connection String
1. In your Supabase dashboard, go to "Settings" → "Database"
2. Find "Connection string" section
3. Copy the "URI" connection string
4. It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
5. **Save this string - you'll need it for deployment**

## Phase 2: Set Up Free Email Service (Resend)

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with email (no credit card required for free tier)
3. Verify your email address

### Step 2: Add Your Domain (Optional but Recommended)
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `townkit.com`) or use a subdomain (e.g., `mail.townkit.com`)
4. Follow DNS setup instructions from Resend
5. **For now, you can skip this and use Resend's default domain**

### Step 3: Get API Key
1. In Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Name it "TownKit Production"
4. **Copy and save the API key - you'll need it for deployment**

## Phase 3: Deploy to Vercel

### Step 1: Prepare Your Code
1. Make sure you're in the townkit directory on your computer
2. Create production environment file:

```bash
# Create .env.local with your production values
cp .env .env.local
```

Edit `.env.local` with these values:
```bash
# Database (use your Supabase connection string)
DATABASE_URL="your-supabase-connection-string-here"

# NextAuth
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Email Configuration
EMAIL_FROM="noreply@townkit.com"
EMAIL_PROVIDER="resend"

# Resend API Key
RESEND_API_KEY="your-resend-api-key-here"
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Click "Add New..." → "Project"
4. Import your TownKit repository from GitHub
5. Configure deployment:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build and Output Settings**: Leave default
6. Add environment variables (click "Environment Variables"):
   - Copy all variables from your `.env.local` file
   - Make sure to add them all exactly as shown above
7. Click "Deploy"

### Step 3: Set Up Database
Once your Vercel deployment is complete:

1. In Vercel dashboard, go to your project
2. Click "Functions" tab, then find the deployment logs
3. You need to run database setup commands. Go to Supabase SQL Editor:

```sql
-- Copy and paste the entire contents of your prisma/schema.prisma
-- Then run the migration commands through Vercel's function or locally
```

**Easier method - Run locally pointing to production:**
```bash
# In your terminal, with DATABASE_URL pointing to Supabase
npx prisma migrate deploy
npx prisma db seed
```

## Phase 4: Configure Your Domain (Optional)

### Option A: Use Free Vercel Domain
- Your site will be live at: `https://townkit.vercel.app`
- This works perfectly for MVP testing

### Option B: Add Custom Domain ($12/year)
1. Buy domain from Namecheap/GoDaddy (cheapest option)
2. In Vercel dashboard, go to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

## Phase 5: Test Everything

### Lead Flow Test
1. Go to your live site
2. Use the permit calculator
3. Fill out a contractor request form
4. Check that:
   - Confirmation email arrives in your inbox
   - Contractor notification emails are sent (check Resend dashboard)
   - Lead appears in your Supabase database

### Database Check
1. Go to Supabase dashboard → "Table Editor"
2. Verify these tables have data:
   - `cities` (should show 50 cities)
   - `projects` (should show 12 project types)
   - `contractors` (should show sample contractors)

## Phase 6: Going Live Checklist

- [ ] Site loads correctly at your domain
- [ ] Permit calculator works
- [ ] Lead forms submit successfully
- [ ] Emails are being sent and received
- [ ] Database is populated with sample data
- [ ] All city pages load (test a few manually)
- [ ] Mobile version looks good
- [ ] Google can crawl your site (check robots.txt)

## 💰 Cost Breakdown (First 6 Months)

| Service | Free Tier Limits | Monthly Cost |
|---------|------------------|--------------|
| Supabase Database | 500MB, 50K users | $0 |
| Resend Email | 3,000 emails | $0 |
| Vercel Hosting | 100GB bandwidth | $0 |
| Domain (optional) | N/A | $1/month |
| **Total** | | **$0-1/month** |

## 📈 When to Upgrade

### Upgrade Triggers:
- **Database**: When you hit 500MB or 50K users → $25/month
- **Email**: When you send 3,000+ emails/month → $20/month  
- **Hosting**: When you need team features → $20/month

### Revenue Thresholds:
- **Break even**: ~10 leads/month at $100 each = $1,000/month
- **Profitable**: ~50 leads/month = $5,000/month revenue
- **Scale up**: ~200 leads/month = $20,000/month revenue

## 🆘 Troubleshooting

### Common Issues:

**Database Connection Failed**
- Double-check your DATABASE_URL in Vercel environment variables
- Ensure Supabase project is active
- Try regenerating the database password

**Emails Not Sending**
- Verify RESEND_API_KEY in Vercel environment variables
- Check Resend dashboard for error logs
- Make sure EMAIL_PROVIDER is set to "resend"

**Site Won't Load**
- Check Vercel deployment logs for errors
- Ensure all environment variables are set
- Try redeploying from Vercel dashboard

### Getting Help:
- Vercel: Check deployment logs in dashboard
- Supabase: Use their Discord community
- Resend: Check their documentation and status page

## 🎯 Next Steps After Launch

1. **Week 1**: Monitor for errors, fix any issues
2. **Week 2**: Add Google Analytics, start SEO work
3. **Month 1**: Begin outreach to contractors in your target cities
4. **Month 2**: Add more cities and project types
5. **Month 3**: Implement payment processing for contractor leads

## 🚀 You're Ready to Launch!

With this setup, you can handle:
- **1,000+ page views/day** (Vercel free tier)
- **100 leads/month** (Resend free tier)
- **Thousands of contractors** (Supabase free tier)

All for $0-1/month until you start generating revenue!