'use client';

import { useAdminTranslation } from '@/hooks/useAdminTranslation';

interface DashboardClientProps {
  userName: string;
  totalUsers: number;
  totalBookings: number;
  totalServices: number;
  totalDoctors: number;
  totalLawyers: number;
  totalCoaches: number;
  totalMaids: number;
  totalYachts: number;
  totalFoodProducts: number;
  totalTransfers: number;
  totalActivities: number;
  totalSuppliers: number;
  totalProperties: number;
  totalMotorbikes: number;
  totalRentalCars: number;
  totalEvents: number;
  totalCurrencies: number;
  totalCountries: number;
  totalExchangeRates: number;
  totalRoutes: number;
  totalSimulators: number;
  totalMovingServices: number;
  totalParcelServices: number;
  totalHomeCleaning: number;
  totalFurnitureCleaning: number;
  totalLaundry: number;
  totalRevenue: number;
  bookingsByType: { type: string; count: number }[];
  bookingsByStatus: { status: string; count: number }[];
  recentBookings: any[];
  errorLogs: any[];
  locale: string;
}

export default function DashboardClient({
  userName,
  totalUsers,
  totalBookings,
  totalServices,
  totalDoctors,
  totalLawyers,
  totalCoaches,
  totalMaids,
  totalYachts,
  totalFoodProducts,
  totalTransfers,
  totalActivities,
  totalSuppliers,
  totalProperties,
  totalMotorbikes,
  totalRentalCars,
  totalEvents,
  totalCurrencies,
  totalCountries,
  totalExchangeRates,
  totalRoutes,
  totalSimulators,
  totalMovingServices,
  totalParcelServices,
  totalHomeCleaning,
  totalFurnitureCleaning,
  totalLaundry,
  totalRevenue,
  bookingsByType,
  bookingsByStatus,
  recentBookings,
  errorLogs,
  locale,
}: DashboardClientProps) {
  const t = useAdminTranslation('dashboard');

  return (
    <>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-600 mt-1">{t('welcome', { name: userName })}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">{t('totalUsers')}</p>
              <p className="text-3xl font-bold mt-2">{totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">{t('totalBookings')}</p>
              <p className="text-3xl font-bold mt-2">{totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">{t('activeServices')}</p>
              <p className="text-3xl font-bold mt-2">{totalServices}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">{t('totalRevenue')}</p>
              <p className="text-3xl font-bold mt-2">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* All Resources Stats */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 All Resources</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Properties */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🏠 Properties</div>
            <div className="text-2xl font-bold text-gray-900">{totalProperties}</div>
            <a href={`/${locale}/admin/properties`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Doctors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">👨‍⚕️ Doctors</div>
            <div className="text-2xl font-bold text-gray-900">{totalDoctors}</div>
            <a href={`/${locale}/admin/doctors`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Lawyers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">⚖️ Lawyers</div>
            <div className="text-2xl font-bold text-gray-900">{totalLawyers}</div>
            <a href={`/${locale}/admin/lawyers`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Coaches */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">💪 Coaches</div>
            <div className="text-2xl font-bold text-gray-900">{totalCoaches}</div>
            <a href={`/${locale}/admin/coaches`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Maids */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🏠 Maids</div>
            <div className="text-2xl font-bold text-gray-900">{totalMaids}</div>
            <a href={`/${locale}/admin/maids`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Yachts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">⛵ Yachts</div>
            <div className="text-2xl font-bold text-gray-900">{totalYachts}</div>
            <a href={`/${locale}/admin/yachts`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Food Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🍔 Food & Grocery</div>
            <div className="text-2xl font-bold text-gray-900">{totalFoodProducts}</div>
            <a href={`/${locale}/admin/food/products`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Transfers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🚗 Transfers</div>
            <div className="text-2xl font-bold text-gray-900">{totalTransfers}</div>
            <a href={`/${locale}/admin/transfers`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🎯 Activities</div>
            <div className="text-2xl font-bold text-gray-900">{totalActivities}</div>
            <a href={`/${locale}/admin/activities`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Suppliers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">📦 Suppliers</div>
            <div className="text-2xl font-bold text-gray-900">{totalSuppliers}</div>
            <a href={`/${locale}/admin/suppliers`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Motorbikes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🏍️ Motorbikes</div>
            <div className="text-2xl font-bold text-gray-900">{totalMotorbikes}</div>
            <a href={`/${locale}/admin/motorbikes`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Rental Cars */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🚗 Rental Cars</div>
            <div className="text-2xl font-bold text-gray-900">{totalRentalCars}</div>
            <a href={`/${locale}/admin/rental-cars`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">📅 Events</div>
            <div className="text-2xl font-bold text-gray-900">{totalEvents}</div>
            <a href={`/${locale}/admin/events`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Home Cleaning */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🧹 Home Cleaning</div>
            <div className="text-2xl font-bold text-gray-900">{totalHomeCleaning}</div>
            <a href={`/${locale}/admin/home-cleaning`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Furniture Cleaning */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🛋️ Furniture Cleaning</div>
            <div className="text-2xl font-bold text-gray-900">{totalFurnitureCleaning}</div>
            <a href={`/${locale}/admin/furniture-cleaning`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Laundry */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">👕 Laundry</div>
            <div className="text-2xl font-bold text-gray-900">{totalLaundry}</div>
            <a href={`/${locale}/admin/laundry`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Moving Services */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">📦 Moving</div>
            <div className="text-2xl font-bold text-gray-900">{totalMovingServices}</div>
            <a href={`/${locale}/admin/moving`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Parcel Services */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">📮 Parcel</div>
            <div className="text-2xl font-bold text-gray-900">{totalParcelServices}</div>
            <a href={`/${locale}/admin/parcel`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Currencies */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">💱 Currencies</div>
            <div className="text-2xl font-bold text-gray-900">{totalCurrencies}</div>
            <a href={`/${locale}/admin/currencies`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Countries */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🌍 Countries</div>
            <div className="text-2xl font-bold text-gray-900">{totalCountries}</div>
            <a href={`/${locale}/admin/geography`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Exchange Rates */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">💹 Exchange Rates</div>
            <div className="text-2xl font-bold text-gray-900">{totalExchangeRates}</div>
            <a href={`/${locale}/admin/exchange-rates`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Routes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🗺️ Routes</div>
            <div className="text-2xl font-bold text-gray-900">{totalRoutes}</div>
            <a href={`/${locale}/admin/routes`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>

          {/* Simulators */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-1">🧮 Simulators</div>
            <div className="text-2xl font-bold text-gray-900">{totalSimulators}</div>
            <a href={`/${locale}/admin/simulators`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              View all →
            </a>
          </div>
        </div>

        {/* Total Count */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">📊 Total Records in Database</div>
            <div className="text-3xl font-bold text-gray-900">
              {totalUsers + totalProperties + totalDoctors + totalLawyers + totalCoaches + totalMaids + totalYachts + totalFoodProducts + totalTransfers + totalActivities + totalSuppliers + totalBookings + totalServices + totalMotorbikes + totalRentalCars + totalEvents + totalCurrencies + totalCountries + totalExchangeRates + totalRoutes + totalSimulators + totalMovingServices + totalParcelServices + totalHomeCleaning + totalFurnitureCleaning + totalLaundry}
            </div>
          </div>
        </div>
      </div>

      {/* Bookings by Type and Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bookings by Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('bookingsByType')}</h3>
          <div className="space-y-3">
            {bookingsByType.length > 0 ? (
              bookingsByType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">{item.type}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.count}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">{t('noDataAvailable')}</p>
            )}
          </div>
        </div>

        {/* Bookings by Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{t('bookingsByStatus')}</h3>
          <div className="space-y-3">
            {bookingsByStatus.length > 0 ? (
              bookingsByStatus.map((item) => {
                const statusColors: Record<string, string> = {
                  pending: 'bg-yellow-500',
                  confirmed: 'bg-green-500',
                  completed: 'bg-blue-500',
                  cancelled: 'bg-red-500',
                };
                return (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${statusColors[item.status] || 'bg-gray-500'}`}></div>
                      <span className="text-sm font-medium text-gray-700 capitalize">{item.status}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">{t('noDataAvailable')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Error Logs Alert */}
      {errorLogs.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-xl shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-medium text-red-800">
                {t('unresolvedErrors', { count: errorLogs.length, plural: errorLogs.length > 1 ? 's' : '' })}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  {errorLogs.slice(0, 3).map((log: any) => (
                    <li key={log.id}>
                      {log.message} - {new Date(log.createdAt).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <a
                  href={`/${locale}/admin/logs`}
                  className="text-sm font-medium text-red-800 hover:text-red-900 underline"
                >
                  {t('viewAllLogs')} →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">{t('recentBookings')}</h2>
            <a
              href={`/${locale}/admin/bookings`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {t('viewAll')} →
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('client')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('type')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('startDate')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('total')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => {
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {booking.User?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.User?.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">{booking.User?.email || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 capitalize">{booking.type}</div>
                        <div className="text-xs text-gray-500">ID: {booking.id.slice(0, 8)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.startDate).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : booking.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : booking.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${booking.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {t('noRecentBookings')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
