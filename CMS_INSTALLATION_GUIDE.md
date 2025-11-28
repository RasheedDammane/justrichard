# 🚀 GUIDE D'INSTALLATION CMS - 5 MINUTES

## ⚡ Installation Rapide

### Étape 1: Ajouter les modèles Prisma (2 min)

```bash
cd /Users/richard/preprod/justrichard

# Ajouter les modèles CMS au schema principal
cat prisma/schema-cms-addition.prisma >> prisma/schema.prisma
```

### Étape 2: Ajouter le champ `role` au modèle User

Ouvrez `prisma/schema.prisma` et ajoutez au modèle `User`:

```prisma
model User {
  // ... champs existants ...
  
  // AJOUTER CES LIGNES:
  role                String?             @default("viewer")
  
  // Relations CMS
  contentsCreated     Content[]           @relation("ContentCreatedBy")
  contentsUpdated     Content[]           @relation("ContentUpdatedBy")
  contentRevisions    ContentRevision[]
}
```

### Étape 3: Créer la migration (1 min)

```bash
npx prisma migrate dev --name add_cms_system
```

### Étape 4: Générer le client Prisma (1 min)

```bash
npx prisma generate
```

### Étape 5: Tester l'API (1 min)

```bash
# Démarrer le serveur
npm run dev

# Tester l'API publique
curl "http://localhost:3254/api/posts?locale=fr"

# Tester l'API admin (nécessite auth)
curl "http://localhost:3254/api/admin/posts"
```

---

## ✅ VÉRIFICATION

### Les APIs sont disponibles:

- ✅ `GET /api/posts` - Liste publique
- ✅ `GET /api/posts/{slug}` - Détail public
- ✅ `GET /api/admin/posts` - Liste admin
- ✅ `POST /api/admin/posts` - Créer post
- ✅ `PUT /api/admin/posts/{uid}` - Modifier post
- ✅ `DELETE /api/admin/posts/{uid}` - Supprimer post

### Les tables sont créées:

```bash
docker exec justrichard-preprod-db psql -U postgres -d preprod_justrichard -c "\dt" | grep content
```

Vous devriez voir:
- `contents`
- `content_translations`
- `content_revisions`
- `categories`
- `category_translations`
- `tags`
- `tag_translations`
- `content_categories`
- `content_tags`
- `redirects`

---

## 📝 CRÉER VOTRE PREMIER ARTICLE

### Via API (avec curl)

```bash
curl -X POST http://localhost:3254/api/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": {
      "type": "post",
      "status": "PUBLISHED",
      "publishAt": "2025-01-01T10:00:00Z"
    },
    "translations": [
      {
        "locale": "fr",
        "title": "Mon Premier Article",
        "slug": "mon-premier-article",
        "excerpt": "Ceci est mon premier article de blog",
        "bodyJson": [
          {"type": "heading", "level": 1, "text": "Bonjour!"},
          {"type": "paragraph", "text": "Bienvenue sur mon blog."}
        ],
        "metaTitle": "Mon Premier Article",
        "metaDescription": "Découvrez mon premier article",
        "isPublished": true
      }
    ]
  }'
```

### Via Import Template

```bash
npx tsx scripts/import-interactive.ts
# Choisir: Blog Posts
# File: import-templates/blog-posts.json
```

---

## 🎨 CRÉER LES PAGES FRONTEND

### Page Liste (`app/[locale]/blog/page.tsx`)

```typescript
export default async function BlogPage({ 
  params 
}: { 
  params: { locale: string } 
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?locale=${params.locale}`,
    { next: { revalidate: 300 } }
  );
  const { data: posts } = await res.json();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <article key={post.uid} className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">
              <a href={`/${params.locale}/blog/${post.translation.slug}`}>
                {post.translation.title}
              </a>
            </h2>
            <p className="text-gray-600 mb-4">
              {post.translation.excerpt}
            </p>
            <div className="text-sm text-gray-500">
              {new Date(post.translation.publishedAt).toLocaleDateString()}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### Page Détail (`app/[locale]/blog/[slug]/page.tsx`)

```typescript
export default async function PostPage({ 
  params 
}: { 
  params: { locale: string, slug: string } 
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}?locale=${params.locale}`,
    { next: { revalidate: 600 } }
  );
  const post = await res.json();
  
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-5xl font-bold mb-4">
        {post.translation.title}
      </h1>
      
      <div className="text-gray-600 mb-8">
        {new Date(post.translation.publishedAt).toLocaleDateString()}
        {post.author && ` • Par ${post.author.firstName} ${post.author.lastName}`}
      </div>
      
      <div className="prose prose-lg max-w-none">
        {renderBlocks(post.translation.bodyJson)}
      </div>
      
      {/* SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.translation.title,
            "datePublished": post.translation.publishedAt,
            "author": {
              "@type": "Person",
              "name": `${post.author.firstName} ${post.author.lastName}`
            },
            "inLanguage": post.translation.locale
          })
        }}
      />
    </article>
  );
}

// Fonction pour rendre les blocs
function renderBlocks(blocks: any[]) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'heading':
        const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
        return <Tag key={i}>{block.text}</Tag>;
      
      case 'paragraph':
        return <p key={i}>{block.text}</p>;
      
      case 'list':
        const ListTag = block.ordered ? 'ol' : 'ul';
        return (
          <ListTag key={i}>
            {block.items.map((item: string, j: number) => (
              <li key={j}>{item}</li>
            ))}
          </ListTag>
        );
      
      case 'quote':
        return (
          <blockquote key={i}>
            <p>{block.text}</p>
            {block.author && <cite>— {block.author}</cite>}
          </blockquote>
        );
      
      default:
        return null;
    }
  });
}

// Génération statique
export async function generateStaticParams() {
  const translations = await prisma.contentTranslation.findMany({
    where: { isPublished: true },
    select: { locale: true, slug: true }
  });
  
  return translations.map(t => ({
    locale: t.locale,
    slug: t.slug
  }));
}
```

---

## 🎯 CRÉER LA PAGE ADMIN

### Liste des posts (`app/[locale]/admin/blog/page.tsx`)

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/admin/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <a 
          href="/admin/blog/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Post
        </a>
      </div>
      
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Locales</th>
            <th className="text-left p-4">Updated</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => (
            <tr key={post.uid} className="border-b hover:bg-gray-50">
              <td className="p-4">
                {post.translations[0]?.title || 'Untitled'}
              </td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-sm ${
                  post.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                  post.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.status}
                </span>
              </td>
              <td className="p-4">
                {post.translations.map((t: any) => t.locale).join(', ')}
              </td>
              <td className="p-4">
                {new Date(post.updatedAt).toLocaleDateString()}
              </td>
              <td className="p-4">
                <a 
                  href={`/admin/blog/${post.uid}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 📚 RESSOURCES

### Documentation
- `CMS_SYSTEM_COMPLETE.md` - Documentation complète
- `CMS_INSTALLATION_GUIDE.md` - Ce guide

### Templates
- `import-templates/blog-posts.json` - 3 articles exemples

### APIs
- `app/api/posts/route.ts` - API publique
- `app/api/admin/posts/route.ts` - API admin

---

## 🆘 TROUBLESHOOTING

### Erreur: "Property 'content' does not exist"

**Solution:** Régénérez le client Prisma:
```bash
npx prisma generate
```

### Erreur: "Table 'contents' doesn't exist"

**Solution:** Créez la migration:
```bash
npx prisma migrate dev --name add_cms_system
```

### Erreur: "Unauthorized"

**Solution:** Vérifiez que l'utilisateur a un rôle:
```sql
UPDATE "User" SET role = 'admin' WHERE email = 'votre@email.com';
```

---

## ✅ CHECKLIST FINALE

- [ ] Modèles CMS ajoutés au schema.prisma
- [ ] Champ `role` ajouté au modèle User
- [ ] Migration créée et appliquée
- [ ] Client Prisma régénéré
- [ ] APIs testées (public + admin)
- [ ] Premier article créé
- [ ] Pages frontend créées
- [ ] Page admin créée

---

**Votre CMS est maintenant opérationnel!** 🎉

Vous pouvez créer, gérer et publier des articles multilingues avec un système complet de workflow, SEO, et planification!
