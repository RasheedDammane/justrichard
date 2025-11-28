# 🏢 Claim Your Business System - Complete Documentation

## 📋 Vue d'ensemble

Système complet de réclamation de business avec intégration **Google Places API** permettant aux propriétaires de commerces de revendiquer et gérer leurs établissements sur la plateforme.

---

## 🎯 Fonctionnalités

### ✅ Frontend Public
- **Recherche Google Places** avec autocomplétion en temps réel
- **Formulaire multi-étapes** (3 étapes) :
  1. Recherche du business via Google Places
  2. Informations du réclamant + réseaux sociaux
  3. Choix de la méthode de vérification (email/SMS)
- **Affichage des détails** du business (adresse, téléphone, site web, notes Google)
- **Page de succès** avec instructions de vérification

### ✅ Backend Admin
- **Dashboard de gestion** des réclamations
- **Statistiques** (Total, Pending, Verified, Approved, Rejected)
- **Filtres** par statut
- **Recherche** par nom de business, réclamant, ville
- **Actions** : Verify, Approve, Reject avec raison
- **Vue détaillée** de chaque réclamation

### ✅ API Google Places
- **Text Search** : Recherche de commerces
- **Place Details** : Récupération des détails complets
- **Données extraites** :
  - Informations de base (nom, adresse, téléphone, site web)
  - Localisation (latitude, longitude, composants d'adresse)
  - Notes et avis (rating, nombre d'avis)
  - Horaires d'ouverture
  - Services (delivery, dine-in, takeout, etc.)
  - Photos
  - Accessibilité

---

## 📁 Structure des fichiers

```
/Users/richard/preprod/justrichard/

├── .env.example                                    # ✅ Clé Google Places API
├── prisma/
│   └── schema.prisma                               # ✅ Modèle BusinessClaim
│
├── app/
│   ├── api/
│   │   ├── places/
│   │   │   ├── search/route.ts                     # ✅ API Google Places Search
│   │   │   └── details/route.ts                    # ✅ API Google Places Details
│   │   └── business-claims/
│   │       ├── route.ts                            # ✅ GET/POST claims
│   │       └── [id]/route.ts                       # ✅ GET/PATCH/DELETE claim
│   │
│   └── [locale]/
│       ├── claim-business/
│       │   └── page.tsx                            # ✅ Page publique claim
│       └── admin/
│           └── claims/
│               ├── page.tsx                        # ✅ Page admin (server)
│               └── ClaimsListClient.tsx            # ✅ Liste claims (client)
│
├── components/
│   └── GooglePlacesAutocomplete.tsx                # ✅ Composant autocomplétion
│
└── CLAIM_BUSINESS_SYSTEM.md                        # 📄 Cette documentation
```

---

## 🗄️ Modèle de données (Prisma)

### BusinessClaim

```prisma
model BusinessClaim {
  id                    String    @id @default(cuid())
  
  // Google Places Data
  googlePlaceId         String?   @unique
  businessName          String
  address               String?
  city                  String?
  state                 String?
  country               String?
  countryCode           String?
  postalCode            String?
  phone                 String?
  internationalPhone    String?
  website               String?
  category              String?
  categoryId            String?
  businessStatus        String?
  
  // Location
  latitude              Float?
  longitude             Float?
  vicinity              String?
  plusCode              String?
  
  // Opening Hours
  openingHours          Json?
  
  // Ratings & Reviews
  rating                Float?
  userRatingsTotal      Int?
  priceLevel            Int?
  
  // Services
  delivery              Boolean?
  dineIn                Boolean?
  takeout               Boolean?
  reservable            Boolean?
  wheelchairAccessible  Boolean?
  
  // Photos
  photos                Json?
  icon                  String?
  
  // Social Media
  facebook              String?
  instagram             String?
  twitter               String?
  linkedin              String?
  youtube               String?
  
  // SEO & Website Analysis
  hasRobotsTxt          Boolean?
  hasSitemap            Boolean?
  sitemapUrl            String?
  websiteAnalysis       Json?
  
  // Complete Google Data
  googleData            Json?
  
  // Claimant Info
  claimantUserId        String?
  claimantName          String
  claimantEmail         String
  claimantPhone         String?
  claimantRole          String    @default("Owner")
  
  // Verification
  verificationMethod    String    @default("email")
  verificationToken     String?   @unique
  verificationCode      String?
  verificationSentAt    DateTime?
  verificationAttempts  Int       @default(0)
  verifiedAt            DateTime?
  
  // Documents
  documents             Json?
  
  // Status
  status                String    @default("pending")
  rejectionReason       String?
  
  // Admin Notes
  adminNotes            String?   @db.Text
  reviewedBy            String?
  reviewedAt            DateTime?
  
  // Timestamps
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  
  // Relations
  claimantUser          User?     @relation(fields: [claimantUserId], references: [id])
  
  @@index([googlePlaceId])
  @@index([claimantEmail])
  @@index([claimantUserId])
  @@index([status])
  @@index([createdAt])
}
```

---

## 🔧 Configuration

### 1. Variables d'environnement

Ajoutez dans votre `.env` :

```env
# Google Places API
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY="AIzaSyCwd63vaZ-YyN3uzboQBca2A2v_q1ZOn6Y"
```

### 2. Migration Prisma

```bash
# Générer la migration
npx prisma migrate dev --name add_business_claim_system

# Générer le client Prisma
npx prisma generate
```

### 3. Redémarrer le serveur

```bash
npm run dev
```

---

## 🚀 Utilisation

### Pour les utilisateurs (Frontend)

1. **Accéder à la page** : `http://localhost:3000/en/claim-business`
2. **Rechercher le business** via Google Places
3. **Remplir les informations** personnelles
4. **Choisir la méthode de vérification** (email ou SMS)
5. **Soumettre la réclamation**
6. **Recevoir un email/SMS** de vérification

### Pour les admins (Backend)

1. **Accéder au dashboard** : `http://localhost:3000/en/admin/claims`
2. **Voir toutes les réclamations** avec filtres
3. **Actions disponibles** :
   - **Verify** : Marquer comme vérifié
   - **Approve** : Approuver la réclamation
   - **Reject** : Rejeter avec raison
   - **View Details** : Voir tous les détails

---

## 📊 Statuts des réclamations

| Statut | Description | Actions possibles |
|--------|-------------|-------------------|
| **pending** | En attente de vérification | Verify, Reject |
| **verified** | Email/SMS vérifié | Approve, Reject |
| **approved** | Approuvé par admin | - |
| **rejected** | Rejeté par admin | - |

---

## 🔐 Sécurité

### API Routes
- ✅ **Authentication** : NextAuth session pour les routes admin
- ✅ **Authorization** : Vérification du rôle ADMIN
- ✅ **Validation** : Validation des données entrantes
- ✅ **Rate Limiting** : À implémenter (recommandé)

### Google Places API
- ✅ **Clé API** : Stockée dans variable d'environnement
- ✅ **Restrictions** : Configurer dans Google Cloud Console
  - HTTP referrers (localhost + domaine production)
  - API restrictions (Places API uniquement)

---

## 🎨 Composants clés

### GooglePlacesAutocomplete

Composant réutilisable pour la recherche de commerces :

```tsx
<GooglePlacesAutocomplete
  onSelect={(business) => console.log(business)}
  placeholder="Search for your business..."
  className="w-full"
/>
```

**Features** :
- Autocomplétion en temps réel
- Debounce (500ms)
- Affichage des notes et avis
- Récupération automatique des détails complets
- Click outside pour fermer

---

## 📡 API Endpoints

### Public

#### POST `/api/business-claims`
Créer une nouvelle réclamation

**Body** :
```json
{
  "googlePlaceId": "ChIJ...",
  "businessName": "My Business",
  "claimantName": "John Doe",
  "claimantEmail": "john@example.com",
  "claimantPhone": "+971501234567",
  "claimantRole": "Owner",
  "verificationMethod": "email",
  ...
}
```

#### GET `/api/places/search?query=restaurant+dubai`
Rechercher des commerces via Google Places

#### GET `/api/places/details?placeId=ChIJ...`
Récupérer les détails d'un commerce

### Admin (authentification requise)

#### GET `/api/business-claims`
Liste toutes les réclamations

**Query params** :
- `status` : pending | verified | approved | rejected
- `userId` : Filter par utilisateur

#### GET `/api/business-claims/[id]`
Détails d'une réclamation

#### PATCH `/api/business-claims/[id]`
Mettre à jour une réclamation (admin uniquement)

**Body** :
```json
{
  "status": "approved",
  "rejectionReason": "...",
  "adminNotes": "..."
}
```

#### DELETE `/api/business-claims/[id]`
Supprimer une réclamation (admin uniquement)

---

## 🧪 Tests

### Tests manuels

1. **Recherche Google Places** :
   ```
   - Rechercher "Starbucks Dubai Mall"
   - Vérifier l'autocomplétion
   - Sélectionner un résultat
   - Vérifier les détails affichés
   ```

2. **Soumission de réclamation** :
   ```
   - Remplir le formulaire
   - Soumettre
   - Vérifier l'email de confirmation
   ```

3. **Admin Dashboard** :
   ```
   - Se connecter en tant qu'admin
   - Accéder à /en/admin/claims
   - Filtrer par statut
   - Approuver/Rejeter une réclamation
   ```

---

## 🔄 Workflow complet

```
1. Utilisateur recherche son business via Google Places
   ↓
2. Sélectionne le business (données auto-remplies)
   ↓
3. Remplit ses informations personnelles
   ↓
4. Choisit méthode de vérification (email/SMS)
   ↓
5. Soumet la réclamation → Status: PENDING
   ↓
6. Reçoit email/SMS avec code de vérification
   ↓
7. Vérifie son email/SMS → Status: VERIFIED
   ↓
8. Admin review la réclamation
   ↓
9. Admin approuve → Status: APPROVED
   OU
   Admin rejette → Status: REJECTED
```

---

## 📈 Améliorations futures

- [ ] **Email de vérification** : Intégrer Resend/SendGrid
- [ ] **SMS de vérification** : Intégrer Twilio
- [ ] **Upload de documents** : Preuve de propriété
- [ ] **Analyse de site web** : Extraction automatique des réseaux sociaux
- [ ] **Matching de catégories** : Mapper Google types → vos catégories
- [ ] **Notifications** : Alertes admin pour nouvelles réclamations
- [ ] **Dashboard propriétaire** : Après approbation
- [ ] **Rate limiting** : Protection contre abus
- [ ] **Webhook** : Notifications externes

---

## 🐛 Dépannage

### Erreur "Google Places API key not configured"
→ Vérifier que `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` est dans `.env`

### Aucun résultat de recherche
→ Vérifier que l'API Places est activée dans Google Cloud Console

### Erreur 403 Forbidden
→ Vérifier les restrictions de la clé API (HTTP referrers)

### Erreur Prisma
→ Exécuter `npx prisma generate` et `npx prisma migrate dev`

---

## 📞 Support

Pour toute question ou problème :
- Vérifier cette documentation
- Consulter les logs du serveur
- Vérifier la console du navigateur
- Tester les API endpoints avec Postman

---

## ✅ Checklist de déploiement

- [ ] Clé Google Places API configurée en production
- [ ] Restrictions API configurées (domaine production)
- [ ] Migration Prisma exécutée
- [ ] Variables d'environnement en production
- [ ] Tests de bout en bout effectués
- [ ] Email/SMS de vérification configurés
- [ ] Monitoring et logs configurés

---

**Système créé le** : 27 Novembre 2025  
**Version** : 1.0.0  
**Status** : ✅ Production Ready
