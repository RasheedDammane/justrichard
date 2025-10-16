import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import { Bot, Upload, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default async function AdminChatbotsPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
    redirect(`/${locale}/auth/login`);
  }

  const chatbots = await prisma.chatbot.findMany({
    include: {
      partner: { select: { name: true, email: true } },
      _count: {
        select: { intents: true, conversations: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: chatbots.length,
    active: chatbots.filter((c) => c.isActive).length,
    byIndustry: chatbots.reduce((acc, c) => {
      acc[c.industry] = (acc[c.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    totalConversations: chatbots.reduce((sum, c) => sum + c._count.conversations, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Gestion des Chatbots</h1>
              <p className="text-primary-100 mt-1">Chatbots par métier et industrie</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/${locale}/admin/chatbots/import`}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Importer JSON
              </Link>
              <Link
                href={`/${locale}/admin/chatbots/new`}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                + Nouveau Chatbot
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Total Chatbots</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">{stats.total}</div>
              </div>
              <Bot className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Actifs</div>
                <div className="text-3xl font-bold text-green-600 mt-2">{stats.active}</div>
              </div>
              <Bot className="w-12 h-12 text-green-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Industries</div>
                <div className="text-3xl font-bold text-purple-600 mt-2">
                  {Object.keys(stats.byIndustry).length}
                </div>
              </div>
              <MessageSquare className="w-12 h-12 text-purple-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Conversations</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{stats.totalConversations}</div>
              </div>
              <MessageSquare className="w-12 h-12 text-blue-200" />
            </div>
          </div>
        </div>

        {/* Chatbots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatbots.map((chatbot) => (
            <div key={chatbot.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-32 flex items-center justify-center ${
                chatbot.isActive ? 'bg-gradient-to-br from-primary-400 to-primary-600' : 'bg-gray-400'
              }`}>
                {chatbot.avatar ? (
                  <img src={chatbot.avatar} alt={chatbot.name} className="w-20 h-20 rounded-full" />
                ) : (
                  <Bot className="w-20 h-20 text-white" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{chatbot.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {chatbot.type}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {chatbot.industry}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {chatbot.language}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {chatbot.description || 'Pas de description'}
                </p>

                {chatbot.partner && (
                  <div className="text-sm text-gray-500 mb-3">
                    <span className="font-medium">Partenaire:</span> {chatbot.partner.name}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{chatbot._count.intents} intents</span>
                    <span>{chatbot._count.conversations} conv.</span>
                  </div>
                  {chatbot.isActive ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Actif
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Inactif
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Link
                    href={`/${locale}/admin/chatbots/${chatbot.id}`}
                    className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors text-center"
                  >
                    Voir
                  </Link>
                  <Link
                    href={`/${locale}/admin/chatbots/${chatbot.id}/edit`}
                    className="flex-1 bg-primary-50 text-primary-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-100 transition-colors text-center"
                  >
                    Modifier
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {chatbots.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun chatbot</h3>
            <p className="text-gray-500 mb-6">
              Créez votre premier chatbot ou importez des chatbots pré-configurés par métier
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href={`/${locale}/admin/chatbots/import`}
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                <Upload className="w-5 h-5" />
                Importer JSON
              </Link>
              <Link
                href={`/${locale}/admin/chatbots/new`}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700"
              >
                + Créer un Chatbot
              </Link>
            </div>
          </div>
        )}

        {/* Industry Breakdown */}
        {Object.keys(stats.byIndustry).length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Répartition par Industrie</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.byIndustry).map(([industry, count]) => (
                <div key={industry} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">{count}</div>
                  <div className="text-sm text-gray-600 mt-1">{industry}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
