# CommunityHub Platform - Multilingual Home Services Booking Platform

A full-stack, multilingual booking platform for home services built with Next.js 14, TypeScript, Prisma, and PostgreSQL. Inspired by communityhub.com with admin dashboard, user profiles, comprehensive testing, **error logging system**, and **Swagger API documentation**.

## 🚀 Features

### Core Features
- **Multilingual Support**: 15 languages - English, Arabic (RTL), French, Spanish, German, Russian, Thai, Vietnamese, Korean, Italian, Norwegian, Turkish, Portuguese, Afrikaans, Japanese
- **User Authentication**: Email/password with NextAuth.js
- **Role-Based Access**: Customer, Provider, Admin, Manager roles
- **Service Management**: Categories, services, pricing by region
- **Booking System**: Date/time selection, address management, add-ons
- **Payment Integration**: Stripe integration ready
- **Admin Dashboard**: Full CRUD operations for all entities
- **Responsive Design**: Mobile-first with Tailwind CSS
- **🆕 Error Logging System**: Centralized logging with admin interface
- **🆕 API Documentation**: Interactive Swagger/OpenAPI documentation

### User Features
- Browse services by category
- Multi-language interface with locale routing
- User profiles with addresses
- Booking history and management
- Service reviews and ratings
- Saved/favorite services
- Promo code support

### Admin Features
- Dashboard with analytics
- User management
- Service and category CRUD
- Booking management
- CMS page editor
- Translation management
- Provider management
- **🆕 Error logs monitoring and resolution**
- **🆕 Real-time error alerts**

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Payment**: Stripe
- **Email**: Resend
- **Testing**: Jest + Playwright (47 tests ✅)
- **🆕 API Docs**: Swagger UI + OpenAPI 3.0
- **🆕 Logging**: Custom centralized error logging system

## 📋 Prerequisites

- Node.js 18+ 
- Docker (for PostgreSQL)
- npm or yarn

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Run the quick start script
./quick-start.sh

# Then start the dev server
npm run dev
```

This script will:
- ✅ Start PostgreSQL with Docker
- ✅ Create .env file
- ✅ Generate Prisma client
- ✅ Create database tables
- ✅ Run all tests

### Option 2: Manual Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start PostgreSQL

```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Verify it's running
docker-compose ps
```

### 3. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# The .env is already configured for Docker PostgreSQL:
# DATABASE_URL="postgresql://communityhub:communityhub123@localhost:5432/communityhub?schema=public"
```

### 4. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Create tables
npm run db:push

# Optional: Seed data
npm run db:seed
```

### 5. Run Tests

```bash
npm test -- --testPathIgnorePatterns=e2e
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Available URLs

- **Application**: http://localhost:3000
- **🆕 Swagger UI**: http://localhost:3000/api-doc
- **🆕 API Spec**: http://localhost:3000/api/doc
- **🆕 Admin Logs**: http://localhost:3000/en/admin/logs
- **Adminer** (DB): http://localhost:8080

## 👤 Test Accounts

### Quick Login Buttons Available

The login page now includes **quick login buttons** for easy testing:

- 🟣 **Admin**: admin@communityhub.com / admin123
- 🔵 **Customer**: customer@test.com / customer123
- 🟢 **Provider**: provider@test.com / provider123
- 🟠 **Manager**: manager@test.com / manager123

### Create Test Users

```bash
# Create/update all test users
./create-test-users.sh

# Or manually
npx tsx prisma/seed-users.ts
```

See [LOGIN_GUIDE.md](./LOGIN_GUIDE.md) for detailed instructions.

### Create Blog Posts

```bash
# Create blog posts for all service domains
npx tsx prisma/seed-blog-posts.ts
```

See [BLOG_POSTS_GUIDE.md](./BLOG_POSTS_GUIDE.md) for details on the 8 blog posts created.

## 📁 Project Structure

```
/app
  /[locale]              # Internationalized routes
    /page.tsx            # Home page
    /services            # Service listing & details
    /auth                # Login/signup pages
    /admin               # Admin dashboard
      /logs              # 🆕 Error logs page
    /profile             # User profile
    /bookings            # Booking management
  /api                   # API routes
    /auth                # NextAuth & registration
    /doc                 # 🆕 OpenAPI spec endpoint
    /test-logging        # 🆕 Logging test API
  /api-doc               # 🆕 Swagger UI page
/components              # Reusable components
/lib                     # Utilities & configs
  /auth.ts              # NextAuth configuration
  /prisma.ts            # Prisma client
  /utils.ts             # Helper functions
  /logger.ts            # 🆕 Centralized logger
  /swagger.ts           # 🆕 Swagger configuration
/messages                # i18n translations (15 languages)
  /en.json              # English
  /ar.json              # Arabic (RTL)
  /fr.json              # French
  /es.json              # Spanish
  /de.json              # German
  /ru.json              # Russian
  /th.json              # Thai
  /vi.json              # Vietnamese
  /ko.json              # Korean
  /it.json              # Italian
  /no.json              # Norwegian
  /tr.json              # Turkish
  /pt.json              # Portuguese
  /af.json              # Afrikaans
  /ja.json              # Japanese
/prisma
  /schema.prisma        # Database schema (+ ErrorLog model)
  /seed.ts              # Seed data
/types                   # TypeScript types
/__tests__               # 🆕 Test files (47 tests)
  /lib                   # Unit tests
  /api                   # Integration tests
```

## 🗄️ Database Schema

### Main Models
- **User**: Authentication and profile
- **Profile**: Extended user information
- **Service**: Service catalog with translations
- **Category**: Service categories
- **Booking**: Service bookings
- **Address**: User addresses
- **Payment**: Payment records
- **🆕 ErrorLog**: Error logging and monitoring
- **Review**: Service reviews
- **Promotion**: Discount codes
- **CMSPage**: Content pages

## 🌐 Internationalization

The platform supports **15 languages** with automatic routing:

- `/en/*` - 🇬🇧 English
- `/ar/*` - 🇸🇦 Arabic (RTL layout)
- `/fr/*` - 🇫🇷 French
- `/es/*` - 🇪🇸 Spanish
- `/de/*` - 🇩🇪 German
- `/ru/*` - 🇷🇺 Russian
- `/th/*` - 🇹🇭 Thai
- `/vi/*` - 🇻🇳 Vietnamese
- `/ko/*` - 🇰🇷 Korean
- `/it/*` - 🇮🇹 Italian
- `/no/*` - 🇳🇴 Norwegian
- `/tr/*` - 🇹🇷 Turkish
- `/pt/*` - 🇵🇹 Portuguese
- `/af/*` - 🇿🇦 Afrikaans
- `/ja/*` - 🇯🇵 Japanese

All UI translations are stored in `/messages/*.json` files. Database content (services, categories, CMS pages) also supports multilingual storage.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch
# Run E2E tests
npm run test:e2e

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests (47 tests ✅)
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio
- `./quick-start.sh` - 🆕 Automated setup script

## 🚀 Deployment

### Vercel (Recommended)
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Hosting

- **Neon**: Serverless PostgreSQL
- **Supabase**: PostgreSQL with extras
- **Railway**: Simple PostgreSQL hosting

## 🔐 Security

- Passwords hashed with bcrypt
- JWT sessions with NextAuth
- CSRF protection
- SQL injection prevention via Prisma
- Environment variables for secrets

## 📝 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers

### 🆕 Logging & Monitoring
- `GET /api/test-logging` - Test logging system
- `POST /api/test-logging` - Create custom logs
- `GET /api/doc` - OpenAPI specification

### Services (to be implemented)
- `GET /api/services` - List services
- `GET /api/services/[slug]` - Service details
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - User bookings

## 📚 Additional Documentation

- **[LOGGING_SYSTEM.md](./LOGGING_SYSTEM.md)** - Complete logging system guide
- **[SWAGGER_SETUP.md](./SWAGGER_SETUP.md)** - API documentation & database setup
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Detailed implementation summary

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Replace logo and images
- Modify translations in `/messages`

### Add New Language
1. Add locale to `i18n.ts`
2. Create `/messages/{locale}.json`
3. Update middleware config

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📞 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ using Next.js, Prisma, and TypeScript
