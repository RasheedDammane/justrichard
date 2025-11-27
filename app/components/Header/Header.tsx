import { loadLocalJson } from "@/app/utils/loadJson";
import { getHeaderData } from "@/app/services/header";
import HeaderClient from "./HeaderClient";

type HeaderData = {
  seo?: {
    title?: string;
    description?: string;
  };
};

// Force dynamic rendering to always fetch fresh data from CMS
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable cache

export default async function Header({ lang }: { lang: string }) {
  // Load static data as fallback
  const staticData = await loadLocalJson<HeaderData>(lang, "homepage.json");

  // Try to load dynamic data from CMS
  let dynamicData = null;
  try {
    dynamicData = await getHeaderData(lang);
  } catch (error) {
    console.warn("⚠️ Failed to load dynamic header data, using static fallback");
  }

  // Merge dynamic and static data (dynamic takes priority)
  const title = dynamicData?.title || staticData?.seo?.title || "JustRichard";
  const description = dynamicData?.description || staticData?.seo?.description || "";

  return (
    <HeaderClient 
      title={title} 
      description={description}
      logoUrl={dynamicData?.logoUrl}
      logoText={dynamicData?.logoText}
      logoAlt={dynamicData?.logoAlt}
      ctaText={dynamicData?.ctaText}
      ctaUrl={dynamicData?.ctaUrl}
      ctaColor={dynamicData?.ctaColor}
      bgColor={dynamicData?.bgColor}
      textColor={dynamicData?.textColor}
      isSticky={dynamicData?.isSticky}
      showSearch={dynamicData?.showSearch}
    />
  );
}
