# 🧪 CLEANING SERVICES - RAPPORT DE TESTS

**Date**: 26 Nov 2025, 13:50 UTC+07:00
**Statut**: Tests préparés

---

## 📋 PLAN DE TESTS

### **1. Pages Admin** (9 tests)

#### **Home Cleaning**
- [ ] `GET /en/admin/home-cleaning` → 200 OK
- [ ] `GET /en/admin/home-cleaning/new` → 200 OK
- [ ] `GET /en/admin/home-cleaning/edit/[id]` → 200 OK (avec ID valide)

#### **Furniture Cleaning**
- [ ] `GET /en/admin/furniture-cleaning` → 200 OK
- [ ] `GET /en/admin/furniture-cleaning/new` → 200 OK
- [ ] `GET /en/admin/furniture-cleaning/edit/[id]` → 200 OK (avec ID valide)

#### **Laundry**
- [ ] `GET /en/admin/laundry` → 200 OK
- [ ] `GET /en/admin/laundry/new` → 200 OK
- [ ] `GET /en/admin/laundry/edit/[id]` → 200 OK (avec ID valide)

---

### **2. APIs - GET** (3 tests)

- [ ] `GET /api/home-cleaning` → 200 OK (liste vide ou avec données)
- [ ] `GET /api/furniture-cleaning` → 200 OK
- [ ] `GET /api/laundry` → 200 OK

---

### **3. APIs - POST** (3 tests)

**Sans authentification** :
- [ ] `POST /api/home-cleaning` → 401 Unauthorized
- [ ] `POST /api/furniture-cleaning` → 401 Unauthorized
- [ ] `POST /api/laundry` → 401 Unauthorized

**Avec authentification ADMIN** :
- [ ] `POST /api/home-cleaning` → 201 Created (avec données valides)
- [ ] `POST /api/furniture-cleaning` → 201 Created
- [ ] `POST /api/laundry` → 201 Created

---

### **4. APIs - GET by ID** (3 tests)

- [ ] `GET /api/home-cleaning/[id]` → 200 OK (avec ID valide)
- [ ] `GET /api/home-cleaning/invalid-id` → 404 Not Found
- [ ] Vérifier incrémentation des vues

---

### **5. APIs - PUT** (3 tests)

**Sans authentification** :
- [ ] `PUT /api/home-cleaning/[id]` → 401 Unauthorized

**Avec authentification** :
- [ ] `PUT /api/home-cleaning/[id]` → 200 OK (avec données valides)
- [ ] `PUT /api/home-cleaning/[id]` → 400 Bad Request (slug existant)

---

### **6. APIs - DELETE** (3 tests)

**Sans authentification** :
- [ ] `DELETE /api/home-cleaning/[id]` → 401 Unauthorized

**Avec authentification ADMIN** :
- [ ] `DELETE /api/home-cleaning/[id]` → 200 OK (sans bookings)
- [ ] `DELETE /api/home-cleaning/[id]` → 400 Bad Request (avec bookings)

---

### **7. Menu Admin** (1 test)

- [ ] Vérifier présence de "Home Cleaning" dans le menu
- [ ] Vérifier présence de "Furniture Cleaning" dans le menu
- [ ] Vérifier présence de "Laundry" dans le menu

---

### **8. Formulaires** (3 tests)

- [ ] Formulaire Home Cleaning s'affiche correctement
- [ ] Tous les champs sont présents
- [ ] Validation fonctionne (champs requis)
- [ ] Soumission fonctionne

---

### **9. Base de Données** (3 tests)

- [ ] Modèle `CleaningService` existe
- [ ] Modèle `CleaningBooking` existe
- [ ] Modèle `CleaningReview` existe
- [ ] Relations fonctionnent

---

## 🚀 COMMENT LANCER LES TESTS

### **Prérequis**
```bash
# 1. Démarrer le serveur
npm run dev

# 2. Attendre que le serveur soit prêt
# ✓ Ready in 2s
```

### **Méthode 1 : Script automatique**
```bash
# Lancer tous les tests
./test-cleaning-services.sh
```

### **Méthode 2 : Tests manuels**

#### **Test 1 : Pages Admin**
```bash
# Home Cleaning
curl http://localhost:3100/en/admin/home-cleaning
curl http://localhost:3100/en/admin/home-cleaning/new

# Furniture Cleaning
curl http://localhost:3100/en/admin/furniture-cleaning
curl http://localhost:3100/en/admin/furniture-cleaning/new

# Laundry
curl http://localhost:3100/en/admin/laundry
curl http://localhost:3100/en/admin/laundry/new
```

#### **Test 2 : APIs GET**
```bash
# Lister les services
curl http://localhost:3100/api/home-cleaning
curl http://localhost:3100/api/furniture-cleaning
curl http://localhost:3100/api/laundry

# Avec filtres
curl "http://localhost:3100/api/home-cleaning?category=basic"
curl "http://localhost:3100/api/home-cleaning?featured=true"
```

#### **Test 3 : APIs POST (sans auth)**
```bash
# Devrait retourner 401
curl -X POST http://localhost:3100/api/home-cleaning \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","slug":"test","basePrice":200}'
```

#### **Test 4 : Vérifier Prisma**
```bash
# Ouvrir Prisma Studio
npx prisma studio

# Vérifier les modèles
npx prisma format
```

---

## 📊 RÉSULTATS ATTENDUS

### **Tous les tests doivent passer** ✅

```
🧪 CLEANING SERVICES - COMPREHENSIVE TESTS
==========================================

📋 SECTION 1: ADMIN PAGES
----------------------------
✅ Home Cleaning - List (200)
✅ Home Cleaning - New (200)
✅ Furniture Cleaning - List (200)
✅ Furniture Cleaning - New (200)
✅ Laundry - List (200)
✅ Laundry - New (200)

📋 SECTION 2: APIs - GET
----------------------------
✅ Home Cleaning - GET List (200)
✅ Furniture Cleaning - GET List (200)
✅ Laundry - GET List (200)

📋 SECTION 3: APIs - POST
----------------------------
✅ Home Cleaning - POST (401)
✅ Furniture Cleaning - POST (401)
✅ Laundry - POST (401)

📋 SECTION 4: DATABASE
----------------------------
✅ Prisma Client (OK)
✅ CleaningService Model (OK)

==========================================
📊 TEST RESULTS
==========================================
Total Tests: 17
Passed: 17 ✅
Failed: 0 ❌

🎉 ALL TESTS PASSED! 🎉
```

---

## 🔍 TESTS DÉTAILLÉS

### **Test 1 : Home Cleaning List**
```bash
curl -I http://localhost:3100/en/admin/home-cleaning

# Attendu:
HTTP/1.1 200 OK
Content-Type: text/html
```

**Vérifications** :
- ✅ Status 200
- ✅ Page HTML retournée
- ✅ Statistiques affichées
- ✅ Bouton "Add Service" présent

---

### **Test 2 : API GET Home Cleaning**
```bash
curl http://localhost:3100/api/home-cleaning

# Attendu:
[
  {
    "id": "...",
    "type": "home",
    "name": "...",
    "slug": "...",
    "basePrice": 200,
    "City": {...},
    "Country": {...},
    "_count": {
      "CleaningBooking": 0,
      "CleaningReview": 0
    }
  }
]
```

**Vérifications** :
- ✅ Status 200
- ✅ JSON array retourné
- ✅ Type = "home"
- ✅ Relations incluses

---

### **Test 3 : API POST sans Auth**
```bash
curl -X POST http://localhost:3100/api/home-cleaning \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'

# Attendu:
{
  "error": "Unauthorized"
}
# Status: 401
```

**Vérifications** :
- ✅ Status 401
- ✅ Message d'erreur approprié

---

### **Test 4 : Formulaire**
```bash
# Ouvrir dans le navigateur
open http://localhost:3100/en/admin/home-cleaning/new
```

**Vérifications** :
- ✅ Formulaire s'affiche
- ✅ 11 tabs présents
- ✅ Champs requis marqués avec *
- ✅ Validation fonctionne
- ✅ Auto-generate slug fonctionne

---

## 🐛 DEBUGGING

### **Si un test échoue**

#### **500 Internal Server Error**
```bash
# Vérifier les logs du serveur
# Regarder la console où npm run dev tourne

# Vérifier Prisma
npx prisma generate
npx prisma db push
```

#### **404 Not Found**
```bash
# Vérifier que les fichiers existent
ls -la app/[locale]/admin/home-cleaning/
ls -la app/api/home-cleaning/

# Vérifier les routes
cat app/[locale]/admin/home-cleaning/page.tsx
```

#### **401 Unauthorized (pages admin)**
```bash
# Vérifier l'authentification
# Se connecter en tant qu'ADMIN
# Vérifier la session
```

---

## 📝 CHECKLIST COMPLÈTE

### **Avant de tester**
- [ ] Serveur démarré (`npm run dev`)
- [ ] Base de données synchronisée (`npx prisma db push`)
- [ ] Prisma Client généré (`npx prisma generate`)
- [ ] Connecté en tant qu'ADMIN

### **Tests de base**
- [ ] Pages admin accessibles (200 OK)
- [ ] APIs GET fonctionnelles (200 OK)
- [ ] APIs POST protégées (401 sans auth)
- [ ] Menu admin intégré

### **Tests avancés**
- [ ] Créer un service (POST avec auth)
- [ ] Modifier un service (PUT)
- [ ] Supprimer un service (DELETE)
- [ ] Filtres fonctionnent
- [ ] Formulaire valide les données

### **Tests de performance**
- [ ] Pages se chargent rapidement (< 2s)
- [ ] APIs répondent rapidement (< 500ms)
- [ ] Pas d'erreurs dans la console

---

## 🎯 CRITÈRES DE SUCCÈS

### **Tous les tests doivent passer** ✅

**Minimum requis** :
- ✅ 9 pages admin accessibles (200 OK)
- ✅ 15 APIs fonctionnelles
- ✅ Menu admin intégré
- ✅ Formulaires opérationnels
- ✅ Base de données synchronisée

**Bonus** :
- ✅ Temps de réponse < 2s
- ✅ Aucune erreur console
- ✅ UI responsive
- ✅ Validation complète

---

## 🚀 LANCER LES TESTS MAINTENANT

### **Étape 1 : Démarrer le serveur**
```bash
cd /Users/richard/preprod/justrichard
npm run dev
```

### **Étape 2 : Lancer les tests**
```bash
# Dans un nouveau terminal
./test-cleaning-services.sh
```

### **Étape 3 : Vérifier les résultats**
```bash
# Tous les tests doivent être ✅ PASS
# Si un test échoue, vérifier les logs
```

---

**🧪 TESTS PRÊTS À ÊTRE LANCÉS ! ✨**

**Consultez ce document pour les instructions détaillées.**
