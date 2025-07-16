# 🐙 GitHub Repository Setup

## Quick Setup Instructions

### Step 1: Initialize Local Git Repository
```bash
cd /Users/shayanbozorgmanesh/Desktop/townkit
git init
git add .
git commit -m "Initial commit: TownKit MVP with AdSense integration"
```

### Step 2: Connect to GitHub Repository
```bash
git remote add origin https://github.com/shayanmanesh/townkit.git
git branch -M main
git push -u origin main
```

### Step 3: Verify Repository Setup
1. Go to https://github.com/shayanmanesh/townkit
2. Verify all files are uploaded
3. Check that .env files are NOT uploaded (they should be in .gitignore)

## 🚀 Deploy from GitHub to Vercel

### Option A: Auto-Deploy Setup
1. In Vercel dashboard, click "Add New..." → "Project"
2. Import from GitHub: `shayanmanesh/townkit`
3. Configure environment variables (from .env.production)
4. Deploy automatically on every push to main branch

### Option B: Manual Deploy Command
```bash
# Build and deploy
npm run deploy
```

## 📊 Google AdSense Integration ✅

### What's Been Added:
1. **AdSense Script** in layout.tsx
2. **ads.txt** file in public folder
3. **Reusable Ad Components**:
   - SquareAd (4431777949)
   - HorizontalAd (3137758017) 
   - VerticalAd (4175507517)
   - InFeedAd (3637571023)
   - InArticleAd (2324489353)

### Ad Placements:
- **Home Page**: Horizontal ad before projects, In-feed ad between sections
- **City Pages**: Vertical ad in sidebar, Horizontal ad at bottom
- **Calculator**: Horizontal ad at bottom
- **Project Pages**: Will inherit from city page layout

### AdSense Account: ca-pub-5635114711353420

## 💰 Revenue Potential

### Dual Revenue Streams:
1. **Lead Generation**: $100-300 per contractor lead
2. **Google AdSense**: $1-5 per 1000 page views

### Projected Monthly Revenue:
- **10,000 page views**: $10-50 from AdSense + $1,000-5,000 from leads
- **100,000 page views**: $100-500 from AdSense + $10,000-50,000 from leads
- **1,000,000 page views**: $1,000-5,000 from AdSense + $100,000+ from leads

## 🔧 Managing Ad Performance

### AdSense Optimization:
1. **Monitor Performance** in Google AdSense dashboard
2. **A/B Test Ad Placements** (more/fewer ads)
3. **Adjust Ad Types** based on performance data
4. **Content Optimization** for better ad targeting

### Best Practices:
- Don't overwhelm users with too many ads
- Ensure ads are relevant to home improvement content
- Monitor page load speeds
- Follow AdSense policies strictly

## 📈 Next Steps

### Immediate (Week 1):
1. **Push to GitHub** and deploy to Vercel
2. **Test all ad placements** on live site
3. **Submit to AdSense** for review if needed
4. **Monitor ad performance** and user experience

### Growth (Month 1):
1. **Add more strategic ad placements** based on traffic data
2. **Implement A/B testing** for ad positions
3. **Create content** targeting high-value keywords
4. **Scale contractor outreach** for lead generation

### Scale (Month 3+):
1. **Premium ad-free experience** for paying contractors
2. **Sponsored content** from home improvement brands
3. **Affiliate partnerships** with tool/material companies
4. **Native advertising** opportunities

## 🚨 Important Notes

### AdSense Compliance:
- Never click your own ads
- Don't ask others to click ads
- Ensure content is family-friendly
- Follow all AdSense policies

### Performance Monitoring:
- Track ad revenue vs lead revenue
- Monitor page load speeds
- Watch for ad blocking impact
- Optimize for mobile experience

## 🎯 Success Metrics

Track these KPIs:
- **Page views** and **unique visitors**
- **AdSense RPM** (revenue per mille)
- **Ad click-through rates**
- **Lead conversion rates**
- **Total revenue** (ads + leads)

Your TownKit platform now has dual revenue streams optimized for maximum profitability! 🚀