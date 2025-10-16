import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import {
  Bot,
  MessageSquare,
  Building2,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Globe,
  Target,
  Activity,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export default async function ChatbotDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== Role.ADMIN && session.user.role !== Role.MANAGER)) {
    redirect(`/${locale}/auth/login`);
  }

  const chatbot = await prisma.chatbot.findUnique({
    where: { id },
    include: {
      partner: {
        select: {
          id: true,
          name: true,
          email: true,
          logo: true,
        },
      },
      intents: {
        orderBy: { priority: 'desc' },
      },
      conversations: {
        orderBy: { startedAt: 'desc' },
        take: 10,
      },
      _count: {
        select: {
          intents: true,
          conversations: true,
        },
      },
    },
  });

  if (!chatbot) {
    notFound();
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      CUSTOMER_SUPPORT: 'Support Client',
      BOOKING_ASSISTANT: 'Assistant Réservation',
      FAQ: 'FAQ',
      SALES: 'Ventes',
      TECHNICAL: 'Technique',
    };
    return labels[type] || type;
  };

  const getIndustryLabel = (industry: string) => {
    const labels: Record<string, string> = {
      GENERAL: 'Général',
      CLEANING: 'Nettoyage',
      MAINTENANCE: 'Maintenance',
      BEAUTY: 'Beauté',
      HEALTHCARE: 'Santé',
      EDUCATION: 'Éducation',
      FOOD: 'Alimentation',
      TRANSPORT: 'Transport',
    };
    return labels[industry] || industry;
  };

  const activeIntents = chatbot.intents.filter((i) => i.isActive).length;
  const avgRating = chatbot.conversations
    .filter((c) => c.rating)
    .reduce((sum, c) => sum + (c.rating || 0), 0) / chatbot.conversations.filter((c) => c.rating).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-600 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              {chatbot.avatar ? (
                <img src={chatbot.avatar} alt={chatbot.name} className="w-20 h-20 rounded-lg bg-white" />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-white flex items-center justify-center">
                  <Bot className="w-10 h-10 text-primary-600" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">{chatbot.name}</h1>
                <p className="text-primary-100 mt-1">{chatbot.description || 'Chatbot intelligent'}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    {getTypeLabel(chatbot.type)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                    {getIndustryLabel(chatbot.industry)}
                  </span>
                  {chatbot.isActive ? (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Actif
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      Inactif
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/${locale}/admin/chatbots/${id}/edit`}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 flex items-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Modifier
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
                <div className="text-gray-500 text-sm font-medium">Intents</div>
                <div className="text-3xl font-bold text-primary-600 mt-2">
                  {chatbot._count.intents}
                </div>
                <div className="text-xs text-gray-500 mt-1">{activeIntents} actifs</div>
              </div>
              <Target className="w-12 h-12 text-primary-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Conversations</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {chatbot._count.conversations}
                </div>
              </div>
              <MessageSquare className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Note Moyenne</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">
                  {avgRating > 0 ? avgRating.toFixed(1) : 'N/A'}
                </div>
                {avgRating > 0 && <div className="text-xs text-gray-500 mt-1">⭐ / 5</div>}
              </div>
              <Activity className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-sm font-medium">Langue</div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {chatbot.language.toUpperCase()}
                </div>
              </div>
              <Globe className="w-12 h-12 text-green-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Message */}
            {chatbot.welcomeMessage && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Message de bienvenue</h2>
                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
                  <p className="text-gray-700">{chatbot.welcomeMessage}</p>
                </div>
              </div>
            )}

            {/* Intents */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Intents ({chatbot.intents.length})</h2>
              {chatbot.intents.length > 0 ? (
                <div className="space-y-4">
                  {chatbot.intents.map((intent) => (
                    <div
                      key={intent.id}
                      className={`border rounded-lg p-4 ${
                        intent.isActive ? 'border-gray-200' : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{intent.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              Priorité: {intent.priority}
                            </span>
                            {intent.isActive ? (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                                Actif
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                                Inactif
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">Patterns:</div>
                          <div className="flex flex-wrap gap-1">
                            {intent.patterns.map((pattern, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded"
                              >
                                {pattern}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">Réponses:</div>
                          <div className="space-y-1">
                            {intent.responses.map((response, i) => (
                              <div key={i} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                {response}
                              </div>
                            ))}
                          </div>
                        </div>
                        {intent.action && (
                          <div>
                            <div className="text-xs font-medium text-gray-500 mb-1">Action:</div>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{intent.action}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucun intent défini</p>
              )}
            </div>

            {/* Recent Conversations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Conversations récentes</h2>
              {chatbot.conversations.length > 0 ? (
                <div className="space-y-3">
                  {chatbot.conversations.map((conv) => (
                    <div key={conv.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Session: {conv.sessionId.substring(0, 8)}...
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(conv.startedAt).toLocaleString('fr-FR')}
                          </div>
                        </div>
                        {conv.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">⭐</span>
                            <span className="text-sm font-medium">{conv.rating}/5</span>
                          </div>
                        )}
                      </div>
                      {conv.feedback && (
                        <p className="text-sm text-gray-600 mt-2 italic">"{conv.feedback}"</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Aucune conversation</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Partner Info */}
            {chatbot.partner && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Partenaire</h2>
                <div className="flex items-center gap-3">
                  {chatbot.partner.logo ? (
                    <img
                      src={chatbot.partner.logo}
                      alt={chatbot.partner.name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary-600" />
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/${locale}/admin/partners/${chatbot.partner.id}`}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      {chatbot.partner.name}
                    </Link>
                    <div className="text-sm text-gray-500">{chatbot.partner.email}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Configuration */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Configuration</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Type</div>
                  <div className="font-medium">{getTypeLabel(chatbot.type)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Industrie</div>
                  <div className="font-medium">{getIndustryLabel(chatbot.industry)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Langue</div>
                  <div className="font-medium">{chatbot.language.toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Statut</div>
                  <div className="font-medium">
                    {chatbot.isActive ? (
                      <span className="text-green-600">✓ Actif</span>
                    ) : (
                      <span className="text-gray-600">✗ Inactif</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Dates</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Créé le</div>
                    <div className="font-medium">
                      {new Date(chatbot.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Mis à jour le</div>
                    <div className="font-medium">
                      {new Date(chatbot.updatedAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href={`/${locale}/admin/chatbots`}
            className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
          >
            ← Retour à la liste des chatbots
          </Link>
        </div>
      </div>
    </div>
  );
}
