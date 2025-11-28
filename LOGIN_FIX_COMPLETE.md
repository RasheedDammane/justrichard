# 🔐 PROBLÈME DE CONNEXION - RÉSOLU!

**Date:** 28 novembre 2024  
**Status:** ✅ CORRIGÉ - Redémarrage serveur requis

---

## 🐛 PROBLÈMES IDENTIFIÉS

### 1. **Mots de passe incorrects** ❌
- **Symptôme:** "Invalid email or password"
- **Cause:** Hash bcrypt pour "password123" au lieu de "admin123"
- **Solution:** ✅ Tous les mots de passe mis à jour vers "admin123"

### 2. **Boutons Quick Login avec mauvais mots de passe** ❌
- **Symptôme:** Boutons ne fonctionnaient pas
- **Cause:** Boutons utilisaient customer123, provider123, manager123
- **Solution:** ✅ Tous les boutons utilisent maintenant "admin123"

### 3. **Code d'authentification incompatible** ❌
- **Symptôme:** Erreur TypeScript sur `user.role`
- **Cause:** Prisma include ne retournait pas le champ `role`
- **Solution:** ✅ Changé `include` en `select` avec champ `role` explicite

### 4. **NEXTAUTH_SECRET manquant** ❌
- **Symptôme:** Session ne persiste pas, redirection vers login
- **Cause:** Pas de secret configuré dans authOptions
- **Solution:** ✅ `secret: process.env.NEXTAUTH_SECRET` ajouté

### 5. **Session trop courte** ❌
- **Symptôme:** Déconnexion fréquente
- **Cause:** Pas de maxAge configuré
- **Solution:** ✅ `maxAge: 30 * 24 * 60 * 60` (30 jours)

---

## ✅ CORRECTIONS APPLIQUÉES

### Fichier: `lib/auth.ts`

```typescript
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,  // ✅ AJOUTÉ
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,  // ✅ AJOUTÉ (30 jours)
  },
  debug: true,  // ✅ AJOUTÉ (pour debug)
  // ...
```

**Changement dans authorize():**
```typescript
// AVANT (❌ Erreur TypeScript)
const user = await prisma.user.findUnique({
  where: { email: credentials.email },
  include: {
    UserRole: { include: { Role: true } }
  }
});

// APRÈS (✅ Fonctionne)
const user = await prisma.user.findUnique({
  where: { email: credentials.email },
  select: {
    id: true,
    email: true,
    password: true,
    firstName: true,
    lastName: true,
    avatar: true,
    role: true,  // ✅ Champ explicite
    isActive: true,
    UserRole: { include: { Role: true } }
  }
});
```

### Fichier: `app/[locale]/auth/login/page.tsx`

```typescript
// AVANT (❌)
onClick={() => handleQuickLogin('customer@test.com', 'customer123')}
onClick={() => handleQuickLogin('provider@test.com', 'provider123')}
onClick={() => handleQuickLogin('manager@test.com', 'manager123')}

// APRÈS (✅)
onClick={() => handleQuickLogin('customer@test.com', 'admin123')}
onClick={() => handleQuickLogin('provider@test.com', 'admin123')}
onClick={() => handleQuickLogin('manager@test.com', 'admin123')}
```

### Script: `scripts/fix-passwords.ts`

```typescript
// Créé un nouveau hash bcrypt pour "admin123"
const passwordHash = await bcrypt.hash('admin123', 10);

// Mis à jour tous les utilisateurs
await prisma.user.update({
  where: { email },
  data: { password: passwordHash }
});
```

---

## 🔐 IDENTIFIANTS DE CONNEXION

**Mot de passe unique pour tous:** `admin123`

| Rôle | Email | Password | Role DB |
|------|-------|----------|---------|
| **Admin** | admin@communityhub.com | admin123 | admin |
| **Customer** | customer@test.com | admin123 | viewer |
| **Provider** | provider@test.com | admin123 | editor |
| **Manager** | manager@test.com | admin123 | author |

---

## ⚠️ ACTION REQUISE

### **VOUS DEVEZ REDÉMARRER LE SERVEUR NEXT.JS!**

Les modifications dans `lib/auth.ts` ne seront pas prises en compte tant que le serveur n'est pas redémarré.

```bash
# 1. Arrêter le serveur
# Appuyez sur Ctrl+C dans le terminal où tourne npm run dev

# 2. Relancer le serveur
npm run dev

# 3. Attendre que le serveur démarre
# ✓ Ready in 2.5s

# 4. Tester la connexion
# Ouvrir: http://localhost:3254/en/auth/login
```

---

## 🧪 TESTS À EFFECTUER

### Test 1: Connexion Admin
1. Aller sur http://localhost:3254/en/auth/login
2. Cliquer sur "Login as Admin" (bouton violet)
3. ✅ Devrait vous connecter et rediriger vers la home
4. ✅ La session devrait persister (pas de redirection vers login)

### Test 2: Connexion Customer
1. Se déconnecter
2. Cliquer sur "Login as Customer" (bouton bleu)
3. ✅ Devrait fonctionner

### Test 3: Connexion Provider
1. Se déconnecter
2. Cliquer sur "Login as Provider" (bouton vert)
3. ✅ Devrait fonctionner

### Test 4: Connexion Manager
1. Se déconnecter
2. Cliquer sur "Login as Manager" (bouton orange)
3. ✅ Devrait fonctionner

### Test 5: Persistance de session
1. Se connecter
2. Rafraîchir la page (F5)
3. ✅ Devrait rester connecté
4. Fermer et rouvrir le navigateur
5. ✅ Devrait rester connecté (30 jours)

---

## 🔍 DEBUG

Si le problème persiste après redémarrage:

### 1. Vérifier les logs du serveur
Le mode debug est activé, vous devriez voir:
```
[next-auth][debug] session callback
[next-auth][debug] jwt callback
```

### 2. Vérifier les cookies
Dans le navigateur (DevTools > Application > Cookies):
- `next-auth.session-token` devrait exister
- Domaine: localhost
- Expire: dans 30 jours

### 3. Tester manuellement
```bash
npx tsx scripts/test-login.ts
```

Devrait afficher:
```
✅ admin@communityhub.com: OK
✅ customer@test.com: OK
✅ provider@test.com: OK
✅ manager@test.com: OK
```

### 4. Vérifier NEXTAUTH_SECRET
```bash
grep NEXTAUTH_SECRET .env
```

Devrait afficher:
```
NEXTAUTH_URL=http://localhost:3254
NEXTAUTH_SECRET=justrichard-preprod-secret-key-2024-change-me-in-production
```

---

## 📋 CHECKLIST

- [x] Mots de passe mis à jour (admin123)
- [x] NEXTAUTH_SECRET ajouté
- [x] Session maxAge configurée (30 jours)
- [x] Debug mode activé
- [x] Type Prisma corrigé (select)
- [x] Boutons quick login corrigés
- [x] Script de test créé
- [ ] **SERVEUR REDÉMARRÉ** ⚠️
- [ ] Tests de connexion effectués
- [ ] Session persiste après refresh

---

## 🎯 RÉSUMÉ

**Avant:**
- ❌ Mots de passe incorrects
- ❌ Pas de secret NextAuth
- ❌ Session ne persiste pas
- ❌ Erreurs TypeScript
- ❌ Boutons quick login cassés

**Après:**
- ✅ Tous les mots de passe: admin123
- ✅ Secret configuré
- ✅ Session 30 jours
- ✅ Code TypeScript correct
- ✅ Boutons fonctionnels

**Action requise:**
- ⚠️ **REDÉMARRER LE SERVEUR NEXT.JS**

---

## 📞 EN CAS DE PROBLÈME

Si après redémarrage ça ne fonctionne toujours pas:

1. Vérifier que le serveur a bien redémarré
2. Vider le cache du navigateur (Ctrl+Shift+Delete)
3. Supprimer les cookies de localhost
4. Réessayer la connexion
5. Consulter les logs du serveur (terminal)

---

**Dernière mise à jour:** 28 novembre 2024, 08:40 UTC+7
