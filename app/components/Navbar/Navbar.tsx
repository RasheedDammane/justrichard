import Link from "next/link";
import { loadLocalJson } from "@/app/utils/loadJson";
import { getNavbarLinks } from "@/app/services/navbar";

type NavData = {
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

export default async function Navbar({ lang }: { lang: string }) {
  const staticNav = await loadLocalJson<NavData>(lang, "navbar.json");

  let dynamicNav: NavData | null = null;

  try {
    dynamicNav = await getNavbarLinks(lang);
  } catch {
    dynamicNav = null;
  }

  const logo = dynamicNav?.logo || staticNav.logo || { text: "JustRichard", href: `/${lang}` };
  const links = dynamicNav?.links?.length ? dynamicNav.links : staticNav.links || [];
  const actions = dynamicNav?.actions?.length ? dynamicNav.actions : staticNav.actions || [];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={logo.href} className="text-2xl font-bold text-blue-600">
            {logo.text}
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.type === "primary"
                    ? "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    : "px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
