# 🐳 Docker PostgreSQL - SOLUTION DÉFINITIVE

## 🎯 PROBLÈME RÉSOLU!

✅ Base de données PostgreSQL sur **port 3100**  
✅ Configuration Docker **stable et optimisée**  
✅ Scripts **automatisés** pour toutes les opérations  
✅ **Plus de problèmes** de démarrage!  

---

## ⚡ INSTALLATION EN 1 COMMANDE

```bash
chmod +x setup-docker.sh && ./setup-docker.sh
```

**C'est TOUT!** 🎉

Le script va:
1. ✅ Rendre tous les scripts exécutables
2. ✅ Créer tous les dossiers nécessaires
3. ✅ Configurer l'environnement (.env)
4. ✅ Démarrer PostgreSQL + Redis + Adminer + PgAdmin
5. ✅ Vérifier que tout fonctionne

---

## 📦 CE QUI EST INSTALLÉ

### Services Docker

| Service | Port | Description |
|---------|------|-------------|
| PostgreSQL | 3100 | Base de données principale |
| Shadow DB | 3100 | Pour migrations Prisma |
| Redis | 6379 | Cache et sessions |
| Adminer | 8081 | Interface Web simple |
| PgAdmin | 5050 | Interface Web avancée |

### Connexions

**PostgreSQL:**
```
Host: localhost
Port: 3100
Database: preprod_justrichard
User: postgres
Password: postgres
```

**Redis:**
```
Host: localhost
Port: 6379
Password: redis123
```

**Adminer:** http://localhost:8081  
**PgAdmin:** http://localhost:5050 (admin@justrichard.com / admin123)

---

## 🛠️ SCRIPTS DISPONIBLES

### Usage Quotidien

```bash
./docker-start.sh      # Démarrer tout
./docker-status.sh     # Vérifier l'état
./docker-logs.sh       # Voir les logs
./docker-stop.sh       # Arrêter tout
```

### Maintenance

```bash
./docker-backup.sh     # Sauvegarder la DB
./docker-restore.sh    # Restaurer un backup
./docker-restart.sh    # Redémarrer proprement
./docker-reset.sh      # Reset complet (⚠️ DANGER)
```

---

## 🚀 DÉMARRAGE RAPIDE

### Option 1: Setup Automatique (Recommandé)

```bash
# Setup complet en 1 commande
chmod +x setup-docker.sh && ./setup-docker.sh

# Puis:
npx prisma migrate dev
npx ts-node prisma/seeds/food-products.ts
npm run dev
```

### Option 2: Manuel

```bash
# 1. Rendre exécutable
chmod +x docker-*.sh

# 2. Démarrer
./docker-start.sh

# 3. Configurer
cp .env.docker .env

# 4. Migrer
npx prisma migrate dev

# 5. Seed
npx ts-node prisma/seeds/food-products.ts

# 6. Run
npm run dev
```

---

## ✅ VÉRIFICATION

Après installation, vérifiez:

```bash
./docker-status.sh
```

Vous devriez voir:
- ✅ Docker actif
- ✅ PostgreSQL: Running
- ✅ Redis: Running
- ✅ Connexions: OK
- ✅ Taille de la DB

---

## 🔧 CONFIGURATION

### Fichiers de Configuration

| Fichier | Description |
|---------|-------------|
| `docker-compose.preprod.yml` | Configuration Docker |
| `.env.docker` | Variables d'environnement Docker |
| `.env` | Variables d'environnement app |
| `docker/postgres/init/` | Scripts d'initialisation DB |
| `docker/pgadmin/servers.json` | Configuration PgAdmin |

### Personnalisation

Pour changer les ports, éditez `.env.docker`:

```bash
POSTGRES_PORT=3101    # Changer de 3100 à 3101
ADMINER_PORT=8082     # Changer de 8081 à 8082
PGADMIN_PORT=5051     # Changer de 5050 à 5051
REDIS_PORT=6380       # Changer de 6379 à 6380
```

Puis redémarrez:
```bash
./docker-restart.sh
```

---

## 🐛 RÉSOLUTION DE PROBLÈMES

### Docker ne démarre pas

```bash
# Vérifier si Docker Desktop est lancé
open -a Docker

# Attendre qu'il démarre complètement
# Puis relancer
./docker-start.sh
```

### Port déjà utilisé

```bash
# Trouver qui utilise le port 3100
lsof -i :3100

# Tuer le processus
kill -9 <PID>

# Ou changer de port dans .env.docker
POSTGRES_PORT=3101
```

### PostgreSQL ne démarre pas

```bash
# Voir les erreurs
./docker-logs.sh
# Choisir option 1 (PostgreSQL)

# Si nécessaire, reset complet
./docker-reset.sh
./docker-start.sh
```

### Connexion refusée

```bash
# Redémarrer proprement
./docker-restart.sh

# Vérifier le status
./docker-status.sh

# Tester la connexion
docker exec -it justrichard-preprod-db psql -U postgres -d preprod_justrichard
```

### Erreur Prisma

```bash
# Vérifier que le container tourne
./docker-status.sh

# Vérifier la connexion
npx prisma db pull

# Reset Prisma
npx prisma migrate reset
```

---

## 💾 BACKUP & RESTAURATION

### Créer un Backup

```bash
./docker-backup.sh
# Fichier créé dans: ./backups/preprod_justrichard_YYYYMMDD_HHMMSS.sql.gz
```

### Restaurer un Backup

```bash
./docker-restore.sh
# ⚠️ ATTENTION: Écrase toutes les données!
```

### Backup Automatique

Ajoutez dans crontab pour backup quotidien à 2h du matin:

```bash
crontab -e
# Ajouter:
0 2 * * * cd /Users/richard/preprod/justrichard && ./docker-backup.sh
```

---

## 📊 MONITORING

### Voir les Statistiques

```bash
# Status complet
./docker-status.sh

# Logs en direct
./docker-logs.sh

# Stats Docker
docker stats

# Espace disque
docker system df
```

### Connexions Actives

```bash
docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -c "SELECT count(*) FROM pg_stat_activity;"
```

### Taille de la Base

```bash
docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -c "SELECT pg_size_pretty(pg_database_size('preprod_justrichard'));"
```

---

## 🎯 WORKFLOWS

### Développement Quotidien

```bash
# Matin
./docker-start.sh
npm run dev

# Travail...

# Soir (optionnel)
./docker-stop.sh
```

### Avant de Committer

```bash
# Backup avant modifications importantes
./docker-backup.sh

# Faire vos modifications...

# Tester
npm run dev

# Si OK, committer
git add .
git commit -m "..."
```

### Déploiement

```bash
# 1. Backup prod
./docker-backup.sh

# 2. Tester les migrations localement
npx prisma migrate dev

# 3. Si OK, deploy
git push origin main

# 4. Sur le serveur
npx prisma migrate deploy
```

---

## 🔒 SÉCURITÉ

### Mots de Passe

⚠️ **IMPORTANT**: Changez les mots de passe en production!

Dans `.env.docker`:
```bash
POSTGRES_PASSWORD=votre_mdp_securise
REDIS_PASSWORD=votre_mdp_securise
PGADMIN_PASSWORD=votre_mdp_securise
```

### Extensions de Sécurité

Extensions PostgreSQL installées:
- `pgcrypto` - Chiffrement
- `uuid-ossp` - UUIDs sécurisés

---

## 📚 DOCUMENTATION

| Fichier | Contenu |
|---------|---------|
| `DOCKER_README.md` | Ce fichier - Guide rapide |
| `DOCKER_SETUP_GUIDE.md` | Guide complet et détaillé |
| `FOOD_FINAL_SUMMARY.md` | Système Food & Grocery |
| `FOOD_SYSTEM_QUICKSTART.md` | Quick start Food |

---

## ✨ FONCTIONNALITÉS

✅ **Port personnalisé** (3100 au lieu de 5432)  
✅ **Shadow database** automatique pour Prisma  
✅ **Extensions PostgreSQL** préinstallées  
✅ **Redis** pour le cache  
✅ **2 interfaces web** (Adminer + PgAdmin)  
✅ **Backups automatisés**  
✅ **Scripts shell** pour tout gérer  
✅ **Healthchecks** intégrés  
✅ **Optimisations PostgreSQL**  
✅ **Volumes persistants**  
✅ **Réseau Docker** dédié  

---

## 🎉 C'EST FINI!

Votre base de données est maintenant:
- ✅ **Stable** et fiable
- ✅ **Optimisée** pour le développement
- ✅ **Facile** à gérer avec les scripts
- ✅ **Documentée** complètement
- ✅ **Sauvegardée** automatiquement

**Plus de problèmes de base de données!** 🎊

---

**Commande magique pour tout démarrer:**
```bash
./docker-start.sh && npm run dev
```

**En cas de problème:**
```bash
./docker-status.sh    # Diagnostic
./docker-logs.sh      # Voir les erreurs
./docker-restart.sh   # Redémarrer
```

---

**Version:** 1.0.0  
**Date:** 28 novembre 2024  
**Status:** ✅ Production Ready  
**Support:** DOCKER_SETUP_GUIDE.md (guide détaillé)
