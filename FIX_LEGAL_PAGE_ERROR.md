# 🔧 Fix : Erreur page /fr/services/legal

## ✅ Ce qui a été fait

1. ✅ Vérifié que le modèle `LegalProfessional` existe dans `schema.prisma`
2. ✅ Exécuté `npx prisma generate` - Succès
3. ✅ Exécuté `npx prisma db push` - Base de données synchronisée

## 🔧 Solution : Redémarrer le serveur

### Étape 1 : Arrêter le serveur
Dans le terminal où `npm run dev` tourne :
```bash
# Appuie sur Ctrl+C pour arrêter
```

### Étape 2 : Redémarrer le serveur
```bash
npm run dev
```

### Étape 3 : Tester la page
```
http://localhost:3100/fr/services/legal
```

---

## 🐛 Si l'erreur persiste

### Vérification 1 : Erreur dans la console
Ouvre la console du navigateur (F12) et regarde l'erreur exacte.

### Vérification 2 : Erreur serveur
Regarde le terminal où `npm run dev` tourne et copie l'erreur.

### Erreurs possibles et solutions

#### Erreur : "Property 'legalProfessional' does not exist on type 'PrismaClient'"
**Solution** :
```bash
# Regénère le client Prisma
npx prisma generate

# Redémarre le serveur
npm run dev
```

#### Erreur : "Table 'LegalProfessional' doesn't exist"
**Solution** :
```bash
# Applique la migration
npx prisma db push

# Redémarre le serveur
npm run dev
```

#### Erreur : "Cannot find module './LegalListClient'"
**Solution** :
Vérifie que le fichier existe :
```bash
ls -la app/\[locale\]/services/legal/LegalListClient.tsx
```

Si le fichier n'existe pas, il faut le recréer.

#### Erreur : "Cannot find module './LegalFilters'"
**Solution** :
Vérifie que le fichier existe :
```bash
ls -la app/\[locale\]/services/legal/LegalFilters.tsx
```

Si le fichier n'existe pas, il faut le recréer.

---

## 📋 Checklist de dépannage

- [ ] Prisma client généré (`npx prisma generate`)
- [ ] Base de données synchronisée (`npx prisma db push`)
- [ ] Serveur redémarré
- [ ] Fichier `LegalListClient.tsx` existe
- [ ] Fichier `LegalFilters.tsx` existe
- [ ] Pas d'erreur dans la console navigateur
- [ ] Pas d'erreur dans le terminal serveur

---

## 🎯 Test rapide

Une fois le serveur redémarré, la page devrait afficher :
- ✅ Hero section avec stats
- ✅ Section services
- ✅ Filtres
- ✅ Message "0 professionnels trouvés" (si aucun professionnel en DB)
- ✅ OU Grid de cards (si professionnels existent)

---

## 💡 Note importante

**La page fonctionnera même s'il n'y a aucun professionnel en base de données.**

Elle affichera simplement :
- Le hero
- Les services
- Les filtres
- Le message "0 professionnels trouvés"

Pour ajouter des professionnels :
```
http://localhost:3100/fr/admin/legal/new
```

---

## 🚀 Commandes rapides

```bash
# 1. Regénérer Prisma
npx prisma generate

# 2. Synchroniser DB
npx prisma db push

# 3. Redémarrer serveur
# Ctrl+C puis
npm run dev

# 4. Tester
open http://localhost:3100/fr/services/legal
```

---

**Si l'erreur persiste après ces étapes, copie-moi l'erreur exacte de la console !**
