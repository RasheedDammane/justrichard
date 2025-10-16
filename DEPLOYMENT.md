# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)
- Resend account (for emails)

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"

# App
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

## Vercel Deployment (Recommended)

### 1. Database Setup

Use Neon, Supabase, or Railway for PostgreSQL:

**Neon (Recommended):**
```bash
# Sign up at https://neon.tech
# Create a new project
# Copy the connection string
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env`
3. Redeploy

### 4. Run Database Migrations

```bash
# From your local machine with production DATABASE_URL
npx prisma migrate deploy
npx prisma db seed
```

## Docker Deployment

### 1. Build and Run

```bash
# Start PostgreSQL
docker-compose up -d postgres

# Run migrations
npm run db:push
npm run db:seed

# Build application
npm run build

# Start production server
npm start
```

### 2. Using Docker for Full Stack

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t communityhub-platform .
docker run -p 3000:3000 --env-file .env communityhub-platform
```

## Railway Deployment

### 1. Install Railway CLI

```bash
npm i -g @railway/cli
railway login
```

### 2. Initialize Project

```bash
railway init
railway add # Add PostgreSQL
```

### 3. Deploy

```bash
railway up
```

### 4. Configure Environment

```bash
railway variables set NEXTAUTH_SECRET=your-secret
railway variables set STRIPE_SECRET_KEY=sk_live_...
# Add all other variables
```

## Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Seed data loaded (admin user, categories, services)
- [ ] Environment variables configured
- [ ] Stripe webhooks configured
- [ ] Email service configured
- [ ] Domain configured with SSL
- [ ] Test authentication flow
- [ ] Test booking flow
- [ ] Test payment flow
- [ ] Test multilingual routing
- [ ] Configure monitoring (Sentry, LogRocket)
- [ ] Setup backup strategy for database

## Stripe Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## Monitoring

### Vercel Analytics
Already integrated with Vercel deployment.

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Database Monitoring
Use Prisma Pulse or your database provider's monitoring tools.

## Scaling Considerations

- Use CDN for static assets (Vercel Edge Network)
- Enable database connection pooling (PgBouncer)
- Implement Redis for session storage
- Use background jobs for emails (Bull/BullMQ)
- Enable rate limiting on API routes
- Setup database read replicas for heavy read operations

## Backup Strategy

### Database Backups
```bash
# Automated daily backups (cron job)
0 2 * * * pg_dump $DATABASE_URL > backup_$(date +\%Y\%m\%d).sql
```

### Vercel Backup
Vercel automatically backs up deployments. You can rollback anytime.

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Ensure Prisma client is generated
- Verify all environment variables are set

### Database Connection Issues
- Check DATABASE_URL format
- Verify database is accessible from deployment
- Enable SSL if required: `?sslmode=require`

### Authentication Issues
- Verify NEXTAUTH_URL matches deployment URL
- Check NEXTAUTH_SECRET is set
- Ensure cookies are not blocked

## Support

For deployment issues, check:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
