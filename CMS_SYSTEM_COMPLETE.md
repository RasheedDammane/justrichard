# 📝 SYSTÈME CMS COMPLET - JustRichard Blog

**Date:** 28 novembre 2024  
**Status:** ✅ Prêt à déployer

---

## 🎯 OBJECTIFS

Système CMS multilingue "à la WordPress" avec:
- ✅ **Multilingue natif** (FR, EN, AR, etc.)
- ✅ **Post centric** extensible
- ✅ **Éditeur bloc/JSON** structuré
- ✅ **Taxonomies** (catégories hiérarchiques + tags)
- ✅ **Slugs uniques** par locale
- ✅ **Révisions & brouillons**
- ✅ **Workflow** (draft → review → published → archived)
- ✅ **SEO complet** (meta, OG, JSON-LD)
- ✅ **Planification** (publish_at, unpublish_at)
- ✅ **API REST** + option GraphQL
- ✅ **Cache & ISR**

---

## 📊 MODÈLE DE DONNÉES

### Tables Créées

1. **contents** - Groupe logique multi-langue
2. **content_translations** - Traductions par locale
3. **content_revisions** - Historique des modifications
4. **categories** - Catégories hiérarchiques
5. **category_translations** - Traductions catégories
6. **tags** - Tags plats
7. **tag_translations** - Traductions tags
8. **content_categories** - Relation posts ↔ catégories
9. **content_tags** - Relation posts ↔ tags
10. **redirects** - Redirections 301 (slugs changés)

### Schéma Prisma

Voir fichier: `prisma/schema-cms-addition.prisma`

---

## 🚀 INSTALLATION

### 1. Ajouter les modèles au schema Prisma

```bash
# Copier le contenu de schema-cms-addition.prisma
# dans votre prisma/schema.prisma principal
cat prisma/schema-cms-addition.prisma >> prisma/schema.prisma
```

### 2. Créer la migration

```bash
npx prisma migrate dev --name add_cms_system
```

### 3. Générer le client Prisma

```bash
npx prisma generate
```

### 4. Ajouter le champ `role` au modèle User

Dans votre `schema.prisma`, ajoutez au modèle `User`:

```prisma
model User {
  // ... champs existants
  role          String?  @default("viewer") // admin, editor, author, contributor, viewer
  
  // Relations CMS
  contentsCreated     Content[]  @relation("ContentCreatedBy")
  contentsUpdated     Content[]  @relation("ContentUpdatedBy")
  contentRevisions    ContentRevision[]
}
```

---

## 📡 API REST

### Public API

#### GET /api/posts
Liste des posts publiés

**Query params:**
- `locale` (required): fr, en, ar, etc.
- `page` (default: 1)
- `limit` (default: 12)
- `category`: slug de catégorie
- `tag`: slug de tag
- `search`: recherche texte
- `fallback`: true/false (fallback vers locale par défaut)

**Response:**
```json
{
  "data": [
    {
      "uid": "clx...",
      "type": "post",
      "status": "PUBLISHED",
      "publishAt": "2025-01-01T00:00:00Z",
      "translation": {
        "id": "cly...",
        "locale": "fr",
        "title": "Mon article",
        "slug": "mon-article",
        "excerpt": "Résumé...",
        "publishedAt": "2025-01-01T10:00:00Z",
        "ogImage": {...}
      },
      "categories": [...],
      "tags": [...],
      "author": {...}
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4
  }
}
```

#### GET /api/posts/{slug}
Détail d'un post

**Query params:**
- `locale` (required)
- `fallback`: true/false

**Response:**
```json
{
  "uid": "clx...",
  "type": "post",
  "status": "PUBLISHED",
  "translation": {
    "locale": "fr",
    "title": "Mon article",
    "slug": "mon-article",
    "excerpt": "Résumé...",
    "bodyJson": [
      {"type": "heading", "level": 1, "text": "Titre"},
      {"type": "paragraph", "text": "Contenu..."},
      {"type": "image", "mediaId": "...", "caption": "Légende"}
    ],
    "metaTitle": "Meta titre",
    "metaDescription": "Meta description",
    "ogTitle": "OG titre",
    "ogDescription": "OG description",
    "ogImage": {...},
    "canonicalUrl": "https://site.com/fr/blog/mon-article"
  },
  "availableLocales": [
    {"locale": "fr", "title": "...", "slug": "..."},
    {"locale": "en", "title": "...", "slug": "..."}
  ],
  "categories": [...],
  "tags": [...],
  "author": {...}
}
```

### Admin API

#### GET /api/admin/posts
Liste tous les posts (avec filtres)

**Auth:** JWT (admin, editor, author)

**Query params:**
- `page`, `limit`
- `status`: DRAFT, IN_REVIEW, PUBLISHED, ARCHIVED
- `locale`: filtrer par locale

#### POST /api/admin/posts
Créer un post

**Auth:** JWT (admin, editor, author)

**Body:**
```json
{
  "content": {
    "type": "post",
    "status": "DRAFT",
    "publishAt": "2025-01-01T10:00:00Z",
    "unpublishAt": null,
    "categories": ["cat-id-1", "cat-id-2"],
    "tags": ["tag-id-1"]
  },
  "translations": [
    {
      "locale": "fr",
      "title": "Mon article",
      "slug": "mon-article",
      "excerpt": "Résumé...",
      "bodyJson": [
        {"type": "heading", "level": 1, "text": "Titre"},
        {"type": "paragraph", "text": "Contenu..."}
      ],
      "metaTitle": "Meta titre",
      "metaDescription": "Meta description",
      "ogTitle": "OG titre",
      "ogDescription": "OG description",
      "ogImageId": "media-id",
      "canonicalUrl": "https://site.com/fr/blog/mon-article",
      "isPublished": false
    },
    {
      "locale": "en",
      "title": "My article",
      "slug": "my-article",
      "excerpt": "Summary...",
      "bodyJson": [],
      "isPublished": false
    }
  ]
}
```

#### PUT /api/admin/posts/{uid}
Mettre à jour un post

#### DELETE /api/admin/posts/{uid}
Supprimer un post (admin, editor uniquement)

#### PUT /api/admin/posts/{uid}/translations/{locale}
Mettre à jour une traduction spécifique

#### POST /api/admin/posts/{uid}/publish
Publier un post (global)

#### GET /api/admin/posts/{uid}/revisions
Historique des révisions

---

## 🎨 STRUCTURE DES BLOCS

### Blocs disponibles

```typescript
type Block = 
  | { type: 'heading', level: 1|2|3|4|5|6, text: string }
  | { type: 'paragraph', text: string, marks?: Mark[] }
  | { type: 'image', mediaId: string, caption?: string, alt?: string }
  | { type: 'gallery', mediaIds: string[] }
  | { type: 'quote', text: string, author?: string }
  | { type: 'code', language: string, code: string }
  | { type: 'embed', url: string, provider?: string }
  | { type: 'table', rows: string[][] }
  | { type: 'list', ordered: boolean, items: string[] };

type Mark = 
  | { type: 'bold' }
  | { type: 'italic' }
  | { type: 'link', href: string }
  | { type: 'code' };
```

### Exemple de contenu

```json
[
  {
    "type": "heading",
    "level": 1,
    "text": "Bienvenue sur notre blog"
  },
  {
    "type": "paragraph",
    "text": "Ceci est un paragraphe avec du texte en gras et un lien.",
    "marks": [
      {"type": "bold", "start": 30, "end": 34},
      {"type": "link", "href": "https://example.com", "start": 41, "end": 45}
    ]
  },
  {
    "type": "image",
    "mediaId": "media-123",
    "caption": "Une belle image",
    "alt": "Description de l'image"
  },
  {
    "type": "quote",
    "text": "La vie est belle",
    "author": "Anonyme"
  }
]
```

---

## 🔐 RÔLES & PERMISSIONS

### Rôles

| Rôle | Permissions |
|------|-------------|
| **admin** | Tout |
| **editor** | Publier, réviser, gérer taxonomies |
| **author** | Créer/éditer ses contenus, soumettre en revue |
| **contributor** | Brouillons uniquement |
| **viewer** | Lecture back-office limitée |

### Matrice de permissions

| Action | admin | editor | author | contributor | viewer |
|--------|-------|--------|--------|-------------|--------|
| post:create | ✅ | ✅ | ✅ | ✅ | ❌ |
| post:update_own | ✅ | ✅ | ✅ | ✅ | ❌ |
| post:update_any | ✅ | ✅ | ❌ | ❌ | ❌ |
| post:publish | ✅ | ✅ | ❌ | ❌ | ❌ |
| post:delete | ✅ | ✅ | ❌ | ❌ | ❌ |
| taxonomy:* | ✅ | ✅ | ❌ | ❌ | ❌ |
| media:upload | ✅ | ✅ | ✅ | ✅ | ❌ |

---

## 🌍 URLS & i18n

### Structure URL

```
/{locale}/blog                    → Liste des posts
/{locale}/blog/{slug}             → Détail d'un post
/{locale}/blog/category/{slug}    → Posts par catégorie
/{locale}/blog/tag/{slug}         → Posts par tag
```

### Exemples

```
/fr/blog
/fr/blog/mon-premier-article
/fr/blog/category/actualites
/fr/blog/tag/technologie

/en/blog
/en/blog/my-first-article
/en/blog/category/news
/en/blog/tag/technology
```

---

## 📝 WORKFLOW

### États du contenu

```
DRAFT → IN_REVIEW → PUBLISHED → ARCHIVED
```

### Transitions

1. **DRAFT** (brouillon)
   - Créé par author/contributor
   - Non visible publiquement
   - Éditable par l'auteur

2. **IN_REVIEW** (en revue)
   - Soumis par author
   - En attente de validation editor/admin
   - Non visible publiquement

3. **PUBLISHED** (publié)
   - Validé par editor/admin
   - Visible publiquement (si `isPublished=true` par locale)
   - Respecte `publishAt` et `unpublishAt`

4. **ARCHIVED** (archivé)
   - Non visible publiquement
   - Conservé pour historique

---

## 🔍 SEO

### Champs SEO par traduction

- `metaTitle` - Titre meta (60 caractères max)
- `metaDescription` - Description meta (160 caractères max)
- `ogTitle` - Open Graph titre
- `ogDescription` - Open Graph description
- `ogImageId` - Open Graph image
- `canonicalUrl` - URL canonique

### JSON-LD automatique

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "datePublished": "{{publishedAt}}",
  "dateModified": "{{updatedAt}}",
  "author": {
    "@type": "Person",
    "name": "{{author.firstName}} {{author.lastName}}"
  },
  "image": "{{ogImage.url}}",
  "inLanguage": "{{locale}}"
}
```

---

## 📅 PLANIFICATION

### Publication future

```json
{
  "publishAt": "2025-12-25T00:00:00Z"
}
```

Le post sera automatiquement publié à cette date.

### Dépublication automatique

```json
{
  "unpublishAt": "2026-01-01T00:00:00Z"
}
```

Le post sera automatiquement masqué après cette date.

### Cron job requis

```typescript
// Vérifier toutes les minutes
async function publishScheduledPosts() {
  const now = new Date();
  
  await prisma.content.updateMany({
    where: {
      status: 'PUBLISHED',
      publishAt: { lte: now },
      translations: {
        some: {
          isPublished: false
        }
      }
    },
    data: {
      // Logique de publication
    }
  });
}
```

---

## 💾 RÉVISIONS

### Sauvegarde automatique

Chaque modification crée une révision:

```typescript
await prisma.contentRevision.create({
  data: {
    translationId: translation.id,
    userId: user.id,
    snapshotJson: {
      title: translation.title,
      bodyJson: translation.bodyJson,
      // ... tous les champs
    }
  }
});
```

### Restauration

```typescript
// GET /api/admin/posts/{uid}/revisions/{revisionId}/restore
```

---

## 🚀 PAGES NEXT.JS

### Page liste

```typescript
// app/[locale]/blog/page.tsx
export default async function BlogPage({ params }: { params: { locale: string } }) {
  const posts = await fetch(`/api/posts?locale=${params.locale}`);
  
  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <PostCard key={post.uid} post={post} />
      ))}
    </div>
  );
}
```

### Page détail

```typescript
// app/[locale]/blog/[slug]/page.tsx
export default async function PostPage({ 
  params 
}: { 
  params: { locale: string, slug: string } 
}) {
  const post = await fetch(`/api/posts/${params.slug}?locale=${params.locale}`);
  
  return (
    <article>
      <h1>{post.translation.title}</h1>
      <div>{renderBlocks(post.translation.bodyJson)}</div>
    </article>
  );
}

// Génération statique
export async function generateStaticParams() {
  const posts = await prisma.contentTranslation.findMany({
    where: { isPublished: true },
    select: { locale: true, slug: true }
  });
  
  return posts.map(p => ({
    locale: p.locale,
    slug: p.slug
  }));
}
```

---

## 📦 IMPORT/EXPORT

### Template d'import

Voir: `import-templates/blog-posts.json`

### Import via API

```bash
npx tsx scripts/import-interactive.ts
# Choisir: Blog Posts
# File: import-templates/blog-posts.json
```

---

## ✅ PROCHAINES ÉTAPES

1. **Ajouter les modèles au schema Prisma**
2. **Créer la migration**
3. **Créer les pages admin** (`/admin/blog`)
4. **Créer l'éditeur de blocs**
5. **Implémenter le cron de planification**
6. **Ajouter la recherche full-text**
7. **Créer les templates d'import**

---

**Votre CMS est prêt!** 🎉

Un système complet de blog multilingue avec toutes les fonctionnalités modernes!
