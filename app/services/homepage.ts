import { prisma } from "@/lib/prisma";

export type HomepageData = {
  seo?: {
    title?: string;
    description?: string;
  };
  hero?: {
    headline?: string;
    subheadline?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  features?: {
    title?: string;
    items?: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
    }>;
  };
};

/**
 * Récupère les données dynamiques de la homepage depuis PostgreSQL
 * Retourne null en cas d'erreur (le fallback JSON prendra le relais)
 */
export async function getHomepageData(lang: string): Promise<HomepageData | null> {
  try {
    // Exemple: récupérer depuis une table PageContent
    // Adapter selon votre schéma Prisma réel
    const page = await prisma.pageContent?.findFirst({
      where: {
        slug: "homepage",
        locale: lang,
        isActive: true,
      },
    });

    if (!page) {
      console.warn(`⚠️ No dynamic homepage data found for lang: ${lang}`);
      return null;
    }

    return {
      seo: {
        title: page.title || undefined,
        description: page.description || undefined,
      },
      hero: {
        headline: page.heroTitle || undefined,
        subheadline: page.heroSubtitle || undefined,
        ctaLabel: page.heroCtaLabel || undefined,
        ctaHref: page.heroCtaHref || undefined,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching homepage dynamic data", error);
    return null;
  }
}

/**
 * Récupère les catégories populaires depuis la DB
 */
export async function getPopularCategories(lang: string, limit = 12) {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        CategoryTranslation: {
          where: { locale: lang },
        },
        Service: {
          where: { isActive: true },
          select: { id: true },
        },
      },
      orderBy: { order: "asc" },
      take: limit,
    });

    return categories.map((cat) => ({
      id: cat.id,
      slug: cat.slug,
      icon: cat.icon,
      name: cat.CategoryTranslation[0]?.name || cat.name,
      serviceCount: cat.Service.length,
    }));
  } catch (error) {
    console.error("❌ Error fetching categories", error);
    return [];
  }
}

/**
 * Récupère les derniers articles de blog
 */
export async function getLatestBlogPosts(limit = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: "published",
      },
      take: limit,
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
      },
    });

    return posts;
  } catch (error) {
    console.error("❌ Error fetching blog posts", error);
    return [];
  }
}
