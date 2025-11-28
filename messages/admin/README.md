# Admin Translation Files

## 📁 Structure

```
/messages
  /admin          ← Admin-specific translations (SEPARATE from frontend)
    /en.json      ← English (Admin)
    /fr.json      ← French (Admin)
    /ar.json      ← Arabic (Admin)
  /en.json        ← English (Frontend only)
  /fr.json        ← French (Frontend only)
  /ar.json        ← Arabic (Frontend only)
```

## 🎯 Purpose

**Admin translations are SEPARATE from frontend translations** to:
- Keep admin interface independent from public-facing content
- Allow different translation workflows (admin vs frontend)
- Enable role-based language preferences
- Simplify maintenance and updates

## 📝 Available Languages

### Admin Translations
- ✅ English (`admin/en.json`)
- ✅ French (`admin/fr.json`)
- ✅ Arabic (`admin/ar.json`)

### Frontend Translations
- ✅ English (`en.json`)
- ✅ French (`fr.json`)
- ✅ Arabic (`ar.json`)
- ✅ Spanish (`es.json`)
- ✅ Thai (`th.json`)
- ✅ Vietnamese (`vi.json`)
- ✅ Korean (`ko.json`)
- ✅ Russian (`ru.json`)
- ✅ German (`de.json`)
- ✅ Italian (`it.json`)
- ✅ Japanese (`ja.json`)
- ✅ Portuguese (`pt.json`)
- ✅ Turkish (`tr.json`)
- ✅ Norwegian (`no.json`)
- ✅ Tagalog (`tl.json`)
- ✅ Afrikaans (`af.json`)

## 🔧 Usage

### In Admin Components

```tsx
import { useTranslations } from 'next-intl';

export default function MaidsPage() {
  const t = useTranslations('admin.maids');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle', { count: 20 })}</p>
      <button>{t('common.add')}</button>
    </div>
  );
}
```

### In Frontend Components

```tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

## 📋 Admin Translation Keys

### Common Keys (`admin.common`)
- `add`, `edit`, `delete`, `save`, `cancel`
- `active`, `inactive`, `featured`, `available`
- `status`, `actions`, `loading`, `noData`

### Navigation (`admin.navigation`)
- `dashboard`, `users`, `properties`, `services`
- `maids`, `motorbikes`, `rentalCars`, `yachts`
- `doctors`, `lawyers`, `coaches`, `activities`

### Entity-Specific Keys
Each entity (maids, motorbikes, rentalCars, yachts, providers) has:
- `title`, `subtitle`, `new`, `edit`, `addNew`
- `stats.*` - Statistics labels
- `table.*` - Table column headers
- `form.*` - Form field labels

## 🌐 Adding New Languages

To add a new language for admin:

1. Create `/messages/admin/{locale}.json`
2. Copy structure from `admin/en.json`
3. Translate all values
4. Update this README

## 🔄 Configuration

### next-intl Configuration

```ts
// i18n.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Load admin translations separately
  const adminMessages = (await import(`./messages/admin/${locale}.json`)).default;
  const frontendMessages = (await import(`./messages/${locale}.json`)).default;
  
  return {
    messages: {
      ...frontendMessages,
      admin: adminMessages.admin
    }
  };
});
```

## 📊 Translation Coverage

### Admin Pages Covered
- ✅ Maids (List, New, Edit, Form)
- ✅ Motorbikes (List, New, Edit, Form)
- ✅ Rental Cars (List, New, Edit, Form)
- ✅ Yachts (List, New, Edit, Form)
- ✅ Providers (Doctors, Lawyers, Coaches, etc.)
- ✅ Properties
- ✅ Dashboard
- ✅ Common UI elements

### Frontend Pages Covered
- ✅ Homepage
- ✅ Services
- ✅ Blog
- ✅ Footer
- ✅ Navigation
- ✅ About, Contact, FAQ, etc.

## 🎨 Best Practices

1. **Keep admin and frontend separate** - Never mix translations
2. **Use namespaces** - `admin.maids.title` not `maidsTitle`
3. **Consistent naming** - Same pattern across all entities
4. **Parameterized strings** - Use `{count}`, `{name}` for dynamic values
5. **Common keys** - Reuse `admin.common.*` for shared UI elements

## 🚀 Next Steps

1. Integrate with next-intl in admin pages
2. Add more languages as needed (Spanish, Thai, etc.)
3. Create translation management workflow
4. Add validation for missing keys
5. Implement language switcher in admin panel

---

**Last Updated**: November 22, 2025  
**Maintained by**: Development Team  
**Languages**: 3 (Admin), 16 (Frontend)
