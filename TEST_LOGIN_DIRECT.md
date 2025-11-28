# 🧪 TEST DE CONNEXION DIRECT

Testez manuellement dans le navigateur:

## 1. Ouvrir la console du navigateur
1. Ouvrir http://localhost:3254/en/auth/login
2. Appuyer sur F12 (DevTools)
3. Aller dans l'onglet "Console"

## 2. Exécuter ce code dans la console

```javascript
// Test de connexion
fetch('/api/auth/callback/credentials', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@communityhub.com',
    password: 'admin123',
    csrfToken: document.querySelector('[name=csrfToken]')?.value || '',
    callbackUrl: '/en',
    json: true
  })
}).then(r => r.json()).then(d => console.log('Résultat:', d));
```

## 3. Alternative: Utiliser le formulaire

1. Ouvrir http://localhost:3254/en/auth/login
2. Cliquer sur le bouton "Login as Admin" (violet)
3. Observer la console du navigateur ET le terminal du serveur

## 4. Ce que vous devriez voir

### Dans la console du navigateur:
- Soit une redirection vers `/en`
- Soit une erreur avec détails

### Dans le terminal du serveur:
```
[AUTH] Starting authorization for: admin@communityhub.com
[AUTH] User found: Yes
[AUTH] Has password: Yes
[AUTH] Password valid: true
[AUTH] Role determined: admin
[AUTH] Authorization successful: {...}
```

## 5. Si aucun log n'apparaît

Cela signifie que le code dans `lib/auth.ts` n'est PAS exécuté.

Causes possibles:
1. Le serveur n'a pas recompilé le fichier
2. Il y a une erreur de syntaxe qui empêche le chargement
3. Le cache Next.js est corrompu

## 6. Solution de dernier recours

```bash
# Arrêter complètement
lsof -ti:3254 | xargs kill -9

# Supprimer TOUT le cache
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Redémarrer
npm run dev
```

## 7. Test de vérification

Après redémarrage, exécutez:

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

Si ce test fonctionne mais pas la connexion web, le problème est dans NextAuth.
