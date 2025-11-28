# 🐳 Guide Complet Docker - JustRichard Preprod

## 🎯 Solution Définitive pour la Base de Données

Ce guide résout **TOUS** les problèmes de base de données Docker pour JustRichard Preprod.

---

## 🚀 DÉMARRAGE RAPIDE (3 commandes)

```bash
# 1. Rendre les scripts exécutables
chmod +x docker-*.sh

# 2. Démarrer Docker
./docker-start.sh

# 3. Copier la configuration
cp .env.docker .env
```

**C'est tout! Votre base de données tourne sur le port 3100** ✅

---

## 📋 CONFIGURATION

### Port et Accès

- **PostgreSQL**: `localhost:3100`
- **Base de données**: `preprod_justrichard`
- **User**: `postgres`
- **Password**: `postgres`
- **Shadow DB**: `preprod_justrichard_shadow` (pour Prisma)

### Interfaces Web

- **Adminer**: http://localhost:8081
- **PgAdmin**: http://localhost:5050
  - Email: admin@justrichard.com
  - Password: admin123

### Redis

- **Host**: `localhost:6379`
- **Password**: `redis123`

---

## 🛠️ SCRIPTS DISPONIBLES

### Gestion de Base

| Script | Description | Usage |
|--------|-------------|-------|
| `./docker-start.sh` | Démarre tous les conteneurs | Utilisation quotidienne |
| `./docker-stop.sh` | Arrête tous les conteneurs | Fin de journée |
| `./docker-restart.sh` | Redémarre proprement | Après modification config |
| `./docker-status.sh` | Affiche l'état complet | Diagnostic |

### Maintenance

| Script | Description | Danger |
|--------|-------------|--------|
| `./docker-logs.sh` | Voir les logs en direct | ✅ Sûr |
| `./docker-backup.sh` | Backup de la DB | ✅ Sûr |
| `./docker-restore.sh` | Restaurer un backup | ⚠️ Écrase les données |
| `./docker-reset.sh` | Reset complet | ❌ DANGER: Supprime tout! |

---

## 📖 UTILISATION DÉTAILLÉE

### 1️⃣ Premier Démarrage

```bash
# Rendre tous les scripts exécutables
chmod +x docker-*.sh

# Démarrer Docker
./docker-start.sh

# Copier la configuration
cp .env.docker .env

# Appliquer les migrations Prisma
npx prisma migrate dev

# Charger les données
npx ts-node prisma/seeds/food-products.ts

# Démarrer l'app
npm run dev
```

### 2️⃣ Vérifier que Tout Fonctionne

```bash
# Afficher le status complet
./docker-status.sh
```

Vous devriez voir:
- ✅ PostgreSQL: Running
- ✅ Redis: Running  
- ✅ Connexions actives
- ✅ Taille de la base

### 3️⃣ Utilisation Quotidienne

```bash
# Matin: Démarrer
./docker-start.sh

# Vérifier
./docker-status.sh

# Développer...
npm run dev

# Soir: Arrêter (optionnel)
./docker-stop.sh
```

---

## 🔧 RÉSOLUTION DES PROBLÈMES

### Problème: "Docker n'est pas démarré"

**Solution:**
1. Ouvrir Docker Desktop
2. Attendre qu'il soit complètement démarré
3. Relancer `./docker-start.sh`

### Problème: "Port 3100 déjà utilisé"

**Solution:**
```bash
# Trouver qui utilise le port
lsof -i :3100

# Arrêter le processus
kill -9 <PID>

# Ou changer le port dans .env.docker
POSTGRES_PORT=3101
```

### Problème: "PostgreSQL ne démarre pas"

**Solution:**
```bash
# Voir les logs
./docker-logs.sh
# Choisir option 1 (PostgreSQL)

# Si corruption de données:
./docker-reset.sh
./docker-start.sh
```

### Problème: "Connexion refusée"

**Solution:**
```bash
# Vérifier que les conteneurs tournent
docker ps

# Vérifier le réseau
docker network inspect justrichard-network

# Redémarrer proprement
./docker-restart.sh
```

### Problème: "Erreur de migration Prisma"

**Solution:**
```bash
# Vérifier la connexion
npx prisma db pull

# Reset Prisma (garde les données)
npx prisma migrate reset

# Ou reset complet
./docker-reset.sh
./docker-start.sh
npx prisma migrate dev
```

---

## 💾 BACKUP & RESTAURATION

### Créer un Backup

```bash
# Backup automatique
./docker-backup.sh

# Le fichier sera dans:
# ./backups/preprod_justrichard_YYYYMMDD_HHMMSS.sql.gz
```

### Restaurer un Backup

```bash
# Liste et restaure un backup
./docker-restore.sh

# ⚠️ ATTENTION: Écrase toutes les données actuelles!
```

### Backup Automatique Quotidien (Optionnel)

Ajoutez dans votre crontab:
```bash
# Ouvrir crontab
crontab -e

# Ajouter cette ligne (backup tous les jours à 2h du matin)
0 2 * * * cd /Users/richard/preprod/justrichard && ./docker-backup.sh
```

---

## 🔍 DIAGNOSTIC COMPLET

### Vérifier Tout le Système

```bash
# Status complet
./docker-status.sh

# Logs en direct
./docker-logs.sh

# Tester la connexion PostgreSQL
docker exec -it justrichard-preprod-db psql -U postgres -d preprod_justrichard

# Tester Redis
docker exec -it justrichard-preprod-redis redis-cli -a redis123 ping
```

### Vérifier les Performances

```bash
# Connexions actives
docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -c "SELECT count(*) FROM pg_stat_activity;"

# Taille de la base
docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -c "SELECT pg_size_pretty(pg_database_size('preprod_justrichard'));"

# Cache Redis
docker exec justrichard-preprod-redis redis-cli -a redis123 INFO stats
```

---

## 🎨 CONFIGURATION AVANCÉE

### Changer les Ports

Éditez `.env.docker`:
```bash
POSTGRES_PORT=3101  # Au lieu de 3100
ADMINER_PORT=8082   # Au lieu de 8081
PGADMIN_PORT=5051   # Au lieu de 5050
```

Puis redémarrez:
```bash
./docker-restart.sh
```

### Optimiser PostgreSQL

Le fichier `docker-compose.preprod.yml` contient déjà des optimisations:
- `shared_buffers=256MB` - Cache mémoire
- `max_connections=200` - Connexions simultanées
- `effective_cache_size=1GB` - Cache total estimé
- `work_mem=4MB` - Mémoire par opération

### Ajouter des Extensions PostgreSQL

```bash
# Se connecter à la base
docker exec -it justrichard-preprod-db psql -U postgres -d preprod_justrichard

# Créer une extension
CREATE EXTENSION IF NOT EXISTS "extension_name";
```

Extensions déjà installées:
- `uuid-ossp` - Génération d'UUIDs
- `pgcrypto` - Cryptographie
- `pg_trgm` - Recherche full-text

---

## 📊 MONITORING

### Voir les Logs en Direct

```bash
# Tous les services
docker-compose -f docker-compose.preprod.yml logs -f

# PostgreSQL uniquement
docker logs -f justrichard-preprod-db

# Dernières 100 lignes
docker logs --tail 100 justrichard-preprod-db
```

### Statistiques de Performance

```bash
# CPU & Mémoire
docker stats

# Espace disque
docker system df -v
```

---

## 🚨 EN CAS DE PROBLÈME GRAVE

### Reset Complet (⚠️ Supprime TOUT)

```bash
# 1. Backup d'abord!
./docker-backup.sh

# 2. Reset complet
./docker-reset.sh

# 3. Redémarrer
./docker-start.sh

# 4. Restaurer les données
./docker-restore.sh
# OU
npx prisma migrate dev
npx ts-node prisma/seeds/food-products.ts
```

### Nettoyage Docker Complet

```bash
# Arrêter tout
docker-compose -f docker-compose.preprod.yml down -v

# Nettoyer tout Docker
docker system prune -a --volumes

# Redémarrer
./docker-start.sh
```

---

## ✅ CHECKLIST DE VÉRIFICATION

Après chaque démarrage, vérifiez:

- [ ] `./docker-status.sh` affiche tout en vert
- [ ] Adminer accessible sur http://localhost:8081
- [ ] PgAdmin accessible sur http://localhost:5050
- [ ] Connexion Prisma fonctionne: `npx prisma studio`
- [ ] Application démarre: `npm run dev`
- [ ] Pas d'erreurs dans les logs: `./docker-logs.sh`

---

## 📞 AIDE RAPIDE

### Commandes les Plus Utiles

```bash
./docker-start.sh      # Démarrer
./docker-status.sh     # Vérifier
./docker-backup.sh     # Sauvegarder
./docker-logs.sh       # Débugger
./docker-stop.sh       # Arrêter
```

### URLs Importantes

- **Adminer**: http://localhost:8081
- **PgAdmin**: http://localhost:5050
- **Application**: http://localhost:3001
- **Prisma Studio**: http://localhost:5555 (après `npx prisma studio`)

### Connexion DB Prisma

Dans votre `.env`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:3100/preprod_justrichard?schema=public"
SHADOW_DATABASE_URL="postgresql://postgres:postgres@localhost:3100/preprod_justrichard_shadow?schema=public"
```

---

## 🎉 C'EST TERMINÉ!

Votre base de données Docker est maintenant:
- ✅ Configurée correctement
- ✅ Sur le port 3100
- ✅ Avec shadow database pour Prisma
- ✅ Avec Redis pour le cache
- ✅ Avec interfaces web (Adminer + PgAdmin)
- ✅ Avec scripts automatisés
- ✅ Avec backups automatiques
- ✅ **PLUS DE PROBLÈMES!** 🎊

**Commande magique pour tout démarrer:**
```bash
./docker-start.sh && npm run dev
```

---

**Créé le:** 28 novembre 2024  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
