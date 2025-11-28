import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('📝 Import des articles de blog...\n');
  
  // Lire le fichier JSON
  const filePath = path.join(process.cwd(), 'import-templates', 'blog-posts.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const posts = JSON.parse(fileContent);
  
  console.log(`📄 ${posts.length} articles à importer\n`);
  
  // Trouver un utilisateur admin
  const adminUser = await prisma.user.findFirst({
    where: { role: 'admin' }
  });
  
  if (!adminUser) {
    console.error('❌ Aucun utilisateur admin trouvé!');
    console.log('💡 Créez un admin avec: UPDATE "User" SET role = \'admin\' WHERE email = \'votre@email.com\';');
    return;
  }
  
  console.log(`👤 Utilisateur admin: ${adminUser.email}\n`);
  
  let imported = 0;
  let errors = 0;
  
  for (const post of posts) {
    try {
      // Créer le contenu
      const content = await prisma.content.create({
        data: {
          type: post.content.type || 'post',
          status: post.content.status || 'DRAFT',
          publishAt: post.content.publishAt ? new Date(post.content.publishAt) : null,
          unpublishAt: post.content.unpublishAt ? new Date(post.content.unpublishAt) : null,
          createdBy: adminUser.id,
          updatedBy: adminUser.id,
          
          // Créer les traductions
          translations: {
            create: post.translations.map((t: any) => ({
              locale: t.locale,
              title: t.title,
              slug: t.slug,
              excerpt: t.excerpt || null,
              bodyJson: t.bodyJson || [],
              metaTitle: t.metaTitle || null,
              metaDescription: t.metaDescription || null,
              ogTitle: t.ogTitle || null,
              ogDescription: t.ogDescription || null,
              canonicalUrl: t.canonicalUrl || null,
              isPublished: !!t.isPublished,
              publishedAt: t.isPublished ? new Date() : null
            }))
          }
        },
        include: {
          translations: true
        }
      });
      
      const titles = content.translations.map(t => `${t.locale}: "${t.title}"`).join(', ');
      console.log(`✅ Importé: ${titles}`);
      imported++;
      
    } catch (error: any) {
      console.error(`❌ Erreur: ${error.message}`);
      errors++;
    }
  }
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ ${imported} articles importés`);
  if (errors > 0) {
    console.log(`❌ ${errors} erreurs`);
  }
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  // Vérifier les articles créés
  const totalPosts = await prisma.content.count();
  const publishedPosts = await prisma.content.count({
    where: { status: 'PUBLISHED' }
  });
  
  console.log(`📊 Total articles: ${totalPosts}`);
  console.log(`📰 Articles publiés: ${publishedPosts}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
