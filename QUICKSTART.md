# Quick Start Guide

Get the CommunityHub Platform running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use Docker)

## Step 1: Install Dependencies

```bash
cd /Users/richard/justrichard
npm install
```

## Step 2: Setup Database

### Option A: Using Docker (Easiest)

```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Your database is now running at:
# postgresql://postgres:postgres@localhost:5432/communityhub
```

### Option B: Use Existing PostgreSQL

Skip this if using Docker. Otherwise, create a database:

```sql
CREATE DATABASE communityhub;
```

## Step 3: Configure Environment

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env` and update if needed:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/communityhub?schema=public"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

## Step 4: Setup Database Schema

```bash
# Generate Prisma Client
npm run db:generate

# Create database tables
npm run db:push

# Seed with test data
npm run db:seed
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Test Accounts

After seeding, login with:

### Admin Account
- **Email**: admin@communityhub.com
- **Password**: admin123
- **Access**: Full admin dashboard

### Customer Account
- **Email**: customer@test.com
- **Password**: customer123
- **Access**: User features

## Available Routes

### Public Pages
- `/en` - Home page (English)
- `/ar` - Home page (Arabic, RTL)
- `/fr` - Home page (French)
- `/en/services` - Service listing
- `/en/services/deep-cleaning` - Service detail

### Authentication
- `/en/auth/login` - Login page
- `/en/auth/signup` - Registration page

### User Pages (Requires Login)
- `/en/profile` - User profile
- `/en/bookings` - Booking management

### Admin Pages (Requires Admin Role)
- `/en/admin` - Admin dashboard
- `/en/admin/services` - Manage services
- `/en/admin/bookings` - Manage bookings
- `/en/admin/users` - Manage users

## Next Steps

### 1. Customize Branding

Edit `tailwind.config.ts` to change colors:

```typescript
colors: {
  primary: {
    500: '#0ea5e9', // Your brand color
    600: '#0284c7',
    // ...
  }
}
```

### 2. Add More Services

Use Prisma Studio to manage data:

```bash
npm run db:studio
```

Opens at [http://localhost:5555](http://localhost:5555)

### 3. Configure Stripe (Optional)

For payment testing:

1. Sign up at [stripe.com](https://stripe.com)
2. Get test API keys
3. Add to `.env`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

### 4. Configure Email (Optional)

For transactional emails:

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to `.env`:

```env
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema changes
npm run db:migrate       # Create migration
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Testing
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:e2e         # Run E2E tests

# Code Quality
npm run lint             # Run ESLint
```

## Troubleshooting

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Prisma Client Not Generated

```bash
npm run db:generate
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
/app
  /[locale]              # Internationalized routes
    /page.tsx            # Home page
    /services            # Service pages
    /auth                # Authentication
    /admin               # Admin dashboard
    /profile             # User profile
    /bookings            # Booking management
  /api                   # API routes
/components              # Reusable components
/lib                     # Utilities
/messages                # i18n translations
/prisma                  # Database schema & seeds
/e2e                     # E2E tests
/__tests__               # Unit tests
```

## Features Overview

✅ **Multilingual**: English, Arabic (RTL), French
✅ **Authentication**: Email/password with NextAuth
✅ **User Roles**: Customer, Provider, Admin, Manager
✅ **Service Catalog**: Categories, services, pricing
✅ **Booking System**: Date/time, addresses, add-ons
✅ **Payment Ready**: Stripe integration
✅ **Admin Dashboard**: Full CRUD operations
✅ **Responsive Design**: Mobile-first with Tailwind
✅ **Testing**: Jest + Playwright
✅ **Type-Safe**: TypeScript + Prisma

## Getting Help

- Check [README.md](./README.md) for detailed documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guide
- Open an issue on GitHub

## What's Next?

1. ✅ Platform is running
2. 📝 Customize content and branding
3. 🎨 Adjust design and colors
4. 🚀 Deploy to production (see DEPLOYMENT.md)
5. 📧 Configure email notifications
6. 💳 Setup payment processing
7. 📊 Add analytics and monitoring

Happy coding! 🎉
