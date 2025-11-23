# ✅ MISE À JOUR RELATION DEVISE DES PAYS

## 🔧 Modifications Prisma

### Modèle Country
```prisma
model Country {
  currencyId      String?
  currency        String?    // Ancien champ conservé pour compatibilité
  Currency        Currency?  @relation(fields: [currencyId], references: [id])
  
  @@index([currencyId])
}
```

### Modèle Currency
```prisma
model Currency {
  id       String
  code     String
  name     String
  symbol   String
  Country  Country[]    // Relation inverse
}
```

## 📊 Migration des Données

**Script:** `scripts/update-country-currencies.ts`

**Résultats:**
- ✅ **10 pays** mis à jour avec `currencyId`
- ⚠️ **1 pays** non trouvé (Bahrain - BHD)

**Pays mis à jour:**
- Singapore (SG) → SGD
- Thailand (TH) → THB
- United Arab Emirates (AE) → AED
- Vietnam (VN) → VND
- Indonesia (ID) → IDR
- Malaysia (MY) → MYR
- Morocco (MA) → MAD
- Philippines (PH) → PHP
- Qatar (QA) → QAR
- Saudi Arabia (SA) → SAR

## 🎨 Modifications Interface

### CountryForm
- ✅ Champ `currency` → `currencyId`
- ✅ Dropdown utilise `curr.id` au lieu de `curr.code`
- ✅ Sauvegarde `currencyId` dans la base
- ✅ Chargement automatique des devises

### API Routes

**GET /api/admin/countries**
```typescript
include: {
  Currency: true,  // Retourne l'objet devise complet
}
```

**Réponse:**
```json
{
  "id": "country-th",
  "code": "TH",
  "name": "Thailand",
  "currencyId": "currency-thb-123",
  "Currency": {
    "id": "currency-thb-123",
    "code": "THB",
    "name": "Thai Baht",
    "symbol": "฿",
    "exchangeRate": 1.0
  }
}
```

## ✨ Avantages

### 1. Relation Forte
- `currencyId` pointe vers l'ID de la devise
- Intégrité référentielle
- Cascade possible

### 2. Données Complètes
- Récupération de l'objet `Currency` complet
- Accès à `code`, `name`, `symbol`, `exchangeRate`
- Plus besoin de stocker juste le code

### 3. Requêtes Optimisées
- `Include Currency` dans les queries
- Évite les jointures manuelles
- Performance améliorée

### 4. Compatibilité
- Ancien champ `currency` conservé
- Migration progressive possible
- Pas de breaking change

## 📁 Fichiers Modifiés

```
✅ prisma/schema.prisma
   - Country: +currencyId, +Currency relation, +index
   - Currency: +Country[] relation

✅ components/admin/CountryForm.tsx
   - currency → currencyId
   - Dropdown value=curr.id

✅ app/api/admin/countries/route.ts
   - Include Currency dans GET

✅ scripts/update-country-currencies.ts (NOUVEAU)
   - Migration automatique des données
```

## 🎯 Utilisation

### Créer un Pays
1. Ouvrir formulaire Country
2. Sélectionner devise dans dropdown
3. Le `currencyId` est automatiquement sauvegardé
4. La relation est créée

### Récupérer un Pays avec sa Devise
```typescript
const country = await prisma.country.findUnique({
  where: { id: 'country-th' },
  include: { Currency: true }
});

// country.Currency.code === 'THB'
// country.Currency.symbol === '฿'
```

## ✅ Checklist

- [x] Schéma Prisma avec relation Currency
- [x] Migration de la base de données
- [x] Données migrées (10/11 pays)
- [x] Formulaire utilise currencyId
- [x] API retourne Currency complète
- [x] Intégrité référentielle assurée
- [x] Ancien champ currency conservé

---

**🎉 TOUT EST À JOUR !**

La relation entre Country et Currency est maintenant propre et fonctionnelle.
