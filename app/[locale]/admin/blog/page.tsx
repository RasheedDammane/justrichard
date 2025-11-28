import { prisma } from '@/lib/prisma';
import BlogClient from './BlogClient';

export default async function BlogManagement({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // La protection est gérée par le layout admin
  

  const posts = await prisma.blogPost.findMany({
    include: {
      author: { select: { name: true, email: true } },
      _count: { select: { comments: true, likes: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'PUBLISHED').length,
    totalViews: posts.reduce((sum, p) => sum + p.views, 0),
    totalComments: posts.reduce((sum, p) => sum + p._count.comments, 0),
  };

  return <BlogClient posts={posts} stats={stats} locale={locale} />;
}
