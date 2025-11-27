# 📚 CMS System - Guide Complet

## Vue d'ensemble

Système complet de gestion de contenu (CMS) pour administrer le **Header**, la **Navbar** et le **Footer** de votre site web JustRichard.

## 🎯 Fonctionnalités

### ✅ Gestion Header
- Configuration du logo (image + texte)
- Titre et description personnalisables
- Bouton CTA (Call-to-Action) personnalisable
- Personnalisation des couleurs (fond, texte, CTA)
- Options sticky et barre de recherche
- Multi-langue (EN, FR, AR)

### ✅ Gestion Navbar
- Gestion des liens de navigation
- Actions personnalisables (Login, Sign Up, etc.)
- Ordre configurable par drag & drop
- Activation/désactivation individuelle
- Support des badges ("New", "Hot", etc.)

### ✅ Gestion Footer
- **7 sections pré-configurées** :
  - Company
  - Professional Services
  - Lifestyle & Travel
  - Home Services
  - Handyman Services
  - Support
  - Connect
- Gestion des liens par section
- Activation/désactivation par section ou lien
- Badge sur les liens
- Liens externes avec option "New Tab"
- Branding (nom, tagline, newsletter)
- Contact et informations légales

### ✅ Gestion Social Links
- Facebook, Twitter, Instagram, LinkedIn, etc.
- Ordre personnalisable
- Icônes configurables

## 📦 Installation

### 1. Appliquer la migration Prisma

```bash
npx prisma migrate dev --name add_cms_header_footer_system
```

### 2. Générer le client Prisma

```bash
npx prisma generate
```

### 3. Seed des données initiales

```bash
npx ts-node scripts/seed-cms-footer.ts
```

## 🚀 Utilisation

### Accès à l'interface Admin

```
/admin/cms
```

Cette page affiche les 5 modules du CMS :
- Header Configuration
- Navbar Management
- Footer Sections
- Social Links
- Footer Branding

### Structure des URLs Admin

```
/admin/cms                           → Dashboard CMS
/admin/cms/header                    → Configuration Header
/admin/cms/navbar                    → Gestion Navbar
/admin/cms/footer                    → Gestion Footer Sections
/admin/cms/footer/sections/new       → Créer nouvelle section
/admin/cms/footer/sections/[id]      → Éditer section
/admin/cms/footer/branding           → Branding Footer
/admin/cms/social                    → Liens sociaux
```

## 📋 Guide d'utilisation

### Gestion du Footer

#### 1. Créer une nouvelle section

1. Aller sur `/admin/cms/footer`
2. Cliquer sur "Add Section"
3. Remplir les informations :
   - **Langue** : EN, FR ou AR
   - **Titre** : Ex: "Company", "Professional Services"
   - **Slug** : URL-friendly (auto-généré)
   - **Order** : Ordre d'affichage (0, 1, 2...)
   - **Icon** : Nom d'icône Lucide (optionnel)
   - **Display On** : All Pages, Home Only, ou Specific
4. Ajouter des liens :
   - Label du lien
   - URL/Chemin
   - Badge (optionnel)
   - Active/Inactive
   - External/Internal
   - Open in New Tab
5. Cliquer "Save Section"

#### 2. Éditer une section existante

1. Sur la page `/admin/cms/footer`
2. Cliquer sur "Edit" sur la section
3. Modifier les informations
4. Réorganiser les liens par drag & drop (▲▼)
5. Sauvegarder

#### 3. Activer/Désactiver

- **Toggle section** : Cliquer sur l'icône œil sur la card de section
- **Toggle lien** : Cliquer sur l'icône œil sur chaque ligne de lien

#### 4. Supprimer

- **Section** : Cliquer sur l'icône poubelle (supprime aussi tous les liens)
- **Lien** : Cliquer sur l'icône poubelle sur la ligne du lien

### Gestion du Header

1. Aller sur `/admin/cms/header`
2. Sélectionner la langue (EN, FR, AR)
3. Configurer :
   - **Branding** : Logo URL, texte, alt text, titre, description
   - **CTA Button** : Texte, URL, couleur
   - **Styling** : Couleurs fond et texte
   - **Settings** : Sticky, search bar, active
4. Cliquer "Save Changes"

### Gestion des Social Links

1. Aller sur `/admin/cms/social`
2. Ajouter un lien social :
   - Platform (facebook, twitter, instagram, etc.)
   - URL
   - Icône (optionnel)
   - Order
3. Toggle active/inactive
4. Supprimer si nécessaire

## 🗄️ Structure de données

### Models Prisma

```prisma
HeaderConfig       → Configuration header par langue
NavbarAction       → Actions navbar (Login, Sign Up)
FooterSection      → Sections footer (Company, Services, etc.)
FooterLink         → Liens individuels dans chaque section
SocialLink         → Liens sociaux (Facebook, Twitter, etc.)
FooterBranding     → Branding, newsletter, contact, legal
```

## 🔌 API Endpoints

### Header
```
GET    /api/admin/cms/header?locale=en
POST   /api/admin/cms/header
```

### Navbar Actions
```
GET    /api/admin/cms/navbar/actions?locale=en
POST   /api/admin/cms/navbar/actions
PUT    /api/admin/cms/navbar/actions/[id]
DELETE /api/admin/cms/navbar/actions/[id]
```

### Footer Sections
```
GET    /api/admin/cms/footer/sections?locale=en
POST   /api/admin/cms/footer/sections
GET    /api/admin/cms/footer/sections/[id]
PUT    /api/admin/cms/footer/sections/[id]
DELETE /api/admin/cms/footer/sections/[id]
```

### Footer Links
```
GET    /api/admin/cms/footer/links?sectionId=xxx
POST   /api/admin/cms/footer/links
PUT    /api/admin/cms/footer/links/[id]
DELETE /api/admin/cms/footer/links/[id]
```

### Footer Branding
```
GET    /api/admin/cms/footer/branding?locale=en
POST   /api/admin/cms/footer/branding
```

### Social Links
```
GET    /api/admin/cms/social?locale=en
POST   /api/admin/cms/social
PUT    /api/admin/cms/social/[id]
DELETE /api/admin/cms/social/[id]
```

## 🎨 Personnalisation

### Couleurs personnalisées

Le système utilise un color picker pour personnaliser :
- Header background color
- Header text color
- CTA button color

### Icônes

Les icônes utilisent **Lucide Icons**. Exemples :
- `Home`
- `User`
- `Settings`
- `Phone`
- `Mail`

## 🌍 Multi-langue

Le système supporte 3 langues par défaut :
- **EN** - English
- **FR** - Français  
- **AR** - العربية (RTL support)

Pour chaque langue, vous pouvez configurer :
- Header distinct
- Navbar actions distinctes
- Footer sections distinctes
- Social links distincts
- Branding distinct

## 📊 Fonctionnalités avancées

### Conditional Display

Chaque section peut être configurée pour s'afficher :
- **All Pages** : Sur toutes les pages
- **Home Only** : Uniquement sur la page d'accueil
- **Specific Pages** : Pages spécifiques (via hideOnPages JSON)

### Badges sur les liens

Ajoutez des badges pour mettre en avant certains liens :
- "New"
- "Hot"
- "Popular"
- "Beta"

### Drag & Drop

Réorganisez facilement les liens dans chaque section avec les flèches ▲▼ ou GripVertical.

## 🔒 Sécurité

- Toutes les routes API sont protégées par authentification
- Vérification de session via NextAuth
- Validation des données côté serveur

## 🐛 Troubleshooting

### Les changements ne s'affichent pas

1. Vérifier que `isActive = true`
2. Vider le cache du navigateur
3. Vérifier la langue sélectionnée
4. Recharger la page

### Erreur lors de la sauvegarde

1. Vérifier la connexion à la base de données
2. Vérifier que la migration Prisma est appliquée
3. Vérifier les logs serveur

### Liens externes ne fonctionnent pas

1. Vérifier que `isExternal = true`
2. Vérifier que l'URL commence par `http://` ou `https://`
3. Activer `openNewTab` pour ouvrir dans un nouvel onglet

## 📝 Exemples de configuration

### Section "Company" complète

```typescript
{
  title: "Company",
  slug: "company",
  order: 0,
  isActive: true,
  displayOn: "all",
  links: [
    { label: "About Us", href: "/en/about", order: 0, isActive: true },
    { label: "Careers", href: "/en/careers", order: 1, isActive: true, badge: "Hot" },
    { label: "Press", href: "/en/press", order: 2, isActive: true },
    { label: "Blog", href: "/en/blog", order: 3, isActive: true },
    { label: "Partners", href: "/en/partners", order: 4, isActive: true },
  ]
}
```

### Header Configuration

```typescript
{
  locale: "en",
  logoUrl: "/images/logo.png",
  logoText: "JustRichard",
  title: "Your Trusted Service Platform",
  ctaText: "Get Started",
  ctaUrl: "/signup",
  ctaColor: "#3B82F6",
  isSticky: true,
  showSearch: false,
  bgColor: "#FFFFFF",
  textColor: "#1F2937",
  isActive: true
}
```

## 🎯 Roadmap

- [ ] Import/Export JSON configuration
- [ ] Templates pré-configurés (E-commerce, Services, etc.)
- [ ] Preview en temps réel
- [ ] A/B Testing
- [ ] Analytics des clics sur les liens
- [ ] Bulk operations (activate/deactivate multiple)
- [ ] Version history & rollback
- [ ] Media library pour logos

## 📞 Support

Pour toute question ou problème :
1. Vérifier cette documentation
2. Consulter les logs serveur
3. Contacter l'équipe de développement

---

**Dernière mise à jour** : 27 Novembre 2024
**Version** : 1.0.0
