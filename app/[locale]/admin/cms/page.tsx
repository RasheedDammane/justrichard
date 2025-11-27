import Link from 'next/link';
import { 
  LayoutDashboard, 
  Menu, 
  Layout, 
  Share2, 
  Settings 
} from 'lucide-react';

export const metadata = {
  title: 'CMS Management | Admin',
  description: 'Manage Header, Navbar, and Footer',
};

const cmsModules = [
  {
    title: 'Header Configuration',
    description: 'Manage header settings, logo, and CTA buttons',
    href: '/admin/cms/header',
    icon: LayoutDashboard,
    color: 'bg-blue-500',
  },
  {
    title: 'Navbar Management',
    description: 'Manage navigation links and action buttons',
    href: '/admin/cms/navbar',
    icon: Menu,
    color: 'bg-green-500',
  },
  {
    title: 'Footer Sections',
    description: 'Manage footer sections and links',
    href: '/admin/cms/footer',
    icon: Layout,
    color: 'bg-purple-500',
  },
  {
    title: 'Social Links',
    description: 'Manage social media links',
    href: '/admin/cms/social',
    icon: Share2,
    color: 'bg-pink-500',
  },
  {
    title: 'Footer Branding',
    description: 'Manage footer branding and newsletter',
    href: '/admin/cms/footer/branding',
    icon: Settings,
    color: 'bg-orange-500',
  },
];

export default function CMSPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          CMS Management
        </h1>
        <p className="text-gray-600">
          Manage your website's header, navigation, and footer content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cmsModules.map((module) => {
          const Icon = module.icon;
          return (
            <Link
              key={module.href}
              href={module.href}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className={`${module.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {module.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
