# 🔍 DEBUG - Currency Update Failed

**Erreur**: "Failed to update currency"  
**Cause possible**: Problème d'authentification ou de permissions

---

## 🧪 TESTS À FAIRE

### 1. Vérifie les logs du serveur

Dans le terminal où tourne `npm run dev`, tu devrais voir:
```
Session: { ... }
User role: ADMIN (ou MANAGER)
Updating currency: curr-xxx { name: "...", ... }
Currency updated successfully: USD
```

**Si tu vois**:
- `Session: undefined` → Problème d'authentification
- `User role: USER` → Problème de permissions
- Une erreur Prisma → Problème de base de données

### 2. Vérifie ton rôle utilisateur

Ouvre la console du navigateur (F12) et tape:
```javascript
fetch('/api/auth/session').then(r => r.json()).then(console.log)
```

Tu devrais voir:
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "role": "ADMIN"  // ou "MANAGER"
  }
}
```

**Si role = "USER"** → Tu n'as pas les permissions!

---

## 🔧 SOLUTIONS

### Solution 1: Changer ton rôle en ADMIN

```sql
-- Dans Prisma Studio (http://localhost:5557)
-- Ou directement en SQL:
UPDATE "User" 
SET role = 'ADMIN' 
WHERE email = 'ton-email@example.com';
```

### Solution 2: L'API accepte maintenant MANAGER

J'ai modifié l'API pour accepter les rôles:
- ✅ ADMIN
- ✅ MANAGER (nouveau)

Si tu es MANAGER, ça devrait fonctionner maintenant.

### Solution 3: Vérifier la session

Si la session est undefined, tu dois te reconnecter:
1. Logout
2. Login
3. Réessaye

---

## 📋 CHECKLIST DEBUG

- [ ] Vérifie les logs du serveur
- [ ] Vérifie ton rôle utilisateur
- [ ] Vérifie que tu es bien connecté
- [ ] Essaye de te reconnecter
- [ ] Vérifie que l'API retourne bien les données

---

## 🚀 APRÈS CORRECTION

Une fois que tu as le bon rôle (ADMIN ou MANAGER):

1. Recharge la page
2. Clique sur Edit
3. Modifie une devise
4. Clique Enregistrer
5. Tu devrais voir: "Devise mise à jour!" (ou un message de succès)

---

## 💡 ASTUCE

Pour tester rapidement, ouvre la console du navigateur et tape:

```javascript
// Test de l'API PUT
fetch('/api/admin/currencies/curr-usd', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    name: 'US Dollar (Test)',
    symbol: '$',
    isActive: true,
    decimalPlaces: 2
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

**Si ça retourne**:
- `{ error: "Not authenticated" }` → Reconnecte-toi
- `{ error: "Unauthorized - Admin or Manager role required" }` → Change ton rôle
- `{ currency: { ... } }` → ✅ Ça marche!

---

**🔍 REGARDE LES LOGS DU SERVEUR POUR VOIR L'ERREUR EXACTE!**
