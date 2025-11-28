# 🔧 FIX - PAGE CURRENCIES VIDE

**Problème**: La page affiche "0 devise(s)" alors qu'il y en a 14 en base  
**Cause**: Le serveur Next.js utilise l'ancien client Prisma  
**Solution**: Redémarrer le serveur Next.js

---

## ✅ VÉRIFICATION

### 1. Les données sont bien en base:
```bash
npx tsx scripts/test-currencies.ts
```

**Résultat**: ✅ 14 devises + 13 taux de change

### 2. Le client Prisma est généré:
```bash
npx prisma generate
```

**Résultat**: ✅ Client généré

### 3. Le problème:
L'API `/api/admin/currencies` retourne une erreur car elle utilise l'ancien client Prisma qui n'a pas les nouveaux champs (`exchangeRatesFrom`, `exchangeRatesTo`, `displayOrder`).

---

## 🔧 SOLUTION

### Redémarrer le serveur Next.js:

```bash
# 1. Arrêter le serveur (Ctrl+C dans le terminal où il tourne)

# 2. Relancer le serveur
npm run dev
# ou
yarn dev
```

**Attendre** que le serveur redémarre complètement (~10-20 secondes).

---

## ✅ VÉRIFICATION APRÈS REDÉMARRAGE

### 1. Tester l'API:
```bash
curl http://localhost:3100/api/admin/currencies | jq '.stats'
```

**Résultat attendu**:
```json
{
  "total": 14,
  "active": 14,
  "inactive": 0,
  "defaultCurrency": {
    "code": "MAD",
    "name": "Moroccan Dirham"
  }
}
```

### 2. Ouvrir la page:
```
http://localhost:3100/en/admin/currencies
```

**Résultat attendu**:
- ✅ Total Devises: 14
- ✅ Devises Actives: 14
- ✅ Devise par Défaut: MAD
- ✅ Taux de Change: 13
- ✅ Tableau avec les 14 devises

---

## 📊 DEVISES EN BASE

1. **MAD** - Moroccan Dirham (DH) ⭐ DEFAULT
2. **USD** - US Dollar ($)
3. **EUR** - Euro (€)
4. **GBP** - British Pound (£)
5. **SAR** - Saudi Riyal (ر.س)
6. **AED** - UAE Dirham (د.إ)
7. **THB** - Thai Baht (฿)
8. **PHP** - Philippine Peso (₱)
9. **QAR** - Qatari Riyal (ر.ق)
10. **BHD** - Bahraini Dinar (BD)
11. **IDR** - Indonesian Rupiah (Rp)
12. **MYR** - Malaysian Ringgit (RM)
13. **SGD** - Singapore Dollar (S$)
14. **VND** - Vietnamese Dong (₫)

---

## 💱 TAUX DE CHANGE

13 taux créés:

**Depuis MAD**:
- MAD → USD = 0.10
- MAD → EUR = 0.093
- MAD → GBP = 0.079
- MAD → SAR = 0.38
- MAD → AED = 0.37
- MAD → THB = 3.50
- MAD → PHP = 5.80
- MAD → QAR = 0.36

**Vers MAD**:
- USD → MAD = 10.0
- EUR → MAD = 10.75
- GBP → MAD = 12.66
- SAR → MAD = 2.63
- AED → MAD = 2.70

---

## 🎯 RÉSUMÉ

### Problème:
- ❌ Page affiche "0 devise(s)"
- ❌ API retourne une erreur

### Cause:
- Serveur Next.js utilise l'ancien client Prisma
- Nouveau modèle `ExchangeRate` pas reconnu

### Solution:
- ✅ Redémarrer le serveur Next.js
- ✅ Attendre le redémarrage complet
- ✅ Recharger la page

---

## 🚀 APRÈS LE REDÉMARRAGE

La page devrait afficher:

```
┌─────────────────────────────────────────────────────────────┐
│  📊 STATISTIQUES                                            │
├─────────────────────────────────────────────────────────────┤
│  Total Devises    Devises Actives    Devise par Défaut     │
│       14                14                  MAD             │
│                                                             │
│  Taux de Change                                             │
│       13                                                    │
└─────────────────────────────────────────────────────────────┘

┌──────┬──────────────────┬────────┬──────────┬────────┬─────────┐
│ CODE │ NOM              │ SYMBOLE│ DÉCIMALES│ TAUX   │ STATUT  │
├──────┼──────────────────┼────────┼──────────┼────────┼─────────┤
│ MAD⭐│ Moroccan Dirham  │   DH   │    2     │ 13 taux│ Active  │
│ USD  │ US Dollar        │   $    │    2     │ 2 taux │ Active  │
│ EUR  │ Euro             │   €    │    2     │ 2 taux │ Active  │
│ ...  │ ...              │  ...   │   ...    │  ...   │  ...    │
└──────┴──────────────────┴────────┴──────────┴────────┴─────────┘
```

---

**🔧 ACTION REQUISE: REDÉMARRER LE SERVEUR NEXT.JS! 🔄**
