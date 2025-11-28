import { prisma } from "@/lib/prisma";

export type NavbarData = {
  logo?: {
    text: string;
    href: string;
  };
  links?: Array<{
    label: string;
    href: string;
  }>;
  actions?: Array<{
    label: string;
    href: string;
    type: "primary" | "secondary";
  }>;
};

/**
 * Récupère les liens de navigation depuis PostgreSQL
 * Retourne null en cas d'erreur (le fallback JSON prendra le relais)
 */
export async function getNavbarLinks(lang: string): Promise<NavbarData | null> {
  try {
    // Exemple: récupérer depuis une table NavbarLink
    // Adapter selon votre schéma Prisma réel
    const links = await prisma.navbarLink?.findMany({
      where: {
        locale: lang,
        isActive: true,
      },
      orderBy: { order: "asc" },
    });

    if (!links || links.length === 0) {
      console.warn(`⚠️ No dynamic navbar links found for lang: ${lang}`);
      return null;
    }

    return {
      links: links.map((link) => ({
        label: link.label,
        href: link.href,
      })),
    };
  } catch (error) {
    console.error("❌ Error fetching navbar dynamic data", error);
    return null;
  }
}
