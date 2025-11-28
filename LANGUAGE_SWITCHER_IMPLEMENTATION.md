# Language Switcher Implementation - EN/FR

## 📋 Overview

Implementation of a language switcher with **page reload** functionality for both **public frontend** and **admin backoffice**. Currently supports **English (EN)** and **French (FR)** only.

---

## 🎯 Features

- ✅ **Button-based UI** (EN | FR) instead of dropdown
- ✅ **Page reload** on language change (preserves query params)
- ✅ **Cookie persistence** (`locale` cookie, 365 days)
- ✅ **URL reconstruction** with new locale segment
- ✅ **Error handling** with user-friendly messages
- ✅ **Separate variants** for public and admin interfaces
- ✅ **Loading state** during language switch
- ✅ **Fallback to EN** for invalid locales

---

## 📁 Files Created/Modified

### New Files

1. **`/hooks/useLanguageSwitcher.ts`**
   - Custom hook for language switching logic
   - Handles URL reconstruction, cookie management, navigation
   - Error handling and validation

2. **`/components/LanguageSwitcher.tsx`**
   - Reusable language switcher component
   - Button-based UI (EN | FR)
   - Supports `public` and `admin` variants

3. **`/app/components/Header/HeaderClient.tsx`**
   - Client component for public header
   - Integrates LanguageSwitcher

4. **`/components/admin/AdminHeader.tsx`**
   - Admin-specific header with language switcher
   - Sticky header with admin badge

5. **`/app/[locale]/admin/layout.tsx`**
   - Admin layout wrapper
   - Adds AdminHeader to all admin pages

### Modified Files

1. **`/app/components/Header/Header.tsx`**
   - Converted to server component
   - Delegates rendering to HeaderClient

2. **`/i18n.ts`**
   - Restricted locales to `['en', 'fr']` only
   - Added comment for future expansion

---

## 🔧 How It Works

### 1. User clicks language button (EN or FR)

### 2. `useLanguageSwitcher` hook:
   - Validates the selected locale
   - Updates `locale` cookie (365 days expiry)
   - Reconstructs URL:
     - Current: `/en/admin/properties/new?id=123`
     - New: `/fr/admin/properties/new?id=123`
   - Preserves query parameters

### 3. Navigation:
   - Calls `router.push(newUrl)`
   - Triggers full page reload
   - Next.js re-fetches data with new locale

### 4. Error handling:
   - Invalid locale → fallback to EN + console warning
   - Navigation error → alert message + console error
   - Missing translation keys → display key + console warning

---

## 🎨 UI Components

### Public Header
```tsx
<LanguageSwitcher variant="public" />
```
- White background buttons
- Border on inactive state
- Blue background on active state

### Admin Header
```tsx
<LanguageSwitcher variant="admin" />
```
- Gray background buttons
- Blue background on active state
- Sticky header at top

---

## 🚀 Usage

### In Public Pages
The language switcher is automatically available in the public header on all pages under `/[locale]/...`

### In Admin Pages
The language switcher is automatically available in the admin header on all pages under `/[locale]/admin/...`

### Programmatic Language Change
```tsx
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';

function MyComponent() {
  const { changeLanguage, currentLocale } = useLanguageSwitcher();
  
  return (
    <button onClick={() => changeLanguage('fr')}>
      Switch to French
    </button>
  );
}
```

---

## 🛡️ Error Handling

### 1. Invalid Locale
- **Scenario**: User tries to access `/de/...` (German not supported)
- **Behavior**: Middleware redirects to `/en/...`
- **Log**: `console.warn("Invalid locale 'de' detected, falling back to 'en'")`

### 2. Navigation Error
- **Scenario**: `router.push()` fails
- **Behavior**: Alert shown to user
- **Message**: `"An error occurred while changing language. Please try again."`
- **Log**: `console.error("Language switch error:", err)`

### 3. Missing Translation
- **Scenario**: Translation key not found in JSON
- **Behavior**: Display key as fallback
- **Log**: `console.warn("Missing translation key: ...")`

---

## 🔄 Page Reload Behavior

When language is changed:
1. Cookie is updated immediately
2. URL is reconstructed with new locale
3. `router.push()` navigates to new URL
4. Next.js performs full page reload
5. All server components re-fetch data
6. All client components re-mount
7. New translations are loaded

**Result**: Complete page refresh with new language

---

## 🧪 Testing

### Test Cases

1. **Public pages**
   - Navigate to `/en/yachts`
   - Click FR button
   - Verify redirect to `/fr/yachts`
   - Verify page content is in French

2. **Admin pages**
   - Navigate to `/en/admin/properties/new`
   - Click FR button
   - Verify redirect to `/fr/admin/properties/new`
   - Verify admin interface is in French

3. **Query parameters**
   - Navigate to `/en/yachts?capacity=12&sort=price`
   - Click FR button
   - Verify redirect to `/fr/yachts?capacity=12&sort=price`
   - Verify query params are preserved

4. **Cookie persistence**
   - Change language to FR
   - Close browser
   - Reopen and visit site
   - Verify language is still FR

5. **Invalid locale**
   - Try to access `/de/...`
   - Verify redirect to `/en/...`

---

## 📦 Dependencies

- **next**: ^14.2.33
- **next-intl**: For i18n support
- **js-cookie**: For cookie management
- **@types/js-cookie**: TypeScript types

---

## 🔮 Future Enhancements

1. **Add more languages**
   - Uncomment full locale list in `i18n.ts`
   - Update `useLanguageSwitcher` to support all locales
   - Add translation files for each language

2. **Toast notifications**
   - Replace `alert()` with toast library (e.g., react-hot-toast)
   - Better UX for error messages

3. **User preference storage**
   - Store language preference in user profile (database)
   - Auto-select user's preferred language on login

4. **Language detection**
   - Detect browser language (`Accept-Language` header)
   - Auto-redirect to detected language on first visit

5. **RTL support**
   - Add RTL layout for Arabic
   - Mirror UI components for RTL languages

---

## 📝 Notes

- The middleware (`middleware.ts`) already handles locale validation and redirection
- The `next-intl` library manages translation loading
- Cookie expiry is set to 365 days
- Session/auth cookies are independent of language cookie

---

## 🐛 Known Issues

None at the moment. All error cases are handled gracefully.

---

## 👨‍💻 Developer Notes

- Always use `useLanguageSwitcher` hook for language changes
- Never modify URL manually - use the hook
- Test language switching on both public and admin pages
- Ensure all translation keys exist in both `en.json` and `fr.json`

---

**Last Updated**: 2025-11-24  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
