# 👥 COMPTES DE TEST - LOGIN

## 🔐 TOUS LES MOTS DE PASSE: `password123`

---

## 🌐 URL DE LOGIN

**http://localhost:3254/en/login**

---

## 👤 COMPTES DISPONIBLES

### 🔑 ADMIN
- **admin@justrichard.com** (Super Admin)
- **admin@test.com** (Admin)

### 👔 PROVIDERS
- **yacht.owner@test.com** (Richard YachtOwner)
- **property.owner@test.com** (Sarah PropertyOwner)
- **car.rental@test.com** (Michael CarRental)
- **doctor@test.com** (Dr Emma Doctor)
- **lawyer@test.com** (David Lawyer)
- **coach@test.com** (Lisa Coach)

### 👥 CUSTOMERS  
- **user1@test.com** (Alice Customer)
- **user2@test.com** (Bob Customer)
- **user3@test.com** (Charlie Customer)
- **user4@test.com** (Diana Customer)
- **user5@test.com** (Eric Customer)

---

## ✅ TOTAL: 13 UTILISATEURS

**Mot de passe pour tous:** `password123`

---

## 🚀 POUR RECRÉER LES USERS

```bash
docker exec -i justrichard-preprod-db psql -U postgres -d preprod_justrichard < scripts/create-users.sql
```

Ou directement:

```bash
./scripts/create-users-sql.sh
```

---

**Les users sont sauvegardés dans vos exports!**
