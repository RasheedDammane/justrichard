# 🌍 Admin I18N Implementation Guide

## 📋 Overview

This guide provides a complete implementation plan for adding i18n translations to all admin pages.

---

## 🎯 Translation Files Created

### Location
```
/messages/admin/
├── en.json (English)
├── fr.json (French)
└── ar.json (Arabic - to be completed)
```

### Structure
```json
{
  "admin": {
    "common": { ... },
    "navigation": { ... },
    "dashboard": { ... },
    "users": { ... },
    "properties": { ... },
    "services": { ... },
    "bookings": { ... },
    "categories": { ... },
    "partners": { ... },
    "doctors": { ... },
    "lawyers": { ... },
    "coaches": { ... },
    "maids": { ... },
    "motorbikes": { ... },
    "rentalCars": { ... },
    "yachts": { ... },
    "activities": { ... },
    "suppliers": { ... },
    "transfers": { ... },
    "blog": { ... },
    "chatbots": { ... },
    "notifications": { ... },
    "analytics": { ... },
    "promotions": { ... },
    "cmsPages": { ... },
    "media": { ... },
    "data": { ... },
    "simulators": { ... },
    "cryptoPayments": { ... },
    "logs": { ... },
    "currencies": { ... },
    "geography": { ... },
    "exchangeRates": { ... },
    "styles": { ... },
    "routes": { ... }
  }
}
```

---

## 🔧 Hooks Created

### `useAdminTranslation(namespace)`
```typescript
import { useAdminTranslation } from '@/hooks/useAdminTranslation';

// In a component
const t = useAdminTranslation('dashboard');
// Usage: t('title'), t('welcome', { name: 'John' })
```

### `useAdminCommon()`
```typescript
import { useAdminCommon } from '@/hooks/useAdminTranslation';

const tc = useAdminCommon();
// Usage: tc('add'), tc('edit'), tc('delete'), tc('save')
```

### `useAdminNav()`
```typescript
import { useAdminNav } from '@/hooks/useAdminTranslation';

const tn = useAdminNav();
// Usage: tn('dashboard'), tn('users'), tn('properties')
```

---

## 📝 Implementation Steps

### Step 1: Update Dashboard Page

**File**: `/app/[locale]/admin/page.tsx`

**Before**:
```tsx
<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
<p className="text-gray-600 mt-1">Bienvenue, {session.user.name}</p>
```

**After**:
```tsx
'use client';
import { useAdminTranslation } from '@/hooks/useAdminTranslation';

const t = useAdminTranslation('dashboard');

<h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
<p className="text-gray-600 mt-1">{t('welcome', { name: session.user.name })}</p>
```

**All texts to translate**:
- ✅ "Dashboard" → `t('title')`
- ✅ "Bienvenue, {name}" → `t('welcome', { name })`
- ✅ "Total Users" → `t('totalUsers')`
- ✅ "Total Bookings" → `t('totalBookings')`
- ✅ "Active Services" → `t('activeServices')`
- ✅ "Total Revenue" → `t('totalRevenue')`
- ✅ "Réservations par Type" → `t('bookingsByType')`
- ✅ "Réservations par Statut" → `t('bookingsByStatus')`
- ✅ "Aucune donnée disponible" → `t('noDataAvailable')`
- ✅ "Réservations Récentes" → `t('recentBookings')`
- ✅ "Voir tout" → `t('viewAll')`
- ✅ "Client" → `t('client')`
- ✅ "Type" → `t('type')`
- ✅ "Date Début" → `t('startDate')`
- ✅ "Statut" → `t('status')`
- ✅ "Total" → `t('total')`
- ✅ "Aucune réservation récente" → `t('noRecentBookings')`
- ✅ "{count} Erreur(s) non résolue(s)" → `t('unresolvedErrors', { count, plural })`
- ✅ "Voir tous les logs" → `t('viewAllLogs')`

---

### Step 2: Update All List Pages

**Pattern for all list pages** (users, properties, services, etc.):

```tsx
'use client';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

const t = useAdminTranslation('users'); // or 'properties', 'services', etc.
const tc = useAdminCommon();

// Title
<h1>{t('title')}</h1>
<p>{t('subtitle', { count: totalCount })}</p>

// Add button
<button>{tc('add')} {t('new')}</button>

// Table headers
<th>{t('table.name')}</th>
<th>{t('table.email')}</th>
<th>{tc('actions')}</th>
```

---

## 📄 Pages to Update (27 pages)

### ✅ Already Translated
1. **Maids** (`/admin/maids`)
   - List page ✅
   - New page ✅
   - Edit page ✅
   - Form component ✅

2. **Motorbikes** (`/admin/motorbikes`)
   - List page ✅
   - New page ✅
   - Edit page ✅
   - Form component ✅

3. **Rental Cars** (`/admin/rental-cars`)
   - List page ✅
   - New page ✅
   - Edit page ✅
   - Form component ✅

### 🔄 To Translate

4. **Dashboard** (`/admin`)
   - Main dashboard page
   - Stats cards
   - Charts
   - Recent bookings table

5. **Users** (`/admin/users`)
   - List page
   - New/Edit pages

6. **Properties** (`/admin/properties`)
   - List page
   - New/Edit pages
   - Form component

7. **Services** (`/admin/services`)
   - List page
   - New/Edit pages

8. **Bookings** (`/admin/bookings`)
   - List page
   - New/Edit pages

9. **Categories** (`/admin/categories`)
   - List page
   - New/Edit pages

10. **Partners** (`/admin/partners`)
    - List page
    - New/Edit pages
    - Documents page

11. **Doctors** (`/admin/doctors`)
    - List page
    - New/Edit pages

12. **Lawyers** (`/admin/lawyers`)
    - List page
    - New/Edit pages

13. **Coaches** (`/admin/coaches`)
    - List page
    - New/Edit pages

14. **Yachts** (`/admin/yachts`)
    - List page
    - New/Edit pages

15. **Activities** (`/admin/activities`)
    - List page
    - New/Edit pages

16. **Suppliers** (`/admin/suppliers`)
    - List page
    - New/Edit pages

17. **Transfers** (`/admin/transfers`)
    - List page
    - New/Edit pages

18. **Blog** (`/admin/blog`)
    - List page
    - New/Edit pages

19. **Chatbots** (`/admin/chatbots`)
    - List page
    - New/Edit pages
    - Import page

20. **Notifications** (`/admin/notifications`)
    - List page
    - New/Edit pages

21. **Analytics** (`/admin/analytics`)
    - Dashboard
    - Reports

22. **Promotions** (`/admin/promotions`)
    - List page
    - New/Edit pages

23. **CMS Pages** (`/admin/cms-pages`)
    - List page
    - New/Edit pages

24. **Media** (`/admin/media`)
    - Library
    - Upload

25. **Data** (`/admin/data`)
    - Import/Export

26. **Simulators** (`/admin/simulators`)
    - List page
    - New/Edit pages

27. **Crypto Payments** (`/admin/crypto-payments`)
    - List page
    - Transactions

28. **Logs** (`/admin/logs`)
    - Activity logs
    - Error logs

29. **Currencies** (`/admin/currencies`)
    - List page
    - New/Edit pages

30. **Geography** (`/admin/geography`)
    - Countries
    - Cities

31. **Exchange Rates** (`/admin/exchange-rates`)
    - List page
    - New/Edit pages

32. **Styles** (`/admin/styles`)
    - Customization

33. **Routes** (`/admin/routes`)
    - Route management

---

## 🎨 Common Patterns

### List Page Pattern
```tsx
'use client';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

export default function EntityListPage() {
  const t = useAdminTranslation('entityName');
  const tc = useAdminCommon();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle', { count: total })}</p>
      
      <button>{tc('add')}</button>
      
      <table>
        <thead>
          <tr>
            <th>{t('table.name')}</th>
            <th>{tc('status')}</th>
            <th>{tc('actions')}</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
```

### Form Pattern
```tsx
'use client';
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';

export default function EntityForm() {
  const t = useAdminTranslation('entityName');
  const tc = useAdminCommon();
  
  return (
    <form>
      <label>{t('form.name')}</label>
      <input />
      
      <label>{t('form.description')}</label>
      <textarea />
      
      <button type="submit">{tc('save')}</button>
      <button type="button">{tc('cancel')}</button>
    </form>
  );
}
```

---

## 🚀 Quick Start

### 1. Import hooks
```tsx
import { useAdminTranslation, useAdminCommon } from '@/hooks/useAdminTranslation';
```

### 2. Use in component
```tsx
const t = useAdminTranslation('dashboard'); // or 'users', 'properties', etc.
const tc = useAdminCommon(); // for common words
```

### 3. Replace hardcoded text
```tsx
// Before
<h1>Dashboard</h1>

// After
<h1>{t('title')}</h1>
```

---

## ✅ Checklist

- [x] Create translation files (en.json, fr.json)
- [x] Create useAdminTranslation hooks
- [x] Translate Maids pages
- [x] Translate Motorbikes pages
- [x] Translate Rental Cars pages
- [ ] Translate Dashboard page
- [ ] Translate Users pages
- [ ] Translate Properties pages
- [ ] Translate Services pages
- [ ] Translate Bookings pages
- [ ] Translate Categories pages
- [ ] Translate Partners pages
- [ ] Translate Doctors pages
- [ ] Translate Lawyers pages
- [ ] Translate Coaches pages
- [ ] Translate Yachts pages
- [ ] Translate Activities pages
- [ ] Translate Suppliers pages
- [ ] Translate Transfers pages
- [ ] Translate Blog pages
- [ ] Translate Chatbots pages
- [ ] Translate Notifications pages
- [ ] Translate Analytics pages
- [ ] Translate Promotions pages
- [ ] Translate CMS Pages
- [ ] Translate Media pages
- [ ] Translate Data pages
- [ ] Translate Simulators pages
- [ ] Translate Crypto Payments pages
- [ ] Translate Logs pages
- [ ] Translate Currencies pages
- [ ] Translate Geography pages
- [ ] Translate Exchange Rates pages
- [ ] Translate Styles pages
- [ ] Translate Routes pages

---

## 📚 Resources

- **Translation Files**: `/messages/admin/`
- **Hooks**: `/hooks/useAdminTranslation.ts`
- **Next-Intl Docs**: https://next-intl-docs.vercel.app/

---

**Date**: November 22, 2025  
**Status**: 🔄 In Progress  
**Completed**: 3/33 pages (Maids, Motorbikes, Rental Cars)  
**Remaining**: 30 pages
