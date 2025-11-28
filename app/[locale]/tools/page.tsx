'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ToolsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dbStats, setDbStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        setDbStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading stats:', err);
        setLoading(false);
      });
  }, []);

  const menuItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'metrics', icon: '📈', label: 'Metrics' },
    { id: 'database', icon: '💾', label: 'Database Entities' },
    { id: 'locations', icon: '📍', label: 'Locations' },
    { id: 'routes', icon: '🗺️', label: 'Routes & Pages' },
    { id: 'pages', icon: '📄', label: 'All Pages' },
    { id: 'booking', icon: '📅', label: 'Booking Workflows' },
    { id: 'content', icon: '🌐', label: 'Content & i18n' },
    { id: 'header', icon: '🔝', label: 'Header' },
    { id: 'footer', icon: '🔻', label: 'Footer' },
    { id: 'media', icon: '🖼️', label: 'Media Library' },
    { id: 'social', icon: '📱', label: 'Social Media' },
    { id: 'sitemap', icon: '🗺️', label: 'Sitemap' },
    { id: 'colors', icon: '🎨', label: 'Colors & Styles' },
    { id: 'simulators', icon: '🧮', label: 'Simulators' },
    { id: 'cards', icon: '🃏', label: 'Card Types' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 fixed h-screen overflow-y-auto z-50 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold">⚙️ Tools</h1>
                <p className="text-xs text-blue-300">Admin Dashboard</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-blue-700 mt-auto bg-blue-900">
            <Link
              href="/en"
              className="block text-center text-sm text-blue-300 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8 pb-16`}>
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Platform Overview</h2>
            <p className="text-gray-600 mb-8">Dashboard en construction - Sections disponibles dans le menu</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="text-3xl mb-2">🗺️</div>
                <div className="text-3xl font-bold text-gray-900">27</div>
                <div className="text-sm text-gray-600">Total Routes</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-3xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-600">Booking Workflows</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                <div className="text-3xl mb-2">🌐</div>
                <div className="text-3xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Active Languages</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
                <div className="text-3xl mb-2">🖼️</div>
                <div className="text-3xl font-bold text-gray-900">350+</div>
                <div className="text-sm text-gray-600">Media Files</div>
              </div>
            </div>
          </div>
        )}

        {/* Metrics Section */}
        {activeSection === 'metrics' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📈 Platform Metrics</h2>
            
            {/* Global Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">🗺️</div>
                  <div className="text-xs bg-white/20 px-2 py-1 rounded">Routes</div>
                </div>
                <div className="text-4xl font-bold mb-1">27</div>
                <div className="text-sm opacity-90">Total Pages</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">🃏</div>
                  <div className="text-xs bg-white/20 px-2 py-1 rounded">Cards</div>
                </div>
                <div className="text-4xl font-bold mb-1">210</div>
                <div className="text-sm opacity-90">Total Cards</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">📅</div>
                  <div className="text-xs bg-white/20 px-2 py-1 rounded">Booking</div>
                </div>
                <div className="text-4xl font-bold mb-1">2</div>
                <div className="text-sm opacity-90">Workflows</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">🧮</div>
                  <div className="text-xs bg-white/20 px-2 py-1 rounded">Tools</div>
                </div>
                <div className="text-4xl font-bold mb-1">4</div>
                <div className="text-sm opacity-90">Simulators</div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Services</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pages</span>
                    <span className="font-bold text-purple-600">6</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cards</span>
                    <span className="font-bold text-purple-600">59</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Card Types</span>
                    <span className="font-bold text-purple-600">18</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">28% of total cards</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle & Travel</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pages</span>
                    <span className="font-bold text-blue-600">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cards</span>
                    <span className="font-bold text-blue-600">65</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Card Types</span>
                    <span className="font-bold text-blue-600">15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '31%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">31% of total cards</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Home Services</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pages</span>
                    <span className="font-bold text-green-600">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cards</span>
                    <span className="font-bold text-green-600">86</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Card Types</span>
                    <span className="font-bold text-green-600">12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '41%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">41% of total cards</div>
                </div>
              </div>
            </div>

            {/* Detailed Metrics by Service */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Metrics by Service</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Cards</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Card Types</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Doctors & Dentists', category: 'Professional', cards: 15, types: 4, booking: '❌' },
                      { name: 'Lawyers', category: 'Professional', cards: 12, types: 4, booking: '❌' },
                      { name: 'Coaches', category: 'Professional', cards: 10, types: 4, booking: '❌' },
                      { name: 'Suppliers', category: 'Professional', cards: 8, types: 4, booking: '❌' },
                      { name: 'Business Setup', category: 'Professional', cards: 6, types: 4, booking: '❌' },
                      { name: 'Insurance', category: 'Professional', cards: 8, types: 4, booking: '❌' },
                      { name: 'Car Rental', category: 'Lifestyle', cards: 15, types: 5, booking: '❌' },
                      { name: 'Motorbike Rental', category: 'Lifestyle', cards: 20, types: 5, booking: '❌' },
                      { name: 'Yachts', category: 'Lifestyle', cards: 10, types: 5, booking: '❌' },
                      { name: 'Properties', category: 'Lifestyle', cards: 12, types: 5, booking: '❌' },
                      { name: 'Activities', category: 'Lifestyle', cards: 8, types: 5, booking: '❌' },
                      { name: 'Home Cleaning', category: 'Home Services', cards: 18, types: 4, booking: '✅' },
                      { name: 'Furniture Cleaning', category: 'Home Services', cards: 23, types: 4, booking: '✅' },
                      { name: 'Laundry', category: 'Home Services', cards: 20, types: 4, booking: '✅' },
                      { name: 'Maids', category: 'Home Services', cards: 20, types: 5, booking: '❌' },
                      { name: 'Handyman', category: 'Home Services', cards: 5, types: 4, booking: '✅' }
                    ].map((service, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{service.name}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            service.category === 'Professional' ? 'bg-purple-100 text-purple-700' :
                            service.category === 'Lifestyle' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {service.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-sm font-bold text-gray-900">{service.cards}</td>
                        <td className="py-3 px-4 text-center text-sm text-gray-600">{service.types}</td>
                        <td className="py-3 px-4 text-center text-lg">{service.booking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Content Metrics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Languages Active</span>
                    <span className="text-2xl font-bold">3/6</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Currencies Active</span>
                    <span className="text-2xl font-bold">4/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Translations</span>
                    <span className="text-2xl font-bold">1247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Hero Sections</span>
                    <span className="text-2xl font-bold">15</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Media Metrics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Total Files</span>
                    <span className="text-2xl font-bold">350</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Images</span>
                    <span className="text-2xl font-bold">280</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">SVG</span>
                    <span className="text-2xl font-bold">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Icons</span>
                    <span className="text-2xl font-bold">25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Database Entities Section */}
        {activeSection === 'database' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">💾 Database Entities</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <div className="text-lg text-gray-600">Loading database stats...</div>
              </div>
            ) : (
              <>
                {/* Entity Counts */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">🚗</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.cars || 0}</div>
                    <div className="text-sm opacity-90">Rental Cars</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">🏍️</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.motorbikes || 0}</div>
                    <div className="text-sm opacity-90">Motorbikes</div>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">🛥️</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.yachts || 0}</div>
                    <div className="text-sm opacity-90">Yachts</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">🏠</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.properties || 0}</div>
                    <div className="text-sm opacity-90">Properties</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.activities || 0}</div>
                    <div className="text-sm opacity-90">Activities</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">👩</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.maids || 0}</div>
                    <div className="text-sm opacity-90">Maids</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">⚕️</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.doctors || 0}</div>
                    <div className="text-sm opacity-90">Doctors</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">⚖️</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.lawyers || 0}</div>
                    <div className="text-sm opacity-90">Lawyers</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">🎓</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.coaches || 0}</div>
                    <div className="text-sm opacity-90">Coaches</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-3xl mb-2">📦</div>
                    <div className="text-3xl font-bold">{dbStats?.counts?.suppliers || 0}</div>
                    <div className="text-sm opacity-90">Suppliers</div>
                  </div>
                </div>

                {/* Entity Lists */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Cars */}
                  {dbStats?.data?.cars && dbStats.data.cars.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🚗</span> Rental Cars ({dbStats.counts.cars})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.cars.map((car: any) => (
                          <div key={car.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{car.brand} {car.model}</div>
                            <div className="text-sm text-gray-600">{car.year} • {car.category}</div>
                            <div className="text-xs text-blue-600 font-semibold">{car.currency} {car.pricePerDay}/day</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Motorbikes */}
                  {dbStats?.data?.motorbikes && dbStats.data.motorbikes.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🏍️</span> Motorbikes ({dbStats.counts.motorbikes})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.motorbikes.map((bike: any) => (
                          <div key={bike.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{bike.brand} {bike.model}</div>
                            <div className="text-sm text-gray-600">{bike.year} • {bike.category}</div>
                            <div className="text-xs text-purple-600 font-semibold">{bike.currency} {bike.pricePerDay}/day</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Yachts */}
                  {dbStats?.data?.yachts && dbStats.data.yachts.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🛥️</span> Yachts ({dbStats.counts.yachts})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.yachts.map((yacht: any) => (
                          <div key={yacht.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{yacht.name}</div>
                            <div className="text-sm text-gray-600">{yacht.length}ft • {yacht.capacity} guests</div>
                            <div className="text-xs text-cyan-600 font-semibold">{yacht.currency} {yacht.pricePerHour}/hour</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Properties */}
                  {dbStats?.data?.properties && dbStats.data.properties.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🏠</span> Properties ({dbStats.counts.properties})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.properties.map((prop: any) => (
                          <div key={prop.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{prop.title}</div>
                            <div className="text-sm text-gray-600">{prop.type} • {prop.bedrooms} beds</div>
                            <div className="text-xs text-green-600 font-semibold">{prop.currency} {prop.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {dbStats?.data?.activities && dbStats.data.activities.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🎯</span> Activities ({dbStats.counts.activities})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.activities.map((activity: any) => (
                          <div key={activity.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{activity.title}</div>
                            <div className="text-sm text-gray-600">{activity.category} • {activity.duration}</div>
                            <div className="text-xs text-orange-600 font-semibold">{activity.currency} {activity.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Maids */}
                  {dbStats?.data?.maids && dbStats.data.maids.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>👩</span> Maids ({dbStats.counts.maids})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.maids.map((maid: any) => (
                          <div key={maid.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{maid.name}</div>
                            <div className="text-sm text-gray-600">{maid.nationality} • {maid.yearsOfExperience} years exp</div>
                            <div className="text-xs text-pink-600 font-semibold">{maid.currency} {maid.monthlyFee}/month</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Doctors */}
                  {dbStats?.data?.doctors && dbStats.data.doctors.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>⚕️</span> Doctors ({dbStats.counts.doctors})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.doctors.map((doctor: any) => (
                          <div key={doctor.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{doctor.name}</div>
                            <div className="text-sm text-gray-600">{doctor.specialty}</div>
                            <div className="text-xs text-red-600 font-semibold">{doctor.yearsOfExperience} years exp</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lawyers */}
                  {dbStats?.data?.lawyers && dbStats.data.lawyers.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>⚖️</span> Lawyers ({dbStats.counts.lawyers})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.lawyers.map((lawyer: any) => (
                          <div key={lawyer.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{lawyer.name}</div>
                            <div className="text-sm text-gray-600">{lawyer.specialty}</div>
                            <div className="text-xs text-indigo-600 font-semibold">{lawyer.yearsOfExperience} years exp</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coaches */}
                  {dbStats?.data?.coaches && dbStats.data.coaches.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🎓</span> Coaches ({dbStats.counts.coaches})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.coaches.map((coach: any) => (
                          <div key={coach.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{coach.name}</div>
                            <div className="text-sm text-gray-600">{coach.specialty}</div>
                            <div className="text-xs text-yellow-600 font-semibold">{coach.yearsOfExperience} years exp</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suppliers */}
                  {dbStats?.data?.suppliers && dbStats.data.suppliers.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>📦</span> Suppliers ({dbStats.counts.suppliers})
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.suppliers.map((supplier: any) => (
                          <div key={supplier.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{supplier.name}</div>
                            <div className="text-sm text-gray-600">{supplier.category}</div>
                            <div className="text-xs text-teal-600 font-semibold">{supplier.productsCount || 0} products</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Locations Section */}
        {activeSection === 'locations' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📍 Locations</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <div className="text-lg text-gray-600">Loading locations...</div>
              </div>
            ) : (
              <>
                {/* Location Counts */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-4xl mb-2">🌍</div>
                    <div className="text-4xl font-bold">{dbStats?.counts?.countries || 0}</div>
                    <div className="text-sm opacity-90">Countries</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-4xl mb-2">🏙️</div>
                    <div className="text-4xl font-bold">{dbStats?.counts?.cities || 0}</div>
                    <div className="text-sm opacity-90">Cities</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="text-4xl mb-2">📍</div>
                    <div className="text-4xl font-bold">{dbStats?.counts?.districts || 0}</div>
                    <div className="text-sm opacity-90">Districts</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Countries */}
                  {dbStats?.data?.countries && dbStats.data.countries.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🌍</span> Countries
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.countries.map((country: any) => (
                          <div key={country.id} className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-gray-900">{country.name}</div>
                              <div className="text-xs text-gray-600">{country.code}</div>
                              <div className="text-xs text-gray-500">{country.isActive ? '✅ Active' : '❌ Inactive'}</div>
                            </div>
                            <div className="text-2xl">{country.flag || '🌍'}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cities */}
                  {dbStats?.data?.cities && dbStats.data.cities.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🏙️</span> Cities
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.cities.map((city: any) => (
                          <div key={city.id} className="bg-green-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{city.name}</div>
                            <div className="text-xs text-gray-600">{city.Country?.name || 'N/A'}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Districts */}
                  {dbStats?.data?.districts && dbStats.data.districts.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span>📍</span> Districts
                      </h3>
                      <div className="space-y-2">
                        {dbStats.data.districts.map((district: any) => (
                          <div key={district.id} className="bg-purple-50 rounded-lg p-3">
                            <div className="font-semibold text-gray-900">{district.name}</div>
                            <div className="text-xs text-gray-600">{district.City?.name || 'N/A'}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Routes Section */}
        {activeSection === 'routes' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🗺️ Routes & Pages</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Total Routes</h3>
                <span className="text-3xl font-bold text-blue-600">27</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Professional Services */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Professional Services</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">6 routes</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {['/doctors', '/lawyers', '/coaches', '/suppliers', '/business-setup', '/insurance'].map((route) => (
                    <Link key={route} href={`/en${route}`} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                      <span className="text-blue-600 group-hover:text-blue-700">→</span>
                      <span className="text-sm text-gray-700 group-hover:text-blue-700 font-mono">{route}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Lifestyle & Travel */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Lifestyle & Travel</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">5 routes</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {['/car-rental', '/motorbike-rental', '/yachts', '/properties', '/activities'].map((route) => (
                    <Link key={route} href={`/en${route}`} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                      <span className="text-blue-600 group-hover:text-blue-700">→</span>
                      <span className="text-sm text-gray-700 group-hover:text-blue-700 font-mono">{route}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Home Services */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Home Services</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">5 routes</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {['/home-cleaning', '/home-cleaning/home', '/home-cleaning/furniture', '/home-cleaning/laundry', '/maids'].map((route) => (
                    <Link key={route} href={`/en${route}`} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                      <span className="text-blue-600 group-hover:text-blue-700">→</span>
                      <span className="text-sm text-gray-700 group-hover:text-blue-700 font-mono">{route}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Handyman Services */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Handyman Services</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">6 routes</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {['/handyman', '/handyman/plumbing', '/handyman/electrical', '/handyman/ac-repair', '/handyman/carpentry', '/handyman/painting'].map((route) => (
                    <Link key={route} href={`/en${route}`} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                      <span className="text-blue-600 group-hover:text-blue-700">→</span>
                      <span className="text-sm text-gray-700 group-hover:text-blue-700 font-mono">{route}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Booking Pages */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Booking Pages</h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">2 routes</span>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {['/home-cleaning/booking', '/handyman/booking'].map((route) => (
                    <Link key={route} href={`/en${route}`} className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors group">
                      <span className="text-green-600 group-hover:text-green-700">→</span>
                      <span className="text-sm text-gray-700 group-hover:text-green-700 font-mono">{route}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Pages Section */}
        {activeSection === 'pages' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📄 All Pages Directory</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Total Pages</h3>
                <span className="text-3xl font-bold text-blue-600">27</span>
              </div>
              <p className="text-gray-600">Complete list of all pages organized by category</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Professional Services */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                  <span>👔</span> Professional Services
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Doctors & Dentists', url: '/doctors', desc: 'Medical professionals directory' },
                    { name: 'Lawyers', url: '/lawyers', desc: 'Legal services and consultants' },
                    { name: 'Coaches', url: '/coaches', desc: 'Life and business coaches' },
                    { name: 'Suppliers', url: '/suppliers', desc: 'Business suppliers catalog' },
                    { name: 'Business Setup', url: '/business-setup', desc: 'Company formation services' },
                    { name: 'Insurance', url: '/insurance', desc: 'Insurance policies and quotes' }
                  ].map((page) => (
                    <Link key={page.url} href={`/en${page.url}`} className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="font-semibold text-gray-900">{page.name}</div>
                      <div className="text-xs text-gray-500">{page.desc}</div>
                      <div className="text-xs text-purple-600 font-mono mt-1">/en{page.url}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Lifestyle & Travel */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <span>✈️</span> Lifestyle & Travel
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Car Rental', url: '/car-rental', desc: 'Rent cars and vehicles' },
                    { name: 'Motorbike Rental', url: '/motorbike-rental', desc: '20 bikes and scooters' },
                    { name: 'Yachts', url: '/yachts', desc: '10 luxury yachts for rent' },
                    { name: 'Properties', url: '/properties', desc: 'Real estate listings' },
                    { name: 'Activities', url: '/activities', desc: 'Tours and experiences' }
                  ].map((page) => (
                    <Link key={page.url} href={`/en${page.url}`} className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="font-semibold text-gray-900">{page.name}</div>
                      <div className="text-xs text-gray-500">{page.desc}</div>
                      <div className="text-xs text-blue-600 font-mono mt-1">/en{page.url}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Home Services */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <span>🏠</span> Home Services
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Home Cleaning Hub', url: '/home-cleaning', desc: 'All cleaning services' },
                    { name: 'Home Cleaning', url: '/home-cleaning/home', desc: 'Regular & deep cleaning' },
                    { name: 'Furniture Cleaning', url: '/home-cleaning/furniture', desc: 'Sofa, mattress, carpet' },
                    { name: 'Laundry', url: '/home-cleaning/laundry', desc: 'Laundry & dry cleaning' },
                    { name: 'Maids', url: '/maids', desc: '20 maids from 20 countries' }
                  ].map((page) => (
                    <Link key={page.url} href={`/en${page.url}`} className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="font-semibold text-gray-900">{page.name}</div>
                      <div className="text-xs text-gray-500">{page.desc}</div>
                      <div className="text-xs text-green-600 font-mono mt-1">/en{page.url}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Handyman Services */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
                  <span>🔧</span> Handyman Services
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Handyman Hub', url: '/handyman', desc: 'All handyman services' },
                    { name: 'Plumbing', url: '/handyman/plumbing', desc: 'Plumbing repairs' },
                    { name: 'Electrical', url: '/handyman/electrical', desc: 'Electrical work' },
                    { name: 'AC Repair', url: '/handyman/ac-repair', desc: 'AC maintenance' },
                    { name: 'Carpentry', url: '/handyman/carpentry', desc: 'Woodwork services' },
                    { name: 'Painting', url: '/handyman/painting', desc: 'Painting services' }
                  ].map((page) => (
                    <Link key={page.url} href={`/en${page.url}`} className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="font-semibold text-gray-900">{page.name}</div>
                      <div className="text-xs text-gray-500">{page.desc}</div>
                      <div className="text-xs text-orange-600 font-mono mt-1">/en{page.url}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Booking & Admin Pages */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>⚙️</span> System Pages
                </h3>
                <div className="grid md:grid-cols-3 gap-2">
                  {[
                    { name: 'Home Cleaning Booking', url: '/home-cleaning/booking', desc: 'Booking workflow' },
                    { name: 'Handyman Booking', url: '/handyman/booking', desc: 'Booking workflow' },
                    { name: 'Tools Dashboard', url: '/tools', desc: 'Admin dashboard' }
                  ].map((page) => (
                    <Link key={page.url} href={`/en${page.url}`} className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="font-semibold text-gray-900">{page.name}</div>
                      <div className="text-xs text-gray-500">{page.desc}</div>
                      <div className="text-xs text-gray-600 font-mono mt-1">/en{page.url}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Section */}
        {activeSection === 'booking' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📅 Booking Workflows</h2>
            
            <div className="space-y-6">
              {/* Home Cleaning Booking */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Home Cleaning Booking</h3>
                    <Link href="/en/home-cleaning/booking" className="text-sm text-blue-600 hover:text-blue-700 font-mono">
                      /en/home-cleaning/booking →
                    </Link>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">4 steps</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Cart Types</div>
                    <div className="flex flex-wrap gap-2">
                      {['cleaningCart', 'furnitureCart', 'laundryCart'].map((cart) => (
                        <span key={cart} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-mono">
                          {cart}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Workflow Steps</div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-700">1. Date & Time Selection</div>
                      <div className="text-xs text-gray-700">2. Contact Information</div>
                      <div className="text-xs text-gray-700">3. Address Details</div>
                      <div className="text-xs text-gray-700">4. Review & Confirm</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handyman Booking */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Handyman Booking</h3>
                    <Link href="/en/handyman/booking" className="text-sm text-blue-600 hover:text-blue-700 font-mono">
                      /en/handyman/booking →
                    </Link>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">4 steps</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Cart Types</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-mono">handymanCart</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Workflow Steps</div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-700">1. Date & Time Selection</div>
                      <div className="text-xs text-gray-700">2. Contact Information</div>
                      <div className="text-xs text-gray-700">3. Address Details</div>
                      <div className="text-xs text-gray-700">4. Review & Confirm</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment System Info */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">📋 Appointment System</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm opacity-90">Active Workflows</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm opacity-90">Cart Types</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm opacity-90">Functional</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        {activeSection === 'content' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🌐 Content & i18n</h2>
            
            {/* Languages */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[{ code: 'en', name: 'English', active: true }, { code: 'fr', name: 'Français', active: true }, { code: 'ar', name: 'العربية', active: true }, { code: 'es', name: 'Español', active: false }, { code: 'de', name: 'Deutsch', active: false }, { code: 'zh', name: '中文', active: false }].map((lang) => (
                  <div key={lang.code} className={`p-4 rounded-lg border-2 ${lang.active ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{lang.name}</div>
                        <div className="text-sm text-gray-600 font-mono">{lang.code}</div>
                      </div>
                      <div>{lang.active ? <span className="text-green-600 text-2xl">✓</span> : <span className="text-gray-400 text-2xl">○</span>}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currencies */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Currencies</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {[{ code: 'AED', symbol: 'AED', active: true }, { code: 'USD', symbol: '$', active: true }, { code: 'EUR', symbol: '€', active: true }, { code: 'THB', symbol: '฿', active: true }, { code: 'GBP', symbol: '£', active: false }].map((curr) => (
                  <div key={curr.code} className={`p-4 rounded-lg border-2 text-center ${curr.active ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{curr.symbol}</div>
                    <div className="text-sm text-gray-600 font-mono">{curr.code}</div>
                    {curr.active && <div className="text-xs text-blue-600 mt-2">Active</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white text-center">
                <div className="text-4xl mb-2">🦸</div>
                <div className="text-3xl font-bold">15</div>
                <div className="text-sm opacity-90">Hero Sections</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center">
                <div className="text-4xl mb-2">📄</div>
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm opacity-90">Headers</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white text-center">
                <div className="text-4xl mb-2">🦶</div>
                <div className="text-3xl font-bold">2</div>
                <div className="text-sm opacity-90">Footers</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white text-center">
                <div className="text-4xl mb-2">🔤</div>
                <div className="text-3xl font-bold">1247</div>
                <div className="text-sm opacity-90">Translations</div>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        {activeSection === 'header' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🔝 Header Components</h2>
            
            <div className="space-y-6">
              {/* Header Elements */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Header Elements</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Logo</h4>
                    <p className="text-sm text-gray-600 mb-2">⚙️ JustRichard</p>
                    <div className="text-xs text-gray-500">Position: Top left</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Navigation Menu</h4>
                    <p className="text-sm text-gray-600 mb-2">Main navigation links</p>
                    <div className="text-xs text-gray-500">Items: 15+ categories</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Language Selector</h4>
                    <p className="text-sm text-gray-600 mb-2">EN | FR | AR</p>
                    <div className="text-xs text-gray-500">3 active languages</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Auth Buttons</h4>
                    <p className="text-sm text-gray-600 mb-2">Login / Sign Up</p>
                    <div className="text-xs text-gray-500">Position: Top right</div>
                  </div>
                </div>
              </div>

              {/* Navigation Structure */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Navigation Structure</h3>
                <div className="space-y-3">
                  {[
                    { category: 'Professional Services', items: ['Doctors', 'Lawyers', 'Coaches', 'Suppliers', 'Business Setup', 'Insurance'] },
                    { category: 'Lifestyle & Travel', items: ['Car Rental', 'Motorbike Rental', 'Yachts', 'Properties', 'Activities'] },
                    { category: 'Home Services', items: ['Home Cleaning', 'Furniture', 'Laundry', 'Maids'] },
                    { category: 'Handyman', items: ['Plumbing', 'Electrical', 'AC Repair', 'Carpentry', 'Painting'] }
                  ].map((nav) => (
                    <div key={nav.category} className="border-l-4 border-blue-500 pl-4">
                      <div className="font-semibold text-gray-900">{nav.category}</div>
                      <div className="text-sm text-gray-600">{nav.items.join(' • ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}
        {activeSection === 'footer' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🔻 Footer Components</h2>
            
            <div className="space-y-6">
              {/* Footer Structure */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Footer Structure</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• About Us</li>
                      <li>• Careers</li>
                      <li>• Press</li>
                      <li>• Blog</li>
                      <li>• Partners</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Professional Services</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Doctors & Dentists</li>
                      <li>• Lawyers</li>
                      <li>• Coaches</li>
                      <li>• Suppliers</li>
                      <li>• Business Setup</li>
                      <li>• Insurance</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Lifestyle & Travel</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Car Rental</li>
                      <li>• Motorbike Rental</li>
                      <li>• Yachts</li>
                      <li>• Properties</li>
                      <li>• Activities</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Home Services</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Home Cleaning</li>
                      <li>• Furniture Cleaning</li>
                      <li>• Laundry</li>
                      <li>• Maids</li>
                      <li>• Handyman</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Footer Bottom</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Legal</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Terms of Service</div>
                      <div>• Privacy Policy</div>
                      <div>• Cookie Policy</div>
                      <div>• Legal Notice</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• Help Center</div>
                      <div>• Contact Us</div>
                      <div>• FAQ</div>
                      <div>• Safety Guidelines</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Newsletter Section</h3>
                <p className="text-sm opacity-90 mb-4">Email subscription form for updates and promotions</p>
                <div className="bg-white/20 rounded-lg p-3 text-sm">
                  Input: Email + Subscribe Button
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Section */}
        {activeSection === 'social' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">📱 Social Media</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                { name: 'Facebook', icon: '📘', url: 'https://facebook.com', color: 'from-blue-600 to-blue-700' },
                { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', color: 'from-sky-500 to-sky-600' },
                { name: 'Instagram', icon: '📸', url: 'https://instagram.com', color: 'from-pink-500 to-purple-600' },
                { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com', color: 'from-blue-700 to-blue-800' },
                { name: 'YouTube', icon: '📹', url: 'https://youtube.com', color: 'from-red-600 to-red-700' },
                { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com', color: 'from-gray-900 to-gray-800' },
                { name: 'WhatsApp', icon: '💬', url: 'https://whatsapp.com', color: 'from-green-500 to-green-600' },
                { name: 'Telegram', icon: '✈️', url: 'https://telegram.org', color: 'from-blue-500 to-blue-600' }
              ].map((social) => (
                <div key={social.name} className={`bg-gradient-to-br ${social.color} rounded-xl shadow-lg p-6 text-white`}>
                  <div className="text-4xl mb-2">{social.icon}</div>
                  <h3 className="text-lg font-semibold mb-1">{social.name}</h3>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-xs opacity-90 hover:opacity-100">
                    {social.url}
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media Strategy</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Content Types</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Service highlights</li>
                    <li>• Customer testimonials</li>
                    <li>• Promotions & offers</li>
                    <li>• Tips & guides</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Posting Schedule</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Daily posts</li>
                    <li>• Stories 2-3x/day</li>
                    <li>• Reels weekly</li>
                    <li>• Live sessions monthly</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Engagement</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Respond to comments</li>
                    <li>• Share user content</li>
                    <li>• Run contests</li>
                    <li>• Collaborate with influencers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sitemap Section */}
        {activeSection === 'sitemap' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🗺️ Sitemap</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">XML Sitemap</h3>
                <a href="/sitemap.xml" target="_blank" className="text-blue-600 hover:text-blue-700 font-mono text-sm">
                  /sitemap.xml →
                </a>
              </div>
              <p className="text-gray-600 mb-4">Complete sitemap for search engines with all pages and their priorities</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-mono text-gray-700">
                  &lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;<br/>
                  &nbsp;&nbsp;&lt;url&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;loc&gt;https://justrichard.com/en&lt;/loc&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;priority&gt;1.0&lt;/priority&gt;<br/>
                  &nbsp;&nbsp;&lt;/url&gt;<br/>
                  &nbsp;&nbsp;...<br/>
                  &lt;/urlset&gt;
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Page Hierarchy</h3>
              <div className="space-y-4">
                {[
                  { level: 'Homepage', priority: '1.0', pages: ['/'] },
                  { level: 'Main Categories', priority: '0.9', pages: ['/doctors', '/lawyers', '/car-rental', '/home-cleaning', '/handyman'] },
                  { level: 'Sub-categories', priority: '0.8', pages: ['/home-cleaning/home', '/home-cleaning/furniture', '/handyman/plumbing'] },
                  { level: 'Detail Pages', priority: '0.7', pages: ['/motorbike-rental/[slug]', '/yachts/[slug]', '/maids/[slug]'] },
                  { level: 'Booking Pages', priority: '0.6', pages: ['/home-cleaning/booking', '/handyman/booking'] },
                  { level: 'Static Pages', priority: '0.5', pages: ['/about', '/contact', '/faq', '/terms', '/privacy'] }
                ].map((item) => (
                  <div key={item.level} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{item.level}</span>
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Priority: {item.priority}</span>
                    </div>
                    <div className="text-sm text-gray-600">{item.pages.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Colors & Styles Section */}
        {activeSection === 'colors' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🎨 Colors & Styles</h2>
            
            {/* Primary Colors */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Blue Primary', color: 'bg-blue-600', hex: '#2563EB' },
                  { name: 'Blue Dark', color: 'bg-blue-900', hex: '#1E3A8A' },
                  { name: 'Green', color: 'bg-green-600', hex: '#16A34A' },
                  { name: 'Purple', color: 'bg-purple-600', hex: '#9333EA' },
                  { name: 'Orange', color: 'bg-orange-600', hex: '#EA580C' },
                  { name: 'Pink', color: 'bg-pink-600', hex: '#DB2777' }
                ].map((color) => (
                  <div key={color.name} className="text-center">
                    <div className={`${color.color} h-24 rounded-lg mb-2 shadow-md`}></div>
                    <div className="text-sm font-semibold text-gray-900">{color.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{color.hex}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Colors */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Category Colors</h3>
              <div className="space-y-3">
                {[
                  { category: 'Professional Services', color: 'bg-purple-600', text: 'text-purple-600' },
                  { category: 'Lifestyle & Travel', color: 'bg-blue-600', text: 'text-blue-600' },
                  { category: 'Home Services', color: 'bg-green-600', text: 'text-green-600' },
                  { category: 'Handyman', color: 'bg-orange-600', text: 'text-orange-600' }
                ].map((cat) => (
                  <div key={cat.category} className="flex items-center gap-4">
                    <div className={`${cat.color} w-16 h-16 rounded-lg shadow-md`}></div>
                    <div>
                      <div className={`font-semibold ${cat.text}`}>{cat.category}</div>
                      <div className="text-sm text-gray-600">Used for cards, badges, and highlights</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Typography</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">Heading 1</div>
                  <div className="text-sm text-gray-500">text-4xl font-bold</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">Heading 2</div>
                  <div className="text-sm text-gray-500">text-3xl font-bold</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900 mb-1">Heading 3</div>
                  <div className="text-sm text-gray-500">text-2xl font-semibold</div>
                </div>
                <div>
                  <div className="text-base text-gray-700 mb-1">Body Text - Regular paragraph text for content</div>
                  <div className="text-sm text-gray-500">text-base text-gray-700</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Small Text - Secondary information and captions</div>
                  <div className="text-sm text-gray-500">text-sm text-gray-600</div>
                </div>
              </div>
            </div>

            {/* Spacing & Borders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Spacing & Borders</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Border Radius</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-blue-100 rounded"></div>
                      <span className="text-sm">rounded (0.25rem)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg"></div>
                      <span className="text-sm">rounded-lg (0.5rem)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl"></div>
                      <span className="text-sm">rounded-xl (0.75rem)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Shadows</h4>
                  <div className="space-y-2">
                    <div className="p-4 bg-white shadow-sm rounded-lg">shadow-sm</div>
                    <div className="p-4 bg-white shadow rounded-lg">shadow</div>
                    <div className="p-4 bg-white shadow-md rounded-lg">shadow-md</div>
                    <div className="p-4 bg-white shadow-lg rounded-lg">shadow-lg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Section */}
        {activeSection === 'media' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🖼️ Media Library</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Total Media Files</h3>
                <span className="text-4xl font-bold text-blue-600">350</span>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[{ type: 'Images', count: 280 }, { type: 'SVG', count: 45 }, { type: 'Icons', count: 25 }].map((type) => (
                  <div key={type.type} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <div className="text-3xl mb-2">{type.type === 'Images' ? '🖼️' : type.type === 'SVG' ? '🎨' : '⭐'}</div>
                    <div className="text-2xl font-bold text-gray-900">{type.count}</div>
                    <div className="text-sm text-gray-600">{type.type}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Distribution</h3>
              <div className="space-y-3">
                {[{ type: 'Images', count: 280 }, { type: 'SVG', count: 45 }, { type: 'Icons', count: 25 }].map((type) => {
                  const percentage = ((type.count / 350) * 100).toFixed(1);
                  return (
                    <div key={type.type}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{type.type}</span>
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Simulators Section */}
        {activeSection === 'simulators' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🧮 Simulators & Calculators</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[{ name: 'Home Cleaning Calculator', url: '/home-cleaning/home', type: 'Service Selection' }, { name: 'Furniture Cart', url: '/home-cleaning/furniture', type: 'Multi-item Cart' }, { name: 'Laundry Cart', url: '/home-cleaning/laundry', type: 'Multi-item Cart' }, { name: 'Handyman Selector', url: '/handyman', type: 'Category Selection' }].map((sim) => (
                <div key={sim.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{sim.name}</h3>
                      <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">{sim.type}</span>
                    </div>
                    <div className="text-3xl">🧮</div>
                  </div>
                  <Link href={`/en${sim.url}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>Try Simulator</span>
                    <span>→</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Simulator Types */}
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Simulator Types</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm opacity-90">Service Selection</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm opacity-90">Multi-item Cart</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-sm opacity-90">Category Selection</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards Section */}
        {activeSection === 'cards' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">🃏 Card Types & Components</h2>
            
            <div className="space-y-4">
              {/* Professional Services Cards */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Professional Services</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { page: 'Doctors & Dentists', types: ['Provider Card', 'Specialty Badge', 'Rating Card', 'Appointment Button'], count: 15 },
                    { page: 'Lawyers', types: ['Lawyer Profile Card', 'Practice Area Badge', 'Experience Card', 'Contact Card'], count: 12 },
                    { page: 'Coaches', types: ['Coach Card', 'Expertise Badge', 'Session Card', 'Testimonial Card'], count: 10 },
                    { page: 'Suppliers', types: ['Supplier Card', 'Product Category', 'Rating Card', 'Contact Info'], count: 8 },
                    { page: 'Business Setup', types: ['Service Card', 'Package Card', 'Feature List', 'Price Card'], count: 6 },
                    { page: 'Insurance', types: ['Policy Card', 'Coverage Badge', 'Price Comparison', 'Benefits Card'], count: 8 }
                  ].map((card) => (
                    <div key={card.page} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{card.page}</h4>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">{card.count}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {card.types.map((type) => (
                          <span key={type} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{type}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle & Travel Cards */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Lifestyle & Travel</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { page: 'Car Rental', types: ['Vehicle Card', 'Specification Card', 'Price Card', 'Booking Button', 'Feature Badge'], count: 15 },
                    { page: 'Motorbike Rental', types: ['Bike Card', 'Engine Badge', 'Price Card', 'Category Filter', 'Detail Card'], count: 20 },
                    { page: 'Yachts', types: ['Yacht Card', 'Capacity Badge', 'Amenity List', 'Price Card', 'Gallery Card'], count: 10 },
                    { page: 'Properties', types: ['Property Card', 'Location Badge', 'Feature List', 'Price Card', 'Image Gallery'], count: 12 },
                    { page: 'Activities', types: ['Activity Card', 'Category Badge', 'Duration Card', 'Price Card', 'Rating Card'], count: 8 }
                  ].map((card) => (
                    <div key={card.page} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{card.page}</h4>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">{card.count}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {card.types.map((type) => (
                          <span key={type} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{type}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Home Services Cards */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Home Services</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { page: 'Home Cleaning', types: ['Service Card', 'Price Card', 'Feature Card', 'Size Selector'], count: 18 },
                    { page: 'Furniture Cleaning', types: ['Product Card', 'Cart Item Card', 'Quantity Selector', 'Price Card'], count: 23 },
                    { page: 'Laundry & Dry Cleaning', types: ['Service Card', 'Item Card', 'Cart Card', 'Price Calculator'], count: 20 },
                    { page: 'Maids', types: ['Profile Card', 'Skill Badge', 'Price Card', 'Experience Card', 'Language Badge'], count: 20 },
                    { page: 'Handyman', types: ['Service Category Card', 'Booking Card', 'Specialty Badge', 'Price Card'], count: 5 }
                  ].map((card) => (
                    <div key={card.page} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{card.page}</h4>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">{card.count}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {card.types.map((type) => (
                          <span key={type} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{type}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Stats */}
            <div className="mt-6 grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center">
                <div className="text-4xl mb-2">🃏</div>
                <div className="text-3xl font-bold">16</div>
                <div className="text-sm opacity-90">Pages with Cards</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white text-center">
                <div className="text-4xl mb-2">📦</div>
                <div className="text-3xl font-bold">210</div>
                <div className="text-sm opacity-90">Total Cards</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white text-center">
                <div className="text-4xl mb-2">🎨</div>
                <div className="text-3xl font-bold">45+</div>
                <div className="text-sm opacity-90">Card Types</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white text-center">
                <div className="text-4xl mb-2">✨</div>
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm opacity-90">Categories</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
