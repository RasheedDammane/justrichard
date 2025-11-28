import { prisma } from "@/lib/prisma";

export type FooterData = {
  platformName?: string;
  tagline?: string;
  copyright?: string;
  sections?: Array<{
    title: string;
    links: Array<{
      label: string;
      href: string;
      external?: boolean;
    }>;
  }>;
  newsletter?: {
    title: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
  legal?: {
    registrationInfo: string;
    disclaimer: string;
  };
};

/**
 * Récupère les données du footer depuis PostgreSQL
 * Retourne null en cas d'erreur (le fallback JSON prendra le relais)
 */
export async function getFooterData(lang: string): Promise<FooterData | null> {
  try {
    // Exemple: récupérer depuis une table FooterContent
    // Adapter selon votre schéma Prisma réel
    const footer = await prisma.footerContent?.findFirst({
      where: {
        locale: lang,
        isActive: true,
      },
    });

    if (!footer) {
      console.warn(`⚠️ No dynamic footer data found for lang: ${lang}`);
      return null;
    }

    return {
      platformName: footer.platformName || undefined,
      tagline: footer.tagline || undefined,
      copyright: footer.copyright || undefined,
      // Adapter selon votre structure de données
    };
  } catch (error) {
    console.error("❌ Error fetching footer dynamic data", error);
    return null;
  }
}
