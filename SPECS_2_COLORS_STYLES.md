# 📋 SPÉCIFICATIONS COMPLÈTES - COLORS & STYLES

**Module**: Système de Thèmes et Styles  
**Date**: 23 Novembre 2025  
**Objectif**: Système centralisé pour gérer couleurs, polices et styles du front

---

## 🎯 OBJECTIFS

1. **Gestion centralisée** des couleurs, polices, et styles
2. **Thèmes multiples** (Light, Dark, Custom)
3. **Modification en temps réel** depuis l'admin
4. **Application automatique** sur tout le front
5. **Prévisualisation** avant application
6. **Export/Import** de thèmes

---

## 📊 MODÈLES PRISMA

### 1. Theme

```prisma
model Theme {
  id          String   @id @default(cuid())
  name        String   // "Default Light", "Dark Blue", "Custom"
  slug        String   @unique
  description String?
  isDefault   Boolean  @default(false)
  isActive    Boolean  @default(true)
  config      Json     // Configuration complète du thème
  preview     String?  // URL de l'image de preview
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([slug])
  @@index([isDefault])
  @@index([isActive])
}
```

### 2. StyleConfig (Optionnel - pour historique)

```prisma
model StyleConfig {
  id        String   @id @default(cuid())
  themeId   String
  theme     Theme    @relation(fields: [themeId], references: [id], onDelete: Cascade)
  
  key       String   // "colors.primary", "typography.fontFamily"
  value     String   // "#2563eb", "Inter"
  version   Int      @default(1)
  
  createdAt DateTime @default(now())
  
  @@index([themeId])
  @@index([key])
}
```

---

## 🎨 STRUCTURE DU CONFIG (JSON)

```typescript
interface ThemeConfig {
  colors: {
    // Brand Colors
    primary: string;
    primaryHover: string;
    primaryLight: string;
    primaryDark: string;
    
    secondary: string;
    secondaryHover: string;
    
    accent: string;
    accentHover: string;
    
    // Background Colors
    background: string;
    backgroundAlt: string;
    backgroundCard: string;
    backgroundHover: string;
    
    // Text Colors
    text: string;
    textSecondary: string;
    textMuted: string;
    textInverse: string;
    
    // Border Colors
    border: string;
    borderLight: string;
    borderDark: string;
    
    // Status Colors
    success: string;
    successLight: string;
    danger: string;
    dangerLight: string;
    warning: string;
    warningLight: string;
    info: string;
    infoLight: string;
    
    // Overlay
    overlay: string;
  };
  
  typography: {
    // Font Families
    fontFamilyBase: string;
    fontFamilyHeading: string;
    fontFamilyMono: string;
    
    // Base Settings
    baseFontSize: number; // 16
    baseLineHeight: number; // 1.5
    
    // Font Sizes
    fontSize: {
      xs: string;   // 0.75rem
      sm: string;   // 0.875rem
      base: string; // 1rem
      lg: string;   // 1.125rem
      xl: string;   // 1.25rem
      '2xl': string; // 1.5rem
      '3xl': string; // 1.875rem
      '4xl': string; // 2.25rem
      '5xl': string; // 3rem
    };
    
    // Font Weights
    fontWeight: {
      light: number;    // 300
      normal: number;   // 400
      medium: number;   // 500
      semibold: number; // 600
      bold: number;     // 700
      extrabold: number; // 800
    };
    
    // Line Heights
    lineHeight: {
      tight: number;  // 1.25
      normal: number; // 1.5
      relaxed: number; // 1.75
      loose: number;  // 2
    };
    
    // Letter Spacing
    letterSpacing: {
      tight: string;  // -0.025em
      normal: string; // 0
      wide: string;   // 0.025em
    };
  };
  
  spacing: {
    xs: string;   // 0.25rem
    sm: string;   // 0.5rem
    md: string;   // 1rem
    lg: string;   // 1.5rem
    xl: string;   // 2rem
    '2xl': string; // 3rem
    '3xl': string; // 4rem
  };
  
  radius: {
    none: string;  // 0
    sm: string;    // 0.25rem
    md: string;    // 0.5rem
    lg: string;    // 1rem
    xl: string;    // 1.5rem
    '2xl': string; // 2rem
    full: string;  // 9999px
  };
  
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    none: string;
  };
  
  components: {
    button: {
      paddingX: string;
      paddingY: string;
      fontSize: string;
      fontWeight: number;
      borderRadius: string;
    };
    
    card: {
      padding: string;
      borderRadius: string;
      shadow: string;
      borderWidth: string;
    };
    
    input: {
      paddingX: string;
      paddingY: string;
      fontSize: string;
      borderRadius: string;
      borderWidth: string;
    };
    
    navbar: {
      height: string;
      background: string;
      shadow: string;
    };
  };
}
```

---

## 🔌 API ENDPOINTS

### Base: `/api/admin/themes`

#### 1. GET /api/admin/themes
**Description**: Liste tous les thèmes

**Response**:
```json
{
  "themes": [
    {
      "id": "theme-123",
      "name": "Default Light",
      "slug": "default-light",
      "isDefault": true,
      "isActive": true,
      "preview": "/themes/default-light.png",
      "updatedAt": "2025-11-23T10:00:00Z"
    }
  ],
  "stats": {
    "total": 3,
    "active": 2,
    "defaultTheme": "Default Light"
  }
}
```

#### 2. GET /api/admin/themes/:id
**Description**: Détails d'un thème avec config complète

**Response**:
```json
{
  "theme": {
    "id": "theme-123",
    "name": "Default Light",
    "slug": "default-light",
    "config": {
      "colors": { ... },
      "typography": { ... },
      ...
    }
  }
}
```

#### 3. POST /api/admin/themes
**Description**: Créer un nouveau thème

**Body**:
```json
{
  "name": "My Custom Theme",
  "slug": "my-custom-theme",
  "description": "A beautiful custom theme",
  "config": { ... }
}
```

#### 4. PUT /api/admin/themes/:id
**Description**: Mettre à jour un thème

**Body**:
```json
{
  "name": "Updated Theme Name",
  "config": {
    "colors": {
      "primary": "#3b82f6"
    }
  }
}
```

#### 5. POST /api/admin/themes/set-default
**Description**: Définir un thème comme défaut

**Body**:
```json
{
  "themeId": "theme-456"
}
```

#### 6. POST /api/admin/themes/duplicate
**Description**: Dupliquer un thème

**Body**:
```json
{
  "themeId": "theme-123",
  "newName": "My Copy"
}
```

#### 7. DELETE /api/admin/themes/:id
**Description**: Supprimer un thème (interdit si default)

---

### Base: `/api/theme`

#### 1. GET /api/theme/current
**Description**: Récupérer le thème actif (pour le front)

**Response**:
```json
{
  "theme": {
    "name": "Default Light",
    "config": { ... }
  }
}
```

---

## 🎨 UI ADMIN - PAGE COLORS & STYLES

### Layout: `/[locale]/admin/settings/colors-styles/page.tsx`

#### Section 1: Thèmes Disponibles
```
┌─────────────────────────────────────────────────────────────┐
│  Thèmes                                      [+ Nouveau]    │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Default Light│  │  Dark Blue   │  │  My Custom   │      │
│  │ [Preview]    │  │ [Preview]    │  │ [Preview]    │      │
│  │              │  │              │  │              │      │
│  │ ⭐ Défaut    │  │              │  │              │      │
│  │ [Edit] [Dup] │  │ [Edit] [Set] │  │ [Edit] [Del] │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

#### Section 2: Éditeur de Thème (Tabs)
```
┌─────────────────────────────────────────────────────────────┐
│  Édition: Default Light                                     │
├─────────────────────────────────────────────────────────────┤
│  [Colors] [Typography] [Spacing] [Components] [Preview]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TAB COLORS:                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Brand Colors                                        │   │
│  │ Primary:      [#2563eb] [🎨]                        │   │
│  │ Primary Hover:[#1d4ed8] [🎨]                        │   │
│  │ Secondary:    [#4b5563] [🎨]                        │   │
│  │                                                     │   │
│  │ Background Colors                                   │   │
│  │ Background:   [#ffffff] [🎨]                        │   │
│  │ Background Alt:[#f9fafb] [🎨]                       │   │
│  │                                                     │   │
│  │ Text Colors                                         │   │
│  │ Text:         [#111827] [🎨]                        │   │
│  │ Text Muted:   [#6b7280] [🎨]                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Annuler] [Enregistrer]                                    │
└─────────────────────────────────────────────────────────────┘
```

#### Tab Typography
```
┌─────────────────────────────────────────────────────────────┐
│  Font Families                                              │
│  Base:    [Inter, system-ui, sans-serif ▼]                 │
│  Heading: [Inter, system-ui, sans-serif ▼]                 │
│  Mono:    [Fira Code, monospace ▼]                         │
│                                                             │
│  Font Sizes                                                 │
│  Base: [16px]  Line Height: [1.5]                          │
│                                                             │
│  Headings Scale                                             │
│  H1: [2.25rem]  H2: [1.875rem]  H3: [1.5rem]               │
└─────────────────────────────────────────────────────────────┘
```

#### Tab Preview
```
┌─────────────────────────────────────────────────────────────┐
│  Prévisualisation                                           │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────┐ │
│  │ [Mini page de démo avec le thème appliqué]           │ │
│  │                                                       │ │
│  │ Heading 1                                             │ │
│  │ Heading 2                                             │ │
│  │ Paragraph text with primary color links              │ │
│  │                                                       │ │
│  │ [Primary Button] [Secondary Button]                  │ │
│  │                                                       │ │
│  │ ┌─────────────────┐                                  │ │
│  │ │ Card Component  │                                  │ │
│  │ │ With shadow     │                                  │ │
│  │ └─────────────────┘                                  │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 APPLICATION CÔTÉ FRONT

### 1. Middleware/Hook `useTheme`

```typescript
// hooks/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState<ThemeConfig | null>(null);
  
  useEffect(() => {
    // Fetch current theme
    fetch('/api/theme/current')
      .then(res => res.json())
      .then(data => {
        setTheme(data.theme.config);
        applyThemeToDOM(data.theme.config);
      });
  }, []);
  
  return theme;
}

function applyThemeToDOM(config: ThemeConfig) {
  const root = document.documentElement;
  
  // Apply colors
  Object.entries(config.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  
  // Apply typography
  root.style.setProperty('--font-base', config.typography.fontFamilyBase);
  root.style.setProperty('--font-heading', config.typography.fontFamilyHeading);
  
  // Apply spacing, radius, shadows...
}
```

### 2. CSS Variables (globals.css)

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-background: #ffffff;
  --color-text: #111827;
  
  /* Typography */
  --font-base: Inter, system-ui, sans-serif;
  --font-heading: Inter, system-ui, sans-serif;
  --font-size-base: 16px;
  
  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  
  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  
  /* Shadows */
  --shadow-card: 0 10px 30px rgba(15,23,42,0.08);
}

/* Dark theme override */
[data-theme="dark"] {
  --color-background: #111827;
  --color-text: #f9fafb;
}
```

### 3. Utilisation dans les composants

```tsx
// components/Button.tsx
export function Button({ children, variant = 'primary' }) {
  return (
    <button className={`
      px-4 py-2
      bg-[var(--color-primary)]
      hover:bg-[var(--color-primary-hover)]
      text-white
      rounded-[var(--radius-md)]
      font-[var(--font-base)]
    `}>
      {children}
    </button>
  );
}
```

---

## 📱 COMPOSANTS RÉUTILISABLES

### ColorPicker
```tsx
<ColorPicker
  label="Primary Color"
  value={colors.primary}
  onChange={(color) => updateColor('primary', color)}
/>
```

### FontSelector
```tsx
<FontSelector
  label="Base Font"
  value={typography.fontFamilyBase}
  onChange={(font) => updateFont('base', font)}
  options={['Inter', 'Roboto', 'Open Sans', 'Lato']}
/>
```

### ThemePreview
```tsx
<ThemePreview
  config={themeConfig}
  width="100%"
  height="600px"
/>
```

---

## 🚀 IMPLÉMENTATION - ORDRE

1. ✅ **Modèle Theme** dans schema.prisma
2. ✅ **Migration** Prisma
3. ✅ **API Themes** (CRUD complet)
4. ✅ **API Theme Current** (pour le front)
5. ✅ **Seed** thème par défaut
6. ✅ **Page Colors & Styles** (admin)
7. ✅ **Hook useTheme** (front)
8. ✅ **CSS Variables** (globals.css)
9. ✅ **Tests** complets

---

## 📊 THÈME PAR DÉFAUT (SEED)

```typescript
const defaultTheme = {
  name: 'Default Light',
  slug: 'default-light',
  isDefault: true,
  config: {
    colors: {
      primary: '#2563eb',
      primaryHover: '#1d4ed8',
      secondary: '#4b5563',
      accent: '#f97316',
      background: '#ffffff',
      backgroundAlt: '#f9fafb',
      text: '#111827',
      textMuted: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#0ea5e9',
    },
    typography: {
      fontFamilyBase: 'Inter, system-ui, sans-serif',
      fontFamilyHeading: 'Inter, system-ui, sans-serif',
      baseFontSize: 16,
      baseLineHeight: 1.5,
    },
    radius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
    },
    shadows: {
      card: '0 10px 30px rgba(15,23,42,0.08)',
    },
  },
};
```

---

## ✅ CHECKLIST

- [ ] Modèle Theme créé
- [ ] Migration appliquée
- [ ] API Themes CRUD
- [ ] API Theme Current
- [ ] Page Colors & Styles
- [ ] Hook useTheme
- [ ] CSS Variables
- [ ] Seed thème par défaut
- [ ] Tests
- [ ] Documentation

---

**🎯 OBJECTIF FINAL**: Système complet de thèmes avec modification en temps réel depuis l'admin!
