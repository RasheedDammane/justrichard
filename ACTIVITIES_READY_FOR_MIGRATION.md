# 🎯 ACTIVITIES - PRÊT POUR MIGRATION

**Date** : 21 Novembre 2025, 03:26 UTC+07  
**Status** : ✅ **PRÊT POUR COPIE VERS NOUVELLE BASE**

---

## ✅ Ce Qui Est Prêt

### 1. 📊 Base de Données Actuelle
- **11 activités** dans `preprod_justrichard`
- **3 villes** : Bangkok, Pattaya, Phuket (Thailand) + Dubai (UAE)
- **9 catégories** d'activités
- **Toutes les relations** correctes (City, Country)

### 2. 🎨 Images Organisées
```
public/media/activities/
├── cultural/           ✅ 5 images
├── food-drink/         ✅ 2 images
├── water-sports/       ✅ 2 images
├── adventure/          ✅ 5 images
├── island-hopping/     ✅ 3 images
├── sightseeing/        ✅ 2 images
├── dinner-cruise/      ✅ 2 images
├── family/             ✅ 2 images
└── extreme-sports/     ✅ 2 images

TOTAL: 25 images SVG (797-801 bytes chacune)
```

### 3. 📄 Pages Frontend
- ✅ `/activities` - Liste avec filtres
- ✅ `/activities/[slug]` - Détail avec carte Leaflet
- ✅ `ActivityFilters.tsx` - Client Component

---

## 📋 Liste des Activités à Migrer

### Thailand (6 activités)

| ID | Nom | Catégorie | Ville | Prix | Images |
|---|---|---|---|---|---|
| activity-bangkok-temple-tour | Grand Palace & Temples Tour | Cultural | Bangkok | ฿2,500 | 3 |
| activity-bangkok-floating-market | Damnoen Saduak Floating Market | Cultural | Bangkok | ฿1,800 | 2 |
| activity-bangkok-cooking-class | Thai Cooking Class & Market Tour | Food & Drink | Bangkok | ฿2,200 | 2 |
| activity-pattaya-coral-island | Coral Island Snorkeling & Beach Day | Water Sports | Pattaya | ฿1,500 | 2 |
| activity-pattaya-parasailing | Parasailing Adventure | Adventure | Pattaya | ฿800 | 2 |
| activity-phuket-phi-phi-island | Phi Phi Islands Day Trip | Island Hopping | Phuket | ฿3,200 | 3 |

### Dubai (5 activités)

| ID | Nom | Catégorie | Ville | Prix | Images |
|---|---|---|---|---|---|
| activity-dubai-desert-safari | Desert Safari with BBQ Dinner | Adventure | Dubai | AED 250 | 3 |
| activity-dubai-burj-khalifa | Burj Khalifa At The Top SKY | Sightseeing | Dubai | AED 450 | 2 |
| activity-dubai-dhow-cruise | Dubai Marina Dhow Cruise Dinner | Dinner Cruise | Dubai | AED 180 | 2 |
| activity-dubai-aquarium | Dubai Aquarium & Underwater Zoo | Family | Dubai | AED 150 | 2 |
| activity-dubai-skydive | Skydive Dubai - Palm Drop Zone | Extreme Sports | Dubai | AED 2,199 | 2 |

---

## 🗂️ Structure des Données

### Champs Activity
```typescript
{
  id: string
  name: string
  slug: string (unique)
  description: string
  category: string
  duration: string
  minAge: number
  maxGroupSize: number
  difficulty: string
  pricePerPerson: number
  pricePerGroup: number | null
  currency: 'THB' | 'AED'
  cityId: string (FK)
  countryId: string (FK)
  meetingPoint: string
  latitude: number
  longitude: number
  included: JSON (array)
  notIncluded: JSON (array)
  whatToBring: JSON (array)
  availableDays: JSON (array)
  startTimes: JSON (array)
  images: JSON (array of paths)
  metaTitle: string
  metaDescription: string
  views: number
  bookings: number
  rating: number
  isActive: boolean
  isFeatured: boolean
  isAvailable: boolean
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

## 🔄 Script de Migration

### Étape 1 : Exporter les Activités
```bash
npx tsx -e "
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function exportActivities() {
  const activities = await prisma.activity.findMany({
    include: {
      City: true,
      Country: true,
    },
  });
  
  fs.writeFileSync(
    'activities-export.json',
    JSON.stringify(activities, null, 2)
  );
  
  console.log(\`✅ Exported \${activities.length} activities\`);
}

exportActivities().finally(() => prisma.\$disconnect());
"
```

### Étape 2 : Copier les Images
```bash
# Copier tout le dossier media/activities vers la nouvelle base
cp -r public/media/activities /path/to/new/project/public/media/
```

### Étape 3 : Importer dans Nouvelle DB
```bash
# Utiliser le seed-activities.ts avec la nouvelle connexion DB
DATABASE_URL="postgresql://..." npx tsx prisma/seed-activities.ts
```

---

## 📊 Statistiques de Migration

### Données à Copier
- **11 activités** (6 Thailand + 5 Dubai)
- **25 images SVG** (~20 KB total)
- **9 catégories** uniques
- **4 villes** (Bangkok, Pattaya, Phuket, Dubai)
- **2 pays** (Thailand, UAE)

### Relations
- Activity → City (11 relations)
- Activity → Country (11 relations)
- City → Country (4 relations)

---

## ✅ Checklist de Migration

### Avant Migration
- [x] Activités créées dans DB actuelle
- [x] Images générées et organisées
- [x] Pages frontend testées
- [x] Seed script prêt
- [x] Documentation complète

### Pendant Migration
- [ ] Vérifier que les villes existent dans nouvelle DB
- [ ] Vérifier que les pays existent dans nouvelle DB
- [ ] Copier le dossier `public/media/activities/`
- [ ] Exécuter le seed avec nouvelle DB
- [ ] Vérifier les relations

### Après Migration
- [ ] Tester les pages `/activities`
- [ ] Vérifier les images s'affichent
- [ ] Tester les filtres
- [ ] Vérifier les cartes Leaflet
- [ ] Tester les liens vers détails

---

## 🎯 Commandes de Migration

### 1. Exporter depuis DB Actuelle
```bash
cd /Users/richard/preprod/justrichard

# Exporter les activités
npx tsx -e "
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();
prisma.activity.findMany({ include: { City: true, Country: true } })
  .then(data => {
    fs.writeFileSync('activities-backup.json', JSON.stringify(data, null, 2));
    console.log('✅ Exported', data.length, 'activities');
  })
  .finally(() => prisma.\$disconnect());
"
```

### 2. Copier les Images
```bash
# Vers nouvelle base (à adapter selon le chemin)
cp -r public/media/activities /path/to/nouvelle/base/public/media/
```

### 3. Importer dans Nouvelle DB
```bash
# Modifier DATABASE_URL dans .env pour pointer vers nouvelle DB
# Puis exécuter le seed
npx tsx prisma/seed-activities.ts
```

---

## 📁 Fichiers à Copier

### Scripts
- ✅ `prisma/seed-activities.ts` (372 lignes)
- ✅ `scripts/create-activity-images.js` (95 lignes)

### Pages
- ✅ `app/[locale]/activities/page.tsx` (222 lignes)
- ✅ `app/[locale]/activities/ActivityFilters.tsx` (168 lignes)
- ✅ `app/[locale]/activities/[slug]/page.tsx` (368 lignes)

### Images
- ✅ `public/media/activities/` (9 dossiers, 25 fichiers)

### Documentation
- ✅ `ACTIVITIES_SYSTEM_COMPLETE.md`
- ✅ `ACTIVITIES_READY_FOR_MIGRATION.md`

---

## 🔍 Vérifications Post-Migration

### Tests à Effectuer
```bash
# 1. Compter les activités
npx tsx -e "
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.activity.count()
  .then(count => console.log('Activities:', count))
  .finally(() => prisma.\$disconnect());
"

# 2. Vérifier les catégories
npx tsx -e "
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.activity.findMany({ select: { category: true }, distinct: ['category'] })
  .then(cats => console.log('Categories:', cats.map(c => c.category)))
  .finally(() => prisma.\$disconnect());
"

# 3. Tester les pages
curl -s -o /dev/null -w "%{http_code}" http://localhost:PORT/en/activities
curl -s -o /dev/null -w "%{http_code}" http://localhost:PORT/en/activities/grand-palace-temples-tour-bangkok
```

---

## 🎉 Résumé

**Tout est prêt pour la migration** :

1. ✅ **11 activités** avec données complètes
2. ✅ **25 images SVG** organisées par catégorie
3. ✅ **3 pages** frontend fonctionnelles
4. ✅ **Script de seed** réutilisable
5. ✅ **Documentation** complète

**Prochaine étape** : Copier vers nouvelle base de données ! 🚀

**Note** : Les images SVG sont des placeholders. Vous pourrez les remplacer par de vraies photos plus tard en gardant la même structure de dossiers.
