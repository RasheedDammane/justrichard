# 🐛 Debug - Erreur "fetch failed"

## ❌ Erreur rencontrée
```
Oops! Something went wrong
fetch failed
Error ID: 2531133655
```

## ✅ Corrections appliquées

### 1. Ajout try/catch dans `/legal/page.tsx`
- ✅ Gestion d'erreur Prisma
- ✅ Fallback vers array vide si erreur
- ✅ Log de l'erreur dans la console

### 2. Ajout try/catch dans `/legal/[slug]/page.tsx`
- ✅ Gestion d'erreur Prisma
- ✅ Redirection vers 404 si erreur

### 3. Vérification base de données
- ✅ `npx prisma db push` - Base synchronisée

---

## 🔍 PROCHAINES ÉTAPES DE DEBUG

### 1. Vérifie les logs du serveur
Dans le terminal où `npm run dev` tourne, cherche :
```
Error fetching legal professionals: [détails de l'erreur]
```

### 2. Vérifie que le serveur a redémarré
```bash
# Arrête le serveur
Ctrl+C

# Redémarre
npm run dev
```

### 3. Teste à nouveau
```
http://localhost:3100/en/legal
```

### 4. Si l'erreur persiste, copie-moi :
- ✅ Les logs du terminal serveur
- ✅ L'erreur complète dans la console navigateur (F12)
- ✅ Le message d'erreur exact

---

## 🔧 Vérifications supplémentaires

### Vérifie que Prisma Client est à jour
```bash
npx prisma generate
```

### Vérifie la connexion DB
```bash
npx prisma db pull
```

### Teste une requête Prisma simple
Crée un fichier test :
```javascript
// test-prisma.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.legalProfessional.count();
    console.log('✅ Nombre de professionnels:', count);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

main();
```

Puis :
```bash
node test-prisma.js
```

---

## 💡 Causes possibles

1. **Prisma Client pas à jour**
   - Solution: `npx prisma generate`

2. **Serveur pas redémarré**
   - Solution: Redémarre `npm run dev`

3. **Table LegalProfessional n'existe pas en DB**
   - Solution: `npx prisma db push`

4. **Problème de connexion DB**
   - Vérifie `.env` : `DATABASE_URL`

5. **TypeScript cache**
   - Solution: Supprime `.next` puis redémarre

---

## 🚀 Actions rapides

```bash
# 1. Nettoie le cache
rm -rf .next

# 2. Regénère Prisma
npx prisma generate

# 3. Redémarre
npm run dev

# 4. Teste
open http://localhost:3100/en/legal
```

---

**Copie-moi les logs du serveur si l'erreur persiste !**
