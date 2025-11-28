# 🚀 DÉMARRAGE RAPIDE - JUSTRICHARD PREPROD

## ⚡ EN 1 SEULE COMMANDE!

```bash
./setup-docker.sh
```

**C'est TOUT!** Cette commande va:
1. ✅ Configurer Docker (PostgreSQL port 3100)
2. ✅ Créer tous les dossiers
3. ✅ Copier la configuration
4. ✅ Démarrer tous les services
5. ✅ Vérifier que tout fonctionne

---

## 📝 ENSUITE (3 étapes)

```bash
# 1. Migrations Prisma
npx prisma migrate dev --name add_food_grocery_system

# 2. Charger les données
npx ts-node prisma/seeds/food-products.ts

# 3. Démarrer l'app
npm run dev
```

---

## 🌐 URLS

- **Application**: http://localhost:3001
- **Food & Grocery**: http://localhost:3001/en/food
- **Admin**: http://localhost:3001/en/admin
- **Adminer (DB)**: http://localhost:8081
- **PgAdmin (DB)**: http://localhost:5050

---

## 🛠️ COMMANDES UTILES

```bash
./docker-status.sh     # Vérifier l'état
./docker-logs.sh       # Voir les logs
./docker-backup.sh     # Sauvegarder
./docker-stop.sh       # Arrêter
```

---

## 📚 DOCUMENTATION

| Fichier | Pour Quoi |
|---------|-----------|
| **DOCKER_README.md** | Guide Docker (base de données) |
| **FOOD_FINAL_SUMMARY.md** | Système Food & Grocery |
| **DOCKER_SETUP_GUIDE.md** | Guide détaillé Docker |

---

## ❓ PROBLÈMES?

### Docker ne démarre pas
```bash
# Ouvrir Docker Desktop
open -a Docker

# Attendre 30 secondes, puis:
./docker-start.sh
```

### Base de données ne démarre pas
```bash
# Voir les logs
./docker-logs.sh

# Reset complet si nécessaire
./docker-reset.sh
./docker-start.sh
```

### Port 3100 utilisé
```bash
# Changer le port dans .env.docker
POSTGRES_PORT=3101

# Redémarrer
./docker-restart.sh
```

---

## ✅ VÉRIFICATION

Après setup, vérifiez:

```bash
./docker-status.sh
```

Vous devriez voir:
- ✅ Docker actif
- ✅ PostgreSQL running sur port 3100
- ✅ Redis running
- ✅ Connexions OK

---

## 🎯 CHECKLIST COMPLÈTE

- [ ] Docker Desktop installé et démarré
- [ ] Exécuter `./setup-docker.sh`
- [ ] Vérifier `./docker-status.sh` (tout en vert)
- [ ] Exécuter `npx prisma migrate dev`
- [ ] Exécuter le seed Food
- [ ] Lancer `npm run dev`
- [ ] Visiter http://localhost:3001

---

## 🎉 C'EST PRÊT!

Votre environnement de développement est maintenant **100% opérationnel**!

**Démarrage quotidien:**
```bash
./docker-start.sh && npm run dev
```

---

**Version:** 1.0.0  
**Date:** 28 novembre 2024  
**Status:** ✅ PRÊT À UTILISER
