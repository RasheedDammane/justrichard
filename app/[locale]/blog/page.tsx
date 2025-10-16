import Link from 'next/link';
import { Calendar, User, Eye, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import BlogPostImage from '@/components/BlogPostImage';

async function getBlogPosts(locale: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog?language=${locale}&limit=12`, {
      cache: 'no-store',
    });
    if (!res.ok) return { posts: [], pagination: null };
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], pagination: null };
  }
}

// Fonction pour obtenir une belle image selon la catégorie
function getCategoryImage(categories: string[] | undefined): string {
  if (!categories || categories.length === 0) {
    return '/placeholder-blog.jpg';
  }

  const categoryImages: Record<string, string> = {
    'home': 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    'cleaning': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    'vehicle': 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
    'rental': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
    'legal': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    'medical': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    'real estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    'property': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    'business': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    'technology': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    'lifestyle': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
    'tips': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    'guide': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
  };

  const cat = categories[0].toLowerCase();
  for (const [key, image] of Object.entries(categoryImages)) {
    if (cat.includes(key)) return image;
  }
  
  return 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800';
}

// Couleurs pour les catégories
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'home': 'bg-purple-100 text-purple-600',
    'cleaning': 'bg-blue-100 text-blue-600',
    'vehicle': 'bg-red-100 text-red-600',
    'rental': 'bg-orange-100 text-orange-600',
    'legal': 'bg-gray-100 text-gray-700',
    'medical': 'bg-green-100 text-green-600',
    'property': 'bg-indigo-100 text-indigo-600',
    'business': 'bg-yellow-100 text-yellow-700',
    'tips': 'bg-pink-100 text-pink-600',
  };
  
  const cat = category.toLowerCase();
  for (const [key, color] of Object.entries(colors)) {
    if (cat.includes(key)) return color;
  }
  return 'bg-blue-100 text-blue-600';
}

const translations: Record<string, { title: string; subtitle: string; noPosts: string; backHome: string }> = {
  en: {
    title: 'Our Blog',
    subtitle: 'Insights, tips, and guides from our experts',
    noPosts: 'No articles found',
    backHome: 'Back to Homepage'
  },
  fr: {
    title: 'Notre Blog',
    subtitle: 'Conseils et guides de nos experts',
    noPosts: 'Aucun article trouvé',
    backHome: 'Retour à l\'accueil'
  },
  ar: {
    title: 'مدونتنا',
    subtitle: 'رؤى ونصائح وأدلة من خبرائنا',
    noPosts: 'لم يتم العثور على مقالات',
    backHome: 'العودة إلى الصفحة الرئيسية'
  },
  th: {
    title: 'บล็อกของเรา',
    subtitle: 'ข้อมูลเชิงลึก เคล็ดลับ และคำแนะนำจากผู้เชี่ยวชาญ',
    noPosts: 'ไม่พบบทความ',
    backHome: 'กลับไปหน้าหลัก'
  }
};

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  const { posts, pagination } = await getBlogPosts(locale);
  const t = translations[locale] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header avec design moderne */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Latest Insights</span>
          </div>
          <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            {t.title}
          </h1>
          <p className="text-2xl text-blue-100 max-w-2xl">{t.subtitle}</p>
        </div>
        
        {/* Déco */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">{t.noPosts}</p>
              <Link
                href={`/${locale}`}
                className="inline-block mt-4 text-blue-600 hover:underline"
              >
                {t.backHome}
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => {
                  const imageUrl = post.featuredImage || getCategoryImage(post.categories);
                  return (
                    <Link
                      key={post.id}
                      href={`/${locale}/blog/${post.slug}`}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                    >
                      {/* Image avec overlay au hover */}
                      <div className="relative h-56 overflow-hidden">
                        <BlogPostImage
                          src={imageUrl}
                          alt={post.title}
                          fallbackSrc={getCategoryImage(post.categories)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Catégories sur l'image */}
                        {post.categories && post.categories.length > 0 && (
                          <div className="absolute top-4 left-4 flex gap-2">
                            {post.categories.slice(0, 2).map((cat: string) => (
                              <span
                                key={cat}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${getCategoryColor(cat)}`}
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Meta Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b">
                          <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                            <span>{post.viewCount || 0}</span>
                          </div>
                          <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span>{post.likeCount || 0}</span>
                          </div>
                          <div className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post._count?.comments || 0}</span>
                          </div>
                        </div>

                        {/* Author & Date */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-semibold">
                              {(post.author?.name || 'A')[0].toUpperCase()}
                            </div>
                            <span className="text-gray-700 font-medium">{post.author?.name || 'Anonymous'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs">
                              {new Date(post.publishedAt).toLocaleDateString(locale, {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination améliorée */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <div className="inline-flex items-center gap-2 bg-white rounded-xl shadow-lg p-2">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={`/${locale}/blog?page=${page}`}
                        className={`min-w-[44px] h-11 flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ${
                          page === pagination.page
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md scale-110'
                            : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                        }`}
                      >
                        {page}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
