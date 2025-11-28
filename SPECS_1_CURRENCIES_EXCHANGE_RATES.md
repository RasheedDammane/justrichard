# 📋 SPÉCIFICATIONS COMPLÈTES - CURRENCIES & EXCHANGE RATES

**Module**: Gestion des Devises et Taux de Change  
**Date**: 23 Novembre 2025  
**Objectif**: Système complet et fonctionnel pour gérer les devises et leurs taux de change

---

## 🎯 OBJECTIFS

1. **Afficher correctement** toutes les devises en base de données
2. **Gérer les devises**:
   - CRUD complet (Create, Read, Update, Delete)
   - Devise par défaut (une seule)
   - Activation/Désactivation
   - Symboles, décimales, etc.

3. **Gérer les taux de change**:
   - Taux entre devises
   - Mise à jour manuelle
   - Mise à jour automatique via API externe
   - Historique des taux

4. **Utilisation**:
   - Convertisseur de devises
   - Affichage des prix dans différentes devises
   - Intégration dans Properties, Yachts, etc.

---

## 📊 MODÈLES PRISMA

### 1. Currency (existant - à améliorer)

```prisma
model Currency {
  id                String         @id @default(cuid())
  code              String         @unique // USD, EUR, AED, THB
  name              String         // US Dollar, Euro, UAE Dirham
  symbol            String         // $, €, د.إ
  decimalPlaces     Int            @default(2)
  isActive          Boolean        @default(true)
  isDefault         Boolean        @default(false)
  displayOrder      Int            @default(0)
  
  // Relations
  countries         Country[]
  exchangeRatesFrom ExchangeRate[] @relation("FromCurrency")
  exchangeRatesTo   ExchangeRate[] @relation("ToCurrency")
  
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt
  
  @@index([code])
  @@index([isActive])
  @@index([isDefault])
}
```

### 2. ExchangeRate (NOUVEAU - à créer)

```prisma
model ExchangeRate {
  id             String   @id @default(cuid())
  
  fromCurrencyId String
  fromCurrency   Currency @relation("FromCurrency", fields: [fromCurrencyId], references: [id], onDelete: Cascade)
  
  toCurrencyId   String
  toCurrency     Currency @relation("ToCurrency", fields: [toCurrencyId], references: [id], onDelete: Cascade)
  
  rate           Float    // Ex: 1 USD = 0.92 EUR → rate = 0.92
  source         String   @default("manual") // manual, api, exchangerate-api, ecb
  
  lastUpdated    DateTime @default(now())
  createdAt      DateTime @default(now())
  
  @@unique([fromCurrencyId, toCurrencyId])
  @@index([fromCurrencyId])
  @@index([toCurrencyId])
  @@index([lastUpdated])
}
```

---

## 🔌 API ENDPOINTS

### Base: `/api/admin/currencies`

#### 1. GET /api/admin/currencies
**Description**: Liste toutes les devises avec statistiques

**Query params**:
- `search` (string, optionnel) - Recherche par code ou nom
- `status` (string, optionnel) - `active` | `inactive` | `all`

**Response**:
```json
{
  "currencies": [
    {
      "id": "currency-usd-123",
      "code": "USD",
      "name": "US Dollar",
      "symbol": "$",
      "decimalPlaces": 2,
      "isActive": true,
      "isDefault": true,
      "displayOrder": 0,
      "exchangeRatesCount": 5
    }
  ],
  "stats": {
    "total": 10,
    "active": 8,
    "inactive": 2,
    "defaultCurrency": {
      "code": "USD",
      "name": "US Dollar"
    }
  }
}
```

#### 2. GET /api/admin/currencies/:id
**Description**: Détails d'une devise avec ses taux de change

**Response**:
```json
{
  "currency": {
    "id": "currency-usd-123",
    "code": "USD",
    "name": "US Dollar",
    "symbol": "$",
    "decimalPlaces": 2,
    "isActive": true,
    "isDefault": true,
    "exchangeRatesFrom": [
      {
        "id": "rate-123",
        "toCurrency": {
          "code": "EUR",
          "name": "Euro"
        },
        "rate": 0.92,
        "lastUpdated": "2025-11-23T10:00:00Z"
      }
    ]
  }
}
```

#### 3. POST /api/admin/currencies
**Description**: Créer une nouvelle devise

**Body**:
```json
{
  "code": "GBP",
  "name": "British Pound",
  "symbol": "£",
  "decimalPlaces": 2,
  "isActive": true
}
```

**Règles**:
- Code doit être unique (3 lettres majuscules)
- Si aucune devise n'est default → celle-ci devient default
- Création automatique des taux de change à 1.0 vs default

#### 4. PUT /api/admin/currencies/:id
**Description**: Mettre à jour une devise

**Body**:
```json
{
  "name": "US Dollar (Updated)",
  "symbol": "$",
  "decimalPlaces": 2,
  "isActive": true
}
```

**Règles**:
- Ne peut pas modifier le `code`
- Ne peut pas désactiver la devise par défaut

#### 5. POST /api/admin/currencies/set-default
**Description**: Définir une devise comme défaut

**Body**:
```json
{
  "currencyId": "currency-eur-456"
}
```

**Règles**:
- Désactive `isDefault` pour toutes les autres
- Active `isDefault` pour celle choisie
- Recalcule tous les taux de change si nécessaire

#### 6. DELETE /api/admin/currencies/:id
**Description**: Supprimer une devise

**Règles**:
- Interdit si `isDefault = true`
- Supprime en cascade tous les taux de change associés
- Vérifie qu'aucun pays n'utilise cette devise

---

### Base: `/api/admin/exchange-rates`

#### 1. GET /api/admin/exchange-rates
**Description**: Liste tous les taux de change

**Query params**:
- `baseCurrency` (string, optionnel) - Code de la devise de base

**Response**:
```json
{
  "baseCurrency": {
    "code": "USD",
    "name": "US Dollar"
  },
  "rates": [
    {
      "id": "rate-123",
      "fromCurrency": { "code": "USD", "symbol": "$" },
      "toCurrency": { "code": "EUR", "symbol": "€" },
      "rate": 0.92,
      "source": "exchangerate-api",
      "lastUpdated": "2025-11-23T10:00:00Z"
    }
  ]
}
```

#### 2. POST /api/admin/exchange-rates
**Description**: Créer/Mettre à jour un taux de change

**Body**:
```json
{
  "fromCurrencyId": "currency-usd-123",
  "toCurrencyId": "currency-eur-456",
  "rate": 0.92,
  "source": "manual"
}
```

**Règles**:
- Si le taux existe déjà → update
- Sinon → create
- Crée automatiquement le taux inverse (1/rate)

#### 3. POST /api/admin/exchange-rates/update-from-api
**Description**: Mettre à jour tous les taux depuis une API externe

**Body**:
```json
{
  "baseCurrencyCode": "USD"
}
```

**Process**:
1. Appelle API externe (exchangerate-api.com)
2. Récupère tous les taux vs USD
3. Met à jour tous les taux en base
4. Crée les taux inverses
5. Retourne le nombre de taux mis à jour

**Response**:
```json
{
  "message": "Exchange rates updated successfully",
  "updated": 25,
  "created": 5,
  "baseCurrency": "USD",
  "source": "exchangerate-api"
}
```

---

## 🎨 UI ADMIN - PAGE CURRENCIES

### Layout: `/[locale]/admin/currencies/page.tsx`

#### Section Stats (Top)
```
┌─────────────────────────────────────────────────────────────┐
│  📊 STATISTIQUES                                            │
├─────────────────────────────────────────────────────────────┤
│  Total Devises    Devises Actives    Devise par Défaut     │
│       10                8                  USD              │
│                                                             │
│  Taux de Change                                             │
│       45                                                    │
└─────────────────────────────────────────────────────────────┘
```

#### Actions (Header)
```
┌─────────────────────────────────────────────────────────────┐
│  Gestion des Devises                                        │
│                                                             │
│  [🔍 Rechercher...]  [Filtrer ▼]  [+ Ajouter une devise]   │
└─────────────────────────────────────────────────────────────┘
```

#### Liste des Devises (Table)
```
┌──────┬──────────────┬────────┬──────────┬────────┬─────────┬──────────┐
│ CODE │ NOM          │ SYMBOLE│ DÉCIMALES│ STATUT │ DÉFAUT  │ ACTIONS  │
├──────┼──────────────┼────────┼──────────┼────────┼─────────┼──────────┤
│ USD  │ US Dollar    │   $    │    2     │ Active │   ⭐    │ Edit Del │
│ EUR  │ Euro         │   €    │    2     │ Active │         │ Edit Del │
│ AED  │ UAE Dirham   │  د.إ   │    2     │ Active │         │ Edit Del │
│ THB  │ Thai Baht    │   ฿    │    2     │ Active │         │ Edit Del │
│ GBP  │ British Pound│   £    │    2     │ Active │         │ Edit Del │
└──────┴──────────────┴────────┴──────────┴────────┴─────────┴──────────┘
```

#### Fonctionnalités:
- ✅ Clic sur ⭐ → Définir comme défaut
- ✅ Toggle Active/Inactive
- ✅ Edit → Modal avec formulaire
- ✅ Delete → Confirmation (interdit si default)
- ✅ Drag & drop pour réordonner (displayOrder)

---

## 🎨 UI ADMIN - PAGE EXCHANGE RATES

### Layout: `/[locale]/admin/exchange-rates/page.tsx`

#### Header
```
┌─────────────────────────────────────────────────────────────┐
│  Taux de Change                                             │
│                                                             │
│  Devise de base: [USD ▼]  [🔄 Mettre à jour depuis API]    │
└─────────────────────────────────────────────────────────────┘
```

#### Tableau des Taux
```
┌──────────────┬──────────────┬───────────┬────────────┬──────────────┐
│ DE           │ VERS         │ TAUX      │ SOURCE     │ MIS À JOUR   │
├──────────────┼──────────────┼───────────┼────────────┼──────────────┤
│ USD ($)      │ EUR (€)      │ 0.9200    │ API        │ 2h ago       │
│ USD ($)      │ AED (د.إ)    │ 3.6725    │ API        │ 2h ago       │
│ USD ($)      │ THB (฿)      │ 35.50     │ Manual     │ 1 day ago    │
│ USD ($)      │ GBP (£)      │ 0.7900    │ API        │ 2h ago       │
└──────────────┴──────────────┴───────────┴────────────┴──────────────┘
```

#### Fonctionnalités:
- ✅ Édition inline du taux (double-clic)
- ✅ Bouton "Mettre à jour depuis API" → appelle l'API externe
- ✅ Affichage de la source (manual, api)
- ✅ Affichage du dernier update (relative time)
- ✅ Bouton "Enregistrer tous les taux"

---

## 🔧 RÈGLES MÉTIER

### Devise par Défaut
1. **Une seule devise peut être défaut** à la fois
2. La devise par défaut **ne peut pas être supprimée**
3. La devise par défaut **ne peut pas être désactivée**
4. Tous les prix sont stockés dans la devise par défaut
5. Les conversions se font toujours via la devise par défaut

### Taux de Change
1. **Taux bidirectionnels**: Si USD → EUR = 0.92, alors EUR → USD = 1/0.92 = 1.087
2. **Mise à jour automatique**: Crée/met à jour les taux inverses automatiquement
3. **Source tracking**: Chaque taux garde sa source (manual, api)
4. **Timestamp**: Chaque taux garde son dernier update

### Conversion
1. **Direct**: Si taux USD → EUR existe → utilise directement
2. **Inverse**: Si taux EUR → USD existe → utilise 1/rate
3. **Via défaut**: Si ni direct ni inverse → passe par la devise par défaut

---

## 📱 COMPOSANTS RÉUTILISABLES

### CurrencySelector
```tsx
<CurrencySelector
  value={selectedCurrency}
  onChange={(currency) => setSelectedCurrency(currency)}
  activeOnly={true}
/>
```

### CurrencyConverter
```tsx
<CurrencyConverter
  amount={1000}
  fromCurrency="USD"
  toCurrency="EUR"
  onConvert={(result) => console.log(result)}
/>
```

### PriceDisplay
```tsx
<PriceDisplay
  amount={1000}
  currency="USD"
  convertTo={["EUR", "AED", "THB"]}
/>
```

---

## 🚀 IMPLÉMENTATION - ORDRE

1. ✅ **Modèle ExchangeRate** dans schema.prisma
2. ✅ **Migration** Prisma
3. ✅ **API Currencies** (correction + amélioration)
4. ✅ **API Exchange Rates** (correction + amélioration)
5. ✅ **Page Currencies** (correction affichage)
6. ✅ **Page Exchange Rates** (création)
7. ✅ **Seed** devises par défaut (USD, EUR, AED, THB, GBP)
8. ✅ **Tests** complets

---

## 📊 DEVISES PAR DÉFAUT (SEED)

```typescript
const defaultCurrencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', isDefault: true },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', decimalPlaces: 0 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
];
```

---

## ✅ CHECKLIST

- [ ] Modèle ExchangeRate créé
- [ ] Migration appliquée
- [ ] API Currencies corrigée
- [ ] API Exchange Rates corrigée
- [ ] Page Currencies fonctionnelle
- [ ] Page Exchange Rates créée
- [ ] Seed devises exécuté
- [ ] Tests API
- [ ] Tests UI
- [ ] Documentation

---

**🎯 OBJECTIF FINAL**: Page Currencies affiche les devises + système complet de taux de change fonctionnel!
