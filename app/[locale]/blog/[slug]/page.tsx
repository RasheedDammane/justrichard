import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Eye, Heart, ArrowLeft, Tag, Share2, Clock, TrendingUp, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

async function getBlogPost(slug: string, locale: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fonction pour transformer texte brut en HTML riche
function textToHtml(text: string): string {
  if (!text) return '';
  
  // Détecter si c'est déjà du HTML propre
  if (text.includes('<p>') && text.includes('</p>') && !text.includes('##')) {
    return text;
  }
  
  // D'abord, convertir le Markdown en texte formaté
  let processedText = text;
  
  // Convertir ** en gras
  processedText = processedText.replace(/\*\*([^*]+)\*\*/g, '<BOLD>$1</BOLD>');
  
  // Convertir les titres Markdown ## en marqueurs temporaires
  processedText = processedText.replace(/^###\s+(.+)$/gm, '<H3>$1</H3>');
  processedText = processedText.replace(/^##\s+(.+)$/gm, '<H2>$1</H2>');
  processedText = processedText.replace(/^#\s+(.+)$/gm, '<H2>$1</H2>');
  
  // Diviser en lignes
  const lines = processedText.split('\n');
  let html = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Ligne vide
    if (!line) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      continue;
    }
    
    // Gérer les marqueurs temporaires Markdown
    if (line.startsWith('<H2>') && line.endsWith('</H2>')) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      const content = line.replace(/<\/?H2>/g, '');
      html += `<h2>${content}</h2>\n`;
      continue;
    }
    
    if (line.startsWith('<H3>') && line.endsWith('</H3>')) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      const content = line.replace(/<\/?H3>/g, '');
      html += `<h3>${content}</h3>\n`;
      continue;
    }
    
    // Détecter les listes AVANT les titres (commence par - ou • ou * mais pas --)
    if (line.match(/^[\-•\*]\s+/) && !line.startsWith('--')) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      let listContent = line.replace(/^[\-•\*]\s+/, '');
      // Convertir les marqueurs <BOLD> dans les items de liste
      listContent = listContent.replace(/<BOLD>([^<]+)<\/BOLD>/g, '<strong>$1</strong>');
      html += `<li>${listContent}</li>\n`;
      continue;
    }
    
    // Détecter les listes numérotées
    if (line.match(/^\d+[\.\)]\s+/)) {
      if (inList && html.includes('<ul>')) {
        html += '</ul>\n';
        inList = false;
      }
      if (!inList) {
        html += '<ol>\n';
        inList = true;
      }
      let listContent = line.replace(/^\d+[\.\)]\s+/, '');
      listContent = listContent.replace(/<BOLD>([^<]+)<\/BOLD>/g, '<strong>$1</strong>');
      html += `<li>${listContent}</li>\n`;
      continue;
    }
    
    // Détecter les titres (lignes courtes suivies d'une ligne vide ou en majuscules)
    const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
    const isShortLine = line.length < 80 && line.length > 10;
    const hasUpperCase = line === line.toUpperCase() && line.length > 5;
    const followedByEmpty = !nextLine;
    
    // H2 - Titres principaux (courts + suivis d'une ligne vide OU tout en majuscules)
    if ((isShortLine && followedByEmpty) || hasUpperCase) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h2>${line}</h2>\n`;
      continue;
    }
    
    // Paragraphe normal
    if (inList) {
      html += '</ul>\n';
      inList = false;
    }
    
    // Mettre certains mots en gras automatiquement
    let processedLine = line;
    
    // D'abord convertir les marqueurs <BOLD> en <strong>
    processedLine = processedLine.replace(/<BOLD>([^<]+)<\/BOLD>/g, '<strong>$1</strong>');
    
    // Mots importants à mettre en gras (si pas déjà en gras)
    const importantPatterns = [
      /\b(important|essential|key|crucial|critical|vital|note|warning|attention|tip)\b/gi,
      /\b(professional|certified|expert|qualified|licensed|verified)\b/gi,
      /\b(benefits|advantages|features|includes|offers|provides)\b/gi,
      /\b([A-Z][a-z]+\s(?:Coach|Service|Professional|Program|Method|System))\b/g,
    ];
    
    importantPatterns.forEach(pattern => {
      processedLine = processedLine.replace(pattern, (match) => {
        // Ne pas remplacer si déjà dans un <strong>
        if (processedLine.indexOf('<strong>' + match) >= 0 || processedLine.indexOf(match + '</strong>') >= 0) {
          return match;
        }
        return '<strong>' + match + '</strong>';
      });
    });
    
    // Détecter les questions (finissent par ?)
    if (line.endsWith('?') || line.endsWith('</H3>')) {
      html += `<h3>${processedLine}</h3>\n`;
    } else {
      html += `<p>${processedLine}</p>\n`;
    }
  }
  
  if (inList) {
    html += '</ul>\n';
  }
  
  return html;
}

// Fonction pour enrichir le HTML avec des ALTs et améliorer la structure
function enrichHtmlContent(content: string, postTitle: string): string {
  if (!content) return '';
  
  // Étape 1 : Convertir texte brut en HTML si nécessaire
  let enrichedContent = textToHtml(content);
  
  // Étape 2 : Ajouter ALT manquants aux images
  enrichedContent = enrichedContent.replace(
    /<img([^>]*?)(?:alt=""|(?!alt=))([^>]*?)>/gi,
    (match, before, after) => {
      if (match.includes('alt=')) return match;
      return `<img${before} alt="${postTitle} - illustration"${after}>`;
    }
  );
  
  // Étape 3 : Ajouter des classes aux images pour le style
  enrichedContent = enrichedContent.replace(
    /<img /g,
    '<img loading="lazy" class="rounded-xl shadow-lg my-8" '
  );
  
  // Étape 4 : Styliser les titres
  enrichedContent = enrichedContent.replace(
    /<h2>/g,
    '<h2 class="text-3xl font-bold mt-12 mb-6 text-gray-900 border-l-4 border-blue-600 pl-4">'
  );
  enrichedContent = enrichedContent.replace(
    /<h3>/g,
    '<h3 class="text-2xl font-semibold mt-8 mb-4 text-gray-800">'
  );
  enrichedContent = enrichedContent.replace(
    /<h4>/g,
    '<h4 class="text-xl font-semibold mt-6 mb-3 text-gray-800">'
  );
  
  // Étape 5 : Styliser les paragraphes
  enrichedContent = enrichedContent.replace(
    /<p>/g,
    '<p class="text-lg text-gray-700 leading-relaxed mb-6">'
  );
  
  // Étape 6 : Styliser les strong (gras)
  enrichedContent = enrichedContent.replace(
    /<strong>/g,
    '<strong class="font-bold text-gray-900">'
  );
  
  // Étape 7 : Styliser les liens
  enrichedContent = enrichedContent.replace(
    /<a /g,
    '<a class="text-blue-600 hover:text-blue-800 underline font-medium" '
  );
  
  // Étape 8 : Styliser les listes
  enrichedContent = enrichedContent.replace(
    /<ul>/g,
    '<ul class="list-disc pl-6 mb-6 space-y-3">'
  );
  enrichedContent = enrichedContent.replace(
    /<ol>/g,
    '<ol class="list-decimal pl-6 mb-6 space-y-3">'
  );
  enrichedContent = enrichedContent.replace(
    /<li>/g,
    '<li class="text-gray-700 text-lg leading-relaxed">'
  );
  
  // Étape 9 : Styliser les blockquotes
  enrichedContent = enrichedContent.replace(
    /<blockquote>/g,
    '<blockquote class="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 italic text-gray-700 rounded-r-lg">'
  );
  
  // Étape 10 : Styliser le code
  enrichedContent = enrichedContent.replace(
    /<code>/g,
    '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">'
  );
  
  // Étape 11 : Ajouter des wrappers pour les tables
  enrichedContent = enrichedContent.replace(
    /<table>/g,
    '<div class="overflow-x-auto my-8"><table class="min-w-full divide-y divide-gray-200 border">'
  );
  enrichedContent = enrichedContent.replace(
    /<\/table>/g,
    '</table></div>'
  );
  
  return enrichedContent;
}

// Générer le Schema JSON-LD pour le SEO
function generateArticleSchema(post: any, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.metaDescription,
    image: post.featuredImage ? [post.featuredImage] : [],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'CommunityHub Team',
      url: post.author?.website || `${baseUrl}/${locale}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CommunityHub',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${locale}/blog/${post.slug}`,
    },
    keywords: post.keywords?.join(', ') || post.tags?.join(', ') || '',
    articleSection: post.categories?.join(', ') || 'General',
    inLanguage: locale,
    wordCount: post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0,
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug, params.locale);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords?.join(', '),
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'CommunityHub'],
      images: post.featuredImage ? [{ url: post.featuredImage, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug, params.locale);

  if (!post) {
    notFound();
  }

  const enrichedContent = enrichHtmlContent(post.content, post.title);
  const articleSchema = generateArticleSchema(post, params.locale);
  const readingTime = Math.ceil(post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length / 200) || 5;

  return (
    <>
      {/* Schema JSON-LD pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Back Button Stylisé */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-40">
          <div className="container mx-auto max-w-5xl px-4 py-4">
            <Link
              href={`/${params.locale}/blog`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>

        {/* Article Header avec Design Magazine */}
        <article className="relative bg-white">
          {/* Featured Image en Hero avec Overlay */}
          {post.featuredImage && (
            <div className="relative h-[500px] overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Contenu sur l'image */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="container mx-auto max-w-5xl">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((cat: string) => (
                        <Link
                          key={cat}
                          href={`/${params.locale}/blog?category=${cat}`}
                          className="text-sm font-semibold bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all border border-white/30"
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold">
                        {(post.author?.name || 'A')[0].toUpperCase()}
                      </div>
                      <span className="font-medium">{post.author?.name || 'Anonymous'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(params.locale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{readingTime} min read</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      <span>{post.viewCount || 0}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      <span>{post.likeCount || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Si pas d'image, header classique */}
          {!post.featuredImage && (
            <div className="py-16 px-4">
              <div className="container mx-auto max-w-5xl">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((cat: string) => (
                      <Link
                        key={cat}
                        href={`/${params.locale}/blog?category=${cat}`}
                        className="text-sm font-semibold bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}

                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{post.author?.name || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString(params.locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{readingTime} min</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Excerpt si présent */}
          {post.excerpt && (
            <div className="py-8 px-4 bg-blue-50 border-y border-blue-100">
              <div className="container mx-auto max-w-5xl">
                <p className="text-2xl text-gray-700 leading-relaxed font-light italic">
                  {post.excerpt}
                </p>
              </div>
            </div>
          )}
        </article>

        {/* Social Share Bar Sticky */}
        <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-30">
          <div className="bg-white rounded-2xl shadow-xl p-3 space-y-3">
            <button className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Content avec HTML enrichi */}
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: enrichedContent }}
            />
          </div>
        </section>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-gray-700">
                  <Tag className="w-6 h-6" />
                  <span className="font-bold text-lg">Tags:</span>
                </div>
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/${params.locale}/blog?tag=${tag}`}
                    className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 border-2 border-transparent hover:border-blue-300 transition-all shadow-sm"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}></div>
          </div>
          <div className="container mx-auto max-w-5xl px-4 text-center relative z-10">
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Browse our verified professionals and book your service today!
            </p>
            <Link
              href={`/${params.locale}/services`}
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all text-lg shadow-2xl hover:shadow-xl hover:scale-105 transform"
            >
              Browse All Services →
            </Link>
          </div>
        </section>

        {/* Related Posts */}
        <section className="bg-white py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Related Articles
            </h2>
            <div className="text-center">
              <Link
                href={`/${params.locale}/blog`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg group"
              >
                <span>View all articles</span>
                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
