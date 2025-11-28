# 📋 INSTRUCTIONS POUR LA MIGRATION

**Date**: 26 Nov 2025, 22:40 UTC+07:00
**Statut**: ⏳ EN ATTENTE D'EXÉCUTION

---

## ⚠️ PROBLÈME RENCONTRÉ

### **Erreur Shadow Database**
```
Error: P3014
Prisma Migrate could not create the shadow database.
ERROR: permission denied to create database
```

**Cause** : L'utilisateur PostgreSQL n'a pas les permissions pour créer une shadow database.

---

## 🔧 SOLUTIONS POSSIBLES

### **Solution 1: Donner les Permissions** (Recommandé)
```sql
-- Se connecter en tant que superuser
psql -U postgres

-- Donner les permissions
ALTER USER postgres CREATEDB;

-- Ou créer la shadow database manuellement
CREATE DATABASE preprod_justrichard_shadow;
GRANT ALL PRIVILEGES ON DATABASE preprod_justrichard_shadow TO postgres;
```

Puis relancer :
```bash
npx prisma migrate dev --name add_specialized_bookings
```

### **Solution 2: Utiliser shadowDatabaseUrl** (Alternative)
Ajouter dans `.env` :
```env
SHADOW_DATABASE_URL="postgresql://postgres:postgres@localhost:5432/preprod_justrichard_shadow"
```

Puis dans `schema.prisma` :
```prisma
datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}
```

### **Solution 3: Migration Manuelle** (Dernier recours)
Si les permissions ne peuvent pas être données, créer la migration manuellement :

```bash
# 1. Créer le fichier de migration
mkdir -p prisma/migrations/$(date +%Y%m%d%H%M%S)_add_specialized_bookings

# 2. Générer le SQL
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/$(date +%Y%m%d%H%M%S)_add_specialized_bookings/migration.sql

# 3. Appliquer manuellement
psql -U postgres -d preprod_justrichard -f prisma/migrations/*/migration.sql

# 4. Marquer comme appliquée
npx prisma migrate resolve --applied $(date +%Y%m%d%H%M%S)_add_specialized_bookings
```

---

## 📝 CONTENU DE LA MIGRATION

### **Tables à Créer** (9)
1. ✅ **CoachBooking**
2. ✅ **YachtBooking**
3. ✅ **DoctorAppointment** (nouveau avec Provider)
4. ✅ **LawyerConsultation**
5. ✅ **ActivityBooking**
6. ✅ **PropertyBooking**
7. ✅ **MaidBooking**
8. ✅ **ScooterBooking**
9. ✅ **Scooter**

### **Tables à Supprimer** (3)
1. ❌ **DoctorAppointment** (ancien avec Doctor)
2. ❌ **DoctorAvailability**
3. ❌ **DoctorReview**

### **Relations à Ajouter**
- User → 8 nouvelles relations booking
- Coach → CoachBooking
- Yacht → YachtBooking
- Activity → ActivityBooking
- Property → PropertyBooking
- Maid → MaidBooking
- Provider → DoctorAppointment, LawyerConsultation
- Scooter → ScooterBooking

---

## ✅ APRÈS LA MIGRATION

### **1. Générer le Client Prisma**
```bash
npx prisma generate
```

### **2. Vérifier les Tables**
```bash
psql -U postgres -d preprod_justrichard -c "\dt"
```

### **3. Tester les Nouveaux Modèles**
```typescript
// Test CoachBooking
const booking = await prisma.coachBooking.create({
  data: {
    bookingNumber: "COACH-001",
    coachId: "...",
    customerName: "Test",
    customerEmail: "test@test.com",
    customerPhone: "+1234567890",
    sessionType: "personal",
    sessionDate: new Date(),
    sessionTime: "10:00",
    duration: 60,
    category: "fitness",
    basePrice: 100,
    totalPrice: 100,
    currency: "AED",
  }
});
```

---

## 🎯 COMMANDES UTILES

### **Vérifier le Statut**
```bash
npx prisma migrate status
```

### **Voir les Migrations**
```bash
ls -la prisma/migrations/
```

### **Rollback (si nécessaire)**
```bash
# Attention: destructif !
npx prisma migrate reset
```

### **Appliquer en Production**
```bash
npx prisma migrate deploy
```

---

## 📊 RÉSUMÉ

### **Schema Prisma**
- ✅ Validé (4030 lignes)
- ✅ Conflits résolus (3/3)
- ✅ 9 nouveaux modèles
- ✅ 16 nouvelles relations

### **Migration**
- ⏳ En attente d'exécution
- ⚠️ Problème de permissions shadow database
- 💡 Solutions disponibles ci-dessus

### **Prochaines Étapes**
1. Résoudre le problème de permissions
2. Exécuter la migration
3. Générer le client Prisma
4. Créer les API routes
5. Créer les formulaires frontend

---

**🚀 SYSTÈME PRÊT - EN ATTENTE DE MIGRATION ! ✨**
