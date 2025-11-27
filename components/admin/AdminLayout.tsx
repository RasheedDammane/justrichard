'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, Calendar, FolderTree, Handshake, 
  FileText, TrendingUp, FileWarning, Settings, ChevronDown, ChevronRight,
  Globe, DollarSign, MapPin, LogOut, Menu, X, Home, Car, Plane, Ship,
  Building, Gavel, Stethoscope, Dumbbell, ShoppingBag, Package, Bell,
  MessageSquare, BarChart3, Shield, Wrench, Database, Image, Palette,
  Calculator, CreditCard, Map, Navigation, Bike, CarFront, UserCog, Truck, PackageCheck,
  Layout
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  locale: string;
  userName?: string;
  userRole?: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: any;
  children?: NavItem[];
}

export default function AdminLayout({ children, locale, userName, userRole }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(
    pathname.includes('/admin/currencies') || 
    pathname.includes('/admin/geography') ||
    pathname.includes('/admin/exchange-rates') ||
    pathname.includes('/admin/styles') ||
    pathname.includes('/admin/routes')
  );

  const navigation: NavItem[] = [
    { name: 'Dashboard', href: `/${locale}/admin`, icon: LayoutDashboard },
    { name: 'Users', href: `/${locale}/admin/users`, icon: Users },
    { name: 'Properties', href: `/${locale}/admin/properties`, icon: Home },
    { name: 'Services', href: `/${locale}/admin/services`, icon: Briefcase },
    { name: 'Bookings', href: `/${locale}/admin/bookings`, icon: Calendar },
    { name: 'Categories', href: `/${locale}/admin/categories`, icon: FolderTree },
    { name: 'Partners', href: `/${locale}/admin/partners`, icon: Handshake },
    { name: 'Doctors', href: `/${locale}/admin/doctors`, icon: Stethoscope },
    { name: 'Lawyers', href: `/${locale}/admin/lawyers`, icon: Gavel },
    { name: 'Coaches', href: `/${locale}/admin/coaches`, icon: Dumbbell },
    { name: 'Maids', href: `/${locale}/admin/maids`, icon: UserCog },
    { name: 'Home Cleaning', href: `/${locale}/admin/home-cleaning`, icon: Home },
    { name: 'Furniture Cleaning', href: `/${locale}/admin/furniture-cleaning`, icon: Home },
    { name: 'Laundry', href: `/${locale}/admin/laundry`, icon: Home },
    { name: 'Rental Cars', href: `/${locale}/admin/rental-cars`, icon: CarFront },
    { name: 'Motorbikes', href: `/${locale}/admin/motorbikes`, icon: Bike },
    { name: 'Yachts', href: `/${locale}/admin/yachts`, icon: Ship },
    { name: 'Moving Services', href: `/${locale}/admin/moving`, icon: Truck },
    { name: 'Parcel Delivery', href: `/${locale}/admin/parcel`, icon: PackageCheck },
    { name: 'Events', href: `/${locale}/admin/events`, icon: Calendar },
    { name: 'Transfers', href: `/${locale}/admin/transfers`, icon: Car },
    { name: 'Activities', href: `/${locale}/admin/activities`, icon: Plane },
    { name: 'Suppliers', href: `/${locale}/admin/suppliers`, icon: Package },
    { name: 'Blog', href: `/${locale}/admin/blog`, icon: FileText },
    { name: 'Chatbots', href: `/${locale}/admin/chatbots`, icon: MessageSquare },
    { name: 'Notifications', href: `/${locale}/admin/notifications`, icon: Bell },
    { name: 'Analytics', href: `/${locale}/admin/analytics`, icon: BarChart3 },
    { name: 'Promotions', href: `/${locale}/admin/promotions`, icon: ShoppingBag },
    { name: 'CMS (Header/Footer)', href: `/${locale}/admin/cms`, icon: Layout },
    { name: 'CMS Pages', href: `/${locale}/admin/cms-pages`, icon: FileText },
    { name: 'Media Library', href: `/${locale}/admin/media`, icon: Image },
    { name: 'Database', href: `/${locale}/admin/data`, icon: Database },
    { name: 'Simulators', href: `/${locale}/admin/simulators`, icon: Calculator },
    { name: 'Crypto Payments', href: `/${locale}/admin/crypto-payments`, icon: CreditCard },
    { name: 'Tools', href: `/${locale}/tools`, icon: Wrench },
    { name: 'Logs', href: `/${locale}/admin/logs`, icon: FileWarning },
    { 
      name: 'Settings', 
      href: '#', 
      icon: Settings,
      children: [
        { name: 'Currencies', href: `/${locale}/admin/currencies`, icon: DollarSign },
        { name: 'Countries', href: `/${locale}/admin/geography`, icon: Globe },
        { name: 'Exchange Rates', href: `/${locale}/admin/exchange-rates`, icon: TrendingUp },
        { name: 'Colors & Styles', href: `/${locale}/admin/styles`, icon: Palette },
        { name: 'Routes & Pages', href: `/${locale}/admin/routes`, icon: Navigation },
      ]
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: `/${locale}/auth/login` });
  };

  const isActive = (href: string) => {
    if (href === `/${locale}/admin`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col`}
        style={{ width: '280px' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <Link href={`/${locale}/admin`} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">JR</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg">JustRichard</span>
              <span className="block text-xs text-slate-400">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              if (item.children) {
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                        settingsOpen
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      {settingsOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {settingsOpen && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          const childActive = isActive(child.href);
                          return (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={`flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-all ${
                                  childActive
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                              >
                                <ChildIcon className="w-4 h-4" />
                                <span>{child.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      active
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="border-t border-slate-700 p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userName?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName || 'Admin'}</p>
              <p className="text-xs text-slate-400 truncate">{userRole || 'Administrator'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`transition-all ${sidebarOpen ? 'lg:ml-[280px]' : 'ml-0'}`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
