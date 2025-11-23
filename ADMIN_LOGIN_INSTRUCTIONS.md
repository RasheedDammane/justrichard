# 🔐 INSTRUCTIONS DE CONNEXION ADMIN

## ⚠️ IMPORTANT

Pour voir les propriétés dans l'admin, **vous devez être connecté en tant qu'ADMIN**.

---

## 👤 COMPTE ADMIN

### Identifiants:
```
Email: admin@communityhub.com
Password: [votre mot de passe admin]
```

---

## 🚀 ÉTAPES POUR ACCÉDER À L'ADMIN

### 1. Se connecter
```
http://localhost:3100/en/auth/login
```

**Entrez:**
- Email: `admin@communityhub.com`
- Password: votre mot de passe

### 2. Accéder à l'admin properties
```
http://localhost:3100/en/admin/properties
```

**Vous devriez voir:**
- ✅ 16 propriétés au total
- ✅ Stats: 6 published, 10 draft
- ✅ Filtres fonctionnels (all, draft, published, sold, rented)
- ✅ Cards avec images, prix, détails

---

## 🔧 CORRECTIONS EFFECTUÉES

### 1. API Route
- ✅ Corrigé l'authentification (utilise strings au lieu de Role enum)
- ✅ Corrigé les relations (City, Country)
- ✅ Ajouté credentials dans le fetch

### 2. PropertiesClient
- ✅ Ajouté credentials: 'include' dans fetch
- ✅ Ajouté message clair si pas de propriétés
- ✅ Corrigé tous les noms de champs

### 3. Base de données
- ✅ 16 propriétés mises à jour
- ✅ 6 propriétés publiées
- ✅ Tous les champs complétés

---

## 📊 COMPTES DISPONIBLES

### Admin
- **Email**: admin@communityhub.com
- **Role**: ADMIN
- **Accès**: Tous les modules admin

### Manager
- **Email**: manager@test.com
- **Role**: MANAGER
- **Accès**: Gestion des propriétés

### Provider
- **Email**: provider@test.com
- **Role**: PROVIDER
- **Accès**: Ses propres services

### Customer
- **Email**: customer@test.com
- **Role**: CUSTOMER
- **Accès**: Site public uniquement

---

## 🐛 SI VOUS NE VOYEZ TOUJOURS PAS LES PROPRIÉTÉS

### 1. Vérifiez que vous êtes connecté
Ouvrez la console du navigateur (F12) et vérifiez:
```javascript
// Dans l'onglet Console
fetch('/api/auth/session').then(r => r.json()).then(console.log)
```

Vous devriez voir:
```json
{
  "user": {
    "id": "...",
    "email": "admin@communityhub.com",
    "role": "ADMIN"
  }
}
```

### 2. Vérifiez l'API
```javascript
// Dans l'onglet Console
fetch('/api/admin/properties', {
  credentials: 'include'
}).then(r => r.json()).then(console.log)
```

Vous devriez voir:
```json
{
  "properties": [...]
}
```

Si vous voyez `{"error": "Unauthorized"}`, vous n'êtes pas connecté.

### 3. Vérifiez la console
Ouvrez la console du navigateur (F12) et regardez s'il y a des erreurs.

### 4. Rafraîchissez la page
Après vous être connecté, rafraîchissez la page admin:
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

---

## ✅ TEST RAPIDE

### Terminal 1 - Vérifier les propriétés en DB
```bash
cd /Users/richard/preprod/justrichard
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.property.count().then(count => {
  console.log('Properties in DB:', count);
  prisma.\$disconnect();
});
"
```

### Terminal 2 - Tester l'API (après connexion)
```bash
# Ceci ne fonctionnera que si vous êtes connecté dans le navigateur
curl -s http://localhost:3100/api/admin/properties \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  | jq '.properties | length'
```

---

## 🎯 RÉSUMÉ

1. ✅ **Connectez-vous** avec admin@communityhub.com
2. ✅ **Accédez à** http://localhost:3100/en/admin/properties
3. ✅ **Vous devriez voir** 16 propriétés

**Si ça ne fonctionne toujours pas:**
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez que vous êtes bien connecté (voir étape 1 ci-dessus)
- Essayez de vous déconnecter et reconnecter

---

**Status**: ✅ Tout est prêt côté code, il faut juste se connecter!
