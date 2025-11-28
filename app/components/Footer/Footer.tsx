import Link from "next/link";
import { loadLocalJson } from "@/app/utils/loadJson";
import { getFooterData } from "@/app/services/footer";

type FooterData = {
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

export default async function Footer({ lang }: { lang: string }) {
  const staticFooter = await loadLocalJson<FooterData>(lang, "footer.json");

  let dynamicFooter: FooterData | null = null;

  try {
    dynamicFooter = await getFooterData(lang);
  } catch {
    dynamicFooter = null;
  }

  const footer = { ...staticFooter, ...dynamicFooter };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2 md:mb-3">
              {footer.platformName || "JustRichard"}
            </h3>
            <p className="text-xs md:text-sm text-gray-400">
              {footer.tagline || "Your trusted service platform"}
            </p>
          </div>

          {/* Links Sections */}
          {footer.sections?.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold text-sm md:text-base mb-3 md:mb-4">{section.title}</h4>
              <ul className="space-y-1.5 md:space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs md:text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        {footer.newsletter && (
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md">
              <h4 className="text-white font-semibold mb-2">
                {footer.newsletter.title}
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                {footer.newsletter.description}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={footer.newsletter.placeholder}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {footer.newsletter.buttonLabel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {footer.copyright || `© ${new Date().getFullYear()} JustRichard. All rights reserved.`}
            </p>
            {footer.legal?.registrationInfo && (
              <p className="text-xs text-gray-500">
                {footer.legal.registrationInfo}
              </p>
            )}
          </div>
          {footer.legal?.disclaimer && (
            <p className="text-xs text-gray-500 mt-4 max-w-4xl">
              {footer.legal.disclaimer}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
