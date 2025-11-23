# 📜 Guide d'Utilisation des Scripts

## 🔄 Scripts de Maintenance

### 1. `./scripts/clean-restart.sh` - Nettoyage Complet + Redémarrage

**Usage:**
```bash
./scripts/clean-restart.sh
```

**Ce qu'il fait:**
1. ✅ Arrête le serveur Next.js (si actif)
2. ✅ Supprime le cache `.next`
3. ✅ Supprime le cache `node_modules/.cache`
4. ✅ Régénère le client Prisma
5. ✅ Redémarre le serveur automatiquement
6. ✅ Vérifie que le serveur répond
7. ✅ Affiche les logs en temps réel

**Quand l'utiliser:**
- Après modification du schéma Prisma
- Quand le serveur utilise un ancien client
- Pour un redémarrage propre complet
- Quand vous avez des erreurs de cache

**Sortie:**
```
╔══════════════════════════════════════════════════════════════╗
║   🔄 NETTOYAGE ET REDÉMARRAGE DU SERVEUR                   ║
╚══════════════════════════════════════════════════════════════╝

1. Arrêt du serveur Next.js...
   ✓ Serveur arrêté

2. Nettoyage du cache Next.js...
   ✓ Cache .next supprimé

3. Nettoyage du cache node_modules...
   ✓ Cache node_modules supprimé

4. Régénération du client Prisma...
   ✓ Client Prisma régénéré

5. Redémarrage du serveur...
   → Démarrage de npm run dev...
   ⏳ Attente du démarrage du serveur...
   ✓ Serveur démarré avec succès !

╔══════════════════════════════════════════════════════════════╗
║   ✅ SERVEUR PRÊT                                          ║
╚══════════════════════════════════════════════════════════════╝

📍 URL: http://localhost:3100
📍 Admin: http://localhost:3100/en/admin/data
🔧 PID: 12345

Pour arrêter le serveur:
   kill 12345
   ou Ctrl+C dans ce terminal
```

---

### 2. `./scripts/clean-cache.sh` - Nettoyage Uniquement

**Usage:**
```bash
./scripts/clean-cache.sh
```

**Ce qu'il fait:**
1. ✅ Supprime le cache `.next`
2. ✅ Supprime le cache `node_modules/.cache`
3. ✅ Supprime le cache `node_modules/.prisma`
4. ✅ Régénère le client Prisma
5. ⏸️ Ne redémarre PAS le serveur

**Quand l'utiliser:**
- Quand vous voulez nettoyer avant de redémarrer manuellement
- Pour préparer un redémarrage
- Quand vous voulez contrôler le redémarrage

**Après ce script:**
```bash
npm run dev
```

---

## 🧪 Scripts de Test

### 3. `./scripts/test-currency-update.sh` - Test de Mise à Jour

**Usage:**
```bash
./scripts/test-currency-update.sh
```

**Ce qu'il fait:**
1. ✅ Récupère les devises disponibles
2. ✅ Récupère les pays
3. ✅ Teste la mise à jour d'un pays (Bahrain) avec une devise (AED)
4. ✅ Vérifie que la mise à jour a réussi

**Quand l'utiliser:**
- Après un redémarrage du serveur
- Pour vérifier que les updates fonctionnent
- Pour tester l'API

**Sortie attendue (succès):**
```
==========================================
TEST: Mise à jour Currency pour Countries
==========================================

1. Récupération des devises...
✓ Devises récupérées

2. Récupération des pays...
✓ Pays récupérés

3. Test: Mise à jour Bahrain avec devise AED...
✓ Mise à jour réussie !

4. Vérification de la mise à jour...
✓ Vérification réussie !

==========================================
✓ TOUS LES TESTS RÉUSSIS !
==========================================
```

---

## 📊 Scripts de Données

### 4. `npx tsx scripts/complete-countries-data.ts` - Remplir les Pays

**Usage:**
```bash
npx tsx scripts/complete-countries-data.ts
```

**Ce qu'il fait:**
- ✅ Remplit tous les pays avec données complètes
- ✅ Ajoute slug, description, images, meta SEO
- ✅ Lie les devises aux pays

**Déjà exécuté:** ✅ Oui

---

### 5. `npx tsx scripts/add-missing-currency.ts` - Ajouter BHD

**Usage:**
```bash
npx tsx scripts/add-missing-currency.ts
```

**Ce qu'il fait:**
- ✅ Ajoute la devise BHD (Bahraini Dinar)

**Déjà exécuté:** ✅ Oui

---

## 🎯 Workflows Recommandés

### Workflow 1: Après Modification du Schéma Prisma

```bash
# 1. Modifier prisma/schema.prisma
# 2. Appliquer les changements
npx prisma db push

# 3. Nettoyer et redémarrer
./scripts/clean-restart.sh

# 4. Tester
./scripts/test-currency-update.sh
```

### Workflow 2: Redémarrage Rapide

```bash
# Tout en une commande
./scripts/clean-restart.sh
```

### Workflow 3: Nettoyage Manuel

```bash
# 1. Nettoyer
./scripts/clean-cache.sh

# 2. Redémarrer manuellement
npm run dev

# 3. Tester
./scripts/test-currency-update.sh
```

---

## 🚨 Résolution de Problèmes

### Problème: "Unknown argument nameAr"

**Cause:** Le serveur utilise l'ancien client Prisma

**Solution:**
```bash
./scripts/clean-restart.sh
```

### Problème: Le serveur ne démarre pas

**Solution:**
```bash
# Arrêter tous les processus Node
pkill -f "next dev"

# Nettoyer
./scripts/clean-cache.sh

# Redémarrer manuellement
npm run dev
```

### Problème: Port 3100 déjà utilisé

**Solution:**
```bash
# Trouver le processus
lsof -i :3100

# Tuer le processus
kill -9 <PID>

# Redémarrer
./scripts/clean-restart.sh
```

---

## 📝 Résumé des Commandes

| Script | Action | Redémarre | Quand |
|--------|--------|-----------|-------|
| `clean-restart.sh` | Nettoie + Redémarre | ✅ Oui | Après modif Prisma |
| `clean-cache.sh` | Nettoie seulement | ❌ Non | Avant redémarrage manuel |
| `test-currency-update.sh` | Teste l'API | ❌ Non | Après redémarrage |
| `complete-countries-data.ts` | Remplit données | ❌ Non | Une seule fois |

---

## ✅ Checklist de Maintenance

- [ ] Modifier le schéma Prisma
- [ ] `npx prisma db push`
- [ ] `./scripts/clean-restart.sh`
- [ ] Attendre "✅ SERVEUR PRÊT"
- [ ] `./scripts/test-currency-update.sh`
- [ ] Vérifier l'interface admin
- [ ] Tester les updates

---

**🎉 Tout est prêt pour un développement fluide !**
