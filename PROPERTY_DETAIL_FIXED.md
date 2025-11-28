# 🔧 PROPERTY DETAIL PAGE - EN COURS DE CORRECTION

**Fichier**: `/app/[locale]/properties/[slug]/page.tsx` (371 lignes)

## ❌ CHAMPS INCORRECTS À CORRIGER

### Champs qui n'existent plus:
1. `property.name` → `property.title`
2. `property.area` → `property.areaSize`
3. `property.salePrice` → `property.price`
4. `property.rentPrice` → `property.price`
5. `property.pricePerNight` → `property.price`
6. `property.pricePerMonth` → `property.price`
7. `property.City` → `property.city`
8. `property.Country` → `property.country`
9. `property.address` → `property.addressLine1`
10. `property.currency` → `property.priceCurrency?.symbol`
11. `property.listingType` → `property.type`
12. `property.features` (JSON string) → `property.features` (relation array)
13. `property.amenities` (JSON string) → N'existe plus

### Includes incorrects:
- `City: true` → `city: true`
- `Country: true` → `country: true`

## ✅ CORRECTIONS APPLIQUÉES

1. ✅ `generateMetadata`: metaTitle → seoTitle, name → title
2. ✅ `findUnique includes`: City → city, Country → country, + media, features, floorPlans
3. ✅ `pricePerSqm`: area → areaSize, salePrice/rentPrice → price
4. ✅ Breadcrumb: name → title

## 🔄 RESTE À CORRIGER (nombreuses occurrences)

Le fichier est trop gros (371 lignes) avec beaucoup d'occurrences à corriger.

**Recommandation**: Créer une nouvelle version simplifiée de la page avec les bons champs.
