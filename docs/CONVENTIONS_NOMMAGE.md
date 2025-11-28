# 📐 CONVENTIONS DE NOMMAGE - JUSTRICHARD

**Date** : 20 Novembre 2025  
**Objectif** : Assurer la cohérence dans tout le code  
**Status** : Référence Officielle

---

## 🎯 RÈGLES GÉNÉRALES

### 1. Prisma Schema (schema.prisma)

#### Modèles (Tables)
- **Format** : `PascalCase`
- **Règle** : Singulier, première lettre majuscule
- **Exemples** :
  ```prisma
  model User { }          ✅ Correct
  model BlogPost { }      ✅ Correct
  model NavbarLink { }    ✅ Correct
  
  model user { }          ❌ Incorrect (minuscule)
  model Users { }         ❌ Incorrect (pluriel)
  model blog_post { }     ❌ Incorrect (snake_case)
  ```

#### Champs
- **Format** : `camelCase`
- **Règle** : Première lettre minuscule, mots suivants en majuscule
- **Exemples** :
  ```prisma
  model User {
    id            String    ✅ Correct
    firstName     String    ✅ Correct
    createdAt     DateTime  ✅ Correct
    isActive      Boolean   ✅ Correct
    
    FirstName     String    ❌ Incorrect (PascalCase)
    first_name    String    ❌ Incorrect (snake_case)
    FIRSTNAME     String    ❌ Incorrect (UPPERCASE)
  }
  ```

#### Relations
- **Format** : `PascalCase` (même nom que le modèle cible)
- **Règle** : Singulier pour relation 1-1 ou N-1, Pluriel pour 1-N
- **Exemples** :
  ```prisma
  model BlogPost {
    authorId  String
    Author    User      @relation(...)  ✅ Correct (N-1)
    
    author    User      ❌ Incorrect (minuscule)
  }
  
  model User {
    BlogPost  BlogPost[]  ✅ Correct (1-N, pluriel)
    
    blogPosts BlogPost[]  ❌ Incorrect (camelCase)
  }
  ```

#### Enums
- **Format Enum** : `PascalCase`
- **Format Valeurs** : `SCREAMING_SNAKE_CASE`
- **Exemples** :
  ```prisma
  enum UserRole {
    ADMIN           ✅ Correct
    PROVIDER        ✅ Correct
    SUPER_ADMIN     ✅ Correct
    
    admin           ❌ Incorrect
    SuperAdmin      ❌ Incorrect
  }
  ```

---

## 💾 BASE DE DONNÉES (PostgreSQL)

### Tables
- **Format** : Identique au modèle Prisma avec guillemets
- **Exemples** :
  ```sql
  "User"          ✅ Correct
  "BlogPost"      ✅ Correct
  "NavbarLink"    ✅ Correct
  
  user            ❌ Incorrect
  users           ❌ Incorrect
  ```

### Colonnes
- **Format** : Identique aux champs Prisma avec guillemets si nécessaire
- **Exemples** :
  ```sql
  SELECT id, "firstName", "createdAt" FROM "User"  ✅ Correct
  
  SELECT ID, firstname FROM user                   ❌ Incorrect
  ```

### Requêtes SQL Brutes
```typescript
// ✅ Correct
await prisma.$executeRaw`
  SELECT * FROM "User" WHERE "isActive" = true
`;

// ❌ Incorrect
await prisma.$executeRaw`
  SELECT * FROM users WHERE is_active = true
`;
```

---

## 💻 CODE TYPESCRIPT

### Prisma Client

#### Accès aux Modèles
- **Format** : `camelCase` (première lettre minuscule)
- **Exemples** :
  ```typescript
  // ✅ Correct
  await prisma.user.findMany()
  await prisma.blogPost.findMany()
  await prisma.navbarLink.findMany()
  
  // ❌ Incorrect
  await prisma.User.findMany()
  await prisma.BlogPost.findMany()
  await prisma.NavbarLink.findMany()
  ```

#### Types TypeScript
- **Format** : `PascalCase` (même nom que le modèle)
- **Exemples** :
  ```typescript
  // ✅ Correct
  import { User, BlogPost, NavbarLink } from '@prisma/client';
  
  const user: User = await prisma.user.findUnique({ ... });
  
  // ❌ Incorrect
  import { user, blogPost } from '@prisma/client';
  ```

### Variables et Fonctions

#### Variables
- **Format** : `camelCase`
- **Exemples** :
  ```typescript
  // ✅ Correct
  const userId = '123';
  const blogPosts = await prisma.blogPost.findMany();
  const isActive = true;
  
  // ❌ Incorrect
  const UserId = '123';
  const blog_posts = await prisma.blogPost.findMany();
  const IsActive = true;
  ```

#### Fonctions
- **Format** : `camelCase`
- **Exemples** :
  ```typescript
  // ✅ Correct
  async function getUserById(id: string) { }
  async function createBlogPost(data: any) { }
  
  // ❌ Incorrect
  async function GetUserById(id: string) { }
  async function create_blog_post(data: any) { }
  ```

#### Composants React
- **Format** : `PascalCase`
- **Exemples** :
  ```typescript
  // ✅ Correct
  export default function UserProfile() { }
  export default function BlogPostCard() { }
  
  // ❌ Incorrect
  export default function userProfile() { }
  export default function blog_post_card() { }
  ```

---

## 📁 FICHIERS ET DOSSIERS

### Fichiers de Composants
- **Format** : `PascalCase.tsx`
- **Exemples** :
  ```
  ✅ Correct
  UserProfile.tsx
  BlogPostCard.tsx
  NavbarLink.tsx
  
  ❌ Incorrect
  userProfile.tsx
  blog-post-card.tsx
  navbar_link.tsx
  ```

### Fichiers Utilitaires
- **Format** : `camelCase.ts` ou `kebab-case.ts`
- **Exemples** :
  ```
  ✅ Correct
  loadJson.ts
  auth-middleware.ts
  prisma-client.ts
  
  ❌ Incorrect
  LoadJson.ts
  Auth_Middleware.ts
  ```

### Dossiers
- **Format** : `kebab-case` ou `camelCase`
- **Exemples** :
  ```
  ✅ Correct
  app/components/
  app/api/
  app/[locale]/
  
  ❌ Incorrect
  app/Components/
  app/API/
  ```

---

## 🔍 TABLEAU DE RÉFÉRENCE RAPIDE

### Prisma → Code

| Prisma Schema | Prisma Client | TypeScript Type | SQL Table |
|---------------|---------------|-----------------|-----------|
| `User` | `prisma.user` | `User` | `"User"` |
| `BlogPost` | `prisma.blogPost` | `BlogPost` | `"BlogPost"` |
| `NavbarLink` | `prisma.navbarLink` | `NavbarLink` | `"NavbarLink"` |
| `FooterContent` | `prisma.footerContent` | `FooterContent` | `"FooterContent"` |
| `PageContent` | `prisma.pageContent` | `PageContent` | `"PageContent"` |

### Champs Communs

| Prisma Field | Type | Description |
|--------------|------|-------------|
| `id` | `String` | Identifiant unique |
| `createdAt` | `DateTime` | Date de création |
| `updatedAt` | `DateTime` | Date de mise à jour |
| `isActive` | `Boolean` | Statut actif/inactif |
| `userId` | `String` | Référence vers User |
| `slug` | `String` | URL-friendly identifier |

---

## ⚠️ ERREURS COURANTES À ÉVITER

### 1. Majuscule/Minuscule dans Prisma Client

```typescript
// ❌ ERREUR
await prisma.User.findMany()
// Error: Property 'User' does not exist

// ✅ CORRECT
await prisma.user.findMany()
```

### 2. Nom de Table SQL

```typescript
// ❌ ERREUR
await prisma.$executeRaw`SELECT * FROM users`
// Error: relation "users" does not exist

// ✅ CORRECT
await prisma.$executeRaw`SELECT * FROM "User"`
```

### 3. Nom de Colonne SQL

```typescript
// ❌ ERREUR
await prisma.$executeRaw`SELECT first_name FROM "User"`
// Error: column "first_name" does not exist

// ✅ CORRECT
await prisma.$executeRaw`SELECT "firstName" FROM "User"`
```

### 4. Import de Types

```typescript
// ❌ ERREUR
import { user } from '@prisma/client';
// Error: Module has no exported member 'user'

// ✅ CORRECT
import { User } from '@prisma/client';
```

### 5. Relations

```typescript
// ❌ ERREUR
const post = await prisma.blogPost.findUnique({
  include: { author: true }  // minuscule
});

// ✅ CORRECT
const post = await prisma.blogPost.findUnique({
  include: { Author: true }  // PascalCase
});
```

---

## 🛠️ OUTILS DE VÉRIFICATION

### 1. Générer le Glossaire

```bash
npm run docs:generate
```

Génère automatiquement :
- `docs/GLOSSAIRE_PRISMA.md` - Glossaire complet
- `docs/REFERENCE_RAPIDE_PRISMA.md` - Référence rapide

### 2. Vérifier le Schéma Prisma

```bash
npx prisma validate
```

### 3. Générer le Client Prisma

```bash
npm run db:generate
```

### 4. TypeScript Strict Mode

Dans `tsconfig.json` :
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## 📝 CHECKLIST AVANT COMMIT

- [ ] Tous les modèles Prisma en `PascalCase`
- [ ] Tous les champs en `camelCase`
- [ ] Toutes les relations en `PascalCase`
- [ ] Prisma Client utilise `camelCase` (ex: `prisma.user`)
- [ ] Types TypeScript en `PascalCase` (ex: `User`)
- [ ] SQL utilise guillemets (ex: `"User"`, `"firstName"`)
- [ ] Composants React en `PascalCase`
- [ ] Fonctions et variables en `camelCase`
- [ ] Pas d'erreurs TypeScript
- [ ] `npm run db:generate` exécuté après modification schema

---

## 🎓 EXEMPLES COMPLETS

### Exemple 1 : Créer un Nouveau Modèle

```prisma
// ✅ schema.prisma
model PropertyListing {
  id          String   @id
  title       String
  price       Float
  cityId      String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime
  City        City     @relation(fields: [cityId], references: [id])
  
  @@index([cityId])
  @@index([isActive])
}
```

```typescript
// ✅ Code TypeScript
import { PropertyListing } from '@prisma/client';

async function getActiveListings(): Promise<PropertyListing[]> {
  return await prisma.propertyListing.findMany({
    where: { isActive: true },
    include: { City: true }
  });
}
```

### Exemple 2 : Requête SQL Brute

```typescript
// ✅ Correct
await prisma.$executeRaw`
  UPDATE "PropertyListing"
  SET "isActive" = false
  WHERE "createdAt" < NOW() - INTERVAL '30 days'
`;
```

### Exemple 3 : Composant React

```typescript
// ✅ PropertyCard.tsx
import { PropertyListing } from '@prisma/client';

interface PropertyCardProps {
  listing: PropertyListing;
}

export default function PropertyCard({ listing }: PropertyCardProps) {
  return (
    <div>
      <h3>{listing.title}</h3>
      <p>${listing.price}</p>
    </div>
  );
}
```

---

## 🔄 MISE À JOUR

Ce document est généré automatiquement. Pour le mettre à jour :

```bash
npm run docs:generate
```

**Dernière mise à jour** : 20 Novembre 2025

---

**Référence Officielle - À consulter avant chaque modification du schéma**
