import { prisma } from "@/lib/prisma";

export type HeaderData = {
  logoUrl?: string;
  logoText?: string;
  logoAlt?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaColor?: string;
  bgColor?: string;
  textColor?: string;
  isSticky?: boolean;
  showSearch?: boolean;
};

/**
 * Récupère les données du header depuis PostgreSQL (table HeaderConfig)
 * Retourne null en cas d'erreur (le fallback JSON prendra le relais)
 */
export async function getHeaderData(lang: string): Promise<HeaderData | null> {
  try {
    const headerConfig = await prisma.headerConfig.findFirst({
      where: {
        locale: lang,
        isActive: true,
      },
    });

    if (!headerConfig) {
      console.warn(`⚠️ No dynamic header config found for lang: ${lang}`);
      return null;
    }

    return {
      logoUrl: headerConfig.logoUrl || undefined,
      logoText: headerConfig.logoText || undefined,
      logoAlt: headerConfig.logoAlt || undefined,
      title: headerConfig.title || undefined,
      description: headerConfig.description || undefined,
      ctaText: headerConfig.ctaText || undefined,
      ctaUrl: headerConfig.ctaUrl || undefined,
      ctaColor: headerConfig.ctaColor || undefined,
      bgColor: headerConfig.bgColor || undefined,
      textColor: headerConfig.textColor || undefined,
      isSticky: headerConfig.isSticky,
      showSearch: headerConfig.showSearch,
    };
  } catch (error) {
    console.error("❌ Error fetching header dynamic data", error);
    return null;
  }
}
