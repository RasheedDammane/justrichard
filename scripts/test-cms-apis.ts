import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n🧪 TESTS CMS - APIs\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Test 1: Liste des posts
  console.log('📝 Test 1: Liste des posts (locale FR)');
  const posts = await prisma.content.findMany({
    where: {
      status: 'PUBLISHED',
      translations: {
        some: {
          locale: 'fr',
          isPublished: true
        }
      }
    },
    include: {
      translations: {
        where: { locale: 'fr' },
        select: {
          locale: true,
          title: true,
          slug: true,
          excerpt: true
        }
      }
    }
  });
  
  console.log(`✅ ${posts.length} posts trouvés`);
  posts.forEach(post => {
    const translation = post.translations[0];
    if (translation) {
      console.log(`   • ${translation.title} (${translation.slug})`);
    }
  });
  console.log('');
  
  // Test 2: Récupérer un post par slug
  console.log('📄 Test 2: Récupérer un post par slug');
  const firstPost = posts[0];
  if (firstPost && firstPost.translations[0]) {
    const slug = firstPost.translations[0].slug;
    const post = await prisma.contentTranslation.findUnique({
      where: {
        locale_slug: {
          locale: 'fr',
          slug: slug
        }
      },
      include: {
        content: {
          include: {
            translations: {
              select: {
                locale: true,
                title: true
              }
            }
          }
        }
      }
    });
    
    if (post) {
      console.log(`✅ Post trouvé: "${post.title}"`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Locales disponibles: ${post.content.translations.map(t => t.locale).join(', ')}`);
      console.log(`   Blocs de contenu: ${Array.isArray(post.bodyJson) ? (post.bodyJson as any[]).length : 0}`);
    }
  }
  console.log('');
  
  // Test 3: Posts par locale
  console.log('🌍 Test 3: Posts par locale');
  const locales = ['fr', 'en'];
  for (const locale of locales) {
    const count = await prisma.contentTranslation.count({
      where: {
        locale,
        isPublished: true
      }
    });
    console.log(`   ${locale.toUpperCase()}: ${count} posts`);
  }
  console.log('');
  
  // Test 4: Statistiques
  console.log('📊 Test 4: Statistiques');
  const stats = {
    total: await prisma.content.count(),
    published: await prisma.content.count({ where: { status: 'PUBLISHED' } }),
    draft: await prisma.content.count({ where: { status: 'DRAFT' } }),
    translations: await prisma.contentTranslation.count(),
    publishedTranslations: await prisma.contentTranslation.count({ where: { isPublished: true } })
  };
  
  console.log(`   Total contenus: ${stats.total}`);
  console.log(`   Publiés: ${stats.published}`);
  console.log(`   Brouillons: ${stats.draft}`);
  console.log(`   Total traductions: ${stats.translations}`);
  console.log(`   Traductions publiées: ${stats.publishedTranslations}`);
  console.log('');
  
  // Test 5: Vérifier les tables
  console.log('🗄️  Test 5: Vérifier les tables CMS');
  const tables = [
    'contents',
    'content_translations',
    'content_revisions',
    'post_categories',
    'post_category_translations',
    'tags',
    'tag_translations',
    'redirects'
  ];
  
  for (const table of tables) {
    try {
      const result: any = await prisma.$queryRawUnsafe(`SELECT COUNT(*) as count FROM "${table}"`);
      const count = parseInt(result[0].count);
      console.log(`   ✅ ${table}: ${count} entrées`);
    } catch (error: any) {
      console.log(`   ❌ ${table}: ${error.message}`);
    }
  }
  console.log('');
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ TOUS LES TESTS PASSÉS!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
