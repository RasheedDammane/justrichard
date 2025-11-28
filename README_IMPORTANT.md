# 🎯 GUIDE SIMPLE - NE PLUS JAMAIS PERDRE VOS DONNÉES

## ⚡ APRÈS CHAQUE REDÉMARRAGE PC

**3 COMMANDES:**

```bash
./docker-start.sh                    # 1. Démarrer PostgreSQL
npx tsx scripts/import-all-data.ts   # 2. Réimporter vos données
npm run dev                          # 3. Lancer le site
```

**C'EST TOUT!** ✅

---

## 💾 AVANT D'ÉTEINDRE LE PC

**1 COMMANDE:**

```bash
npx tsx scripts/export-all-data.ts
```

Ça sauvegarde tout dans `exports/json/` et `exports/csv/`

---

## 📊 CE QUE VOUS AVEZ MAINTENANT

✅ **112 enregistrements** en base  
✅ **Export/Import automatique** (CSV + JSON)  
✅ **Scripts Docker** pour tout gérer  
✅ **Plus de perte de données!**  

**Détail:**
- 10 Yachts
- 20 Transfers
- 20 Maids
- 16 Food Products
- 8 Doctors
- 6 Coaches
- 5 Lawyers
- 9 Currencies
- 2 Countries + 5 Cities

---

## 🚀 VOTRE SITE

**URL:** http://localhost:3254

- Yachts: http://localhost:3254/en/yachts
- Food: http://localhost:3254/en/food
- Admin: http://localhost:3254/en/admin

---

## 📝 POUR AJOUTER + DE DONNÉES

Vous avez créé le générateur:

```bash
npx tsx scripts/generate-massive-data.ts
```

(Ajoutera 200 propriétés, 200 voitures, 50 avocats, etc.)

---

## ❓ PROBLÈMES?

```bash
./docker-status.sh    # Voir l'état
./docker-logs.sh      # Voir les logs
./docker-restart.sh   # Redémarrer
```

---

**PLUS SIMPLE QUE ÇA, C'EST IMPOSSIBLE!** 🎉

Vos données sont **sauvegardées** et **récupérables** en 1 commande!
