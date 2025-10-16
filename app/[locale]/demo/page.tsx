'use client';

import { signIn } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { User, Shield, Building2, Users } from 'lucide-react';

export default function DemoPage() {
  const params = useParams();
  const locale = params.locale as string;

  const users = [
    {
      type: 'Admin',
      icon: Shield,
      email: 'admin@communityhub.com',
      password: 'admin123',
      role: 'ADMIN',
      color: 'red',
      description: 'Accès complet à toutes les fonctionnalités',
      access: [
        '✓ Dashboard admin complet',
        '✓ Gestion des utilisateurs',
        '✓ Gestion des services',
        '✓ Gestion des réservations',
        '✓ Gestion des catégories',
        '✓ Gestion des partenaires',
        '✓ Gestion des chatbots',
        '✓ Import JSON',
        '✓ Toutes les statistiques',
      ],
    },
    {
      type: 'Client',
      icon: User,
      email: 'customer@test.com',
      password: 'customer123',
      role: 'CUSTOMER',
      color: 'blue',
      description: 'Utilisateur standard qui réserve des services',
      access: [
        '✓ Parcourir les services',
        '✓ Réserver des services',
        '✓ Gérer son profil',
        '✓ Gérer ses adresses',
        '✓ Voir ses réservations',
        '✓ Laisser des avis',
        '✓ Services favoris',
        '✗ Accès admin',
      ],
    },
    {
      type: 'Partenaire',
      icon: Building2,
      email: 'partner@example.com',
      password: 'partner123',
      role: 'PROVIDER',
      color: 'green',
      description: 'Prestataire de services avec dashboard dédié',
      access: [
        '✓ Dashboard partenaire',
        '✓ Gérer ses services',
        '✓ Voir ses réservations',
        '✓ Calendrier de disponibilité',
        '✓ Statistiques de revenus',
        '✓ Chatbot assigné',
        '✓ Documents de vérification',
        '✗ Gestion globale',
      ],
    },
    {
      type: 'Manager',
      icon: Users,
      email: 'manager@communityhub.com',
      password: 'manager123',
      role: 'MANAGER',
      color: 'purple',
      description: 'Gestionnaire avec accès limité à l\'admin',
      access: [
        '✓ Dashboard admin',
        '✓ Gestion des services',
        '✓ Gestion des réservations',
        '✓ Gestion des catégories',
        '✓ Gestion des chatbots',
        '✓ Statistiques',
        '✗ Gestion des utilisateurs',
        '✗ Gestion des partenaires',
      ],
    },
  ];

  const handleLogin = async (email: string, password: string) => {
    await signIn('credentials', {
      email,
      password,
      callbackUrl: `/${locale}`,
    });
  };

  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700',
      icon: 'text-red-200',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      icon: 'text-blue-200',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700',
      icon: 'text-green-200',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      icon: 'text-purple-200',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎭 Comptes de Démonstration
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Testez la plateforme avec différents types d'utilisateurs
          </p>
          <p className="text-sm text-gray-500">
            Cliquez sur "Se connecter" pour vous connecter instantanément
          </p>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {users.map((user) => {
            const Icon = user.icon;
            const colors = colorClasses[user.color as keyof typeof colorClasses];
            
            return (
              <div
                key={user.email}
                className={`${colors.bg} border-2 ${colors.border} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}
              >
                {/* Header */}
                <div className={`${colors.button} text-white p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Icon className="w-10 h-10" />
                      <div>
                        <h2 className="text-2xl font-bold">{user.type}</h2>
                        <span className="text-sm opacity-90">{user.role}</span>
                      </div>
                    </div>
                    <Icon className={`w-20 h-20 ${colors.icon} opacity-20`} />
                  </div>
                  <p className="text-sm opacity-90">{user.description}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Credentials */}
                  <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      🔑 Identifiants
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 w-20">Email:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">
                          {user.email}
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 w-20">Password:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1">
                          {user.password}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Access Rights */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      🎯 Droits d'accès
                    </h3>
                    <ul className="space-y-1 text-sm">
                      {user.access.map((access, index) => (
                        <li
                          key={index}
                          className={`${
                            access.startsWith('✓')
                              ? 'text-green-700'
                              : 'text-gray-400'
                          }`}
                        >
                          {access}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={() => handleLogin(user.email, user.password)}
                    className={`w-full ${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}
                  >
                    <User className="w-5 h-5" />
                    Se connecter en tant que {user.type}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Access Links */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🚀 Accès Rapides
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href={`/${locale}`}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">🏠</div>
              <div className="text-sm font-medium">Accueil</div>
            </a>
            <a
              href={`/${locale}/services`}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">📦</div>
              <div className="text-sm font-medium">Services</div>
            </a>
            <a
              href={`/${locale}/admin`}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium">Admin</div>
            </a>
            <a
              href={`/${locale}/admin/partners`}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">🤝</div>
              <div className="text-sm font-medium">Partenaires</div>
            </a>
            <a
              href={`/${locale}/admin/chatbots`}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">🤖</div>
              <div className="text-sm font-medium">Chatbots</div>
            </a>
            <a
              href={`/${locale}/bookings`}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-medium">Réservations</div>
            </a>
            <a
              href={`/${locale}/profile`}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="text-sm font-medium">Profil</div>
            </a>
            <a
              href={`/${locale}/auth/login`}
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">🔐</div>
              <div className="text-sm font-medium">Login</div>
            </a>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            💡 Informations
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Les comptes sont créés automatiquement lors du seed de la base de données</li>
            <li>• Chaque type d'utilisateur a des permissions différentes</li>
            <li>• L'admin peut tout gérer, le client peut réserver, le partenaire gère ses services</li>
            <li>• Pour créer un compte partenaire, utilisez l'import JSON dans /admin/partners</li>
            <li>• Les chatbots peuvent être associés à des partenaires spécifiques</li>
          </ul>
        </div>

        {/* Languages */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-3">🌍 Tester dans d'autres langues :</p>
          <div className="flex justify-center gap-3">
            <a
              href="/en/demo"
              className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              🇬🇧 English
            </a>
            <a
              href="/ar/demo"
              className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              🇸🇦 العربية
            </a>
            <a
              href="/fr/demo"
              className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              🇫🇷 Français
            </a>
            <a
              href="/th/demo"
              className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              🇹🇭 ไทย
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
