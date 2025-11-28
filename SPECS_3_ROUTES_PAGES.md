# 📋 SPÉCIFICATIONS COMPLÈTES - ROUTES & PAGES

**Module**: Gestion de la Navigation et des Routes  
**Date**: 23 Novembre 2025  
**Objectif**: Système centralisé pour gérer la navigation du front

---

## 🎯 OBJECTIFS

1. **Configuration centralisée** de toutes les routes du site
2. **Menus dynamiques** (header, footer, sidebar)
3. **Multi-langues** (EN, FR, AR)
4. **Drag & drop** pour réordonner
5. **Groupes/Catégories** de routes
6. **Visibilité** conditionnelle
7. **Icons** et métadonnées

---

## 📊 MODÈLES PRISMA

### 1. RouteConfig

```prisma
model RouteConfig {
  id          String   @id @default(cuid())
  key         String   @unique // "properties", "yachts", "about"
  path        String   // "/properties", "/yachts", "/about"
  
  // Multi-langue
  title       Json     // { en: "Properties", fr: "Propriétés", ar: "العقارات" }
  description Json?    // { en: "...", fr: "...", ar: "..." }
  
  // Navigation
  menu        String   @default("none") // "main", "footer", "sidebar", "none"
  group       String?  // "services", "legal", "company"
  order       Int      @default(0)
  
  // Visibilité
  isVisible   Boolean  @default(true)
  isSystem    Boolean  @default(false) // Routes système (non supprimables)
  
  // Métadonnées
  icon        String?  // "home", "building", "ship"
  badge       String?  // "New", "Popular"
  
  // Permissions
  requireAuth Boolean  @default(false)
  roles       Json?    // ["USER", "ADMIN"]
  
  // SEO
  metaTitle   Json?
  metaDesc    Json?
  
  // Sous-routes
  parentId    String?
  parent      RouteConfig?  @relation("RouteHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children    RouteConfig[] @relation("RouteHierarchy")
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([key])
  @@index([menu])
  @@index([group])
  @@index([order])
  @@index([isVisible])
  @@index([parentId])
}
```

### 2. MenuConfig (Optionnel - pour menus personnalisés)

```prisma
model MenuConfig {
  id          String   @id @default(cuid())
  key         String   @unique // "main-nav", "footer-nav", "services-menu"
  name        Json     // { en: "Main Navigation", fr: "Navigation Principale" }
  position    String   // "header", "footer", "sidebar"
  
  items       Json     // Array of route keys in order
  
  isActive    Boolean  @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([key])
  @@index([position])
}
```

---

## 🔌 API ENDPOINTS

### Base: `/api/admin/routes`

#### 1. GET /api/admin/routes
**Description**: Liste toutes les routes

**Query params**:
- `menu` (string, optionnel) - `main` | `footer` | `sidebar` | `all`
- `group` (string, optionnel) - Filtrer par groupe
- `search` (string, optionnel) - Recherche par titre

**Response**:
```json
{
  "routes": [
    {
      "id": "route-123",
      "key": "properties",
      "path": "/properties",
      "title": {
        "en": "Properties",
        "fr": "Propriétés",
        "ar": "العقارات"
      },
      "menu": "main",
      "group": "services",
      "order": 1,
      "isVisible": true,
      "icon": "building",
      "children": []
    }
  ],
  "stats": {
    "total": 25,
    "main": 8,
    "footer": 12,
    "hidden": 5
  }
}
```

#### 2. GET /api/admin/routes/:id
**Description**: Détails d'une route

**Response**:
```json
{
  "route": {
    "id": "route-123",
    "key": "properties",
    "path": "/properties",
    "title": { "en": "Properties", "fr": "Propriétés" },
    "description": { "en": "Find your dream property" },
    "menu": "main",
    "group": "services",
    "order": 1,
    "isVisible": true,
    "isSystem": false,
    "icon": "building",
    "badge": "Popular",
    "requireAuth": false,
    "children": [
      {
        "id": "route-124",
        "key": "properties-for-sale",
        "path": "/properties/for-sale",
        "title": { "en": "For Sale" }
      }
    ]
  }
}
```

#### 3. POST /api/admin/routes
**Description**: Créer une nouvelle route

**Body**:
```json
{
  "key": "new-service",
  "path": "/new-service",
  "title": {
    "en": "New Service",
    "fr": "Nouveau Service"
  },
  "menu": "main",
  "group": "services",
  "icon": "star",
  "isVisible": true
}
```

**Règles**:
- `key` doit être unique
- `path` doit commencer par `/`
- `title` doit avoir au moins `en`

#### 4. PUT /api/admin/routes/:id
**Description**: Mettre à jour une route

**Body**:
```json
{
  "title": {
    "en": "Updated Title",
    "fr": "Titre Mis à Jour"
  },
  "menu": "footer",
  "order": 5,
  "isVisible": false
}
```

**Règles**:
- Ne peut pas modifier `key` si `isSystem = true`
- Ne peut pas supprimer si `isSystem = true`

#### 5. POST /api/admin/routes/reorder
**Description**: Réordonner les routes (drag & drop)

**Body**:
```json
{
  "menu": "main",
  "routes": [
    { "id": "route-123", "order": 0 },
    { "id": "route-124", "order": 1 },
    { "id": "route-125", "order": 2 }
  ]
}
```

#### 6. DELETE /api/admin/routes/:id
**Description**: Supprimer une route

**Règles**:
- Interdit si `isSystem = true`
- Supprime en cascade les sous-routes

---

### Base: `/api/routes`

#### 1. GET /api/routes/menu/:position
**Description**: Récupérer un menu pour le front

**Params**:
- `position` - `main` | `footer` | `sidebar`

**Query**:
- `locale` - `en` | `fr` | `ar`

**Response**:
```json
{
  "menu": [
    {
      "key": "properties",
      "path": "/properties",
      "title": "Properties",
      "icon": "building",
      "badge": "Popular",
      "children": [
        {
          "key": "properties-for-sale",
          "path": "/properties/for-sale",
          "title": "For Sale"
        }
      ]
    }
  ]
}
```

---

## 🎨 UI ADMIN - PAGE ROUTES & PAGES

### Layout: `/[locale]/admin/settings/routes-pages/page.tsx`

#### Section Tabs
```
┌─────────────────────────────────────────────────────────────┐
│  [Main Navigation] [Footer Navigation] [Sidebar] [Hidden]  │
└─────────────────────────────────────────────────────────────┘
```

#### Tab: Main Navigation
```
┌─────────────────────────────────────────────────────────────┐
│  Main Navigation                           [+ Ajouter]      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ☰ Properties (building)                    [Edit]  │   │
│  │   Path: /properties                        [Del]   │   │
│  │   Group: Services                          [👁]    │   │
│  │                                                     │   │
│  │ ☰ Yachts (ship)                            [Edit]  │   │
│  │   Path: /yachts                            [Del]   │   │
│  │   Group: Services                          [👁]    │   │
│  │                                                     │   │
│  │ ☰ About (info)                             [Edit]  │   │
│  │   Path: /about                             [Del]   │   │
│  │   Group: Company                           [👁]    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

#### Modal: Edit Route
```
┌─────────────────────────────────────────────────────────────┐
│  Modifier la Route: Properties                        [X]   │
├─────────────────────────────────────────────────────────────┤
│  Informations de Base                                       │
│  Key:         [properties] (read-only si system)            │
│  Path:        [/properties]                                 │
│                                                             │
│  Titres (Multi-langue)                                      │
│  English:     [Properties]                                  │
│  Français:    [Propriétés]                                  │
│  العربية:      [العقارات]                                   │
│                                                             │
│  Navigation                                                 │
│  Menu:        [Main Navigation ▼]                           │
│  Groupe:      [Services ▼]                                  │
│  Ordre:       [1]                                           │
│                                                             │
│  Apparence                                                  │
│  Icon:        [building ▼]                                  │
│  Badge:       [Popular]                                     │
│                                                             │
│  Visibilité                                                 │
│  ☑ Visible                                                  │
│  ☐ Authentification requise                                 │
│                                                             │
│  [Annuler] [Enregistrer]                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 FONCTIONNALITÉS UI

### 1. Drag & Drop
- Réordonner les routes par glisser-déposer
- Sauvegarde automatique de l'ordre
- Feedback visuel pendant le drag

### 2. Groupes
- Créer des groupes personnalisés
- Assigner des routes à des groupes
- Affichage groupé dans les menus

### 3. Multi-langue
- Édition des titres dans toutes les langues
- Prévisualisation par langue
- Fallback sur EN si traduction manquante

### 4. Preview
- Prévisualisation du menu en temps réel
- Simulation mobile/desktop
- Test des liens

---

## 🔧 APPLICATION CÔTÉ FRONT

### 1. Hook `useNavigation`

```typescript
// hooks/useNavigation.ts
export function useNavigation(position: 'main' | 'footer' | 'sidebar') {
  const { locale } = useRouter();
  const [menu, setMenu] = useState([]);
  
  useEffect(() => {
    fetch(`/api/routes/menu/${position}?locale=${locale}`)
      .then(res => res.json())
      .then(data => setMenu(data.menu));
  }, [position, locale]);
  
  return menu;
}
```

### 2. Composant `Navigation`

```tsx
// components/Navigation.tsx
export function Navigation() {
  const menu = useNavigation('main');
  
  return (
    <nav>
      {menu.map(item => (
        <Link key={item.key} href={item.path}>
          {item.icon && <Icon name={item.icon} />}
          {item.title}
          {item.badge && <Badge>{item.badge}</Badge>}
        </Link>
      ))}
    </nav>
  );
}
```

### 3. Composant `Footer`

```tsx
// components/Footer.tsx
export function Footer() {
  const menu = useNavigation('footer');
  
  // Group by category
  const grouped = menu.reduce((acc, item) => {
    const group = item.group || 'other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
  
  return (
    <footer>
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group}>
          <h3>{group}</h3>
          <ul>
            {items.map(item => (
              <li key={item.key}>
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}
```

---

## 🚀 IMPLÉMENTATION - ORDRE

1. ✅ **Modèle RouteConfig** dans schema.prisma
2. ✅ **Migration** Prisma
3. ✅ **API Routes** (CRUD complet)
4. ✅ **API Menu** (pour le front)
5. ✅ **Seed** routes par défaut
6. ✅ **Page Routes & Pages** (admin)
7. ✅ **Hook useNavigation** (front)
8. ✅ **Composants Navigation/Footer** (front)
9. ✅ **Tests** complets

---

## 📊 ROUTES PAR DÉFAUT (SEED)

```typescript
const defaultRoutes = [
  // Main Navigation
  {
    key: 'home',
    path: '/',
    title: { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
    menu: 'main',
    order: 0,
    icon: 'home',
    isSystem: true,
  },
  {
    key: 'properties',
    path: '/properties',
    title: { en: 'Properties', fr: 'Propriétés', ar: 'العقارات' },
    menu: 'main',
    group: 'services',
    order: 1,
    icon: 'building',
    badge: 'Popular',
  },
  {
    key: 'yachts',
    path: '/yachts',
    title: { en: 'Yachts', fr: 'Yachts', ar: 'اليخوت' },
    menu: 'main',
    group: 'services',
    order: 2,
    icon: 'ship',
  },
  {
    key: 'rental-cars',
    path: '/rental-cars',
    title: { en: 'Car Rental', fr: 'Location de Voitures', ar: 'تأجير السيارات' },
    menu: 'main',
    group: 'services',
    order: 3,
    icon: 'car',
  },
  {
    key: 'activities',
    path: '/activities',
    title: { en: 'Activities', fr: 'Activités', ar: 'الأنشطة' },
    menu: 'main',
    group: 'services',
    order: 4,
    icon: 'activity',
  },
  
  // Footer Navigation
  {
    key: 'about',
    path: '/about',
    title: { en: 'About Us', fr: 'À Propos', ar: 'من نحن' },
    menu: 'footer',
    group: 'company',
    order: 0,
    icon: 'info',
  },
  {
    key: 'contact',
    path: '/contact',
    title: { en: 'Contact', fr: 'Contact', ar: 'اتصل بنا' },
    menu: 'footer',
    group: 'company',
    order: 1,
    icon: 'mail',
  },
  {
    key: 'privacy',
    path: '/privacy',
    title: { en: 'Privacy Policy', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية' },
    menu: 'footer',
    group: 'legal',
    order: 0,
    icon: 'shield',
  },
  {
    key: 'terms',
    path: '/terms',
    title: { en: 'Terms of Service', fr: 'Conditions d\'Utilisation', ar: 'شروط الخدمة' },
    menu: 'footer',
    group: 'legal',
    order: 1,
    icon: 'file-text',
  },
];
```

---

## ✅ CHECKLIST

- [ ] Modèle RouteConfig créé
- [ ] Migration appliquée
- [ ] API Routes CRUD
- [ ] API Menu (front)
- [ ] Seed routes par défaut
- [ ] Page Routes & Pages (admin)
- [ ] Hook useNavigation
- [ ] Composants Navigation/Footer
- [ ] Drag & drop
- [ ] Tests
- [ ] Documentation

---

## 💡 FONCTIONNALITÉS AVANCÉES (OPTIONNELLES)

### 1. Mega Menu
- Support des menus à plusieurs niveaux
- Affichage en colonnes
- Images/icons pour les catégories

### 2. Breadcrumbs
- Génération automatique du fil d'Ariane
- Basé sur la hiérarchie des routes

### 3. Sitemap
- Génération automatique du sitemap.xml
- Basé sur les routes visibles

### 4. Redirections
- Gestion des redirections 301/302
- Anciennes URLs → Nouvelles URLs

---

**🎯 OBJECTIF FINAL**: Système complet de navigation avec gestion centralisée et multi-langue!
