# TownKit - Municipal Services & Permits Marketplace

TownKit is a comprehensive platform that helps homeowners navigate building permits and connect with qualified contractors. Think of it as "TurboTax for building permits" meets "Angie's List for contractors."

## 🌟 Features

- **Permit Calculator**: Interactive tool to determine what permits you need
- **City-Specific Requirements**: Detailed permit information for 50+ US cities
- **Contractor Marketplace**: Connect with pre-screened, qualified contractors
- **Lead Generation System**: Automated contractor matching and notifications
- **SEO-Optimized**: Built for high search engine visibility
- **Mobile-First Design**: Responsive design for all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Email service account (SendGrid, Postmark, or Resend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd townkit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env .env.local
   # Edit .env.local with your actual values
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
townkit/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── calculator/     # Permit calculator
│   │   ├── permits/        # City and project pages
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   ├── lib/               # Utilities and configurations
│   └── styles/            # Global styles
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Database seeding
├── public/               # Static assets
└── scripts/             # Deployment and utility scripts
```

## 🔧 Configuration

### Environment Variables

Copy `.env` to `.env.local` and configure the following:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/townkit_dev"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration
EMAIL_FROM="noreply@townkit.com"
EMAIL_PROVIDER="sendgrid"  # Options: sendgrid, postmark, resend

# Email Provider API Keys
SENDGRID_API_KEY="your-sendgrid-api-key"
POSTMARK_API_KEY="your-postmark-api-key"
RESEND_API_KEY="your-resend-api-key"
```

### Database Setup

The project uses PostgreSQL with Prisma ORM. The schema includes:

- **Cities**: 50+ US cities with permit office information
- **Projects**: Common home improvement project types
- **Contractors**: Verified contractor profiles with specialties
- **Leads**: Homeowner inquiries and contractor matches
- **Permit Requirements**: City-specific permit information

### Email Service Setup

Choose one of the supported email providers:

1. **SendGrid**: Popular choice with good deliverability
2. **Postmark**: Developer-friendly with excellent documentation
3. **Resend**: Modern alternative with great developer experience

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Prepare for deployment**
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

2. **Set up production database**
   - Create a PostgreSQL database (recommended: Supabase, Railway, or Neon)
   - Run migrations: `npx prisma migrate deploy`
   - Seed the database: `npx prisma db seed`

3. **Configure environment variables in Vercel**
   - Go to your project settings in Vercel dashboard
   - Add all environment variables from `.env.local`
   - Deploy to production: `vercel --prod`

### Manual Deployment Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

## 📊 Database Schema

### Core Tables

- `cities` - City information and permit office details
- `projects` - Project types and typical requirements
- `contractors` - Contractor profiles and specialties
- `leads` - Homeowner inquiries
- `lead_contractor_matches` - Lead distribution tracking
- `permit_requirements` - City-specific permit details

### Seeded Data

The database comes pre-seeded with:
- 50 major US cities
- 12 common project types
- Sample contractors for major cities
- Permit requirements for city-project combinations

## 🎯 Business Model

### Revenue Streams

1. **Lead Generation**: Contractors pay $100-300 per qualified lead
2. **Premium Listings**: Featured contractor placement ($299/month)
3. **Affiliate Partnerships**: Commissions from permit expediting services

### Target Markets

- **Primary**: Homeowners planning renovations ($25B+ market)
- **Secondary**: Contractors seeking qualified leads
- **Geographic**: Initially US cities, expandable globally

## 🛠️ Development

### Adding New Cities

1. Add city data to `prisma/seed.ts`
2. Run `npx prisma db seed`
3. City pages are automatically generated

### Adding New Project Types

1. Add project to `prisma/seed.ts`
2. Update permit calculator logic in `src/app/calculator/page.tsx`
3. Add project-specific requirements in city data

### Customizing Email Templates

Email templates are in `src/lib/email.ts`:
- Contractor notification emails
- Homeowner confirmation emails
- Both HTML and plain text versions

## 📈 SEO & Marketing

### Built-in SEO Features

- Dynamic sitemap generation
- Schema.org structured data
- Open Graph and Twitter Card metadata
- City-specific meta tags and descriptions
- Internal linking for better page authority

### Content Strategy

The platform is designed for programmatic SEO:
- City pages: "Building Permits in [City]"
- Project pages: "[Project] Permits in [City]"
- Calculator: "Do I Need a Permit for [Project]?"

## 🔐 Security

### Built-in Security Features

- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection headers
- CSRF protection
- Rate limiting on API routes

### Best Practices

- Environment variables for sensitive data
- Secure email handling
- Database connection security
- HTTPS enforcement in production

## 📞 Support

### Getting Help

- **Documentation**: Check this README and inline comments
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Email**: Contact the development team

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new functionality
5. Submit a pull request

## 📄 License

[Add your license information here]

---

## 🚀 Production Deployment Checklist

Before going live, ensure you have:

- [ ] Production database set up and migrated
- [ ] Environment variables configured in Vercel
- [ ] Email service configured and tested
- [ ] Custom domain configured
- [ ] SSL certificate verified
- [ ] Analytics tracking set up
- [ ] Error monitoring configured
- [ ] Database backups configured
- [ ] Email deliverability tested
- [ ] Lead flow tested end-to-end

## 📊 Performance Metrics

Track these key metrics:

- **User Acquisition**: Organic search traffic, direct visits
- **Conversion**: Calculator usage, lead form completion
- **Revenue**: Leads generated, contractor subscriptions
- **Quality**: Lead-to-project conversion rates

## 🔮 Roadmap

### Phase 1 (MVP) ✅
- Basic permit calculator
- City pages with requirements
- Contractor lead capture
- Email notifications

### Phase 2 (Growth)
- Advanced permit calculator
- Contractor dashboard
- Payment processing
- Mobile app

### Phase 3 (Scale)
- AI-powered permit guidance
- Document automation
- API for third-party integrations
- International expansion

---

Built with ❤️ for homeowners and contractors everywhere.
