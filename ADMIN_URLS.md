# 🔗 URLs et Accès Rapides - Admin Panel

## 🌐 URLs Principales

### Application
```
Base URL: http://localhost:3100
```

### Authentification
```
Login:  http://localhost:3100/en/auth/login
Logout: Action depuis le sidebar
```

---

## 📍 Navigation Admin

### Dashboard et Gestion

| Page | URL | Description |
|------|-----|-------------|
| **Dashboard** | `/en/admin` | Vue d'ensemble avec statistiques |
| **Users** | `/en/admin/users` | Gestion des utilisateurs |
| **Services** | `/en/admin/services` | Gestion des services |
| **Bookings** | `/en/admin/bookings` | Gestion des réservations |
| **Categories** | `/en/admin/categories` | Catégories de services |
| **Partners** | `/en/admin/partners` | Gestion des partenaires |
| **Blog** | `/en/admin/blog` | Articles de blog |
| **Analytics** | `/en/admin/analytics` | Statistiques avancées |
| **Logs** | `/en/admin/logs` | Journaux système |

---

## ⚙️ Settings (Paramètres)

| Page | URL | Description |
|------|-----|-------------|
| **Currencies** | `/en/admin/currencies` | Gestion des devises |
| **Geography** | `/en/admin/geography` | Pays, régions et villes |
| **Exchange Rates** | `/en/admin/exchange-rates` | Taux de change |

---

## 🔧 Outils de Développement

### Base de Données
```bash
# Prisma Studio (GUI pour la DB)
npm run db:studio
# Ouvre: http://localhost:5555
```

### API Documentation
```
Swagger UI: http://localhost:3100/api-docs
(si configuré)
```

---

## 📊 URLs Complètes par Langue

### Anglais (EN)
```
http://localhost:3100/en/admin
http://localhost:3100/en/admin/users
http://localhost:3100/en/admin/services
http://localhost:3100/en/admin/bookings
http://localhost:3100/en/admin/categories
http://localhost:3100/en/admin/partners
http://localhost:3100/en/admin/blog
http://localhost:3100/en/admin/analytics
http://localhost:3100/en/admin/logs
http://localhost:3100/en/admin/currencies
http://localhost:3100/en/admin/geography
```

### Français (FR)
```
http://localhost:3100/fr/admin
http://localhost:3100/fr/admin/users
http://localhost:3100/fr/admin/services
http://localhost:3100/fr/admin/bookings
http://localhost:3100/fr/admin/categories
http://localhost:3100/fr/admin/partners
http://localhost:3100/fr/admin/blog
http://localhost:3100/fr/admin/analytics
http://localhost:3100/fr/admin/logs
http://localhost:3100/fr/admin/currencies
http://localhost:3100/fr/admin/geography
```

### Arabe (AR)
```
http://localhost:3100/ar/admin
http://localhost:3100/ar/admin/users
http://localhost:3100/ar/admin/services
http://localhost:3100/ar/admin/bookings
http://localhost:3100/ar/admin/categories
http://localhost:3100/ar/admin/partners
http://localhost:3100/ar/admin/blog
http://localhost:3100/ar/admin/analytics
http://localhost:3100/ar/admin/logs
http://localhost:3100/ar/admin/currencies
http://localhost:3100/ar/admin/geography
```

---

## 🎯 Accès Rapides

### Depuis le Terminal

#### Démarrer le serveur
```bash
cd /Users/richard/preprod/justrichard
npm run dev
```

#### Ouvrir dans le navigateur
```bash
# macOS
open http://localhost:3100/en/admin

# Linux
xdg-open http://localhost:3100/en/admin

# Windows
start http://localhost:3100/en/admin
```

#### Logs en temps réel
```bash
# Voir les logs du serveur
tail -f .next/server.log

# Ou directement dans le terminal où npm run dev tourne
```

---

## 🔐 Endpoints API (Backend)

### Currencies
```
GET    /api/admin/currencies           - Liste des devises
POST   /api/admin/currencies           - Créer une devise
GET    /api/admin/currencies/[id]      - Détails d'une devise
PUT    /api/admin/currencies/[id]      - Modifier une devise
DELETE /api/admin/currencies/[id]      - Supprimer une devise
POST   /api/admin/exchange-rates/update - Mettre à jour les taux
```

### Geography
```
GET /api/geography/countries           - Liste des pays
GET /api/geography/countries?includeRegions=true - Avec régions
GET /api/geography/regions             - Liste des régions
GET /api/geography/cities              - Liste des villes
```

### Bookings
```
GET    /api/admin/bookings             - Liste des réservations
GET    /api/admin/bookings/[id]        - Détails d'une réservation
PUT    /api/admin/bookings/[id]        - Modifier une réservation
DELETE /api/admin/bookings/[id]        - Supprimer une réservation
GET    /api/admin/bookings/stats       - Statistiques
```

---

## 📱 URLs Mobile (Responsive)

Toutes les URLs fonctionnent sur mobile avec adaptation automatique:
- Sidebar en overlay
- Tableaux scrollables
- Modals en plein écran
- Touch-friendly

---

## 🌍 Langues Supportées

| Code | Langue | URL Prefix |
|------|--------|------------|
| `en` | English | `/en/` |
| `fr` | Français | `/fr/` |
| `ar` | العربية | `/ar/` |

---

## 🔄 Redirections

### Auto-redirect
```
/ → /en (ou langue du navigateur)
/admin → /en/admin
```

### Après Login
```
/auth/login → /[locale]/admin (si ADMIN/MANAGER)
/auth/login → /[locale]/ (si USER)
```

### Après Logout
```
/admin/* → /[locale]/auth/login
```

---

## 🎨 Preview Links

### Pour partager avec l'équipe
```
Dashboard:    http://localhost:3100/en/admin
Currencies:   http://localhost:3100/en/admin/currencies
Geography:    http://localhost:3100/en/admin/geography
```

---

## 🚀 Production URLs (À configurer)

### Exemple de structure production
```
https://admin.justrichard.com/en/admin
https://admin.justrichard.com/fr/admin
https://admin.justrichard.com/ar/admin
```

### Variables d'environnement
```env
NEXT_PUBLIC_APP_URL=https://admin.justrichard.com
NEXT_PUBLIC_API_URL=https://api.justrichard.com
```

---

## 📖 Documentation URLs

| Document | Chemin |
|----------|--------|
| Documentation Technique | `/ADMIN_PANEL_DOCUMENTATION.md` |
| Guide Démarrage | `/ADMIN_QUICK_START.md` |
| Structure | `/ADMIN_STRUCTURE.md` |
| URLs (ce fichier) | `/ADMIN_URLS.md` |

---

## 🔗 Liens Utiles

### Développement
```
Next.js Docs:     https://nextjs.org/docs
Prisma Docs:      https://www.prisma.io/docs
TailwindCSS:      https://tailwindcss.com/docs
Lucide Icons:     https://lucide.dev
```

### Outils
```
Prisma Studio:    http://localhost:5555
Next.js DevTools: Extension navigateur
React DevTools:   Extension navigateur
```

---

## 📝 Notes

### Ports utilisés
- **3100**: Application Next.js
- **5555**: Prisma Studio (si lancé)
- **5432**: PostgreSQL (par défaut)

### Accès requis
- Rôle: **ADMIN** ou **MANAGER**
- Session NextAuth valide
- Base de données accessible

---

**Dernière mise à jour**: 22 novembre 2024  
**Version**: 1.0.0
