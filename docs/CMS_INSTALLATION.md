# 🚀 Installation du Système CMS

## ⚠️ Note importante sur les erreurs TypeScript

Les erreurs TypeScript actuelles dans `scripts/seed-cms-footer.ts` sont **normales et temporaires**. Elles disparaîtront après l'application de la migration Prisma.

## 📝 Étapes d'installation

### 1️⃣ Démarrer PostgreSQL

Assurez-vous que votre base de données PostgreSQL est démarrée :

```bash
# Vérifier si PostgreSQL est en cours d'exécution
pg_isready

# Ou démarrer PostgreSQL (selon votre installation)
brew services start postgresql@14
# ou
sudo service postgresql start
```

### 2️⃣ Appliquer la migration Prisma

```bash
cd /Users/richard/preprod/justrichard
npx prisma migrate dev --name add_cms_header_footer_system
```

Cette commande va :
- Créer les nouvelles tables dans la base de données
- Générer automatiquement le client Prisma avec les nouveaux modèles
- ✅ Résoudre toutes les erreurs TypeScript

### 3️⃣ Vérifier que la migration est appliquée

```bash
npx prisma studio
```

Vous devriez voir les nouvelles tables :
- ✅ `HeaderConfig`
- ✅ `NavbarAction`
- ✅ `FooterSection`
- ✅ `FooterLink`
- ✅ `SocialLink`
- ✅ `FooterBranding`

### 4️⃣ Seed des données initiales (optionnel)

```bash
npx ts-node scripts/seed-cms-footer.ts
```

Ce script va créer :
- ✅ 7 sections footer (Company, Professional Services, etc.)
- ✅ ~40 liens footer
- ✅ 4 liens sociaux (Facebook, Twitter, Instagram, LinkedIn)
- ✅ Footer branding (nom, tagline, newsletter, etc.)

### 5️⃣ Démarrer le serveur

```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:3100`

### 6️⃣ Accéder à l'interface CMS

Ouvrez votre navigateur et allez sur :

```
http://localhost:3100/en/admin/cms
```

## 🎯 Structure créée

### Fichiers Prisma
- ✅ `prisma/schema.prisma` - 6 nouveaux modèles ajoutés

### API Routes (10 routes)
```
✅ /api/admin/cms/header/route.ts
✅ /api/admin/cms/navbar/actions/route.ts
✅ /api/admin/cms/navbar/actions/[id]/route.ts
✅ /api/admin/cms/footer/sections/route.ts
✅ /api/admin/cms/footer/sections/[id]/route.ts
✅ /api/admin/cms/footer/links/route.ts
✅ /api/admin/cms/footer/links/[id]/route.ts
✅ /api/admin/cms/footer/branding/route.ts
✅ /api/admin/cms/social/route.ts
✅ /api/admin/cms/social/[id]/route.ts
```

### Pages Admin (4 pages)
```
✅ /app/[locale]/admin/cms/page.tsx
✅ /app/[locale]/admin/cms/header/page.tsx
✅ /app/[locale]/admin/cms/footer/page.tsx
✅ /app/[locale]/admin/cms/footer/sections/[id]/page.tsx
```

### Scripts
```
✅ scripts/seed-cms-footer.ts
```

### Documentation
```
✅ docs/CMS_SYSTEM_GUIDE.md
✅ docs/CMS_INSTALLATION.md
```

## ✅ Vérification de l'installation

### Test 1 : Accès au dashboard CMS
```
http://localhost:3100/en/admin/cms
```
Vous devriez voir 5 modules :
1. Header Configuration
2. Navbar Management
3. Footer Sections
4. Social Links
5. Footer Branding

### Test 2 : Gestion du Footer
```
http://localhost:3100/en/admin/cms/footer
```
Après le seed, vous devriez voir 7 sections avec leurs liens.

### Test 3 : Création d'une section
1. Cliquer sur "Add Section"
2. Remplir le formulaire
3. Ajouter quelques liens
4. Sauvegarder
5. ✅ Vérifier que la section apparaît dans la liste

### Test 4 : API
Testez les endpoints API :

```bash
# Get footer sections (EN)
curl http://localhost:3100/api/admin/cms/footer/sections?locale=en

# Get header config (EN)
curl http://localhost:3100/api/admin/cms/header?locale=en

# Get social links (EN)
curl http://localhost:3100/api/admin/cms/social?locale=en
```

## 🐛 Troubleshooting

### Erreur : "Can't reach database server"

```bash
# Vérifier que PostgreSQL est démarré
pg_isready

# Vérifier votre fichier .env
cat .env | grep DATABASE_URL
```

### Erreur : "Property 'footerSection' does not exist"

➡️ C'est normal ! Appliquez d'abord la migration :
```bash
npx prisma migrate dev --name add_cms_header_footer_system
```

### Erreur : "Table already exists"

Si la migration échoue car les tables existent déjà :

```bash
# Option 1 : Reset la base de données (⚠️ ATTENTION : supprime toutes les données)
npx prisma migrate reset

# Option 2 : Forcer la migration
npx prisma db push --accept-data-loss
```

### Page admin vide ou erreurs 404

1. Vérifier que le serveur Next.js est démarré
2. Vérifier la route : `/admin/cms` (pas `/cms/admin`)
3. Vider le cache du navigateur : `Cmd + Shift + R`

### Erreurs d'authentification

Les routes API nécessitent une session active. Assurez-vous :
1. D'être connecté en tant qu'admin
2. Que NextAuth est configuré correctement
3. Que la session est valide

## 📚 Documentation complète

Consultez le guide complet : [`docs/CMS_SYSTEM_GUIDE.md`](./CMS_SYSTEM_GUIDE.md)

## 🎉 Félicitations !

Votre système CMS est maintenant installé et prêt à l'emploi ! 

**Prochaines étapes :**
1. ✅ Accédez à `/admin/cms`
2. ✅ Explorez les différents modules
3. ✅ Personnalisez votre header et footer
4. ✅ Testez les différentes fonctionnalités

---

**Besoin d'aide ?** Consultez la documentation complète ou les logs serveur.
